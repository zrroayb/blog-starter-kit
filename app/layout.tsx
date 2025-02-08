import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Türkçe Site İsmi',
  description: 'Türkçe site açıklaması',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
} 