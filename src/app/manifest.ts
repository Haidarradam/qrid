import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "QRID — Free QR Code Generator",
    short_name: "QRID",
    description:
      "Free online QR code generator. Convert any link into a high-resolution QR code PNG instantly.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#0a0a0a",
    orientation: "portrait",
    categories: ["utilities", "productivity", "tools"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
