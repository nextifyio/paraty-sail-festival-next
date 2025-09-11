'use server'

import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Erro no login:', error)
    redirect('/auth/login?error=Credenciais inválidas')
  }

  revalidatePath('/', 'layout')
  
  const redirectTo = formData.get('redirectTo') as string
  redirect(redirectTo || '/admin')
}

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error('Erro no registro:', error)
    redirect('/auth/register?error=Erro ao criar conta')
  }

  redirect('/auth/login?message=Conta criada! Verifique seu email.')
}

export async function signOut() {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Erro no logout:', error)
  }

  revalidatePath('/', 'layout')
  redirect('/auth/login')
}