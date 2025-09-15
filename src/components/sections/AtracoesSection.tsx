'use client';

import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import Image from 'next/image';
import { useAtracoes } from '@/hooks/useFestivalData';
import SectionWrapper from '@/components/layout/SectionWrapper';

// Função para extrair username do Instagram da URL
const getInstagramUsername = (url: string) => {
  if (!url || !url.includes('instagram.com')) return null;
  const match = url.match(/instagram\.com\/([^\/\?]+)/);
  return match ? match[1] : null;
};

// Função para obter a imagem da atração
const getLocalProfileImage = (atracao: { imagem?: string }) => {
  return atracao.imagem || null;
};

export default function AtracoesSection() {
  const { atracoes, loading, error } = useAtracoes();

  if (loading) {
    return (
      <SectionWrapper 
        id="atracoes"
        title="Atrações"
        subtitle="O melhor da cultura local em um só lugar."
        className="bg-gradient-to-br from-teal-50 to-amber-50"
      >
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Carregando atrações...</p>
        </div>
      </SectionWrapper>
    );
  }

  if (error) {
    return (
      <SectionWrapper 
        id="atracoes"
        title="Atrações"
        subtitle="O melhor da cultura local em um só lugar."
        className="bg-gradient-to-br from-teal-50 to-amber-50"
      >
        <div className="text-center py-12 text-red-600">
          <p>Erro ao carregar atrações: {error}</p>
        </div>
      </SectionWrapper>
    );
  }

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
            className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-amber-100 flex flex-col justify-between min-h-[350px]"
          >
            <div className="text-center mb-4 flex-grow">
              {(() => {
                const localImage = getLocalProfileImage(atracao);
                const hasValidInstagram = atracao.instagram && atracao.instagram !== 'https://www.instagram.com/' && atracao.instagram !== '';
                
                const imageContent = localImage ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={localImage}
                      alt={`${atracao.nome} profile`}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <Mic className="text-white" size={32} />
                );

                if (hasValidInstagram) {
                  return (
                    <div className="relative mx-auto mb-4 w-28 h-28">
                      {/* Borda externa da escotilha */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-600 via-amber-500 to-amber-400 p-1.5 shadow-lg">
                        {/* Borda interna metálica */}
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 p-1 shadow-inner">
                          {/* Container da imagem */}
                          <a 
                            href={atracao.instagram} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block w-full h-full bg-gradient-to-br from-teal-500 to-amber-500 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer shadow-md"
                          >
                            {imageContent}
                          </a>
                        </div>
                      </div>
                      {/* Parafusos decorativos da escotilha */}
                      <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-400 rounded-full shadow-sm"></div>
                      <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-400 rounded-full shadow-sm"></div>
                      <div className="absolute left-1.5 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full shadow-sm"></div>
                      <div className="absolute right-1.5 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full shadow-sm"></div>
                    </div>
                  );
                }
                
                return (
                  <div className="relative mx-auto mb-4 w-28 h-28">
                    {/* Borda externa da escotilha */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-600 via-amber-500 to-amber-400 p-1.5 shadow-lg">
                      {/* Borda interna metálica */}
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 p-1 shadow-inner">
                        {/* Container da imagem */}
                        <div className="w-full h-full bg-gradient-to-br from-teal-500 to-amber-500 rounded-full flex items-center justify-center overflow-hidden shadow-md">
                          {imageContent}
                        </div>
                      </div>
                    </div>
                    {/* Parafusos decorativos da escotilha */}
                    <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-400 rounded-full shadow-sm"></div>
                    <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-400 rounded-full shadow-sm"></div>
                    <div className="absolute left-1.5 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full shadow-sm"></div>
                    <div className="absolute right-1.5 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full shadow-sm"></div>
                  </div>
                );
              })()}
              <h3 className="text-xl font-bold text-teal-800 mb-2">{atracao.nome}</h3>
              <p className="text-amber-600 font-medium mb-2">{atracao.especialidade}</p>
              {(() => {
                const username = getInstagramUsername(atracao.instagram);
                if (username) {
                  return (
                    <p className="text-gray-600 text-sm mb-4">
                      <a 
                        href={atracao.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-800 transition-colors"
                      >
                        @{username}
                      </a>
                    </p>
                  );
                }
                return atracao.bio ? (
                  <p className="text-gray-600 text-sm mb-4">{atracao.bio}</p>
                ) : (
                  <p className="text-gray-600 text-sm mb-4">&nbsp;</p>
                );
              })()}
            </div>
            <div className="flex justify-between items-center text-sm mt-auto">
              {atracao.diasHorarios && atracao.diasHorarios.length > 0 ? (
                <div className="flex flex-col md:flex-row gap-2">
                  {atracao.diasHorarios.map((dh, i) => (
                    <span key={i} className="bg-teal-100 text-teal-600 px-3 py-1 rounded-full">
                      {dh.dia} <span className="bg-amber-100 text-amber-600 px-2 py-1 rounded-full ml-2">{dh.horario}</span>
                    </span>
                  ))}
                </div>
              ) : (
                <span className="bg-gray-100 text-gray-400 px-3 py-1 rounded-full">Sem programação</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
