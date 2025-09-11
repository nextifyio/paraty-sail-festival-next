import { NewSponsorForm } from  './NewSponsorForm';

export default function NewSponsorPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Novo Patrocinador</h1>
          <p className="text-gray-600">Adicione um novo patrocinador ao festival</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <NewSponsorForm />
      </div>
    </div>
  );
}