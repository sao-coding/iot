import type { Metadata } from "next"

import Providers from "@/app/providers"
import Container from "@/components/Container"
import Toaster from "@/components/Toaster"

import "./globals.css"

export const metadata: Metadata = {
  title: "IoT",
  description: "專題"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh-Hant-TW'>
      <body>
        <Toaster />
        <Container>
          <Providers>{children}</Providers>
        </Container>
      </body>
    </html>
  )
}
