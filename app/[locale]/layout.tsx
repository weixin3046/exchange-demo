import ThemeProvider from "@/components/ThemeProvider";
import Web3Provider from "@/components/Web3Provider";
import { HyperliquidProvider } from "@/components/HyperliquidProvider";
import { routing } from "@/i18n/routing";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Based - Trade Everything, Spend Everywhere",
  description: "Based is a Web3 trading and payments platform built on Hyperliquid",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const headersObj = await headers();
  const cookies = headersObj.get("cookie");
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <NextIntlClientProvider>
            <Web3Provider cookies={cookies}>
              <HyperliquidProvider>
                {children}
              </HyperliquidProvider>
            </Web3Provider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
