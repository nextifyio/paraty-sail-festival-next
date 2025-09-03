'use client';

import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-teal-800 to-amber-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Image src="/images/logo.jpeg" alt="Paraty Sail Festival" width={48} height={48} className="h-12 w-auto" />
              <div>
                <h3 className="text-xl font-bold">Paraty Sail Festival</h3>
                <p className="text-teal-200">2025</p>
              </div>
            </div>
            <p className="text-teal-200 mb-4">
              O festival de vela mais sofisticado do Brasil, celebrando a cultura náutica e caiçara em Paraty.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/paratysailfestival" className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com/paratysailfestival" className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Evento</h4>
            <ul className="space-y-2 text-teal-200">
              <li><button onClick={() => onScrollToSection('sobre')} className="hover:text-white transition-colors">Sobre</button></li>
              <li><button onClick={() => onScrollToSection('programacao')} className="hover:text-white transition-colors">Programação</button></li>
              <li><button onClick={() => onScrollToSection('palestrantes')} className="hover:text-white transition-colors">Palestrantes</button></li>
              <li><button onClick={() => onScrollToSection('inscricoes')} className="hover:text-white transition-colors">Inscrições</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-teal-200">
              <li><button onClick={() => onScrollToSection('hospedagem')} className="hover:text-white transition-colors">Parceiros</button></li>
              {/* <li><button onClick={() => onScrollToSection('restaurantes')} className="hover:text-white transition-colors">Restaurantes</button></li> */}
              <li><button onClick={() => onScrollToSection('como-chegar')} className="hover:text-white transition-colors">Como Chegar</button></li>
              <li><button onClick={() => onScrollToSection('faq')} className="hover:text-white transition-colors">FAQ</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3 text-teal-200">
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>contato@paratysailfestival.com.br</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>(24) 99988-7766</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Paraty, RJ</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-teal-200">
            © 2025 Paraty Sail Festival. Todos os direitos reservados. | Realização: Velho Jack Serviços Náuticos
          </p>
        </div>
      </div>
    </footer>
  );
}
