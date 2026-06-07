import type { Metadata } from "next";
import { Syne, DM_Sans, Geist_Mono, Playfair_Display } from "next/font/google";
import { Providers } from "./providers";
import "@/styles/globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-editorial",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Hybrid Portfolio | Engineer & Designer",
  description: "A premium interactive developer and designer portfolio inspired by Lusion, Bruno Simon, Aristide Benoist, and ITom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      data-mode="hybrid"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js-loaded');`,
          }}
        />
      </head>
      <body className="min-h-full overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
