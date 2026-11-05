const TEXT = [
  { text: "Um só responsável, do primeiro pedido até o sistema no ar:" },
  { text: "CRMs, sistemas internos, rotinas financeiras e IA", lit: true },
  { text: "construídos para o processo de cada empresa." }
];

const totalWords = TEXT.reduce((sum, part) => sum + part.text.split(" ").length, 0);

/** A frase acende palavra por palavra conforme a rolagem. */
export function Statement() {
  let index = 0;

  return (
    <section
      className="section container"
      data-track="view"
      style={{ "--n": totalWords } as React.CSSProperties}
    >
      <p className="text-h2 max-w-[20ch]">
        {TEXT.map((part) =>
          part.text.split(" ").map((word) => {
            const current = index++;
            return (
              <span key={current}>
                <span
                  className={`statement-word ${part.lit ? "text-serif text-glow" : ""}`}
                  style={{ "--w": current } as React.CSSProperties}
                >
                  {word}
                </span>{" "}
              </span>
            );
          })
        )}
      </p>
    </section>
  );
}
