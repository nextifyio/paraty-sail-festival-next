'use client';

import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import { usePatrocinadores } from '@/hooks/useFestivalData';
import SectionWrapper from '@/components/layout/SectionWrapper';

export default function PatrocinadoresSection() {
  const { patrocinadores, loading, error } = usePatrocinadores();

  if (loading) {
    return (
      <SectionWrapper 
        id="patrocinadores"
        title="Patrocinadores"
        subtitle="Empresas que apoiam a náutica brasileira"
        className="bg-white"
      >
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Carregando patrocinadores...</p>
        </div>
      </SectionWrapper>
    );
  }

  if (error) {
    return (
      <SectionWrapper 
        id="patrocinadores"
        title="Patrocinadores"
        subtitle="Empresas que apoiam a náutica brasileira"
        className="bg-white"
      >
        <div className="text-center py-12 text-red-600">
          <p>Erro ao carregar patrocinadores: {error}</p>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper 
      id="patrocinadores"
      title="Patrocinadores"
      subtitle="Empresas que apoiam a náutica brasileira"
      className="bg-white"
    >

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {patrocinadores.map((patrocinador, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <a
              href={patrocinador.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-8 rounded-2xl text-center transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${
                patrocinador.nivel === 'master' ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                patrocinador.nivel === 'ouro' ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                patrocinador.nivel === 'prata' ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                'bg-gradient-to-br from-gray-300 to-gray-400 text-white'
              }`}
            >
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="text-white" size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2">{patrocinador.nome}</h3>
              <p className="text-sm opacity-90 capitalize">{patrocinador.nivel}</p>
              <ExternalLink className="mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
            </a>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <p className="text-gray-600 mb-6">Sua empresa pode estar aqui!</p>
        <button
          onClick={() => document.getElementById('patrocinio')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-gradient-to-r from-teal-500 to-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Seja um Patrocinador
        </button>
      </motion.div>
    </SectionWrapper>
  );
}
