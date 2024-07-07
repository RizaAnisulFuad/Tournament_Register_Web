'use client'

import ReactQueryProvider from "@/provider/ReactQueryProvider";
import { theme } from "@/theme";
import { MantineProvider } from "@mantine/core";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
        <MantineProvider theme={theme}>
          <Toaster position="top-right" richColors visibleToasts={2} />
            <div>{children}</div>
          </MantineProvider>
        </ReactQueryProvider>
        </body>
    </html>
  );
}
