import { ImageResponse } from "next/og";
import { palette } from "@/components/portfolio/lib/palette";
import { SITE_NAME } from "@/components/portfolio/lib/site";

export const alt = `${SITE_NAME} | Do pedido à produção`;
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
          justifyContent: "space-between",
          padding: "72px",
          color: palette.text,
          background: palette.bg
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: palette.soft }}>
          <div style={{ display: "flex" }}>{SITE_NAME}</div>
          <div style={{ display: "flex" }}>Desenvolvedor Full Stack</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 138,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: -5
          }}
        >
          <div style={{ display: "flex" }}>Do pedido</div>
          <div style={{ display: "flex" }}>
            à<span style={{ color: palette.accent, marginLeft: 34 }}>produção.</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 28 }}>
          <div style={{ display: "flex", color: palette.soft }}>Sistemas sob medida · Integrações · IA aplicada</div>
          <div style={{ display: "flex", alignItems: "center", color: palette.accent }}>
            <div
              style={{ display: "flex", width: 18, height: 18, marginRight: 14, borderRadius: 999, background: palette.accent }}
            />
            no ar
          </div>
        </div>
      </div>
    ),
    size
  );
}
