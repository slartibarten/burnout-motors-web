import type { Metadata } from "next";
import { Oxanium, Archivo, Space_Mono } from "next/font/google";
import { getLocale } from "@/lib/i18n";
import "./globals.css";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-text",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isEn = locale === "en";
  const title = isEn
    ? "Burnout Motors — Norway's First GT3 Student Team | UiO"
    : "Burnout Motors — Norges første GT3-studentteam | UiO";
  const description = isEn
    ? "Student-run engineering project at the University of Oslo. We design, build, test and race a GT3 car. Become a partner or join as a student."
    : "Studentdrevet ingeniørprosjekt ved Universitetet i Oslo. Vi tegner, bygger, tester og kjører en GT3-bil. Bli partner eller søk som student.";

  return {
    metadataBase: new URL("https://burnoutmotors.org"),
    title,
    description,
    openGraph: {
      title,
      description,
      url: "/",
      siteName: "Burnout Motors",
      locale: isEn ? "en_US" : "nb_NO",
      type: "website",
      images: [{ url: "/images/car-frederikke.jpg", width: 1500, height: 1000 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/car-frederikke.jpg"],
    },
  };
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Burnout Motors",
  url: "https://burnoutmotors.org",
  logo: "https://burnoutmotors.org/logos/burnout-lockup-white.png",
  sameAs: ["https://www.instagram.com/burnoutmotorsno/"],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${oxanium.variable} ${archivo.variable} ${spaceMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
