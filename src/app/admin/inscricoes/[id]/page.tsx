'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Sailboat, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Users, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  Edit
} from 'lucide-react';
import { getInscricao, updateInscricao } from '../actions';
import type { Inscricao } from '@/types';

export default function InscricaoDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [inscricao, setInscricao] = useState<Inscricao | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (id) {
      loadInscricao();
    }
  }, [id]);

  const loadInscricao = async () => {
    try {
      setLoading(true);
      const data = await getInscricao(id);
      setInscricao(data);
    } catch (error) {
      console.error('Erro ao carregar inscrição:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!inscricao) return;
    
    try {
      setUpdating(true);
      const formData = new FormData();
      formData.append('status', newStatus);
      
      await updateInscricao(id, formData);
      await loadInscricao();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pendente: { class: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: AlertTriangle, label: 'Pendente' },
      confirmada: { class: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle, label: 'Confirmada' },
      cancelada: { class: 'bg-red-100 text-red-800 border-red-200', icon: XCircle, label: 'Cancelada' }
    };
    
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pendente;
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
    return new Date(dateString).toLocaleString('pt-BR');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!inscricao) {
    return (
      <div className="text-center py-12">
        <Sailboat className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Inscrição não encontrada</h3>
        <p className="mt-1 text-sm text-gray-500">
          A inscrição que você está procurando não existe ou foi removida.
        </p>
        <div className="mt-6">
          <Link
            href="/admin/inscricoes"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <ArrowLeft className="mr-2" size={16} />
            Voltar para lista
          </Link>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusBadge(inscricao.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/inscricoes"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} className="mr-2" />
            Voltar
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Sailboat className="mr-3 text-teal-600" size={32} />
              Detalhes da Inscrição
            </h1>
            <p className="text-gray-600 mt-2">ID: {inscricao.id}</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Link
            href={`/admin/inscricoes/${id}/edit`}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit size={18} />
            <span>Editar</span>
          </Link>
        </div>
      </div>

      {/* Status e Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className={`inline-flex items-center px-3 py-2 text-sm font-semibold rounded-full border ${statusInfo.class}`}>
              <StatusIcon size={16} className="mr-2" />
              {statusInfo.label}
            </span>
            <span className="text-sm text-gray-500">
              Inscrito em {formatDate(inscricao.created_at)}
            </span>
          </div>
          
          <div className="flex space-x-2">
            {inscricao.status === 'pendente' && (
              <>
                <button
                  onClick={() => handleStatusChange('confirmada')}
                  disabled={updating}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  <CheckCircle size={16} className="mr-2" />
                  Confirmar
                </button>
                <button
                  onClick={() => handleStatusChange('cancelada')}
                  disabled={updating}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                  <XCircle size={16} className="mr-2" />
                  Cancelar
                </button>
              </>
            )}
            {inscricao.status === 'confirmada' && (
              <button
                onClick={() => handleStatusChange('cancelada')}
                disabled={updating}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                <XCircle size={16} className="mr-2" />
                Cancelar
              </button>
            )}
            {inscricao.status === 'cancelada' && (
              <button
                onClick={() => handleStatusChange('confirmada')}
                disabled={updating}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                <CheckCircle size={16} className="mr-2" />
                Reativar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Informações principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dados do Comandante */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex items-center">
            <User className="mr-2 text-teal-600" size={20} />
            Comandante
          </h3>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-gray-500">Nome</dt>
              <dd className="text-sm text-gray-900">{inscricao.nome_comandante}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="text-sm text-gray-900 flex items-center">
                <Mail size={16} className="mr-2 text-gray-400" />
                <a href={`mailto:${inscricao.email}`} className="text-teal-600 hover:text-teal-800">
                  {inscricao.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Telefone</dt>
              <dd className="text-sm text-gray-900 flex items-center">
                <Phone size={16} className="mr-2 text-gray-400" />
                <a href={`tel:${inscricao.telefone_comandante}`} className="text-teal-600 hover:text-teal-800">
                  {inscricao.telefone_comandante}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {/* Dados da Embarcação */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex items-center">
            <Sailboat className="mr-2 text-teal-600" size={20} />
            Embarcação
          </h3>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-gray-500">Nome</dt>
              <dd className="text-sm text-gray-900 font-semibold">{inscricao.nome_barco}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Modelo/Tamanho</dt>
              <dd className="text-sm text-gray-900">{inscricao.modelo_barco_tamanho}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Categoria</dt>
              <dd className="text-sm text-gray-900">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {getCategoriaDisplayName(inscricao.categoria)}
                </span>
              </dd>
            </div>
            {inscricao.clube_marina && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Clube/Marina</dt>
                <dd className="text-sm text-gray-900 flex items-center">
                  <MapPin size={16} className="mr-2 text-gray-400" />
                  {inscricao.clube_marina}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {/* Tripulação */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex items-center">
          <Users className="mr-2 text-teal-600" size={20} />
          Tripulação
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <pre className="text-sm text-gray-900 whitespace-pre-wrap">{inscricao.lista_tripulantes}</pre>
        </div>
      </div>

      {/* Contato de Emergência */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex items-center">
          <AlertTriangle className="mr-2 text-red-600" size={20} />
          Contato de Emergência
        </h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Nome</dt>
            <dd className="text-sm text-gray-900">{inscricao.nome_contato_emergencia}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Telefone</dt>
            <dd className="text-sm text-gray-900 flex items-center">
              <Phone size={16} className="mr-2 text-gray-400" />
              <a href={`tel:${inscricao.telefone_contato_emergencia}`} className="text-teal-600 hover:text-teal-800">
                {inscricao.telefone_contato_emergencia}
              </a>
            </dd>
          </div>
        </dl>
      </div>

      {/* Informações Financeiras */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Informações Financeiras
        </h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Valor Total</dt>
            <dd className="text-sm text-gray-900 font-semibold">
              R$ {inscricao.valor_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Comprovante PIX</dt>
            <dd className="text-sm text-gray-900">
              {inscricao.comprovante_pix_url ? (
                <a 
                  href={inscricao.comprovante_pix_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-teal-600 hover:text-teal-800"
                >
                  <Download size={16} className="mr-2" />
                  Baixar comprovante
                </a>
              ) : (
                <span className="text-gray-400">Não enviado</span>
              )}
            </dd>
          </div>
        </dl>
      </div>

      {/* Termos e Condições */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Termos e Condições
        </h3>
        <div className="flex items-center">
          <CheckCircle className="text-green-600 mr-2" size={20} />
          <span className="text-sm text-gray-900">
            {inscricao.aceita_termos ? 'Termos aceitos' : 'Termos não aceitos'}
          </span>
        </div>
      </div>
    </div>
  );
}