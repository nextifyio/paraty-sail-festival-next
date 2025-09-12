'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Star, UtensilsCrossed, ExternalLink } from 'lucide-react';
import { useRestaurantes } from '@/hooks/useFestivalData';
import SectionWrapper from '@/components/layout/SectionWrapper';
import Image from 'next/image';

export default function RestaurantesSection() {
  const { restaurantes, loading, error } = useRestaurantes();

  if (loading) {
    return (
      <SectionWrapper id="restaurantes" title="Área Gastronômica" subtitle="Os melhores sabores do Brasil e experiência da culinária caiçara dentro do Paraty Sail Festival">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Carregando restaurantes...</p>
        </div>
      </SectionWrapper>
    );
  }

  if (error) {
    return (
      <SectionWrapper id="restaurantes" title="Área Gastronômica" subtitle="Os melhores sabores do Brasil e experiência da culinária caiçara dentro do Paraty Sail Festival">
        <div className="text-center py-12 text-red-600">
          <p>Erro ao carregar restaurantes: {error}</p>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="restaurantes" title="Área Gastronômica" subtitle="Os melhores sabores do Brasil e experiência da culinária caiçara dentro do Paraty Sail Festival">
      <div className="grid md:grid-cols-3 gap-8">
        {restaurantes.map((restaurante, index) => (
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
                <UtensilsCrossed className="text-amber-600" size={20} />
              </div>
              <h3 className="text-xl font-bold text-teal-800">{restaurante.nome}</h3>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2">
                <Star className="text-amber-500" size={16} />
                <span className="text-sm font-medium text-amber-600">{restaurante.especialidade}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="text-gray-400" size={16} />
                <span className="text-sm text-gray-600">{restaurante.telefone}</span>
              </div>
            </div>

            {restaurante.cardapio ? (
              <a
                href={restaurante.cardapio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-teal-500 to-amber-500 text-white text-center py-2 rounded-lg font-semibold hover:from-teal-600 hover:to-amber-600 transition-all duration-300"
              >
                <span>Acessar Cardápio</span>
                <ExternalLink size={16} />
              </a>
            ) : (
              <a
                href={`tel:${restaurante.telefone.replace(/[^\d]/g, '')}`}
                className="inline-flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-teal-500 to-amber-500 text-white text-center py-2 rounded-lg font-semibold hover:from-teal-600 hover:to-amber-600 transition-all duration-300"
              >
                <Phone size={16} />
                <span>Ligar</span>
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-12 bg-gradient-to-br from-teal-50 to-amber-50 rounded-2xl p-8"
      >
        <div className="relative w-full h-[300px] max-w-md mx-auto rounded-lg shadow-lg mb-6 overflow-hidden">
          <Image 
            src="/images/caicara-culture.jpg"
            alt="Cultura Caiçara"
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-2xl font-bold text-teal-800 mb-4">Gastronomia Caiçara</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Descubra os sabores autênticos da cultura caiçara com pratos tradicionais preparados com ingredientes frescos do mar e da terra. Uma experiência gastronômica única que conecta você com a história e tradição de Paraty.
        </p>
      </motion.div> */}
    </SectionWrapper>
  );
}
