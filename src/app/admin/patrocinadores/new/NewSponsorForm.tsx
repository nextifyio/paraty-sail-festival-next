'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createPatrocinador } from '../../actions';
import { useNotifications } from '@/components/notifications/NotificationProvider';

const newSponsorSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().optional(),
  tipo: z.enum(['platina', 'ouro', 'prata', 'bronze', 'apoiador']),
  logo_url: z.string().url('URL inválida').optional().or(z.literal('')),
  website_url: z.string().url('URL inválida').optional().or(z.literal('')),
  valor_patrocinio: z.string().optional(),
  contato_nome: z.string().optional(),
  contato_email: z.string().email('Email inválido').optional().or(z.literal('')),
  contato_telefone: z.string().optional(),
  observacoes: z.string().optional(),
  ativo: z.boolean(),
});

type NewSponsorFormData = z.infer<typeof newSponsorSchema>;

const tiposPatrocinador = [
  { value: 'platina', label: 'Platina', color: 'bg-gray-100 text-gray-800' },
  { value: 'ouro', label: 'Ouro', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'prata', label: 'Prata', color: 'bg-blue-100 text-blue-800' },
  { value: 'bronze', label: 'Bronze', color: 'bg-orange-100 text-orange-800' },
  { value: 'apoiador', label: 'Apoiador', color: 'bg-green-100 text-green-800' },
];

export function NewSponsorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { success, error: showError } = useNotifications();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewSponsorFormData>({
    resolver: zodResolver(newSponsorSchema),
    defaultValues: {
      tipo: 'apoiador',
      ativo: true,
    },
  });

  const onSubmit = async (data: NewSponsorFormData) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('nome', data.nome);
      formData.append('descricao', data.descricao || '');
      formData.append('tipo', data.tipo);
      formData.append('logo_url', data.logo_url || '');
      formData.append('website_url', data.website_url || '');
      formData.append('valor_patrocinio', data.valor_patrocinio || '');
      formData.append('contato_nome', data.contato_nome || '');
      formData.append('contato_email', data.contato_email || '');
      formData.append('contato_telefone', data.contato_telefone || '');
      formData.append('observacoes', data.observacoes || '');
      formData.append('ativo', data.ativo.toString());

      await createPatrocinador(formData);
      
      success('Patrocinador criado!', 'O patrocinador foi adicionado com sucesso.');
      router.push('/admin/patrocinadores');
      router.refresh();
    } catch (error) {
      console.error('Erro ao criar patrocinador:', error);
      showError('Erro ao criar patrocinador', 'Tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/patrocinadores');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Patrocinador *
          </label>
          <input
            {...register('nome')}
            type="text"
            id="nome"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nome do patrocinador"
          />
          {errors.nome && (
            <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Patrocínio *
          </label>
          <select
            {...register('tipo')}
            id="tipo"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {tiposPatrocinador.map((tipo) => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
          {errors.tipo && (
            <p className="mt-1 text-sm text-red-600">{errors.tipo.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <textarea
            {...register('descricao')}
            id="descricao"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Descrição do patrocinador"
          />
        </div>

        <div>
          <label htmlFor="logo_url" className="block text-sm font-medium text-gray-700 mb-2">
            URL do Logo
          </label>
          <input
            {...register('logo_url')}
            type="url"
            id="logo_url"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://exemplo.com/logo.png"
          />
          {errors.logo_url && (
            <p className="mt-1 text-sm text-red-600">{errors.logo_url.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            {...register('website_url')}
            type="url"
            id="website_url"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://exemplo.com"
          />
          {errors.website_url && (
            <p className="mt-1 text-sm text-red-600">{errors.website_url.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="valor_patrocinio" className="block text-sm font-medium text-gray-700 mb-2">
            Valor do Patrocínio (R$)
          </label>
          <input
            {...register('valor_patrocinio')}
            type="number"
            step="0.01"
            id="valor_patrocinio"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label htmlFor="contato_nome" className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Contato
          </label>
          <input
            {...register('contato_nome')}
            type="text"
            id="contato_nome"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nome da pessoa de contato"
          />
        </div>

        <div>
          <label htmlFor="contato_email" className="block text-sm font-medium text-gray-700 mb-2">
            Email do Contato
          </label>
          <input
            {...register('contato_email')}
            type="email"
            id="contato_email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="contato@exemplo.com"
          />
          {errors.contato_email && (
            <p className="mt-1 text-sm text-red-600">{errors.contato_email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="contato_telefone" className="block text-sm font-medium text-gray-700 mb-2">
            Telefone do Contato
          </label>
          <input
            {...register('contato_telefone')}
            type="tel"
            id="contato_telefone"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="(00) 00000-0000"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-2">
            Observações
          </label>
          <textarea
            {...register('observacoes')}
            id="observacoes"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Observações adicionais"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <div className="flex items-center">
            <input
              {...register('ativo')}
              type="checkbox"
              id="ativo"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="ativo" className="ml-2 block text-sm text-gray-900">
              Ativo (aparece no site público)
            </label>
          </div>
          {errors.ativo && (
            <p className="mt-1 text-sm text-red-600">{errors.ativo.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Criando...' : 'Criar Patrocinador'}
        </button>
      </div>
    </form>
  );
}