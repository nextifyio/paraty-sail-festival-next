'use client';

import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, Mail } from 'lucide-react';
import { faqItems } from '@/constants/data';
import SectionWrapper from '@/components/layout/SectionWrapper';

export default function FAQSection() {
  return (
    <SectionWrapper 
      id="faq"
      title="Perguntas Frequentes"
      subtitle="Tire suas dúvidas sobre o evento"
      className="bg-white"
    >

      <div className="max-w-4xl mx-auto space-y-6">
        {faqItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-lg border border-amber-100 overflow-hidden"
          >
            <details className="group">
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-amber-50 transition-colors">
                <h3 className="text-lg font-semibold text-teal-800 pr-4">{item.pergunta}</h3>
                <div className="flex items-center space-x-2">
                  <HelpCircle className="text-amber-600" size={20} />
                  <ChevronDown className="text-amber-600 group-open:rotate-180 transition-transform" size={20} />
                </div>
              </summary>
              <div className="px-6 pb-6">
                <p className="text-gray-600 leading-relaxed">{item.resposta}</p>
              </div>
            </details>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <p className="text-gray-600 mb-6">Não encontrou sua resposta?</p>
        <a
          href="mailto:contato@paratysailfestival.com"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Mail size={20} />
          <span>Entre em Contato</span>
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
