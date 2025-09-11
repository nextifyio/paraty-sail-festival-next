'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useNotifications } from '@/components/notifications/NotificationProvider'
import ImageUpload from '@/components/admin/ImageUpload'
import Link from 'next/link'

export default function NewPessoaPage() {
  const router = useRouter()
  const { success, error: showError } = useNotifications()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nome: '',
    tipo: 'palestrante' as 'palestrante' | 'atracao',
    especialidade: '',
    bio: '',
    instagram: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('pessoas_festival')
        .insert([{
          ...formData,
          imagem: imageUrl,
          ativo: true
        }])
        .select()

      if (error) throw error

      success('Pessoa criada!', 'A pessoa foi adicionada com sucesso.')
      router.push('/admin/pessoas')
      router.refresh()
    } catch (error) {
      console.error('Error creating pessoa:', error)
      showError('Erro ao criar pessoa', 'Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
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
          Nova Pessoa
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
                value={formData.tipo}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              >
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
              value={formData.especialidade}
              onChange={handleChange}
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
              value={formData.bio}
              onChange={handleChange}
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
                value={formData.instagram}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="https://www.instagram.com/usuario/"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto da Pessoa
              </label>
              <ImageUpload
                bucket="pessoas"
                currentImageUrl={imageUrl || undefined}
                onImageChange={setImageUrl}
              />
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
              {loading ? 'Salvando...' : 'Salvar Pessoa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}