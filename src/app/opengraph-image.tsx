import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/components/portfolio/lib/site";

export const alt = `${SITE_NAME} — Desenvolvedor Full Stack`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Card de preview usado quando o link é compartilhado (LinkedIn, WhatsApp, X). */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #090614 0%, #1a0f3d 55%, #2b1b58 100%)"
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#c4b5fd"
          }}
        >
          Portfólio
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#ffffff"
          }}
        >
          {SITE_NAME}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 44,
            fontWeight: 600,
            color: "#9b5cff"
          }}
        >
          Desenvolvedor Full Stack
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 30,
            color: "#d2cde3",
            maxWidth: 900
          }}
        >
          Automação · Integrações · IA aplicada · React, Next.js, Python
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 48,
            height: 8,
            width: 220,
            borderRadius: 999,
            background: "#9b5cff"
          }}
        />
      </div>
    ),
    size
  );
}
