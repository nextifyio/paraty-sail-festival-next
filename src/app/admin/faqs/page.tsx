import { createClient } from '@/lib/supabase-server'
import { FAQ } from '@/types'
import Link from 'next/link'
import { Edit, Plus, ChevronUp, ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'
import { deleteFAQ } from '../actions'
import { DeleteForm } from '@/components/admin/DeleteForm'

function DeleteButton({ id }: { id: string }) {
  return (
    <DeleteForm 
      action={deleteFAQ.bind(null, id)}
      confirmMessage="Tem certeza que deseja excluir esta FAQ?"
    />
  )
}

export default async function FAQsPage() {
  const supabase = await createClient()
  
  const { data: faqs, error } = await supabase
    .from('faqs')
    .select('*')
    .order('ordem') as { data: FAQ[] | null, error: Error | null }

  if (error) {
    console.error('Error fetching faqs:', error)
    return <div className="text-red-600">Erro ao carregar FAQs</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            FAQs
          </h1>
          <p className="text-gray-600 mt-2">Gerencie perguntas frequentes e respostas</p>
        </div>
        <Link
          href="/admin/faqs/new"
          className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 shadow-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova FAQ
        </Link>
      </div>

      <div className="bg-white shadow-xl overflow-hidden sm:rounded-xl border border-gray-200">
        <ul className="divide-y divide-gray-200">
          {faqs?.map((faq) => (
            <li key={faq.id} className="hover:bg-gray-50 transition-colors duration-200">
              <div className="px-6 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center border-2 border-gray-200">
                      <div className="relative">
                        <HelpCircle className="h-8 w-8 text-purple-600" />
                        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 bg-purple-600 text-white text-xs font-bold rounded-full">
                          {faq.ordem}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {faq.pergunta}
                      </h3>
                      <div className="flex items-start space-x-2 mb-3">
                        <MessageCircle className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {faq.resposta}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          faq.ativo 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {faq.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                        <span className="text-xs text-gray-500">
                          Ordem: {faq.ordem}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex flex-col space-y-1">
                      <button className="inline-flex items-center p-1.5 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200">
                        <ChevronUp className="h-3 w-3" />
                      </button>
                      <button className="inline-flex items-center p-1.5 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200">
                        <ChevronDown className="h-3 w-3" />
                      </button>
                    </div>
                    <Link
                      href={`/admin/faqs/${faq.id}`}
                      className="inline-flex items-center p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <DeleteButton id={faq.id} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        
        {!faqs?.length && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-4">
              <HelpCircle className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma FAQ cadastrada</h3>
            <p className="text-gray-500 mb-6">Comece adicionando perguntas frequentes</p>
            <Link
              href="/admin/faqs/new"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar primeira FAQ
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}