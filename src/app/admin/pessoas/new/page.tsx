'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPessoa } from '../actions'
import { useNotifications } from '@/components/notifications/NotificationProvider'
import ImageUpload from '@/components/admin/ImageUpload'
import Link from 'next/link'

export default function NewPessoaPage() {
  const router = useRouter()
  const { success, error: showError } = useNotifications()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    
    try {
      // Adicionar URL da imagem ao FormData se existir
      if (imageUrl) {
        formData.set('imagem', imageUrl)
      }
      
      const result = await createPessoa(formData)
      
      if (result.success) {
        success('Participante criado!', result.message)
        // Aguardar um pouco para mostrar a notificação antes de redirecionar
        setTimeout(() => {
          router.push('/admin/pessoas')
        }, 1500)
      } else {
        showError('Erro ao criar participante', result.error || 'Tente novamente mais tarde.')
      }
    } catch (error) {
      console.error('Error creating pessoa:', error)
      showError('Erro ao criar participante', 'Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          href="/admin/pessoas"
          className="text-teal-600 hover:text-teal-700 mr-4"
        >
          ← Voltar
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Novo Participante
        </h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form action={handleSubmit} className="space-y-6">
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Ex: João Silva"
              />
            </div>

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
                <option value="palestrante">Palestrante</option>
                <option value="atracao">Atração Musical</option>
              </select>
            </div>
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="Ex: Navegação Oceânica, Rock Brasileiro, etc."
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Biografia *
            </label>
            <textarea
              name="bio"
              id="bio"
              rows={4}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="Conte um pouco sobre esta pessoa..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                Instagram *
              </label>
              <input
                type="url"
                name="instagram"
                id="instagram"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="https://www.instagram.com/usuario/"
              />
            </div>

            <div>
              <label htmlFor="imagem" className="block text-sm font-medium text-gray-700 mb-2">
                Foto do Participante
              </label>
              <ImageUpload
                bucket="pessoas"
                currentImageUrl={imageUrl || undefined}
                onImageChange={setImageUrl}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="ativo"
                id="ativo"
                defaultChecked
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="ativo" className="ml-2 block text-sm text-gray-900">
                Ativo (aparece no site público)
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/pessoas"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar Participante'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}