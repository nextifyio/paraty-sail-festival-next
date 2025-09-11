import { signIn } from '../actions'
import Link from 'next/link'
import { Suspense } from 'react'

interface PageProps {
  searchParams: Promise<{
    error?: string;
    message?: string;
    redirectTo?: string;
  }>;
}

async function LoginForm({ searchParams }: { searchParams: { error?: string; message?: string; redirectTo?: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-amber-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-teal-800">
            Login Administrativo
          </h2>
          <p className="mt-2 text-gray-600">
            Paraty Sail Festival 2025
          </p>
        </div>

        {searchParams.error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600 text-sm">{searchParams.error}</p>
          </div>
        )}

        {searchParams.message && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-green-600 text-sm">{searchParams.message}</p>
          </div>
        )}

        <form action={signIn} className="mt-8 space-y-6">
          <input type="hidden" name="redirectTo" value={searchParams.redirectTo || ''} />
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="admin@paratysailfestival.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
          >
            Entrar
          </button>

          <div className="text-center">
            <Link
              href="/auth/register"
              className="text-teal-600 hover:text-teal-500 text-sm"
            >
              Não tem conta? Registre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default async function LoginPage({ searchParams }: PageProps) {
  const params = await searchParams;
  
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <LoginForm searchParams={params} />
    </Suspense>
  )
}