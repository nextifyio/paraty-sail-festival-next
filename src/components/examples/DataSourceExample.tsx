/**
 * Exemplo de como usar o hook useFestivalData
 * Este componente demonstra como alternar entre dados locais e Supabase
 */

'use client'

import { useFestivalData } from '@/hooks/useFestivalData'

export default function DataSourceExample() {
  const {
    loading,
    error,
    pessoas,
    atividades,
    patrocinadores,
    hospedagens,
    restaurantes,
    faqs,
    isUsingSupabase,
    reload
  } = useFestivalData()

  if (loading) {
    return <div className="p-4">Carregando dados do festival...</div>
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        <p>Erro ao carregar dados: {error}</p>
        <button 
          onClick={reload}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      <div className="bg-blue-100 p-3 rounded">
        <h2 className="font-bold text-lg">Status da Fonte de Dados</h2>
        <p>Usando {isUsingSupabase ? 'Supabase' : 'arquivo local'}</p>
        <p>Apenas registros ativos são exibidos no site público</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-3 rounded shadow">
          <h3 className="font-semibold">Pessoas</h3>
          <p>{pessoas.length} registros ativos</p>
        </div>

        <div className="bg-white p-3 rounded shadow">
          <h3 className="font-semibold">Atividades</h3>
          <p>{atividades.length} registros ativos</p>
        </div>

        <div className="bg-white p-3 rounded shadow">
          <h3 className="font-semibold">Patrocinadores</h3>
          <p>{patrocinadores.length} registros ativos</p>
        </div>

        <div className="bg-white p-3 rounded shadow">
          <h3 className="font-semibold">Hospedagens</h3>
          <p>{hospedagens.length} registros ativos</p>
        </div>

        <div className="bg-white p-3 rounded shadow">
          <h3 className="font-semibold">Restaurantes</h3>
          <p>{restaurantes.length} registros ativos</p>
        </div>

        <div className="bg-white p-3 rounded shadow">
          <h3 className="font-semibold">FAQs</h3>
          <p>{faqs.length} registros ativos</p>
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded">
        <h3 className="font-semibold mb-2">Como alterar a fonte de dados:</h3>
        <p className="text-sm text-gray-600">
          Para alternar entre Supabase e dados locais, edite a constante <code>USE_SUPABASE</code> 
          no arquivo <code>src/hooks/useFestivalData.ts</code>:
        </p>
        <ul className="text-sm text-gray-600 mt-2 space-y-1">
          <li>• <code>USE_SUPABASE = true</code> → Usa Supabase (apenas registros ativos)</li>
          <li>• <code>USE_SUPABASE = false</code> → Usa arquivo local (todos os registros)</li>
        </ul>
      </div>
    </div>
  )
}