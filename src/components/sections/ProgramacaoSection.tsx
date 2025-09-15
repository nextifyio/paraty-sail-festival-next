'use client';

import { motion } from 'framer-motion';
import { useProgramacao } from '@/hooks/useFestivalData';
import SectionWrapper from '@/components/layout/SectionWrapper';

// Função para obter o dia da semana em português a partir de uma data
const obterDiaDaSemana = (data: string): string => {
  if (!data) return '';
  
  try {
    let dateObj: Date;
    
    // Se estiver no formato ISO (aaaa-mm-dd)
    if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
      const [ano, mes, dia] = data.split('-');
      dateObj = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
    }
    // Se estiver no formato dd/mm/aaaa
    else if (/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
      const [dia, mes, ano] = data.split('/');
      dateObj = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
    }
    // Para outros formatos
    else {
      dateObj = new Date(data + 'T12:00:00');
    }
    
    if (isNaN(dateObj.getTime())) {
      return 'Data inválida';
    }
    
    const diasDaSemana = [
      'Domingo',
      'Segunda-feira', 
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado'
    ];
    
    return diasDaSemana[dateObj.getDay()];
  } catch (error) {
    return 'Data inválida';
  }
};

// Função para formatar data para dd/mm/aaaa
const formatarData = (data: string): string => {
  if (!data) return '';
  
  // Se a data já estiver no formato dd/mm/aaaa, retorna como está
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
    return data;
  }
  
  // Se estiver no formato ISO (aaaa-mm-dd)
  if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }
  
  // Para outros formatos, tenta usar Date mas com UTC para evitar problemas de timezone
  try {
    const dateObj = new Date(data + 'T12:00:00Z'); // Adiciona horário meio-dia UTC
    if (isNaN(dateObj.getTime())) {
      return data; // Retorna a data original se não conseguir parsear
    }
    
    const dia = dateObj.getUTCDate().toString().padStart(2, '0');
    const mes = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
    const ano = dateObj.getUTCFullYear();
    
    return `${dia}/${mes}/${ano}`;
  } catch (error) {
    return data; // Retorna a data original em caso de erro
  }
};

export default function ProgramacaoSection() {
  const { programacao, loading, error } = useProgramacao();

  if (loading) {
    return (
      <SectionWrapper 
        id="programacao" 
        title="Programação"
        subtitle="Quatro dias de pura emoção e aprendizado"
        className="bg-gradient-to-br from-teal-50 to-amber-50"
      >
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Carregando programação...</p>
        </div>
      </SectionWrapper>
    );
  }

  if (error) {
    return (
      <SectionWrapper 
        id="programacao" 
        title="Programação"
        subtitle="Quatro dias de pura emoção e aprendizado"
        className="bg-gradient-to-br from-teal-50 to-amber-50"
      >
        <div className="text-center py-12 text-red-600">
          <p>Erro ao carregar programação: {error}</p>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper 
      id="programacao" 
      title="Programação"
      subtitle="Quatro dias de pura emoção e aprendizado"
      className="bg-gradient-to-br from-teal-50 to-amber-50"
    >
      <div className="space-y-8">
        {programacao.map((dia, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-teal-600 to-amber-600 text-white p-6">
              <h3 className="text-2xl font-bold">{obterDiaDaSemana(dia.data)}</h3>
              <p className="text-teal-100">{formatarData(dia.data)}</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dia.eventos.map((evento, eventIndex) => (
                  <div key={eventIndex} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-amber-100 text-amber-600 px-3 py-1 rounded-lg text-sm font-semibold min-w-fit">
                      {evento.horario}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{evento.evento}</p>
                      {evento.pessoa && (
                        <p className="text-sm text-gray-600 mt-1">com {evento.pessoa}</p>
                      )}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      evento.tipo === 'regata' ? 'bg-blue-100 text-blue-600' :
                      evento.tipo === 'palestra' ? 'bg-green-100 text-green-600' :
                      evento.tipo === 'show' ? 'bg-purple-100 text-purple-600' :
                      evento.tipo === 'cultura' ? 'bg-orange-100 text-orange-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {evento.tipo}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
