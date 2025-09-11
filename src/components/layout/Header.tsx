'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

interface MenuItem {
  id: string;
  label: string;
}

const menuItems: MenuItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'programacao', label: 'Programação' },
  { id: 'inscricoes', label: '1ª Regata Amyr Klink' },
  { id: 'parceiros', label: 'Parceiros' },
  { id: 'patrocinadores', label: 'Patrocinadores' },
  { id: 'patrocinio', label: 'Seja Patrocinador' },
  { id: 'como-chegar', label: 'Como Chegar' },
  { id: 'faq', label: 'FAQ' }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll spy effect
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50px 0px -50% 0px',
      threshold: [0, 0.1, 0.25]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          console.log('Seção detectada:', sectionId); // Debug
          setActiveSection(sectionId);
        }
      });
    }, observerOptions);

    const sections = [
      'home', 
      'sobre', 
      'programacao', 
      'palestrantes', 
      'atracoes',
      'inscricoes', 
      'parceiros', 
      'hospedagem',
      'restaurantes',
      'patrocinadores', 
      'patrocinio',
      'como-chegar', 
      'faq'
    ];
    
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Control body class when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    // Destacar imediatamente o item clicado
    setActiveSection(sectionId);
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Garantir que o destaque permaneça após o scroll
      setTimeout(() => {
        setActiveSection(sectionId);
      }, 500);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-50 border-b border-amber-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image src="/images/logo.jpeg" alt="Paraty Sail Festival" width={48} height={48} className="h-12 w-auto" />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-teal-800">Paraty Sail Festival</h1>
              <p className="text-sm text-amber-600">2025</p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                  activeSection === item.id
                    ? 'bg-amber-100 text-amber-800 shadow-md'
                    : 'text-slate-700 hover:bg-amber-50 hover:text-amber-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-amber-100 text-amber-800"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-amber-200 mobile-menu"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="p-3 text-left rounded-lg text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
