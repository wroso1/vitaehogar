import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  title: 'Vitae Hogar | Toma de muestras de sangre a domicilio en Medellín',
  description: 'Toma de muestras de sangre a domicilio en Medellín y área metropolitana. Enfermera profesional, insumos estériles y resultados en 24-48h. Agenda por WhatsApp.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/icon-light-32x32.png`,
        media: '(prefers-color-scheme: light)',
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/icon-dark-32x32.png`,
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/icon.svg`,
        type: 'image/svg+xml',
      },
    ],
    apple: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/apple-icon.png`,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#faf9f6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
