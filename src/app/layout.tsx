import type { Metadata } from "next";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "@/features/components/ScrollToTop";
import { AuthProvider } from "@/features/admin/context/AuthContext/AuthContext";

export const metadata: Metadata = {
  title: "মোল্লাপাড়া সমাজ কল্যাণ সংস্থা | Mollapara Social Welfare Association",
  description:
    "মোল্লাপাড়া সমাজ কল্যাণ সংস্থা — এলাকার উন্নয়ন আমাদের প্রতিশ্রুতি। রক্তদান, ঋণ ও পুনর্বাসন, শিক্ষা সহায়তা এবং সামাজিক কল্যাণমূলক কার্যক্রম।",
  keywords: [
    "মোল্লাপাড়া",
    "সমাজ কল্যাণ",
    "রক্তদান",
    "Mollapara",
    "Social Welfare",
    "Blood Donation",
    "Bangladesh NGO",
  ],
  authors: [{ name: "Mollapara Social Welfare Association" }],
  openGraph: {
    title: "মোল্লাপাড়া সমাজ কল্যাণ সংস্থা",
    description: "মানবতার সেবায় উৎসর্গীকৃত",
    type: "website",
    locale: "bn_BD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body className="font-bengali antialiased parchment-bg min-h-screen">
       <AuthProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            style={{ fontFamily: "'Noto Serif Bengali', serif" }}
          />
        <ScrollToTop />
        </AuthProvider>
      </body>
        
    </html>
  );
}