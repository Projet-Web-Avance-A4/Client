import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./contexts/cart.context";
import Footer from "./components/footer/footer";
import { NextUIProvider } from "@nextui-org/system";
import { HeaderProvider } from "./contexts/header.context";
import Header from "./components/header/header";
import { UserProvider } from "./contexts/user.context";

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
          <UserProvider>
            <CartProvider>
              <HeaderProvider>
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </HeaderProvider>
            </CartProvider>
          </UserProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
