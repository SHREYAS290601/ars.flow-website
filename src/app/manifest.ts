import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ARS.FLOW",
    short_name: "ARS.FLOW",
    description: "Verification-first AI skills for engineering workflows.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a1424",
    theme_color: "#0a1424",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  };
}
