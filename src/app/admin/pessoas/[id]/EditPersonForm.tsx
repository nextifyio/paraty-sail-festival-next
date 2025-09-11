'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import ImageUpload from '@/components/admin/ImageUpload';
import Link from 'next/link';

const editPersonSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  tipo: z.enum(['palestrante', 'atracao']),
  especialidade: z.string().min(1, 'Especialidade é obrigatória'),
  bio: z.string().min(1, 'Biografia é obrigatória'),
  instagram: z.string().url('Instagram deve ser uma URL válida').min(1, 'Instagram é obrigatório'),
});

type EditPersonFormData = z.infer<typeof editPersonSchema>;

interface EditPersonFormProps {
  pessoa: {
    id: string;
    nome: string;
    tipo: 'palestrante' | 'atracao';
    especialidade: string;
    bio: string;
    instagram: string;
    imagem?: string;
  };
}

export function EditPersonForm({ pessoa }: EditPersonFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(pessoa.imagem || null);
  const router = useRouter();
  const { success, error: showError } = useNotifications();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPersonFormData>({
    resolver: zodResolver(editPersonSchema),
    defaultValues: {
      nome: pessoa.nome,
      tipo: pessoa.tipo,
      especialidade: pessoa.especialidade,
      bio: pessoa.bio,
      instagram: pessoa.instagram,
    },
  });

  const onSubmit = async (data: EditPersonFormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('pessoas_festival')
        .update({
          nome: data.nome,
          tipo: data.tipo,
          especialidade: data.especialidade,
          bio: data.bio,
          instagram: data.instagram,
          imagem: imageUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', pessoa.id);

      if (error) throw error;

      success('Pessoa atualizada!', 'As informações foram salvas com sucesso.');
      router.push('/admin/pessoas');
      router.refresh();
    } catch (error) {
      console.error('Erro ao atualizar pessoa:', error);
      showError('Erro ao atualizar pessoa', 'Tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          Editar Pessoa
        </h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome *
              </label>
              <input
                {...register('nome')}
                type="text"
                id="nome"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Ex: João Silva"
              />
              {errors.nome && (
                <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                Tipo *
              </label>
              <select
                {...register('tipo')}
                id="tipo"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="palestrante">Palestrante</option>
                <option value="atracao">Atração Musical</option>
              </select>
              {errors.tipo && (
                <p className="mt-1 text-sm text-red-600">{errors.tipo.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="especialidade" className="block text-sm font-medium text-gray-700">
              Especialidade *
            </label>
            <input
              {...register('especialidade')}
              type="text"
              id="especialidade"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="Ex: Navegação Oceânica, Rock Brasileiro, etc."
            />
            {errors.especialidade && (
              <p className="mt-1 text-sm text-red-600">{errors.especialidade.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Biografia *
            </label>
            <textarea
              {...register('bio')}
              id="bio"
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="Conte um pouco sobre esta pessoa..."
            />
            {errors.bio && (
              <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                Instagram *
              </label>
              <input
                {...register('instagram')}
                type="url"
                id="instagram"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="https://www.instagram.com/usuario/"
              />
              {errors.instagram && (
                <p className="mt-1 text-sm text-red-600">{errors.instagram.message}</p>
              )}
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
              disabled={isSubmitting}
              className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}