import { createClient } from '@/lib/supabase-server'
import { createAtividade } from '../actions'
import Link from 'next/link'

async function getPessoas() {
  const supabase = await createClient()
  
  const { data: pessoas, error } = await supabase
    .from('pessoas_festival')
    .select('id, nome, tipo')
    .eq('ativo', true)
    .order('nome')

  if (error) {
    console.error('Erro ao buscar pessoas:', error)
    return []
  }

  return pessoas || []
}

export default async function NewAtividadePage() {
  const pessoas = await getPessoas()

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          href="/admin/atividades"
          className="text-teal-600 hover:text-teal-700 mr-4"
        >
          ← Voltar
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Nova Atividade
        </h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form action={createAtividade} className="space-y-6">
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
              Título *
            </label>
            <input
              type="text"
              name="titulo"
              id="titulo"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="Ex: Palestra sobre Navegação Oceânica"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                Tipo *
              </label>
              <select
                name="tipo"
                id="tipo"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Selecione...</option>
                <option value="palestra">Palestra</option>
                <option value="show">Show Musical</option>
                <option value="workshop">Workshop</option>
                <option value="competicao">Competição</option>
                <option value="regata">Regata</option>
                <option value="cultura">Atividade Cultural</option>
                <option value="premiacao">Premiação</option>
                <option value="abertura">Abertura</option>
                <option value="encerramento">Encerramento</option>
                <option value="homenagem">Homenagem</option>
                <option value="kids">Atividade Kids</option>
              </select>
            </div>

            <div>
              <label htmlFor="pessoa_id" className="block text-sm font-medium text-gray-700">
                Participante Responsável
              </label>
              <select
                name="pessoa_id"
                id="pessoa_id"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Nenhum participante específico</option>
                {pessoas.map((pessoa) => (
                  <option key={pessoa.id} value={pessoa.id}>
                    {pessoa.nome} ({pessoa.tipo})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="dia" className="block text-sm font-medium text-gray-700">
                Dia *
              </label>
              <select
                name="dia"
                id="dia"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Selecione...</option>
                <option value="Quinta-feira">Quinta-feira</option>
                <option value="Sexta-feira">Sexta-feira</option>
                <option value="Sábado">Sábado</option>
                <option value="Domingo">Domingo</option>
              </select>
            </div>

            <div>
              <label htmlFor="data" className="block text-sm font-medium text-gray-700">
                Data *
              </label>
              <input
                type="date"
                name="data"
                id="data"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label htmlFor="horario" className="block text-sm font-medium text-gray-700">
                Horário *
              </label>
              <input
                type="text"
                name="horario"
                id="horario"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Ex: 10:00h às 12:00h"
              />
            </div>
          </div>

          <div>
            <label htmlFor="local" className="block text-sm font-medium text-gray-700">
              Local
            </label>
            <input
              type="text"
              name="local"
              id="local"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="Ex: Palco Principal, Praia do Jabaquara, etc."
            />
          </div>

          <div>
            <label htmlFor="detalhes" className="block text-sm font-medium text-gray-700">
              Detalhes *
            </label>
            <textarea
              name="detalhes"
              id="detalhes"
              rows={4}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="Descreva os detalhes da atividade..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/atividades"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
            >
              Salvar Atividade
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}