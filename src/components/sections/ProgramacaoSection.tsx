'use client';

import { motion } from 'framer-motion';
import { programacao } from '@/constants/data';
import SectionWrapper from '@/components/layout/SectionWrapper';

export default function ProgramacaoSection() {
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
              <h3 className="text-2xl font-bold">{dia.dia}</h3>
              <p className="text-teal-100">{dia.data}</p>
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
