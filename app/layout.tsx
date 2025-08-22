import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Converso",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={`${bricolage.variable} antialiased`}>
      <ClerkProvider 
        appearance={{ variables: { colorPrimary: '#fe5933' }} }
        clerkJSOptions={{
          // Increase the timeout to prevent the "Failed to load Clerk" error
          loadClerkJSTimeout: 15000, // 15 seconds (default is 10 seconds)
          // Add additional options to improve loading reliability
          polling: true,
          pollingInterval: 1000, // 1 second
        }}
      >
        <Navbar />
        {children}
      </ClerkProvider>
      </body>
      </html>
  );
}
