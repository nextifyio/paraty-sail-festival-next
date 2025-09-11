import { createSupabaseAdmin } from '@/lib/supabase';
import { EditPersonForm } from './EditPersonForm';
import { notFound } from 'next/navigation';

interface EditPersonPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPersonPage({ params }: EditPersonPageProps) {
  const { id } = await params;
  const supabase = createSupabaseAdmin();

  const { data: pessoa, error } = await supabase
    .from('pessoas_festival')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !pessoa) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <EditPersonForm pessoa={pessoa} />
    </div>
  );
}