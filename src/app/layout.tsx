import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/cart";

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
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
