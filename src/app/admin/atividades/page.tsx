'use client'

import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { deleteAtividade } from '../actions'
import { Edit, Plus, Calendar, Clock, MapPin, User, Filter } from 'lucide-react'
import { DeleteForm } from '@/components/admin/DeleteForm'
import { useState, useEffect } from 'react'

interface Atividade {
  id: string
  titulo: string
  tipo: string
  dia: string
  data: string
  horario: string
  local?: string
  detalhes?: string
  ativo: boolean
  pessoa?: {
    nome: string
    tipo: string
  }
}

function DeleteButton({ id }: { id: string }) {
  return (
    <DeleteForm 
      action={deleteAtividade.bind(null, id)}
      confirmMessage="Tem certeza que deseja excluir esta atividade?"
    />
  )
}

const tipoColors: Record<string, string> = {
  palestra: 'bg-blue-100 text-blue-800',
  show: 'bg-purple-100 text-purple-800',
  workshop: 'bg-green-100 text-green-800',
  competicao: 'bg-red-100 text-red-800',
  regata: 'bg-teal-100 text-teal-800',
  cultura: 'bg-yellow-100 text-yellow-800',
  premiacao: 'bg-amber-100 text-amber-800',
  abertura: 'bg-emerald-100 text-emerald-800',
  encerramento: 'bg-rose-100 text-rose-800',
  homenagem: 'bg-indigo-100 text-indigo-800',
  kids: 'bg-pink-100 text-pink-800',
}

const tipoIcons: Record<string, string> = {
  palestra: '🎤',
  show: '🎵',
  workshop: '🔧',
  competicao: '🏆',
  regata: '⛵',
  cultura: '🎭',
  premiacao: '�',
  abertura: '🎉',
  encerramento: '🎊',
  homenagem: '👏',
  kids: '🧒',
}

const tipoLabels: Record<string, string> = {
  palestra: 'Palestra',
  show: 'Show Musical',
  workshop: 'Workshop',
  competicao: 'Competição',
  regata: 'Regata',
  cultura: 'Atividade Cultural',
  premiacao: 'Premiação',
  abertura: 'Abertura',
  encerramento: 'Encerramento',
  homenagem: 'Homenagem',
  kids: 'Atividade Kids',
}

export default function AtividadesPage() {
  const [atividades, setAtividades] = useState<Atividade[]>([])
  const [filteredAtividades, setFilteredAtividades] = useState<Atividade[]>([])
  const [selectedTipo, setSelectedTipo] = useState<string>('todos')
  const [showInactive, setShowInactive] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAtividades() {
      try {        
        const { data, error } = await supabase
          .from('atividades_festival')
          .select(`
            *,
            pessoa:pessoas_festival(nome, tipo)
          `)
          .order('data')
          .order('horario')

        if (error) {
          console.error('Erro ao buscar atividades:', error)
          return
        }

        const atividadesData = data || []
        setAtividades(atividadesData)
        setFilteredAtividades(atividadesData)
      } catch (error) {
        console.error('Erro ao buscar atividades:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAtividades()
  }, [])

  useEffect(() => {
    let filtered = atividades;
    
    // Filtrar por tipo
    if (selectedTipo !== 'todos') {
      filtered = filtered.filter(atividade => atividade.tipo === selectedTipo);
    }
    
    // Filtrar por status (ativo/inativo)
    if (!showInactive) {
      filtered = filtered.filter(atividade => atividade.ativo);
    }
    
    setFilteredAtividades(filtered);
  }, [selectedTipo, showInactive, atividades])

  const handleTipoChange = (tipo: string) => {
    setSelectedTipo(tipo)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Atividades do Festival
            </h1>
            <p className="text-gray-600 mt-2">Gerencie palestras, shows e eventos</p>
          </div>
        </div>
        <div className="bg-white shadow-xl overflow-hidden sm:rounded-xl border border-gray-200 p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Carregando atividades...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Atividades do Festival
          </h1>
          <p className="text-gray-600 mt-2">Gerencie palestras, shows e eventos</p>
        </div>
        <Link
          href="/admin/atividades/new"
          className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 shadow-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Atividade
        </Link>
      </div>

      {/* Filtros */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <label htmlFor="tipo-filter" className="text-sm font-medium text-gray-700">
                Filtrar por tipo:
              </label>
            </div>
            <select
              id="tipo-filter"
              value={selectedTipo}
              onChange={(e) => handleTipoChange(e.target.value)}
              className="block w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="todos">Todos os tipos</option>
              {Object.entries(tipoLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {tipoIcons[value]} {label}
                </option>
              ))}
            </select>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="show-inactive"
                checked={showInactive}
                onChange={(e) => setShowInactive(e.target.checked)}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="show-inactive" className="text-sm text-gray-700">
                Exibir inativos
              </label>
            </div>
          </div>
          
          {(selectedTipo !== 'todos' || showInactive) && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                Mostrando {filteredAtividades.length} de {atividades.length} atividades
              </span>
              <button
                onClick={() => {
                  handleTipoChange('todos');
                  setShowInactive(false);
                }}
                className="text-sm text-teal-600 hover:text-teal-800 underline"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white shadow-xl overflow-hidden sm:rounded-xl border border-gray-200">
        <ul className="divide-y divide-gray-200">
          {filteredAtividades.map((atividade) => (
            <li key={atividade.id} className="hover:bg-gray-50 transition-colors duration-200">
              <div className="px-6 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{tipoIcons[atividade.tipo] || '📅'}</span>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {atividade.titulo}
                      </h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${tipoColors[atividade.tipo] || 'bg-gray-100 text-gray-800'}`}>
                        {atividade.tipo}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        atividade.ativo 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {atividade.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-teal-500" />
                        <span className="font-medium">{atividade.dia}</span>
                        <span className="ml-2 text-gray-500">({atividade.data})</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-teal-500" />
                        <span>{atividade.horario}</span>
                      </div>
                      {atividade.local && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-teal-500" />
                          <span>{atividade.local}</span>
                        </div>
                      )}
                    </div>
                    
                    {atividade.pessoa && (
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <User className="h-4 w-4 mr-2 text-teal-500" />
                        <span className="font-medium">{atividade.pessoa.nome}</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          atividade.pessoa.tipo === 'palestrante' 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'bg-purple-50 text-purple-700'
                        }`}>
                          {atividade.pessoa.tipo === 'palestrante' ? 'Palestrante' : 'Atração'}
                        </span>
                      </div>
                    )}
                    
                    {atividade.detalhes && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {atividade.detalhes}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3 ml-4">
                    <Link
                      href={`/admin/atividades/${atividade.id}`}
                      className="inline-flex items-center p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <DeleteButton id={atividade.id} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        
        {filteredAtividades.length === 0 && atividades.length > 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-4">
              <Filter className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma atividade encontrada</h3>
            <p className="text-gray-500 mb-6">
              Não há atividades do tipo "{tipoLabels[selectedTipo] || selectedTipo}"
            </p>
            <button
              onClick={() => handleTipoChange('todos')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-teal-600 bg-teal-50 hover:bg-teal-100 transition-all duration-200"
            >
              Ver todas as atividades
            </button>
          </div>
        )}
        
        {atividades.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-4">
              <Calendar className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma atividade cadastrada</h3>
            <p className="text-gray-500 mb-6">Comece adicionando palestras, shows e eventos do festival</p>
            <Link
              href="/admin/atividades/new"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar primeira atividade
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}