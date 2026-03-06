import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reaching Higher: The Covenant Path",
  description:
    "Reaching Higher: The Covenant Path — Stake Conference Event, March 21, 2026",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "mobile-web-app-capable": "yes",
    "theme-color": "#FAFAFA",
    "format-detection": "telephone=no",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Security headers — delivered via <meta> because this is a static export (GitHub Pages has no server to set HTTP headers) */}
        <meta
          httpEquiv="Content-Security-Policy"
          content={[
            "default-src 'self'",
            // Next.js inlines CSS; GA requires an inline init script
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            // GA loader + inline gtag() bootstrap; no external scripts beyond GA
            "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
            // Google Fonts glyphs
            "font-src 'self' https://fonts.gstatic.com",
            // Site images, data-URIs, and any HTTPS image in dangerouslySetInnerHTML content
            "img-src 'self' data: https:",
            // GA beacon endpoints
            "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com",
            // YouTube embeds rendered inside dangerouslySetInnerHTML content
            "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
            // Block plugins (Flash, etc.)
            "object-src 'none'",
            // Prevent <base> tag injection
            "base-uri 'self'",
            // No forms on this site, lock it down
            "form-action 'self'",
            // Prevent this page from being framed by other origins (clickjacking)
            "frame-ancestors 'none'",
          ].join("; ")}
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6SH6W03ZGT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6SH6W03ZGT');
          `}
        </Script>
      </head>
      <body className={`${dmSans.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
