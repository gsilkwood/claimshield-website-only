import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ClaimShield DV | Professional Diminished Value Appraisals",
  description:
    "Professional, data-backed diminished value appraisals to help you prove your claim and recover the compensation you deserve after an accident. 25+ years of experience.",
  keywords: "diminished value, diminished value appraisal, car accident claim, vehicle diminished value, DV claim, insurance claim",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://claimshielddv.com",
    title: "ClaimShield DV | Professional Diminished Value Appraisals",
    description:
      "Professional, data-backed diminished value appraisals to help you prove your claim and recover the compensation you deserve after an accident.",
    siteName: "ClaimShield DV",
    images: [
      {
        url: "https://claimshielddv.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ClaimShield DV - Professional Diminished Value Appraisals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClaimShield DV | Professional Diminished Value Appraisals",
    description: "Professional, data-backed diminished value appraisals. 25+ years of experience.",
    images: ["https://claimshielddv.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
