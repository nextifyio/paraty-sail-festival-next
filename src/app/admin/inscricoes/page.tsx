'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Mail,
  Sailboat,
  User,
  Phone,
  Calendar
} from 'lucide-react';
import { getInscricoes, deleteInscricao } from './actions';
import type { Inscricao } from '@/types';

export default function InscricoesPage() {
  const [inscricoes, setInscricoes] = useState<Inscricao[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoriaFilter, setCategoriaFilter] = useState<string>('all');

  useEffect(() => {
    loadInscricoes();
  }, []);

  const loadInscricoes = async () => {
    try {
      setLoading(true);
      const data = await getInscricoes();
      setInscricoes(data);
    } catch (error) {
      console.error('Erro ao carregar inscrições:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta inscrição?')) {
      try {
        await deleteInscricao(id);
        await loadInscricoes();
      } catch (error) {
        console.error('Erro ao excluir inscrição:', error);
      }
    }
  };

  const filteredInscricoes = inscricoes.filter(inscricao => {
    const matchesSearch = 
      inscricao.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inscricao.nome_barco.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inscricao.nome_comandante.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || inscricao.status === statusFilter;
    const matchesCategoria = categoriaFilter === 'all' || inscricao.categoria === categoriaFilter;
    
    return matchesSearch && matchesStatus && matchesCategoria;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pendente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmada: 'bg-green-100 text-green-800 border-green-200',
      cancelada: 'bg-red-100 text-red-800 border-red-200'
    };
    
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pendente;
  };

  const getCategoriaBadge = (categoria: string) => {
    const categoriaConfig = {
      FORCA_LIVRE: 'bg-blue-100 text-blue-800',
      ACO: 'bg-gray-100 text-gray-800',
      CLASSICO: 'bg-purple-100 text-purple-800',
      CRUZEIRO: 'bg-teal-100 text-teal-800'
    };
    
    return categoriaConfig[categoria as keyof typeof categoriaConfig] || 'bg-gray-100 text-gray-800';
  };

  const getCategoriaDisplayName = (categoria: string) => {
    if (categoria.includes('Força Livre')) return 'Força Livre';
    if (categoria.includes('Aço')) return 'Aço';
    if (categoria.includes('Clássicos')) return 'Clássicos';
    if (categoria.includes('Cruzeiro 18')) return 'Cruzeiro 18';
    if (categoria.includes('Cruzeiro 23')) return 'Cruzeiro 23';
    if (categoria.includes('Cruzeiro 27')) return 'Cruzeiro 27';
    if (categoria.includes('Cruzeiro 32')) return 'Cruzeiro 32';
    if (categoria.includes('Cruzeiro 36')) return 'Cruzeiro 36';
    return categoria;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const exportToCSV = () => {
    const headers = [
      'Data Inscrição',
      'Email',
      'Nome Capitão',
      'Telefone',
      'Embarcação',
      'Categoria',
      'Status',
      'Tripulantes'
    ];

    const csvData = filteredInscricoes.map(inscricao => [
      formatDate(inscricao.created_at),
      inscricao.email,
      inscricao.nome_comandante,
      inscricao.telefone_comandante,
      inscricao.nome_barco,
      inscricao.categoria,
      inscricao.status,
      inscricao.lista_tripulantes?.split('\n').length || 0
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `inscricoes_regata_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Sailboat className="mr-3 text-teal-600" size={32} />
            Inscrições para a Regata
          </h1>
          <p className="text-gray-600 mt-2">Gerencie as inscrições para a 1ª Regata Amyr Klink</p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download size={18} />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Sailboat className="h-8 w-8 text-blue-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Inscrições</dt>
                <dd className="text-lg font-medium text-gray-900">{inscricoes.length}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Pendentes</dt>
                <dd className="text-lg font-medium text-gray-900">
                  {inscricoes.filter(i => i.status === 'pendente').length}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <User className="h-8 w-8 text-green-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Confirmadas</dt>
                <dd className="text-lg font-medium text-gray-900">
                  {inscricoes.filter(i => i.status === 'confirmada').length}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Phone className="h-8 w-8 text-red-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Canceladas</dt>
                <dd className="text-lg font-medium text-gray-900">
                  {inscricoes.filter(i => i.status === 'cancelada').length}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por email, embarcação ou capitão..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">Todos os Status</option>
            <option value="pendente">Pendente</option>
            <option value="confirmada">Confirmada</option>
            <option value="cancelada">Cancelada</option>
          </select>

          <select
            value={categoriaFilter}
            onChange={(e) => setCategoriaFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">Todas as Categorias</option>
            <option value="Força Livre: Barcos com medição IRC, ORC, RGS, barcos One Design e ou + 40 pés">Força Livre</option>
            <option value="Aço: Barcos de cruzeiro com casco de aço / restrição de tamanho">Aço</option>
            <option value="Clássicos: Barcos de projeto clássico ou com data de construção anterior 1975">Clássicos</option>
            <option value="Cruzeiro 18: Barcos de até 22,9 pés.">Cruzeiro 18</option>
            <option value="Cruzeiro 23: Barcos de 23 a 26,9 pés.">Cruzeiro 23</option>
            <option value="Cruzeiro 27: Barcos de 27 a 31,9 pés.">Cruzeiro 27</option>
            <option value="Cruzeiro 32: Barcos de 32 a 35,9 pés.">Cruzeiro 32</option>
            <option value="Cruzeiro 36: Barcos de 36 a 39,9 pés.">Cruzeiro 36</option>
          </select>

          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setCategoriaFilter('all');
              }}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={18} />
              <span>Limpar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {filteredInscricoes.length === 0 ? (
          <div className="text-center py-12">
            <Sailboat className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma inscrição encontrada</h3>
            <p className="mt-1 text-sm text-gray-500">
              {inscricoes.length === 0 
                ? "Ainda não há inscrições para a regata." 
                : "Tente ajustar os filtros de busca."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inscrição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Embarcação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tripulantes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInscricoes.map((inscricao) => (
                  <tr key={inscricao.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {inscricao.nome_comandante}
                          </div>
                          <div className="text-sm text-gray-500">{inscricao.email}</div>
                          <div className="text-sm text-gray-500">{inscricao.telefone_comandante}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {inscricao.nome_barco}
                      </div>
                      <div className="text-sm text-gray-500">
                        {inscricao.modelo_barco_tamanho}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800`}>
                        {getCategoriaDisplayName(inscricao.categoria)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(inscricao.status)}`}>
                        {inscricao.status === 'pendente' && 'Pendente'}
                        {inscricao.status === 'confirmada' && 'Confirmada'}
                        {inscricao.status === 'cancelada' && 'Cancelada'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {inscricao.lista_tripulantes?.split('\n').filter(t => t.trim()).length || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(inscricao.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/admin/inscricoes/${inscricao.id}`}
                          className="text-teal-600 hover:text-teal-900 p-1 rounded"
                          title="Visualizar"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          href={`/admin/inscricoes/${inscricao.id}/edit`}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(inscricao.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Excluir"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination - Para implementar futuramente se necessário */}
      {filteredInscricoes.length > 0 && (
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">{filteredInscricoes.length}</span> de{' '}
                <span className="font-medium">{inscricoes.length}</span> inscrições
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}