import { getUser } from './supabase-server'
import { redirect } from 'next/navigation'

/**
 * Verifica se o usuário está autenticado
 * Redireciona para login se não estiver
 * Retorna o usuário se estiver autenticado
 */
export async function requireAuth() {
  const user = await getUser()
  
  if (!user) {
    redirect('/auth/login?error=Acesso negado. Faça login para continuar.')
  }
  
  return user
}

/**
 * Verifica autenticação para Server Actions
 * Retorna erro ao invés de redirecionar
 */
export async function requireAuthForAction() {
  try {
    const user = await getUser()
    
    if (!user) {
      return { isAuthenticated: false, user: null, error: 'Usuário não autenticado' }
    }
    
    return { isAuthenticated: true, user, error: null }
  } catch (error) {
    return { isAuthenticated: false, user: null, error: 'Erro ao verificar autenticação' }
  }
}