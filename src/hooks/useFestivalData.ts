/**
 * Hook para gerenciar origem de dados do festival
 * Permite facilmente alternar entre arquivo local (data.ts) e Supabase
 */

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { 
  Pessoa, 
  AtividadeFestival,
  AtividadeFestivalComPessoa,
  Patrocinador, 
  Hospedagem, 
  Restaurante, 
  FAQ 
} from '@/types'
import { 
  pessoasFestival,
  atividadesFestival,
  patrocinadores as patrocinadoresLocal,
  hospedagens as hospedagensLocal,
  restaurantes as restaurantesLocal,
  faqItems as faqsLocal
} from '@/constants/data'

// Flag para controlar origem dos dados
const USE_SUPABASE = true // true = Supabase, false = arquivo local

export function useFestivalData() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Estados para cada tipo de dado
  const [pessoas, setPessoas] = useState<Pessoa[]>([])
  const [atividades, setAtividades] = useState<AtividadeFestivalComPessoa[]>([])
  const [patrocinadores, setPatrocinadores] = useState<Patrocinador[]>([])
  const [hospedagens, setHospedagens] = useState<Hospedagem[]>([])
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([])
  const [faqs, setFaqs] = useState<FAQ[]>([])

  useEffect(() => {
    if (USE_SUPABASE) {
      loadFromSupabase()
    } else {
      loadFromLocal()
    }
  }, [USE_SUPABASE])

  const loadFromSupabase = async () => {
    try {
      setLoading(true)
      setError(null)

      // Carregar pessoas ativas
      const { data: pessoasData, error: pessoasError } = await supabase
        .from('pessoas_festival')
        .select('*')
        .eq('ativo', true)
        .order('nome')

      if (pessoasError) throw pessoasError
      setPessoas(pessoasData || [])

      // Carregar atividades ativas
      const { data: atividadesData, error: atividadesError } = await supabase
        .from('atividades_festival')
        .select(`
          *,
          pessoa:pessoas_festival(nome, tipo)
        `)
        .eq('ativo', true)
        .order('data')
        .order('horario')

      if (atividadesError) throw atividadesError
      setAtividades(atividadesData || [])

      // Carregar patrocinadores ativos
      const { data: patrocinadoresData, error: patrocinadoresError } = await supabase
        .from('patrocinadores')
        .select('*')
        .eq('ativo', true)
        .order('nivel')
        .order('nome')

      if (patrocinadoresError) throw patrocinadoresError
      setPatrocinadores(patrocinadoresData || [])

      // Carregar hospedagens ativas
      const { data: hospedagensData, error: hospedagensError } = await supabase
        .from('hospedagens')
        .select('*')
        .eq('ativo', true)
        .order('nome')

      if (hospedagensError) throw hospedagensError
      setHospedagens(hospedagensData || [])

      // Carregar restaurantes ativos
      const { data: restaurantesData, error: restaurantesError } = await supabase
        .from('restaurantes')
        .select('*')
        .eq('ativo', true)
        .order('nome')

      if (restaurantesError) throw restaurantesError
      setRestaurantes(restaurantesData || [])

      // Carregar FAQs ativas
      const { data: faqsData, error: faqsError } = await supabase
        .from('faqs')
        .select('*')
        .eq('ativo', true)
        .order('ordem')

      if (faqsError) throw faqsError
      setFaqs(faqsData || [])

    } catch (err) {
      console.error('Erro ao carregar dados do Supabase:', err)
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
      // Fallback para dados locais em caso de erro
      loadFromLocal()
    } finally {
      setLoading(false)
    }
  }

  const loadFromLocal = () => {
    try {
      setLoading(true)
      setError(null)

      // Usar pessoas do arquivo local (palestrantes + atrações) e adicionar campos obrigatórios
      const pessoasComAtivo = pessoasFestival.map((pessoa: Pessoa) => ({
        ...pessoa,
        ativo: pessoa.ativo !== undefined ? pessoa.ativo : true,
        created_at: pessoa.created_at || new Date().toISOString(),
        updated_at: pessoa.updated_at || new Date().toISOString()
      }))

      // Usar atividades do arquivo local e adicionar campos obrigatórios
      const atividadesComAtivo = atividadesFestival.map((atividade: AtividadeFestival) => ({
        ...atividade,
        ativo: atividade.ativo !== undefined ? atividade.ativo : true,
        created_at: atividade.created_at || new Date().toISOString(),
        updated_at: atividade.updated_at || new Date().toISOString(),
        // Adicionar dados da pessoa se pessoaId existir
        pessoa: atividade.pessoaId ? (() => {
          const pessoa = pessoasComAtivo.find(p => p.id === atividade.pessoaId)
          return pessoa ? { nome: pessoa.nome, tipo: pessoa.tipo } : null
        })() : null
      })) as AtividadeFestivalComPessoa[]

      // Usar patrocinadores do arquivo local e adicionar campos obrigatórios
      const patrocinadoresComAtivo = patrocinadoresLocal.map((patrocinador: Patrocinador) => ({
        ...patrocinador,
        ativo: patrocinador.ativo !== undefined ? patrocinador.ativo : true,
        created_at: patrocinador.created_at || new Date().toISOString(),
        updated_at: patrocinador.updated_at || new Date().toISOString()
      }))

      // Usar hospedagens do arquivo local e adicionar campos obrigatórios
      const hospedagensComAtivo = hospedagensLocal.map((item, index: number) => ({
        ...item,
        id: `hospedagem-${index}`,
        ativo: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }))

      // Usar restaurantes do arquivo local e adicionar campos obrigatórios
      const restaurantesComAtivo = restaurantesLocal.map((item, index: number) => ({
        ...item,
        id: `restaurante-${index}`,
        ativo: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }))

      // Usar FAQs do arquivo local e adicionar campos obrigatórios
      const faqsComAtivo = faqsLocal.map((item, index: number) => ({
        ...item,
        id: `faq-${index}`,
        ordem: index + 1,
        ativo: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }))

      setPessoas(pessoasComAtivo)
      setAtividades(atividadesComAtivo)
      setPatrocinadores(patrocinadoresComAtivo)
      setHospedagens(hospedagensComAtivo)
      setRestaurantes(restaurantesComAtivo)
      setFaqs(faqsComAtivo)

    } catch (err) {
      console.error('Erro ao carregar dados locais:', err)
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados locais')
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    pessoas,
    atividades,
    patrocinadores,
    hospedagens,
    restaurantes,
    faqs,
    isUsingSupabase: USE_SUPABASE,
    reload: USE_SUPABASE ? loadFromSupabase : loadFromLocal
  }
}

