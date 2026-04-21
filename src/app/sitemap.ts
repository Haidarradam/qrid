import type { MetadataRoute } from "next";

// ⚠️ Sesuaikan dengan domain kamu
const SITE_URL = "https://qrid.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
