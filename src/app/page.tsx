'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import SobreSection from '@/components/sections/SobreSection';
import ProgramacaoSection from '@/components/sections/ProgramacaoSection';
import PalestrantesSection from '@/components/sections/PalestrantesSection';
import InscricoesSection from '@/components/sections/InscricoesSection';
import PatrocinadoresSection from '@/components/sections/PatrocinadoresSection';
import HospedagensSection from '@/components/sections/HospedagensSection';
import RestaurantesSection from '@/components/sections/RestaurantesSection';
import ExpositoresSection from '@/components/sections/ExpositoresSection';
import ComoChegarSection from '@/components/sections/ComoChegarSection';
import SejaPatrocinadorSection from '@/components/sections/SejaPatrocinadorSection';
import FAQSection from '@/components/sections/FAQSection';
import AtracoesSection from '@/components/sections/AtracoesSection';

export default function Home() {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <Header />
      <main className="flex-grow">
        <HeroSection onScrollToSection={scrollToSection} />
        <SobreSection />
        {/* <SobreSection /> */}
        <ProgramacaoSection />
        <PalestrantesSection />
        <AtracoesSection />
        <InscricoesSection />
        <ExpositoresSection />
        <HospedagensSection />
        <RestaurantesSection />
        <PatrocinadoresSection />
        <SejaPatrocinadorSection />
        <ComoChegarSection />
        <FAQSection />
      </main>
      <Footer onScrollToSection={scrollToSection} />
    </>
  );
}
