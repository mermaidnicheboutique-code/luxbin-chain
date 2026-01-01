import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUXBIN - Quantum-Secured Blockchain Token",
  description: "LUXBIN (LUX) combines quantum cryptography, physics-based consensus, and biological security patterns. Live on Base Network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress wallet extension errors in development
              if (typeof window !== 'undefined') {
                const originalError = console.error;
                console.error = (...args) => {
                  if (args[0]?.includes?.('chrome.runtime.sendMessage') ||
                      args[0]?.includes?.('Extension ID')) {
                    return; // Suppress wallet extension errors
                  }
                  originalError(...args);
                };
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
