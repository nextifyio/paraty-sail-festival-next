'use client';

import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import { atracoes } from '@/constants/data';
import SectionWrapper from '@/components/layout/SectionWrapper';

export default function AtracoesSection() {
  return (
    <SectionWrapper 
      id="atracoes"
      title="Atrações"
      subtitle="O melhor da cultura local em um só lugar."
      className="bg-gradient-to-br from-teal-50 to-amber-50"
    >

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {atracoes.map((atracao, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-amber-100"
          >
            <div className="text-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Mic className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-teal-800 mb-2">{atracao.nome}</h3>
              <p className="text-amber-600 font-medium mb-2">{atracao.especialidade}</p>
              <p className="text-gray-600 text-sm mb-4">{atracao.bio}</p>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="bg-teal-100 text-teal-600 px-3 py-1 rounded-full">{atracao.dia}</span>
              <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full">{atracao.horario}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
