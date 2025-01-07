import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Bounded } from "@/components/common/Bounded";
import config from "../../config";
import { IBM_Plex_Sans_JP } from "next/font/google";

import "./globals.css";
import Footer from "@/components/footer";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// const bricolage = Bricolage_Grotesque({
//   subsets: ["latin"],
//   variable: "--font-bricolage",
//   weight: ["400", "600"],
// });

const ibmPlexSansJP = IBM_Plex_Sans_JP({
  subsets: ["latin"],
  variable: "--font-plex-sans-jp",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | " + config.SITE_TITLE,
    default: config.SITE_TITLE,
  },
  description: config.SEO_DESCRIPTION,
  keywords: config.SEO_KEYWORDS,
  twitter: {
    title: {
      template: "%s | " + config.SITE_TITLE,
      default: config.SITE_TITLE,
    },
    description: config.SEO_DESCRIPTION,
    card: "summary_large_image",
    creator: config.X_HANDLE,
    creatorId: config.X_ID,
  },
  openGraph: {
    title: {
      template: "%s | " + config.SITE_TITLE,
      default: config.SITE_TITLE,
    },
    description: config.SEO_DESCRIPTION,
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
      <body className={`${ibmPlexSansJP.className} bg-white antialiased text-black`}>
        <Bounded as="section" size="widest">
          <main className="col-span-2 p-4">{children}</main>
          <Footer />
        </Bounded>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_MEASUREMENT_ID!} />
    </html>
  );
}
