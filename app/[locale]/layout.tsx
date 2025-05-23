import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Footer from "@/src/components/Footer";
import Container from "@/src/components/Container";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BF3.com.ua - Battlefield Спільнота",
  description: "Українська спільнота гри Battlefield",
};

const locales = ['uk', 'en'];

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;
  
  if (!locales.includes(locale)) notFound();

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Container className="mt-8 mb-4">
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </Container>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
