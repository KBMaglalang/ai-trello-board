import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { PROJECT_NAME, PROJECT_DESCRIPTION } from "@/constants";

// components
import Layout from "@/components/features/Layout";

export const metadata: Metadata = {
  title: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
