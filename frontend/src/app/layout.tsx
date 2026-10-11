import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "d'Praieira | Moda Praia Casual",
    template: "%s | d'Praieira",
  },
  description:
    "Moda praia casual com a leveza do litoral. Biquínis, maiôs, cangas, bolsas e acessórios. Mais que moda, um estilo de vida!",
};

function HeaderFallback() {
  return (
    <header className="sticky top-0 z-50 border-b border-sand-200 bg-sand-50/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4">
        <img src="/logo.png" alt="d'Praieira" className="h-11 w-auto" />
      </div>
    </header>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-sand-50 text-ink">
        <CartProvider>
          <Suspense fallback={<HeaderFallback />}>
            <Header />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}