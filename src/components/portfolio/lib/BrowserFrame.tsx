import Image from "next/image";

type BrowserFrameProps = {
  src: string;
  alt: string;
  url: string;
  sizes: string;
  /** Luz atrás da janela. */
  hue?: number;
  /** O print desliza dentro da janela conforme a rolagem. */
  parallax?: boolean;
  /** Carrega junto com a primeira tela. */
  eager?: boolean;
  className?: string;
};

/** Janela de navegador: o jeito único de mostrar um print real no site. */
export function BrowserFrame({ src, alt, url, sizes, hue = 262, parallax, eager, className = "" }: BrowserFrameProps) {
  return (
    <div className={`window ${className}`} style={{ "--hue": hue } as React.CSSProperties}>
      <div className="window-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="window-url">{url}</span>
      </div>
      <div className={`window-shot ${parallax ? "window-shot--parallax" : ""}`}>
        <Image
          src={src}
          alt={alt}
          fill
          quality={90}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
