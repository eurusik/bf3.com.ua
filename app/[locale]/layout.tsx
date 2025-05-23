import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "../globals.css";
import Footer from "@/src/components/Footer";
import Container from "@/src/components/Container";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import Header from "@/src/components/Header";

const notoSans = Noto_Sans({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-noto-sans",
  display: "swap",
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
        className={`${notoSans.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Container className="mt-8 mb-4">
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
          </Container>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
