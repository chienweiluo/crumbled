import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AppearanceProvider } from "../components/AppearenceProvider"

import "@repo/ui/styles.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Headless",
  description: "Generated by create turbo",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AppearanceProvider>{children}</AppearanceProvider>
      </body>
    </html>
  )
}
