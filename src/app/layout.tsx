import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/cart";
import Footer from "./components/footer/footer";
import { NextUIProvider } from "@nextui-org/system";
import { HeaderProvider } from "./hooks/useHeader";
import Header from "./components/header/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CES'Eat",
  description: "Une meilleure manière de tout gérer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <NextUIProvider className="flex flex-col min-h-screen bg-beige">
          <HeaderProvider>
            <CartProvider>
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </CartProvider>
          </HeaderProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
