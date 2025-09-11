'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewFAQ() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    pergunta: '',
    resposta: '',
    ordem: 1,
    ativo: true
  })

  useEffect(() => {
    // Get the next order number
    const fetchNextOrder = async () => {
      const { data, error } = await supabase
        .from('faqs')
        .select('ordem')
        .order('ordem', { ascending: false })
        .limit(1)

      if (!error && data && data.length > 0) {
        const newOrder = data[0].ordem + 1
        setFormData(prev => ({ ...prev, ordem: newOrder }))
      }
    }

    fetchNextOrder()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('faqs')
        .insert([formData])
        .select()

      if (error) throw error

      router.push('/admin/faqs')
      router.refresh()
    } catch (error) {
      console.error('Error creating faq:', error)
      alert('Erro ao criar FAQ')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
               type === 'number' ? parseInt(value) || 0 : value
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          href="/admin/faqs"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar para FAQs
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-lg font-medium text-gray-900 mb-6">Nova FAQ</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="pergunta" className="block text-sm font-medium text-gray-700">
                Pergunta *
              </label>
              <input
                type="text"
                id="pergunta"
                name="pergunta"
                required
                value={formData.pergunta}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Ex: Quando é o festival?"
              />
            </div>

            <div>
              <label htmlFor="resposta" className="block text-sm font-medium text-gray-700">
                Resposta *
              </label>
              <textarea
                id="resposta"
                name="resposta"
                required
                rows={6}
                value={formData.resposta}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Digite a resposta completa para essa pergunta..."
              />
            </div>

            <div>
              <label htmlFor="ordem" className="block text-sm font-medium text-gray-700">
                Ordem de Exibição
              </label>
              <input
                type="number"
                id="ordem"
                name="ordem"
                min="1"
                value={formData.ordem}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
              <p className="mt-1 text-xs text-gray-500">Menor número aparece primeiro</p>
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
                FAQ ativa (visível no site)
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <Link
                href="/admin/faqs"
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