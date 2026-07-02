import React from 'react'
import './styles.css'

export const metadata = {
  description:
    'Compassionate Cleaning NYC — judgment-free, trauma-informed home cleaning for mental wellness, neurodiversity, and life transitions.',
  title: 'Compassionate Cleaning NYC | Care • Dignity • Mental Wellness',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        {/* preconnect shaves ~200ms off the first font request */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/*
          Fraunces  – display serif with opsz axis (9–144) and italic support
          Plus Jakarta Sans – geometric sans, all weights + italics
        */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
        />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
