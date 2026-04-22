import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

// ⚠️ Ganti URL ini dengan domain kamu setelah deploy
const SITE_URL = "https://qrid.online";

const siteConfig = {
  name: "QRID",
  title: "QRID — Free QR Code Generator | Convert Link to QR Code PNG",
  description:
    "Free online QR code generator. Convert any link or text into a high-resolution QR code and download as PNG instantly. No signup, no watermark, 100% free forever.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/og-image.png`,
  creator: "@haidarradam",
  keywords: [
    // English
    "qr code generator",
    "free qr code generator",
    "link to qr code",
    "url to qr code",
    "qr code maker",
    "qr code png download",
    "generate qr code online",
    "qr code no watermark",
    // Indonesian
    "qr code generator gratis",
    "buat qr code online",
    "konversi link ke qr code",
    "generator qr code gratis",
    "bikin qr code",
    "qr code maker indonesia",
  ],
};

export const viewport: Viewport = {
  themeColor: "#fafaf9",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "Haidar Adam", url: "https://sociabuzz.com/haidarradam" }],
  creator: "Haidar Adam",
  publisher: "QRID",
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "QRID — Free QR Code Generator",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.creator,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  category: "technology",
  verification: {
  google: "jmj_LiRO3i0keOW5YKUuV1YYidcsdQ_4v4Rb5Dvht4Y",
  },
};

// JSON-LD Structured Data — membantu Google memahami ini adalah aplikasi web gratis
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Generate QR codes from any URL or text",
      "High-resolution PNG download (1024x1024)",
      "Real-time live preview",
      "No signup required",
      "Completely free forever",
      "Privacy-friendly — all processing client-side",
    ],
    creator: {
      "@type": "Person",
      name: "Haidar Adam",
      url: "https://sociabuzz.com/haidarradam",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is QRID really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, QRID is 100% free forever. No signup, no watermark, no hidden fees, no limits on the number of QR codes you can generate.",
        },
      },
      {
        "@type": "Question",
        name: "How do I convert a link to a QR code?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simply paste your URL into the input field. The QR code will be generated in real-time, and you can download it as a high-resolution PNG image with one click.",
        },
      },
      {
        "@type": "Question",
        name: "Is my data safe when I use QRID?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. All QR code generation happens directly in your browser. Your links and data are never sent to any server — we do not store or track what you generate.",
        },
      },
      {
        "@type": "Question",
        name: "What resolution is the downloaded QR code?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "QR codes are downloaded as 1024x1024 pixel PNG images — suitable for both digital use and print materials like posters, flyers, and business cards.",
        },
      },
      {
        "@type": "Question",
        name: "Do QR codes from QRID expire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Never. QR codes generated by QRID are static and will work forever, as long as the link they point to remains active.",
        },
      },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
