import Link from 'next/link';
import Image from 'next/image';
import { Plus, Building2, ExternalLink, Edit } from 'lucide-react';
import { createClient } from '@/lib/supabase-server';
import { deletePatrocinador } from '../actions';
import { DeleteForm } from '@/components/admin/DeleteForm';

async function getPatrocinadores() {
  const supabase = await createClient();
  
  const { data: patrocinadores, error } = await supabase
    .from('patrocinadores')
    .select('*')
    .order('nome');

  if (error) {
    console.error('Erro ao buscar patrocinadores:', error);
    return [];
  }

  return patrocinadores || [];
}

function DeleteButton({ id }: { id: string }) {
  return (
    <DeleteForm 
      action={deletePatrocinador.bind(null, id)}
      confirmMessage="Tem certeza que deseja excluir este patrocinador?"
    />
  );
}

export default async function PatrocinadoresPage() {
  const patrocinadores = await getPatrocinadores();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Patrocinadores
          </h1>
          <p className="text-gray-600 mt-2">Gerencie os patrocinadores e apoiadores do festival</p>
        </div>
        <Link
          href="/admin/patrocinadores/new"
          className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 shadow-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Patrocinador
        </Link>
      </div>

      <div className="bg-white shadow-xl overflow-hidden sm:rounded-xl border border-gray-200">
        <ul className="divide-y divide-gray-200">
          {patrocinadores?.map((patrocinador) => (
            <li key={patrocinador.id} className="hover:bg-gray-50 transition-colors duration-200">
              <div className="px-6 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    {patrocinador.logo_url ? (
                      <Image
                        src={patrocinador.logo_url}
                        alt={`Logo ${patrocinador.nome}`}
                        width={64}
                        height={64}
                        className="h-16 w-16 object-contain rounded-xl border-2 border-gray-200 bg-white p-2"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-2 border-gray-200">
                        <Building2 className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {patrocinador.nome}
                      </h3>
                      {patrocinador.descricao && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {patrocinador.descricao}
                        </p>
                      )}
                      <div className="mt-2 flex items-center space-x-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          patrocinador.tipo === 'platina'
                            ? 'bg-gray-100 text-gray-800'
                            : patrocinador.tipo === 'ouro'
                            ? 'bg-yellow-100 text-yellow-800'
                            : patrocinador.tipo === 'prata'
                            ? 'bg-blue-100 text-blue-800'
                            : patrocinador.tipo === 'bronze'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {patrocinador.tipo?.charAt(0).toUpperCase() + patrocinador.tipo?.slice(1)}
                        </span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          patrocinador.ativo 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {patrocinador.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                        {patrocinador.valor_patrocinio && (
                          <span className="text-sm font-medium text-gray-700">
                            R$ {patrocinador.valor_patrocinio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        )}
                        {patrocinador.website_url && (
                          <a
                            href={patrocinador.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-teal-600 hover:text-teal-800 text-sm"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span>Website</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/admin/patrocinadores/${patrocinador.id}`}
                      className="inline-flex items-center p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <DeleteButton id={patrocinador.id} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        
        {!patrocinadores?.length && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-4">
              <Building2 className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum patrocinador cadastrado</h3>
            <p className="text-gray-500 mb-6">Comece adicionando patrocinadores e apoiadores do festival</p>
            <Link
              href="/admin/patrocinadores/new"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar primeiro patrocinador
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}