import "~/styles/globals.css";

import { Poppins, Space_Mono } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: "--font-sans",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: "--font-mono",
});

export const metadata = {
  title: "Counter",
  description: "A simpler way to understand counting.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${font.variable}`}>{children}</body>
    </html>
  );
}
