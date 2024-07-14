"use client"
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import '@mantine/core/styles.css';
import { Toaster } from "sonner";
import { WagmiProvider } from 'wagmi'
import { config } from "@/utils/config";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



const inter = Inter({ subsets: ["latin"] });



const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster/>
        <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
        <MantineProvider >
        <Header/>
        {children}
        </MantineProvider>
        </QueryClientProvider>
        </WagmiProvider>
       
        </body>
    </html>
  );
}
