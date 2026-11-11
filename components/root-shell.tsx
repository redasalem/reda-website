import type React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/lib/theme-provider";
import FirebaseAnalyticsLoader from "@/components/firebase-analytics-loader";
import GridBackground from "@/components/grid-background";
import AnimatedBackground from "@/components/animated-background";
import type { Locale } from "@/lib/i18n";
import "@/app/globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
  preload: true,
  fallback: ["Courier New", "monospace"],
  adjustFontFallback: true,
});

interface RootShellProps {
  locale: Locale;
  dir?: "ltr" | "rtl";
  children: React.ReactNode;
}

export default function RootShell({
  locale,
  dir: dirOverride,
  children,
}: RootShellProps) {
  const isAr = locale === "ar";
  const dir = dirOverride ?? (isAr ? "rtl" : "ltr");

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geist.variable} ${geistMono.variable} dark scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>

      <body
        className="font-sans antialiased bg-background text-foreground min-h-screen overflow-x-hidden"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AnimatedBackground />
          <GridBackground />
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
          >
            {isAr ? "تخطي إلى المحتوى الرئيسي" : "Skip to main content"}
          </a>

          <main id="main-content">{children}</main>
          <FirebaseAnalyticsLoader />
        </ThemeProvider>

        {/* Google Analytics - only loaded if ID is provided */}
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        ) : null}

        {/* Microsoft Clarity - only loaded if ID is provided */}
        {process.env.NEXT_PUBLIC_CLARITY_ID ? (
          <Script id="microsoft-clarity" strategy="lazyOnload">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
