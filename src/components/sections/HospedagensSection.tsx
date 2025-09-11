'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Bed, Calendar } from 'lucide-react';
import { hospedagens } from '@/constants/data';
import SectionWrapper from '@/components/layout/SectionWrapper';

export default function HospedagensSection() {
  return (
    <SectionWrapper 
      id="hospedagem" 
      title="Hospedagem" 
      subtitle="Pousadas parceiras com descontos especiais"
      className="bg-white"
    >
      <div className="grid md:grid-cols-3 gap-8">
        {hospedagens.map((hospedagem, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-amber-100"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg">
                <Bed className="text-amber-600" size={20} />
              </div>
              <h3 className="text-xl font-bold text-teal-800">{hospedagem.nome}</h3>
            </div>
            
            <p className="text-gray-600 mb-4">{hospedagem.descricao}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="text-gray-400" size={16} />
                <span className="text-sm text-gray-600">{hospedagem.localizacao}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="text-gray-400" size={16} />
                <span className="text-sm text-gray-600">{hospedagem.contato}</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg text-center font-semibold">
              {hospedagem.desconto}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-12 bg-gradient-to-br from-teal-50 to-amber-50 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-teal-800 mb-4">Como Obter o Desconto</h3>
        <p className="text-gray-600 mb-6">
          Mencione &quot;Paraty Sail Festival 2025&quot; ao fazer sua reserva para garantir o desconto especial.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg">
            <Calendar className="text-teal-600" size={20} />
            <span className="text-sm">Reserve com antecedência</span>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg">
            <Phone className="text-teal-600" size={20} />
            <span className="text-sm">Ligue diretamente</span>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

