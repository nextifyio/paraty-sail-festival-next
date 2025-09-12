'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createHospedagem } from '../actions'
import { useNotifications } from '@/components/notifications/NotificationProvider'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewHospedagem() {
  const router = useRouter()
  const { success, error: showError } = useNotifications()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    desconto: '',
    contato: '',
    localizacao: '',
    ativo: true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append('nome', formData.nome)
      formDataObj.append('descricao', formData.descricao)
      formDataObj.append('desconto', formData.desconto)
      formDataObj.append('contato', formData.contato)
      formDataObj.append('localizacao', formData.localizacao)
      formDataObj.append('ativo', formData.ativo.toString())

      const result = await createHospedagem(formDataObj)

      if (result.success) {
        success('Hospedagem criada!', result.message)
        setTimeout(() => {
          router.push('/admin/hospedagens')
        }, 1500)
      } else {
        showError('Erro ao criar hospedagem', result.error || 'Tente novamente mais tarde.')
      }
    } catch (error) {
      console.error('Error creating hospedagem:', error)
      showError('Erro ao criar hospedagem', 'Tente novamente mais tarde.')
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
          href="/admin/hospedagens"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar para hospedagens
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-lg font-medium text-gray-900 mb-6">Nova Hospedagem</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome da Hospedagem *
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                value={formData.nome}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Ex: Pousada do Mar"
              />
            </div>

            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                Descrição *
              </label>
              <textarea
                id="descricao"
                name="descricao"
                required
                rows={4}
                value={formData.descricao}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Descreva a hospedagem..."
              />
            </div>

            <div>
              <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700">
                Localização *
              </label>
              <input
                type="text"
                id="localizacao"
                name="localizacao"
                required
                value={formData.localizacao}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Ex: Centro Histórico, Praia do Jabaquara"
              />
            </div>

            <div>
              <label htmlFor="contato" className="block text-sm font-medium text-gray-700">
                Contato *
              </label>
              <input
                type="text"
                id="contato"
                name="contato"
                required
                value={formData.contato}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="(24) 99999-9999 ou contato@pousada.com"
              />
            </div>

            <div>
              <label htmlFor="desconto" className="block text-sm font-medium text-gray-700">
                Desconto Especial
              </label>
              <input
                type="text"
                id="desconto"
                name="desconto"
                value={formData.desconto}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Ex: 10% de desconto para participantes"
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
                href="/admin/hospedagens"
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