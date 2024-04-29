import StyledComponentsRegistry from '@/lib/AntdRegistry'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '@/public/styles/globals.css'

const poppins = Poppins({subsets: ['latin'], weight: ['100', '200','300','400','500','600','700','800','900']});

export const metadata: Metadata = {
  title: 'Project Food',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={poppins.className}>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
