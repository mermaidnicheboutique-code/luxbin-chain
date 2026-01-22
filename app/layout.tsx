import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Luxbin Chain',
  description: 'Luxbin Chain Explorer and Blockchain Interface',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}