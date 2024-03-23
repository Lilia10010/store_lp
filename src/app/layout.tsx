import "./globals.css";

import { AuthProvider } from "@/providers/auth";
import CartProvider from "@/providers/cart";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rock Content Store",
  description: "A Rock Content Store é a loja oficial da Rock Content.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="flex h-full flex-col">
          <AuthProvider>
            <CartProvider>
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
