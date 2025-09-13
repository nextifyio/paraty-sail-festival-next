import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ConditionalAnalytics from '@/components/analytics/ConditionalAnalytics';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Festival Paraty à Vela",
  description: "Festival de cultura marítima em Paraty",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="adopt-website-id" content="0b1384a7-c15c-42fe-af67-c0130b4c0568" />
        <script src="//tag.goadopt.io/injector.js?website_code=0b1384a7-c15c-42fe-af67-c0130b4c0568" className="adopt-injector"></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ConditionalAnalytics />
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
          {children}
        </main>
      </body>
    </html>
  )
}
