'use client';

import { motion } from 'framer-motion';
import { Users, Star, Award, Mail, Phone } from 'lucide-react';
import SectionWrapper from '@/components/layout/SectionWrapper';

export default function SejaPatrocinadorSection() {
  return (
    <SectionWrapper 
      id="patrocinio" 
      title="Seja um Patrocinador" 
      subtitle="Posicione sua marca no maior festival de vela do Brasil" 
      className="bg-gradient-to-br from-teal-600 to-amber-600 text-white"
      titleClassName="text-white"
      subtitleClassName="text-teal-100"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center mb-16"
        >
          <div>
            <h3 className="text-3xl font-bold mb-6">Por que Patrocinar?</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-white/20 p-2 rounded-lg mt-1">
                  <Users className="text-amber-300" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Público Qualificado</h4>
                  <p className="text-teal-100">Acesso direto a velejadores, proprietários de embarcações e amantes do mar</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-white/20 p-2 rounded-lg mt-1">
                  <Star className="text-amber-300" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Visibilidade Premium</h4>
                  <p className="text-teal-100">Exposição da marca em mídias, materiais oficiais e redes sociais</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-white/20 p-2 rounded-lg mt-1">
                  <Award className="text-amber-300" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Networking Exclusivo</h4>
                  <p className="text-teal-100">Conexões com empresas do setor náutico e organizadores</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h4 className="text-2xl font-bold mb-6 text-center">Cotas de Patrocínio</h4>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-gray-300 to-gray-400 text-white p-4 rounded-lg">
                <h5 className="font-bold">Master</h5>
                <p className="text-sm">Exclusividade no segmento</p>
                <p className="text-sm">Logo em destaque em todos os materiais</p>
                <p className="text-sm">Stand, podcast, acesso a sala Vip</p>
              </div>
              <div className="bg-gradient-to-r from-gray-300 to-gray-400 text-white p-4 rounded-lg">
                <h5 className="font-bold">Ouro</h5>
                <p className="text-sm">Logo em destaque no site e material</p>
                <p className="text-sm">Stand (3x3²) em boa localização</p>
                <p className="text-sm">Podcast , acesso a sala vip</p>
              </div>
              <div className="bg-gradient-to-r from-gray-300 to-gray-400 text-white p-4 rounded-lg">
                <h5 className="font-bold">Prata</h5>
                <p className="text-sm">Logo no site e material impresso</p>
                <p className="text-sm">Stand, podcast</p>
                <p className="text-sm">Menção nas redes sociais do evento</p>
              </div>
              <div className="bg-gradient-to-r from-gray-300 to-gray-400 text-white p-4 rounded-lg">
                <h5 className="font-bold">Bronze</h5>
                <p className="text-sm">Logo no site do evento</p>
                <p className="text-sm">Espaço para banner no evento</p>
                <p className="text-sm">Distribuição de material promocional</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Entre em Contato</h3>
          <p className="text-lg mb-8 text-teal-100">
            Nossa equipe está pronta para criar um pacote personalizado para sua empresa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:patrocinio@paratysailfestival.com"
              className="inline-flex items-center space-x-2 bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Mail size={20} />
              <span>patrocinio@paratysailfestival.com</span>
            </a>
            <a
              href="tel:+5524981104172"
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              <Phone size={20} />
              <span>(24) 98110-4172</span>
            </a>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
