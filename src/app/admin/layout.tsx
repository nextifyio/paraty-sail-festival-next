import { getUser } from '@/lib/supabase-server'
import { signOut } from '../auth/actions'
import { NotificationProvider } from '@/components/notifications/NotificationProvider'
import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
        {/* Header */}
        <header className="bg-white shadow-lg border-b-2 border-teal-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Link href="/admin" className="flex items-center space-x-3">
                  <Image
                    src="/images/logo.jpeg"
                    alt="Paraty Sail Festival"
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                  <div>
                    <h1 className="text-xl font-bold text-teal-800">
                      Paraty Sail Festival
                    </h1>
                    <p className="text-sm text-gray-600">Painel Administrativo</p>
                  </div>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-700">
                    {user.email}
                  </span>
                  <p className="text-xs text-gray-500">Administrador</p>
                </div>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="text-sm bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md"
                  >
                    Sair
                  </button>
                </form>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <nav className="w-64 bg-white shadow-xl min-h-screen border-r border-gray-200">
            <div className="p-6">
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/admin"
                    className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 hover:text-teal-700 transition-all duration-200 font-medium"
                  >
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/pessoas"
                    className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 hover:text-teal-700 transition-all duration-200 font-medium"
                  >
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                    Pessoas do Festival
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/atividades"
                    className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 hover:text-teal-700 transition-all duration-200 font-medium"
                  >
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                    Atividades
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/patrocinadores"
                    className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 hover:text-teal-700 transition-all duration-200 font-medium"
                  >
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                    Patrocinadores
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/hospedagens"
                    className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 hover:text-teal-700 transition-all duration-200 font-medium"
                  >
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                    Hospedagens
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/restaurantes"
                    className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 hover:text-teal-700 transition-all duration-200 font-medium"
                  >
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                    Restaurantes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/faqs"
                    className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 hover:text-teal-700 transition-all duration-200 font-medium"
                  >
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </NotificationProvider>
  )
}