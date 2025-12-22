import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const balabelooPro = localFont({
  src: "../../public/fonts/Balabeloo Pro Regular.ttf",
  variable: "--font-balabeloo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marcos Mendes",
  description:
    "Personal website of Marcos Mendes - Developer building things on the internet",
  generator: "Next.js",
  applicationName: "Marcos Mendes Portfolio",
  keywords: [
    "Marcos Mendes",
    "frontend",
    "backend",
    "AI",
    "crypto",
    "developer",
    "portfolio",
  ],
  authors: [{ name: "Marcos Mendes" }],
  creator: "Marcos Mendes",
  publisher: "Marcos Mendes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Marcos Mendes",
    description: "Developer building things on the internet",
    url: "https://dakshie.xyz/",
    siteName: "Marcos Mendes",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Marcos Mendes - Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcos Mendes",
    description: "Developer building things on the internet",
    creator: "@duckwhocodes",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [{ url: "/logo.jpeg", type: "image/jpeg" }],
    apple: [{ url: "/logo.jpeg", type: "image/jpeg" }],
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${balabelooPro.variable} ${caveat.variable} antialiased`}
      >
        <div className="relative">
          <div className="relative mx-auto max-w-screen-xl">
            <div className="absolute left-8 top-0 bottom-0 border-l border-dotted border-[var(--border)] border-opacity-40 h-full overflow-hidden"></div>

            <div className="absolute right-8 top-0 bottom-0 border-l border-dotted border-[var(--border)] border-opacity-40 h-full overflow-hidden"></div>

            <div className="px-[34px]">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
