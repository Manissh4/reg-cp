import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { CommonHeader } from '@/components/common-header'

export const metadata: Metadata = {
  title: 'CPGRAMS',
  description: 'Next generation grievance management system by DARPG',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>
          {`html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }`}
        </style>
      </head>
      <body>
        <div className='min-h-screen flex flex-col'>
          <CommonHeader />
          <div className="flex flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
