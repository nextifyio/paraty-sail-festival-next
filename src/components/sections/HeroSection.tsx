'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function HeroSection({ onScrollToSection }: HeroSectionProps) {
  return (
    <section id="home" className="pt-20 min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-amber-900/20"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/images/golden-sunset.jpg)` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
              Paraty Sail Festival
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-amber-100">2025 - EVENTO GRATUITO</p>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              A Pérola dos Eventos Náuticos do Brasil
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-12"
          >
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Calendar className="text-amber-300" size={20} />
              <span className="text-lg">20 a 23 de Novembro</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <MapPin className="text-amber-300" size={20} />
              <span className="text-lg">Paraty, RJ</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* <button
              onClick={() => onScrollToSection('inscricoes')}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Inscreva-se na Regata
            </button> */}
            <button
              onClick={() => onScrollToSection('sobre')}
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              Saiba Mais
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="text-white" size={32} />
      </motion.div>
    </section>
  );
}
