'use client';

import { motion } from 'framer-motion';
import { Users, Star, Award, Mail } from 'lucide-react';
import SectionWrapper from '@/components/layout/SectionWrapper';

export default function ExpositoresSection() {
  return (
    <SectionWrapper id="expositores" title="Área dos Expositores" subtitle="Espaço dedicado para empresas do setor náutico" className="bg-gradient-to-br from-teal-50 to-amber-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-amber-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Users className="text-white" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-teal-800 mb-4">Espaço Exclusivo para Expositores</h3>
          <p className="text-gray-600 mb-8 text-lg">
            Área privilegiada no centro do evento para empresas do setor náutico, esportivo e sustentável apresentarem seus produtos e serviços.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-4">
              <div className="bg-teal-100 p-3 rounded-lg w-fit mx-auto mb-3">
                <Star className="text-teal-600" size={24} />
              </div>
              <h4 className="font-semibold text-teal-800 mb-2">Localização Premium</h4>
              <p className="text-gray-600 text-sm">Stands em área de alta circulação</p>
            </div>
            <div className="p-4">
              <div className="bg-amber-100 p-3 rounded-lg w-fit mx-auto mb-3">
                <Users className="text-amber-600" size={24} />
              </div>
              <h4 className="font-semibold text-teal-800 mb-2">Público Qualificado</h4>
              <p className="text-gray-600 text-sm">Acesso direto aos velejadores</p>
            </div>
            <div className="p-4">
              <div className="bg-teal-100 p-3 rounded-lg w-fit mx-auto mb-3">
                <Award className="text-teal-600" size={24} />
              </div>
              <h4 className="font-semibold text-teal-800 mb-2">Networking</h4>
              <p className="text-gray-600 text-sm">Conexões com o setor náutico</p>
            </div>
          </div>

          <a
            href="mailto:expositores@paratysailfestival.com.br"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Mail size={20} />
            <span>Solicitar Espaço</span>
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
