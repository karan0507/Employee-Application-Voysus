import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "sonner"
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Voysus | Contact Center Solutions & Careers",
  description:
    "Leading provider of multi-channel contact center solutions, AI-powered support, and career opportunities across North America. Transform your customer experience with Voysus.",
  keywords: [
    "contact center solutions",
    "customer support",
    "AI chatbots",
    "social media monitoring",
    "data analytics",
    "Voysus careers",
    "contact center jobs Canada",
    "customer service jobs",
  ],
  openGraph: {
    title: "Voysus CE Inc | Revolutionizing Customer Experiences",
    description: "Transform your customer experience with world-class contact center solutions and AI-powered support.",
    url: "https://voysus.vercel.app",
    siteName: "Voysus",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voysus | Contact Center Solutions & Careers",
    description: "Transform your customer experience with world-class contact center solutions and AI-powered support.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data - Organization Schema */}
        <Script id="organization-schema" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Voysus CE Inc",
              "url": "https://www.voysus.com",
              "logo": "https://www.voysus.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-833-869-7871",
                "contactType": "customer service",
                "availableLanguage": ["en", "fr"]
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "5900 Finch Ave East Suite 200B",
                "addressLocality": "Toronto",
                "addressRegion": "ON",
                "postalCode": "M1B 5P8",
                "addressCountry": "CA"
              },
              "sameAs": [
                "https://facebook.com/voysus",
                "https://twitter.com/voysus",
                "https://instagram.com/voysus",
                "https://linkedin.com/company/voysus"
              ]
            }
          `}
        </Script>
      </head>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  )
}
