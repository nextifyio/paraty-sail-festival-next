'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateFAQ } from '@/app/admin/faqs/actions';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import Link from 'next/link';

const editFAQSchema = z.object({
  pergunta: z.string().min(1, 'Pergunta é obrigatória'),
  resposta: z.string().min(1, 'Resposta é obrigatória'),
  ordem: z.number().min(0, 'Ordem deve ser um número positivo'),
  ativo: z.boolean()
});

type EditFAQFormData = z.infer<typeof editFAQSchema>;

interface EditFAQFormProps {
  faq: {
    id: string;
    pergunta: string;
    resposta: string;
    ordem: number;
    ativo: boolean;
  };
}

export function EditFAQForm({ faq }: EditFAQFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { success, error: showError } = useNotifications();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFAQFormData>({
    resolver: zodResolver(editFAQSchema),
    defaultValues: {
      pergunta: faq.pergunta,
      resposta: faq.resposta,
      ordem: faq.ordem,
      ativo: faq.ativo,
    },
  });

  const onSubmit = async (data: EditFAQFormData) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('pergunta', data.pergunta);
      formData.append('resposta', data.resposta);
      formData.append('ordem', data.ordem.toString());
      formData.append('ativo', data.ativo.toString());

      const result = await updateFAQ(faq.id, formData);
      
      if (result && !result.success) {
        showError('Erro ao atualizar FAQ', result.error || 'Tente novamente mais tarde.');
        return;
      }
      
      success('FAQ atualizada!', 'As informações foram salvas com sucesso.');
      router.push('/admin/faqs');
      router.refresh();
    } catch (error) {
      console.error('Erro ao atualizar FAQ:', error);
      showError('Erro ao atualizar FAQ', error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/faqs');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="pergunta" className="block text-sm font-medium text-gray-700 mb-2">
          Pergunta *
        </label>
        <input
          {...register('pergunta')}
          type="text"
          id="pergunta"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          placeholder="Ex: Como faço para me inscrever no festival?"
        />
        {errors.pergunta && (
          <p className="mt-1 text-sm text-red-600">{errors.pergunta.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="resposta" className="block text-sm font-medium text-gray-700 mb-2">
          Resposta *
        </label>
        <textarea
          {...register('resposta')}
          id="resposta"
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          placeholder="Digite a resposta completa para esta pergunta..."
        />
        {errors.resposta && (
          <p className="mt-1 text-sm text-red-600">{errors.resposta.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="ordem" className="block text-sm font-medium text-gray-700 mb-2">
            Ordem de Exibição *
          </label>
          <input
            {...register('ordem', { valueAsNumber: true })}
            type="number"
            id="ordem"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="0"
          />
          {errors.ordem && (
            <p className="mt-1 text-sm text-red-600">{errors.ordem.message}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Ordem numérica de exibição (0 = primeiro)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <div className="flex items-center mt-3">
            <input
              {...register('ativo')}
              type="checkbox"
              id="ativo"
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label htmlFor="ativo" className="ml-2 block text-sm text-gray-900">
              Ativo (aparece no site público)
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>
    </form>
  );
}