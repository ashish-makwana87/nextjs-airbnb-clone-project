import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS Airbnb Clone Project",
  description:
    "Created with Clerk Auth, Prisma, Supabase, Zod, React, TypeScript, Tailwind CSS, and Shadcn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
        <Navbar />
        <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
