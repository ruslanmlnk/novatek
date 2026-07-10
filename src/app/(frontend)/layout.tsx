import React from 'react'
import { Inter_Tight } from 'next/font/google'
import './styles.css'

import { ScrollReveal } from './components/ScrollReveal'

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
})

export const metadata = {
  description: 'Precision engineering and manufacturing services by Novatek Engineering.',
  title: 'Novatek Engineering',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={`${interTight.className} bg-novatek-bg text-white antialiased`}>
        <ScrollReveal />
        <main>{children}</main>
      </body>
    </html>
  )
}
