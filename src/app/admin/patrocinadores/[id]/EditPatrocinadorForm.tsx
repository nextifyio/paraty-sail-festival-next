'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useNotifications } from '@/components/notifications/NotificationProvider'
import ImageUpload from '@/components/admin/ImageUpload'
import Link from 'next/link'

interface PatrocinadorDB {
  id: string
  nome: string
  logo?: string
  link?: string
  nivel: 'master' | 'ouro' | 'prata' | 'bronze'
  ativo: boolean
  created_at: string
  updated_at: string
}

interface EditPatrocinadorFormProps {
  patrocinador: PatrocinadorDB
}

export default function EditPatrocinadorForm({ patrocinador }: EditPatrocinadorFormProps) {
  const router = useRouter()
  const { success, error: showError } = useNotifications()
  const [loading, setLoading] = useState(false)
  const [logoUrl, setLogoUrl] = useState<string | null>(patrocinador.logo || null)
  const [formData, setFormData] = useState({
    nome: patrocinador.nome,
    link: patrocinador.link || '',
    nivel: patrocinador.nivel
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('patrocinadores')
        .update({
          ...formData,
          logo: logoUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', patrocinador.id)

      if (error) throw error

      success('Patrocinador atualizado!', 'As informações foram salvas com sucesso.')
      router.push('/admin/patrocinadores')
    } catch (error) {
      console.error('Error updating patrocinador:', error)
      showError('Erro ao atualizar patrocinador', 'Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          href="/admin/patrocinadores"
          className="text-teal-600 hover:text-teal-700 mr-4"
        >
          ← Voltar
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Editar Patrocinador
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
                placeholder="Ex: Empresa Patrocinadora"
              />
            </div>

            <div>
              <label htmlFor="nivel" className="block text-sm font-medium text-gray-700">
                Nível *
              </label>
              <select
                name="nivel"
                id="nivel"
                required
                value={formData.nivel}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="master">Master</option>
                <option value="ouro">Ouro</option>
                <option value="prata">Prata</option>
                <option value="bronze">Bronze</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700">
              Link do Site
            </label>
            <input
              type="url"
              name="link"
              id="link"
              value={formData.link}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="https://www.empresa.com.br"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo do Patrocinador
            </label>
            <ImageUpload
              bucket="patrocinadores"
              currentImageUrl={logoUrl || undefined}
              onImageChange={setLogoUrl}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/patrocinadores"
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