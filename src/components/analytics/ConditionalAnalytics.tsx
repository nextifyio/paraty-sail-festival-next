'use client'

import { usePathname } from 'next/navigation'
import GoogleAnalytics from './GoogleAnalytics'

export default function ConditionalAnalytics() {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  // Debug em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 Analytics Debug:', {
      pathname,
      isAdminRoute,
      measurementId,
      shouldLoad: !isAdminRoute && measurementId && measurementId !== 'G-XXXXXXXXXX'
    })
  }

  // Não carrega analytics em rotas admin ou se não há ID configurado
  if (isAdminRoute || !measurementId || measurementId === 'G-XXXXXXXXXX') {
    return null
  }

  return <GoogleAnalytics measurementId={measurementId} />
}