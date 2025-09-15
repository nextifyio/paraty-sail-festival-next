'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Edit, Plus, User, Music } from 'lucide-react'
import { Pessoa } from '@/types'
import { DeleteForm } from '@/components/admin/DeleteForm'
import { deletePessoa } from './actions'

export default function PessoasPageClient({ pessoas }: { pessoas: Pessoa[] }) {
  const [nomeFiltro, setNomeFiltro] = useState('')
  const [tipoFiltro, setTipoFiltro] = useState('')

  const pessoasFiltradas = pessoas.filter((pessoa) => {
    const nomeMatch = pessoa.nome.toLowerCase().includes(nomeFiltro.toLowerCase())
    const tipoMatch = tipoFiltro ? pessoa.tipo === tipoFiltro : true
    return nomeMatch && tipoMatch
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Participantes
          </h1>
          <p className="text-gray-600 mt-2">Gerencie palestrantes e atrações musicais</p>
        </div>
        <Link
          href="/admin/pessoas/new"
          className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 shadow-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Participante
        </Link>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 md:max-w-xs">
            <label htmlFor="nome-filtro" className="block text-sm font-medium text-gray-700 mb-1">
              Filtrar por nome
            </label>
            <input
              id="nome-filtro"
              type="text"
              placeholder="Digite o nome..."
              value={nomeFiltro}
              onChange={e => setNomeFiltro(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="flex-1 md:max-w-xs">
            <label htmlFor="tipo-filtro" className="block text-sm font-medium text-gray-700 mb-1">
              Filtrar por tipo
            </label>
            <select
              id="tipo-filtro"
              value={tipoFiltro}
              onChange={e => setTipoFiltro(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">Todos os tipos</option>
              <option value="palestrante">Palestrante</option>
              <option value="atracao">Atração Musical</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-xl overflow-hidden sm:rounded-xl border border-gray-200">
        <ul className="divide-y divide-gray-200">
          {pessoasFiltradas.map((pessoa: Pessoa) => (
            <li key={pessoa.id} className="hover:bg-gray-50 transition-colors duration-200">
              <div className="px-6 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    {pessoa.imagem ? (
                      <Image
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-xl object-cover border-2 border-gray-200"
                        src={pessoa.imagem}
                        alt={pessoa.nome}
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-2 border-gray-200">
                        {pessoa.tipo === 'palestrante' ? (
                          <User className="h-8 w-8 text-gray-400" />
                        ) : (
                          <Music className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {pessoa.nome}
                      </h3>
                      <p className="text-sm text-gray-600 font-medium">
                        {pessoa.especialidade}
                      </p>
                      <div className="mt-2 flex items-center space-x-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          pessoa.tipo === 'palestrante' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {pessoa.tipo === 'palestrante' ? 'Palestrante' : 'Atração Musical'}
                        </span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          pessoa.ativo 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {pessoa.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/admin/pessoas/${pessoa.id}`}
                      className="inline-flex items-center p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <DeleteForm 
                      action={deletePessoa.bind(null, pessoa.id)}
                      confirmMessage={`Tem certeza que deseja excluir ${pessoa.nome}?`}
                    />
                  </div>
                </div>
                {pessoa.bio && (
                  <div className="mt-4 pl-20">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {pessoa.bio}
                    </p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
        
        {pessoasFiltradas.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-4">
              <User className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma pessoa encontrada</h3>
            <p className="text-gray-500 mb-6">Altere os filtros ou adicione palestrantes e atrações para o festival</p>
            <Link
              href="/admin/pessoas/new"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar primeira pessoa
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
