'use client';

import { motion } from 'framer-motion';
import { Anchor, Award, Users, ExternalLink, Trophy, DollarSign } from 'lucide-react';
import SectionWrapper from '@/components/layout/SectionWrapper';

export default function InscricoesSection() {
  return (
    <SectionWrapper 
      id="inscricoes"
      title="Inscrições para a Regata"
      subtitle="Participe da regata mais esperada do ano"
      className="bg-gradient-to-br from-teal-600 to-amber-600 text-white"
      titleClassName="text-white"
      subtitleClassName="text-teal-100"
    >

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Formulário de Inscrição</h3>
          <p className="text-lg mb-8 text-teal-100">
            Preencha o formulário com os dados da sua embarcação, categoria e informações do responsável.
          </p>
          <a
            href="https://forms.google.com/paraty-sail-festival-2025"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-white text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>Inscrever-se Agora</span>
            <ExternalLink size={20} />
          </a>
          <p className="text-sm text-teal-200 mt-4">
            * Formulário Google Forms - Rápido e Seguro
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <DollarSign className="mx-auto mb-4 text-amber-300" size={32} />
            <h4 className="text-lg font-semibold mb-2">Valor Único</h4>
            <p className="text-teal-100 text-sm">Por tripulante</p>
            <p className="text-teal-100 text-sm">R$ 249,00 / kit com camiseta</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <Anchor className="mx-auto mb-4 text-amber-300" size={32} />
            <h4 className="text-lg font-semibold mb-2">Categorias</h4>
            <p className="text-teal-100 text-sm">Cruzeiro</p>
            <p className="text-teal-100 text-sm">Sofisticada RGS</p>
            <p className="text-teal-100 text-sm">Sofisticada RGS2</p>
            <p className="text-teal-100 text-sm">Clássico</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <Trophy className="mx-auto mb-4 text-amber-300" size={32} />
            <h4 className="text-lg font-semibold mb-2">Premiação</h4>
            <p className="text-teal-100 text-sm">Para 1o, 2o e 3o lugar</p>
            <p className="text-teal-100 text-sm">Recepção para os participantes (no palco canoa de cerveja e refri free, para quem participou), obrigatório uso da pulseira e camiseta.</p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
