'use client';

import { motion } from 'framer-motion';
import { Anchor, Users, Waves, Star, PersonStanding } from 'lucide-react';
import Image from 'next/image';
import SectionWrapper from '@/components/layout/SectionWrapper';

export default function SobreSection() {
  return (
    <SectionWrapper 
      id="sobre"
      title="O Festival de Vela Mais Sofisticado do Brasil"
      subtitle="Inspirado no histórico Caminho do Ouro de Paraty, nosso festival une tradição, cultura caiçara e a paixão pela vela em um evento único e inesquecível."
      className="bg-white"
    >

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image 
              src="/images/FotoSobre.jpg" 
              alt="Paraty Sail Festival" 
              width={600}
              height={400}
              className="rounded-2xl shadow-2xl"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 p-3 rounded-lg">
                <Anchor className="text-amber-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-800 mb-2">Náutica de Vela</h3>
                <p className="text-gray-600">Regatas, workshops e estandes técnicos para todos os níveis de experiência.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 p-3 rounded-lg">
                <Users className="text-amber-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-800 mb-2">Cultura Caiçara</h3>
                <p className="text-gray-600">Gastronomia, música e artesanato local em celebração à tradição.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 p-3 rounded-lg">
                <Waves className="text-amber-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-800 mb-2">Sustentabilidade</h3>
                <p className="text-gray-600">Oficinas, palestras e ações ambientais para preservar nosso litoral.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 p-3 rounded-lg">
                <Star className="text-amber-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-800 mb-2">Turismo Náutico</h3>
                <p className="text-gray-600">Posicionando Paraty como destino náutico internacional.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 p-3 rounded-lg">
                <PersonStanding className="text-amber-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-teal-800 mb-2">Envolvimento</h3>
                <p className="text-gray-600">Toda a família pode participar, Regata kids, demonstrações náuticas.</p>
              </div>
            </div>
          </motion.div>
        </div>
    </SectionWrapper>
  );
}
