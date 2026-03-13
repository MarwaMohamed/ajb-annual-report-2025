import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const tajawal = localFont({
  src: [
    { path: "../../public/fonts/Tajawal-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../../public/fonts/Tajawal-Light.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Tajawal-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Tajawal-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Tajawal-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Tajawal-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../../public/fonts/Tajawal-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aljazira Bank | Annual Report 2025 — Wealth Grows Here",
  description:
    "Explore Aljazira Bank's 2025 Annual Report. Discover how strategic maturity, digital transformation, and sustainable value creation define our journey.",
  openGraph: {
    title: "Aljazira Bank | Annual Report 2025",
    description: "Wealth Grows Here — Aljazira Bank Annual Report 2025",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tajawal.variable} font-tajawal antialiased`}>
        {children}
      </body>
    </html>
  );
}
