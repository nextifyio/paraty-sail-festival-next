'use client';

import { motion } from 'framer-motion';
import { MapPin, Car, Users, Clock, DollarSign } from 'lucide-react';
import SectionWrapper from '@/components/layout/SectionWrapper';

export default function ComoChegarSection() {
  return (
    <SectionWrapper id="como-chegar" title="Como Chegar" subtitle="Informações de acesso e estacionamento" className="bg-gradient-to-br from-teal-50 to-amber-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-teal-100 p-3 rounded-lg">
              <MapPin className="text-teal-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-teal-800">Endereço do Evento</h3>
          </div>
          
          <div className="bg-gradient-to-r from-teal-50 to-amber-50 rounded-lg p-6 mb-6">
            <p className="text-lg font-semibold text-teal-800 mb-2">Estacionamento do Pontal de Paraty - Ao lado da ponte</p>
            <p className="text-gray-600 mb-2">Av. Nossa Senhora dos Remedios, Praia do Pontal - Paraty, RJ</p>
            <p className="text-gray-600">CEP: 23970-000</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-teal-800 mb-3 flex items-center space-x-2">
                <Car className="text-amber-600" size={20} />
                <span>De Carro</span>
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Do Rio de Janeiro: 4h via BR-101</li>
                <li>• De São Paulo: 5h via BR-116 e BR-101</li>
                <li>• Siga placas para Centro Histórico</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-teal-800 mb-3 flex items-center space-x-2">
                <Users className="text-amber-600" size={20} />
                <span>Transporte Público</span>
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Ônibus da Costa Verde</li>
                <li>• Transfer do aeroporto do Rio</li>
                <li>• Táxi e Uber disponíveis</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-amber-100 p-3 rounded-lg">
              <Car className="text-amber-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-teal-800">Estacionamento</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="bg-teal-100 p-3 rounded-lg w-fit mx-auto mb-3">
                <MapPin className="text-teal-600" size={24} />
              </div>
              <h4 className="font-semibold text-teal-800 mb-2">Centro Histórico</h4>
              <p className="text-gray-600 text-sm">Estacionamentos públicos próximos ao evento.</p>
              <p className="text-gray-600 text-sm">Estacionamento reservado ao lado do trapiche.</p>
            </div>
            <div className="text-center p-4">
              <div className="bg-amber-100 p-3 rounded-lg w-fit mx-auto mb-3">
                <Clock className="text-amber-600" size={24} />
              </div>
              <h4 className="font-semibold text-teal-800 mb-2">Chegue Cedo</h4>
              <p className="text-gray-600 text-sm">Vagas limitadas durante o evento</p>
            </div>
            <div className="text-center p-4">
              <div className="bg-teal-100 p-3 rounded-lg w-fit mx-auto mb-3">
                <DollarSign className="text-teal-600" size={24} />
              </div>
              <h4 className="font-semibold text-teal-800 mb-2">Valores</h4>
              <p className="text-gray-600 text-sm">R$ 10-20 por dia nos estacionamentos</p>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
