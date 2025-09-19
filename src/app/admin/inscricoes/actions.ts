'use server'

import { createClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { InscricaoForm, CategoriaRegata } from '@/types'
import { EmailService } from '@/lib/email-service'

export async function createInscricao(formData: FormData) {
  const supabase = await createClient()

  // Extrair dados do FormData
  const email = formData.get('email') as string
  const nome_comandante = formData.get('nome_comandante') as string
  const telefone_comandante = formData.get('telefone_comandante') as string
  const nome_barco = formData.get('nome_barco') as string
  const clube_marina = formData.get('clube_marina') as string
  const modelo_barco_tamanho = formData.get('modelo_barco_tamanho') as string
  const categoria = formData.get('categoria') as CategoriaRegata
  const lista_tripulantes = formData.get('lista_tripulantes') as string
  const nome_contato_emergencia = formData.get('nome_contato_emergencia') as string
  const telefone_contato_emergencia = formData.get('telefone_contato_emergencia') as string
  const aceita_termos = formData.get('aceita_termos') === 'true'
  const comprovante_pix = formData.get('comprovante_pix') as File

  // Validação básica
  if (!email || !nome_comandante || !telefone_comandante || !nome_barco || 
      !modelo_barco_tamanho || !categoria || !lista_tripulantes || 
      !nome_contato_emergencia || !telefone_contato_emergencia || !aceita_termos) {
    throw new Error('Todos os campos obrigatórios devem ser preenchidos')
  }

  let comprovante_pix_url = null

  // Upload do comprovante se fornecido
  if (comprovante_pix && comprovante_pix.size > 0) {
    const fileExt = comprovante_pix.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('comprovantes')
      .upload(fileName, comprovante_pix)

    if (uploadError) {
      console.error('Erro no upload:', uploadError)
      throw new Error('Erro ao fazer upload do comprovante')
    }

    const { data: { publicUrl } } = supabase.storage
      .from('comprovantes')
      .getPublicUrl(fileName)
    
    comprovante_pix_url = publicUrl
  }

  // Calcular valor total baseado no número de tripulantes
  const linhasTripulantes = lista_tripulantes.split('\n').filter(linha => linha.trim() !== '')
  const valor_total = linhasTripulantes.length * 200

  // Inserir inscrição no banco
  const { data, error } = await supabase
    .from('inscricoes')
    .insert({
      email,
      nome_comandante,
      telefone_comandante,
      nome_barco,
      clube_marina: clube_marina || null,
      modelo_barco_tamanho,
      categoria,
      lista_tripulantes,
      nome_contato_emergencia,
      telefone_contato_emergencia,
      comprovante_pix_url,
      aceita_termos,
      valor_total,
      status: 'pendente'
    })
    .select()
    .single()

  if (error) {
    console.error('Erro ao salvar inscrição:', error)
    throw new Error('Erro ao salvar inscrição: ' + error.message)
  }

  // Enviar emails de confirmação e notificação
  try {
    // Email de confirmação para o usuário
    await EmailService.sendInscricaoConfirmation(
      email,
      nome_comandante,
      nome_barco,
      categoria,
      valor_total
    )

    // Email de notificação para o admin
    await EmailService.sendAdminNotification(
      nome_comandante,
      nome_barco,
      categoria,
      email,
      telefone_comandante
    )
  } catch (emailError) {
    console.error('Erro ao enviar emails:', emailError)
    // Não falhamos a inscrição por causa do email, apenas logamos o erro
  }

  revalidatePath('/admin/inscricoes')
  return data
}

export async function updateInscricao(id: string, formData: FormData) {
  const supabase = await createClient()

  const status = formData.get('status') as string
  const valor_total = formData.get('valor_total') ? parseFloat(formData.get('valor_total') as string) : undefined

  // Buscar dados atuais da inscrição para comparar status
  const { data: inscricaoAtual, error: fetchError } = await supabase
    .from('inscricoes')
    .select('status, email, nome_comandante, nome_barco')
    .eq('id', id)
    .single()

  if (fetchError) {
    console.error('Erro ao buscar inscrição:', fetchError)
    throw new Error('Erro ao buscar inscrição')
  }

  const updateData: any = {
    updated_at: new Date().toISOString()
  }

  if (status) updateData.status = status
  if (valor_total !== undefined) updateData.valor_total = valor_total

  const { error } = await supabase
    .from('inscricoes')
    .update(updateData)
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar inscrição:', error)
    throw new Error('Erro ao atualizar inscrição')
  }

  // Enviar email se o status mudou
  if (status && status !== inscricaoAtual.status && (status === 'confirmada' || status === 'cancelada')) {
    try {
      await EmailService.sendStatusUpdate(
        inscricaoAtual.email,
        inscricaoAtual.nome_comandante,
        inscricaoAtual.nome_barco,
        status
      )
    } catch (emailError) {
      console.error('Erro ao enviar email de atualização:', emailError)
      // Não falhamos a atualização por causa do email
    }
  }

  revalidatePath('/admin/inscricoes')
  redirect('/admin/inscricoes')
}

export async function deleteInscricao(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('inscricoes')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Erro ao deletar inscrição:', error)
    throw new Error('Erro ao deletar inscrição')
  }

  revalidatePath('/admin/inscricoes')
}

export async function exportInscricoes() {
  const supabase = await createClient()

  const { data: inscricoes, error } = await supabase
    .from('inscricoes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error('Erro ao buscar inscrições: ' + error.message)
  }

  return inscricoes
}

export async function getInscricoes() {
  const supabase = await createClient()

  const { data: inscricoes, error } = await supabase
    .from('inscricoes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error('Erro ao buscar inscrições: ' + error.message)
  }

  return inscricoes || []
}

export async function getInscricao(id: string) {
  const supabase = await createClient()

  const { data: inscricao, error } = await supabase
    .from('inscricoes')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error('Erro ao buscar inscrição: ' + error.message)
  }

  return inscricao
}