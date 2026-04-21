import type { MetadataRoute } from "next";

// ⚠️ Sesuaikan dengan domain kamu
const SITE_URL = "https://qrid.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
