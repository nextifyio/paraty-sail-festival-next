import { createClient } from '@/lib/supabase-server'
import { createFAQ } from '../actions'
import Link from 'next/link'

async function getNextOrder() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('faqs')
    .select('ordem')
    .order('ordem', { ascending: false })
    .limit(1)

  if (error) {
    console.error('Erro ao buscar ordem:', error)
    return 1
  }

  return data && data.length > 0 ? data[0].ordem + 1 : 1
}

export default async function NewFAQPage() {
  const nextOrder = await getNextOrder()

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          href="/admin/faqs"
          className="text-teal-600 hover:text-teal-700 mr-4"
        >
          ← Voltar
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Nova FAQ
        </h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form action={createFAQ} className="space-y-6">
          <div>
            <label htmlFor="pergunta" className="block text-sm font-medium text-gray-700">
              Pergunta *
            </label>
            <input
              type="text"
              name="pergunta"
              id="pergunta"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="Ex: Como faço para me inscrever no festival?"
            />
          </div>

          <div>
            <label htmlFor="resposta" className="block text-sm font-medium text-gray-700">
              Resposta *
            </label>
            <textarea
              name="resposta"
              id="resposta"
              rows={6}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="Digite a resposta completa para esta pergunta..."
            />
          </div>

          <div>
            <label htmlFor="ordem" className="block text-sm font-medium text-gray-700">
              Ordem de Exibição
            </label>
            <input
              type="number"
              name="ordem"
              id="ordem"
              min="0"
              defaultValue={nextOrder}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              Ordem numérica de exibição (0 = primeiro)
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/faqs"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
            >
              Salvar FAQ
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}