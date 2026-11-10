import type { Metadata } from "next"
import { Manrope, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { profile } from "@/lib/content"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
})

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jbmono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://shehabelsedody.dev"),
  title: `${profile.name} — ${profile.role}`,
  description: profile.metaDescription,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.metaDescription,
    type: "website",
    url: "https://shehabelsedody.dev",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${jbmono.variable}`}>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}" +
              "try{if(document.visibilityState==='visible'&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('anim')}}catch(e){}",
          }}
        />
        {children}
      </body>
    </html>
  )
}
