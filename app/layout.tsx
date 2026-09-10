import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAnalytics } from "@next/third-parties/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Abismo — Expediciones de Buceo",
  description:
    "Expediciones y cursos de buceo en México. Veracruz, Cancún, Acapulco y más. Descubre el fondo del mar con Abismo.",
  generator: "v0.app",
  verification: {
    google: "SeSXRVHXQ3X_X7OUq6bzYkBx0glHmG27V6OdfPybKIg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${dmSans.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-04WKG8QB1K" />
    </html>
  )
}
