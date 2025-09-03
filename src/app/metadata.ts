import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paraty Sail Festival 2025',
  description: 'O festival de vela mais sofisticado do Brasil, celebrando a cultura náutica e caiçara em Paraty.',
  keywords: [
    'Paraty',
    'Festival',
    'Vela',
    'Náutica',
    'Regata',
    'Barcos',
    'Cultura Caiçara',
    'Evento Náutico',
    'Rio de Janeiro',
    'Brasil'
  ].join(', '),
  authors: [{ name: 'Paraty Sail Festival' }],
  creator: 'Paraty Sail Festival',
  publisher: 'Paraty Sail Festival',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://paratysailfestival.com.br',
    title: 'Paraty Sail Festival 2025',
    description: 'O festival de vela mais sofisticado do Brasil, celebrando a cultura náutica e caiçara em Paraty.',
    siteName: 'Paraty Sail Festival',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paraty Sail Festival 2025',
    description: 'O festival de vela mais sofisticado do Brasil, celebrando a cultura náutica e caiçara em Paraty.',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
  },
};
