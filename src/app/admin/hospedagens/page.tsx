import { createClient } from '@/lib/supabase-server'
import { Hospedagem } from '@/types'
import Link from 'next/link'
import { Edit, Plus, MapPin, Phone, Home, Percent } from 'lucide-react'
import { deleteHospedagem } from '../actions'
import { DeleteForm } from '@/components/admin/DeleteForm'

function DeleteButton({ id }: { id: string }) {
  return (
    <DeleteForm 
      action={deleteHospedagem.bind(null, id)}
      confirmMessage="Tem certeza que deseja excluir esta hospedagem?"
    />
  )
}

export default async function HospedagensPage() {
  const supabase = await createClient()
  
    const { data: hospedagens, error } = await supabase
    .from('hospedagens')
    .select('*')
    .order('nome') as { data: Hospedagem[] | null, error: Error | null }

  if (error) {
    console.error('Error fetching hospedagens:', error)
    return <div className="text-red-600">Erro ao carregar hospedagens</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Hospedagens
          </h1>
          <p className="text-gray-600 mt-2">Gerencie hospedagens e acomodações do festival</p>
        </div>
        <Link
          href="/admin/hospedagens/new"
          className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 shadow-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Hospedagem
        </Link>
      </div>

      <div className="bg-white shadow-xl overflow-hidden sm:rounded-xl border border-gray-200">
        <ul className="divide-y divide-gray-200">
          {hospedagens?.map((hospedagem) => (
            <li key={hospedagem.id} className="hover:bg-gray-50 transition-colors duration-200">
              <div className="px-6 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center border-2 border-gray-200">
                      <Home className="h-8 w-8 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {hospedagem.nome}
                      </h3>
                      {hospedagem.descricao && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {hospedagem.descricao}
                        </p>
                      )}
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-teal-500" />
                          <span>{hospedagem.localizacao}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-2 text-teal-500" />
                          <span>{hospedagem.contato}</span>
                        </div>
                        {hospedagem.desconto && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Percent className="h-4 w-4 mr-2 text-green-500" />
                            <span className="font-medium text-green-700">{hospedagem.desconto}</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          hospedagem.ativo 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {hospedagem.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/admin/hospedagens/${hospedagem.id}`}
                      className="inline-flex items-center p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <DeleteButton id={hospedagem.id} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        
        {!hospedagens?.length && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-4">
              <Home className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma hospedagem cadastrada</h3>
            <p className="text-gray-500 mb-6">Comece adicionando hospedagens e acomodações para o festival</p>
            <Link
              href="/admin/hospedagens/new"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar primeira hospedagem
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}