// Hook específico para cada tipo de dado (para componentes que só precisam de um tipo)
export function usePessoas() {
  const { pessoas, loading, error } = useFestivalData()
  return { pessoas, loading, error }
}

export function useAtividades() {
  const { atividades, loading, error } = useFestivalData()
  return { atividades, loading, error }
}

export function usePatrocinadores() {
  const { patrocinadores, loading, error } = useFestivalData()
  return { patrocinadores, loading, error }
}

export function useHospedagens() {
  const { hospedagens, loading, error } = useFestivalData()
  return { hospedagens, loading, error }
}

export function useRestaurantes() {
  const { restaurantes, loading, error } = useFestivalData()
  return { restaurantes, loading, error }
}

export function useFaqs() {
  const { faqs, loading, error } = useFestivalData()
  return { faqs, loading, error }
}

// Hooks específicos para palestrantes e atrações
export function usePalestrantes() {
  const { pessoas, atividades, loading, error } = useFestivalData()
  
  // Filtrar apenas palestrantes ativos e adicionar informações das atividades
  const palestrantes = pessoas
    .filter(pessoa => pessoa.tipo === 'palestrante')
    .map(pessoa => {
      // Buscar todas as atividades deste palestrante (por id ou nome)
      const atividadesDoPalestrante = atividades.filter(
        atividade => atividade.pessoaId === pessoa.id || atividade.pessoa?.nome === pessoa.nome
      )

      // Extrair todos os dias/horários únicos
      const diasHorarios = atividadesDoPalestrante.map(a => ({ dia: a.dia, horario: a.horario })).filter(a => a.dia && a.horario)

      return {
        nome: pessoa.nome,
        especialidade: pessoa.especialidade,
        bio: pessoa.bio,
        instagram: pessoa.instagram,
        diasHorarios,
        imagem: pessoa.imagem
      }
    })

  return { palestrantes, loading, error }
}

export function useAtracoes() {
  const { pessoas, atividades, loading, error } = useFestivalData()
  
  // Filtrar apenas atrações ativas e adicionar informações das atividades
  const atracoes = pessoas
    .filter(pessoa => pessoa.tipo === 'atracao')
    .map(pessoa => {
      // Buscar todas as atividades desta atração (por id ou nome)
      const atividadesDaAtracao = atividades.filter(
        atividade => atividade.pessoaId === pessoa.id || atividade.pessoa?.nome === pessoa.nome
      )

      // Extrair todos os dias/horários únicos
      const diasHorarios = atividadesDaAtracao.map(a => ({ dia: a.dia, horario: a.horario })).filter(a => a.dia && a.horario)

      return {
        nome: pessoa.nome,
        especialidade: pessoa.especialidade,
        bio: pessoa.bio,
        instagram: pessoa.instagram,
        diasHorarios,
        imagem: pessoa.imagem
      }
    })

  return { atracoes, loading, error }
}

// Hook para programação agrupada por dia
export function useProgramacao() {
  const { atividades, loading, error } = useFestivalData()
  
  // Agrupar atividades por dia para criar programação
  const programacao = (() => {
    const diasUnicos = [...new Set(atividades.map(atividade => atividade.dia))]
    
    return diasUnicos.map(dia => {
      const atividadesDoDia = atividades.filter(atividade => atividade.dia === dia)
      const data = atividadesDoDia.length > 0 ? atividadesDoDia[0].data : ''
      
      const eventos = atividadesDoDia.map(atividade => ({
        horario: atividade.horario,
        evento: atividade.titulo,
        tipo: atividade.tipo,
        detalhes: atividade.detalhes,
        pessoa: atividade.pessoa?.nome || ''
      }))
      
      return {
        dia,
        data,
        eventos
      }
    })
  })()
  
  return { programacao, loading, error }
}