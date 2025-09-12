'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateRestaurante } from '../actions'
import { useNotifications } from '@/components/notifications/NotificationProvider'
import Link from 'next/link'
import type { Restaurante } from '@/types'

interface EditRestauranteFormProps {
  restaurante: Restaurante
}

export default function EditRestauranteForm({ restaurante }: EditRestauranteFormProps) {
  const router = useRouter()
  const { success, error: showError } = useNotifications()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: restaurante.nome,
    especialidade: restaurante.especialidade,
    endereco: restaurante.endereco,
    telefone: restaurante.telefone,
    cardapio: restaurante.cardapio || '',
    ativo: restaurante.ativo ?? true
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

      const result = await updateRestaurante(restaurante.id, formDataToSend)
      
      if (result.success) {
        success('Restaurante atualizado!', 'As informações foram salvas com sucesso.')
        router.push('/admin/restaurantes')
      } else {
        showError('Erro ao atualizar restaurante', result.error || 'Tente novamente mais tarde.')
      }
    } catch (error) {
      console.error('Error updating restaurante:', error)
      showError('Erro ao atualizar restaurante', error instanceof Error ? error.message : 'Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          href="/admin/restaurantes"
          className="text-teal-600 hover:text-teal-700 mr-4"
        >
          ← Voltar
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Editar Restaurante
        </h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome *
              </label>
              <input
                type="text"
                name="nome"
                id="nome"
                required
                value={formData.nome}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Ex: Restaurante do Mar"
              />
            </div>

            <div>
              <label htmlFor="especialidade" className="block text-sm font-medium text-gray-700">
                Especialidade *
              </label>
              <input
                type="text"
                name="especialidade"
                id="especialidade"
                required
                value={formData.especialidade}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Ex: Frutos do Mar"
              />
            </div>
          </div>

          <div>
            <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">
              Endereço *
            </label>
            <input
              type="text"
              name="endereco"
              id="endereco"
              required
              value={formData.endereco}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="Ex: Rua das Flores, 123 - Centro Histórico"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                Telefone *
              </label>
              <input
                type="tel"
                name="telefone"
                id="telefone"
                required
                value={formData.telefone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Ex: (24) 3371-1234"
              />
            </div>

            <div>
              <label htmlFor="cardapio" className="block text-sm font-medium text-gray-700">
                Link do Cardápio
              </label>
              <input
                type="url"
                name="cardapio"
                id="cardapio"
                value={formData.cardapio}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="https://www.restaurante.com.br/cardapio"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="ativo"
              id="ativo"
              checked={formData.ativo}
              onChange={handleChange}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label htmlFor="ativo" className="ml-2 block text-sm text-gray-900">
              Ativo (aparece no site público)
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/restaurantes"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}