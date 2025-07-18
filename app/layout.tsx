import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner"
import 'react-datepicker/dist/react-datepicker.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YOOM",
  description: "Video calling app",
  icons:{
    icon : '/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark-2`}>
        <ClerkProvider
          appearance={{
            elements: {
              userButtonPopoverActionButtonText: "text-white",
              userButtonPopoverActionButton: "hover:bg-gray-700",
            },
            layout: {
              logoImageUrl: "/icons/yoom-logo.svg",
              socialButtonsVariant: "iconButton",
            },
            variables: {
              colorText: "#fff",
              colorPrimary: "#0E78F9",
              colorBackground: "#1C1F2E",
              colorInputBackground: "#252A41",
              colorInputText: "#fff",
            },
          }}
        >
          {children}
          <Toaster />
        </ClerkProvider>
        
      </body>
    </html>
  );
}
