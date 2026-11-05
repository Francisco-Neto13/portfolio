import { ImageResponse } from "next/og";
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
          color: "#ffffff",
          background: "radial-gradient(900px 620px at 78% 12%, #3b1a85 0%, #09080f 72%)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#c9c5d6" }}>
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
            à<span style={{ color: "#c4b5fd", marginLeft: 34 }}>produção.</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 28 }}>
          <div style={{ display: "flex", color: "#c9c5d6" }}>Sistemas sob medida · Integrações · IA aplicada</div>
          <div style={{ display: "flex", alignItems: "center", color: "#41e0a3" }}>
            <div
              style={{ display: "flex", width: 18, height: 18, marginRight: 14, borderRadius: 999, background: "#41e0a3" }}
            />
            no ar
          </div>
        </div>
      </div>
    ),
    size
  );
}
