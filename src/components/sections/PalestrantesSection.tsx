'use client';

import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import Image from 'next/image';
import { palestrantes } from '@/constants/data';
import SectionWrapper from '@/components/layout/SectionWrapper';

// Função para extrair username do Instagram da URL
const getInstagramUsername = (url: string) => {
  if (!url || !url.includes('instagram.com')) return null;
  const match = url.match(/instagram\.com\/([^\/\?]+)/);
  return match ? match[1] : null;
};

// Função para obter a imagem do palestrante
const getLocalProfileImage = (palestrante: any) => {
  return palestrante.imagem || null;
};

export default function PalestrantesSection() {
  return (
    <SectionWrapper 
      id="palestrantes"
      title="Palestrantes"
      subtitle="Especialistas renomados compartilhando conhecimento"
      className="bg-white"
    >

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {palestrantes.map((palestrante, index) => (
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
                const username = getInstagramUsername(palestrante.instagram);
                const localImage = getLocalProfileImage(palestrante);
                const hasValidInstagram = palestrante.instagram && palestrante.instagram !== 'https://www.instagram.com/';
                
                const imageContent = localImage ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={localImage}
                      alt={`${palestrante.nome} profile`}
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
                            href={palestrante.instagram} 
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
              <h3 className="text-xl font-bold text-teal-800 mb-2">{palestrante.nome}</h3>
              <p className="text-amber-600 font-medium mb-2">{palestrante.especialidade}</p>
              {(() => {
                if (palestrante.bio) {
                  return <p className="text-gray-600 text-sm mb-4">{palestrante.bio}</p>;
                }
                const username = getInstagramUsername(palestrante.instagram);
                if (username) {
                  return (
                    <p className="text-gray-600 text-sm mb-4">
                      <a 
                        href={palestrante.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-800 transition-colors"
                      >
                        @{username}
                      </a>
                    </p>
                  );
                }
                return <p className="text-gray-600 text-sm mb-4">&nbsp;</p>;
              })()}
            </div>
            <div className="flex justify-between items-center text-sm mt-auto">
              <span className="bg-teal-100 text-teal-600 px-3 py-1 rounded-full">{palestrante.dia}</span>
              <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full">{palestrante.horario}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
