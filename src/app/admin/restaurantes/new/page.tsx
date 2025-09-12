'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createRestaurante } from '../actions'
import { useNotifications } from '@/components/notifications/NotificationProvider'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewRestaurante() {
  const router = useRouter()
  const { success, error: showError } = useNotifications()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    especialidade: '',
    endereco: '',
    telefone: '',
    cardapio: '',
    ativo: true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('nome', formData.nome)
      formDataToSend.append('especialidade', formData.especialidade)
      formDataToSend.append('endereco', formData.endereco)
      formDataToSend.append('telefone', formData.telefone)
      formDataToSend.append('cardapio', formData.cardapio)
      formDataToSend.append('ativo', formData.ativo ? 'true' : 'false')

      await createRestaurante(formDataToSend)
      success('Restaurante criado!', 'O restaurante foi adicionado com sucesso.')
    } catch (error) {
      console.error('Error creating restaurante:', error)
      showError('Erro ao criar restaurante', error instanceof Error ? error.message : 'Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          href="/admin/restaurantes"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar para restaurantes
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-lg font-medium text-gray-900 mb-6">Novo Restaurante</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome do Restaurante *
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                value={formData.nome}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Ex: Restaurante do Porto"
              />
            </div>

            <div>
              <label htmlFor="especialidade" className="block text-sm font-medium text-gray-700">
                Especialidade *
              </label>
              <input
                type="text"
                id="especialidade"
                name="especialidade"
                required
                value={formData.especialidade}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Ex: Frutos do mar, Culinária italiana"
              />
            </div>

            <div>
              <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">
                Endereço *
              </label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                required
                value={formData.endereco}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Ex: Rua da Matriz, 123 - Centro Histórico"
              />
            </div>

            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                Telefone *
              </label>
              <input
                type="text"
                id="telefone"
                name="telefone"
                required
                value={formData.telefone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="(24) 99999-9999"
              />
            </div>

            <div>
              <label htmlFor="cardapio" className="block text-sm font-medium text-gray-700">
                Cardápio Destacado
              </label>
              <textarea
                id="cardapio"
                name="cardapio"
                rows={4}
                value={formData.cardapio}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Descreva alguns pratos especiais..."
              />
            </div>

            <div className="flex items-center">
              <input
                id="ativo"
                name="ativo"
                type="checkbox"
                checked={formData.ativo}
                onChange={handleChange}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="ativo" className="ml-2 block text-sm text-gray-900">
                Ativo (aparece no site público)
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <Link
                href="/admin/restaurantes"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="bg-teal-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}