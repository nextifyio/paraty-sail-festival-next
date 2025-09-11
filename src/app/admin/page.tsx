import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { 
  Users, 
  Calendar, 
  Building2, 
  MapPin, 
  UtensilsCrossed, 
  HelpCircle,
  Plus,
  BarChart3,
  TrendingUp
} from 'lucide-react'

async function getStats() {
  const supabase = await createClient()
  
  const [
    { count: pessoasCount },
    { count: atividadesCount },
    { count: patrocinadoresCount },
    { count: hospedagensCount },
    { count: restaurantesCount },
    { count: faqsCount }
  ] = await Promise.all([
    supabase.from('pessoas_festival').select('*', { count: 'exact', head: true }),
    supabase.from('atividades_festival').select('*', { count: 'exact', head: true }),
    supabase.from('patrocinadores').select('*', { count: 'exact', head: true }),
    supabase.from('hospedagens').select('*', { count: 'exact', head: true }),
    supabase.from('restaurantes').select('*', { count: 'exact', head: true }),
    supabase.from('faqs').select('*', { count: 'exact', head: true })
  ])

  return {
    pessoas: pessoasCount || 0,
    atividades: atividadesCount || 0,
    patrocinadores: patrocinadoresCount || 0,
    hospedagens: hospedagensCount || 0,
    restaurantes: restaurantesCount || 0,
    faqs: faqsCount || 0
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    { 
      title: 'Pessoas do Festival', 
      count: stats.pessoas, 
      href: '/admin/pessoas', 
      icon: Users,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-100 to-blue-200'
    },
    { 
      title: 'Atividades', 
      count: stats.atividades, 
      href: '/admin/atividades', 
      icon: Calendar,
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-100 to-green-200'
    },
    { 
      title: 'Patrocinadores', 
      count: stats.patrocinadores, 
      href: '/admin/patrocinadores', 
      icon: Building2,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-100 to-purple-200'
    },
    { 
      title: 'Hospedagens', 
      count: stats.hospedagens, 
      href: '/admin/hospedagens', 
      icon: MapPin,
      gradient: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-100 to-orange-200'
    },
    { 
      title: 'Restaurantes', 
      count: stats.restaurantes, 
      href: '/admin/restaurantes', 
      icon: UtensilsCrossed,
      gradient: 'from-red-500 to-red-600',
      bgGradient: 'from-red-100 to-red-200'
    },
    { 
      title: 'FAQs', 
      count: stats.faqs, 
      href: '/admin/faqs', 
      icon: HelpCircle,
      gradient: 'from-indigo-500 to-indigo-600',
      bgGradient: 'from-indigo-100 to-indigo-200'
    }
  ]

  const quickActions = [
    { title: 'Nova Pessoa', href: '/admin/pessoas/new', icon: Users },
    { title: 'Nova Atividade', href: '/admin/atividades/new', icon: Calendar },
    { title: 'Novo Patrocinador', href: '/admin/patrocinadores/new', icon: Building2 },
    { title: 'Nova Hospedagem', href: '/admin/hospedagens/new', icon: MapPin },
    { title: 'Novo Restaurante', href: '/admin/restaurantes/new', icon: UtensilsCrossed },
    { title: 'Nova FAQ', href: '/admin/faqs/new', icon: HelpCircle }
  ]

  const totalItems = stats.pessoas + stats.atividades + stats.patrocinadores + 
                   stats.hospedagens + stats.restaurantes + stats.faqs

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-3">
          Dashboard Administrativo
        </h1>
        <p className="text-gray-600 text-lg">Gerencie todos os aspectos do Paraty Sail Festival</p>
      </div>

      {/* Estatísticas de resumo */}
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Resumo Geral</h2>
            <p className="text-sm text-gray-600">Total de itens cadastrados no sistema</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                {totalItems}
              </p>
              <p className="text-sm text-gray-500">Total de registros</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-teal-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const IconComponent = card.icon
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-teal-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2 group-hover:scale-105 transition-transform duration-200">
                    {card.count}
                  </p>
                </div>
                <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${card.bgGradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <IconComponent className={`h-8 w-8 bg-gradient-to-br ${card.gradient} bg-clip-text text-transparent`} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-teal-600 group-hover:text-teal-700">
                <span>Gerenciar</span>
                <TrendingUp className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          )
        })}
      </div>

      {/* Ações rápidas */}
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Ações Rápidas
          </h2>
          <p className="text-gray-600 mt-1">Adicione novos itens rapidamente</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const IconComponent = action.icon
            return (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-teal-500 hover:bg-gradient-to-br hover:from-teal-50 hover:to-blue-50 transition-all duration-200"
              >
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                  <Plus className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700 transition-colors duration-200">
                    {action.title}
                  </span>
                  <div className="flex items-center mt-1">
                    <IconComponent className="h-4 w-4 text-gray-400 group-hover:text-teal-500 mr-1 transition-colors duration-200" />
                    <span className="text-xs text-gray-500 group-hover:text-teal-600 transition-colors duration-200">
                      Criar novo
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}