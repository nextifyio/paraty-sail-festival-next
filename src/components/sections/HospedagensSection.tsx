'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';
import { hospedagens } from '@/constants/data';
import SectionWrapper from '@/components/layout/SectionWrapper';

export default function HospedagensSection() {
  return (
    <SectionWrapper id="hospedagem" title="Hospedagem" subtitle="Pousadas parceiras com descontos especiais">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospedagens.map((hospedagem, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-amber-100"
          >
            <h3 className="text-xl font-semibold mb-2">{hospedagem.nome}</h3>
            <p className="text-gray-600 mb-4">{hospedagem.descricao}</p>
            <div className="flex items-center text-gray-500 mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{hospedagem.localizacao}</span>
            </div>
            <div className="flex items-center text-gray-500 mb-4">
              <Phone className="w-4 h-4 mr-2" />
              <span>{hospedagem.contato}</span>
            </div>
            <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
              {hospedagem.desconto}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
