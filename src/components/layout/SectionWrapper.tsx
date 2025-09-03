'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export default function SectionWrapper({
  id,
  title,
  subtitle,
  children,
  className = 'bg-white',
  titleClassName = 'text-teal-800',
  subtitleClassName = 'text-gray-600'
}: SectionWrapperProps) {
  return (
    <section id={id} className={`pt-28 pb-20 scroll-mt-20 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${titleClassName}`}>{title}</h2>
          {subtitle && <p className={`text-xl ${subtitleClassName}`}>{subtitle}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
