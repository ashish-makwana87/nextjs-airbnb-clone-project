import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS Airbnb Clone Project",
  description:
    "Created with Clerk Auth, Prisma, MongoDB, Supabase, Zod, React, TypeScript, Tailwind CSS, and Shadcn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div>{children}</div>
      </body>
    </html>
  );
}
