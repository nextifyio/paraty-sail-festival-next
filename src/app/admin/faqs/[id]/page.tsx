import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { EditFAQForm } from '@/app/admin/faqs/[id]/EditFAQForm';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getFAQ(id: string) {
  const supabase = await createClient();
  
  const { data: faq, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !faq) {
    console.error('Erro ao buscar FAQ:', error);
    return null;
  }

  return faq;
}

export default async function EditFAQPage({ params }: PageProps) {
  const { id } = await params;
  
  const faq = await getFAQ(id);

  if (!faq) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editar FAQ</h1>
          <p className="text-gray-600">Atualize as informações da FAQ</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <EditFAQForm faq={faq} />
      </div>
    </div>
  );
}