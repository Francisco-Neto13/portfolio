# Hero 3D: análise e plano

Fase 1: só leitura. Nenhum código foi alterado.

## 1. O hero hoje (código)

**Arquivos**
- `src/components/portfolio/sections/Hero.tsx`: componente de servidor, sem estado. Usa `BrowserFrame` (as três janelas de projeto) e `profile`, `projects` e `stats` de `lib/data.ts`.
- `src/components/portfolio/lib/Effects.tsx`: o motor de movimento do site inteiro. Não desenha nada na tela.
- `src/app/styles/motion.css`: toda a coreografia do hero. `components.css` guarda a parte estática (`.hero-light`, `.hero-grid`, paddings).

**Como o "scroll to light up" funciona**
1. `.hero-track` (`data-track`) tem `310svh` de altura. Dentro dele, `.hero-stage` fica `sticky` com `100svh`.
2. A cada scroll, `Effects.tsx` agenda um `requestAnimationFrame`, calcula `p = -rect.top / (altura − viewport)` e escreve `--p` (de 0 a 1) no track. Também marca `data-final="true"` quando `p > 0.8`.
3. O CSS deriva tudo de `--p`, sem JavaScript por etapa:

| variável | faixa de `p` | o que move |
|---|---|---|
| `--lit` | 0,04 → 0,38 | `.hero-light` (três radial-gradients violeta/magenta/azul) ganha opacidade de 0,14→1 e escala de 0,72→1,14; a grade aparece |
| `--intro-out` | 0,20 → 0,34 | o título "Do pedido à produção" some |
| `--show` | 0,30 → 0,50 | as janelas de projeto entram |
| `--move` | 0,55 → 0,75 | a janela principal encolhe e vai para a direita (desktop) ou para cima (mobile) |
| `--final` | 0,68 → 0,82 | entra o fechamento: "Sistemas que saem do papel", CTAs e números |

   A barra "deploy" do HUD é `scaleX(var(--p))`.
4. Proteções que já existem e que a animação nova precisa respeitar:
   - `prefers-reduced-motion: reduce`: nada é rastreado e o hero aparece parado.
   - Sem JS (falta `html.js`): o conteúdo fica visível.
   - Modo leve `html.lite`: liga quando o WebGL roda por software ou a mediana passa de 28 ms/quadro. Desliga brilhos e o Lenis.
   - `data-near="false"`: pausa os loops fora da tela.

**Libs de animação instaladas**: só `lenis@^1.3.11` (scroll suave; só no desktop com hover, `lerp: 0.2`, e não no modo leve). Sem GSAP, Framer Motion ou Three.js. O movimento é CSS puro com custom properties. Isso combina bem com uma sequência de frames: basta ler o mesmo `p`.

**Cores do tema (hex)**

| token | escuro | claro |
|---|---|---|
| `--color-bg` | `#08060f` | `#f8f6ff` |
| `--color-bg-soft` | `#0e0a1a` | `#f1edfb` |
| `--color-surface` | `#130e22` | `#ffffff` |
| `--color-surface-raised` | `#1c1531` | `#e9e3f7` |
| `--color-text` | `#f6f3ff` | `#140e24` |
| `--color-text-soft` | `#cbc5de` | `#433b58` |
| `--color-text-muted` | `#a098ba` | `#574f6e` |
| `--color-accent` | `#c4b5fd` | `#5b21b6` |
| `--color-accent-strong` | `#7c3aed` | `#6d28d9` |
| `--color-live` | `#5eead4` | `#0b6b63` |

Luzes do hero (RGB): violeta `139,92,246` (`#8b5cf6`), magenta `217,70,239` (`#d946ef`), azul `59,130,246` (`#3b82f6`). Grade: `rgba(196,181,253,0.06)`. O tema padrão é "sistema": quem usa o sistema no modo claro vê o hero claro.

**Breakpoints**
- Tailwind padrão: `sm` 640, `md` 768, `lg` 1024, `xl` 1280.
- Hero: `max-width: 1023px` troca o layout para mobile (janela sobe em vez de ir para a direita e o fechamento desce para baixo).
- Altura: `short` ≤ 760px e `tiny` ≤ 620px (compactam o fechamento). Cases empilhados só com `min-width:1280 and min-height:880`. `scenes.css`: `1024 × 700`. `visuals.css`: 900.
- Tokens: `--header-h: 72px`, `--gutter: clamp(1.25rem, 4vw, 3.5rem)`.

## 2. O site funcionando (screenshots)

O dev server local não subiu: `lenis` está no `package.json` mas falta no `node_modules` (erro "Module not found", resposta 500). Instalar foi bloqueado pela permissão, então as screenshots são de **chiconeto.dev**. Os arquivos do hero lá são idênticos aos desta branch (`git diff HEAD origin/main` vazio para Hero, Effects, motion.css e components.css). Pontos: `p` = 0 / 0,3 / 0,6 / 0,95, em 1440×900 (claro e escuro) e 390×844 (escuro).

**O que funciona**
- A tipografia é o ponto forte. "Do pedido / à *produção.*" (sans pesado mais serifa itálica) tem personalidade e lê bem nos dois temas.
- O fechamento no desktop (p≈0,95) é uma composição sólida: texto à esquerda, produto real à direita, números embaixo.
- A ideia de "acender a luz" conversa com a lâmpada do tema no header. O conceito é seu, não de template.
- Mostrar sistemas reais (Internship Tracker) em vez de mockups genéricos.

**O que parece fraco ou genérico**
- **A luz em si.** O "acender" são três blobs radiais violeta/magenta/azul sobre uma grade. Esse é o visual "gradiente roxo de landing page de IA". É a parte mais genérica do hero e justamente o que a cena 3D deve substituir.
- **O meio da transição (p≈0,3).** O título fica cinza e lavado enquanto a luz sobe. Parece estado de carregamento ou desabilitado, não "acendendo". Nada na tela fica mais claro do que antes. A luz não ilumina nada, só tinge o fundo.
- **No tema claro o conceito quebra.** A página já começa clara, então "role para acender a luz" não tem o que acender. A rolagem só adiciona um véu lilás.
- **O HUD** (cantos, "sistema sob medida", "deploy") é decoração de "interface sci-fi" que não diz nada. Ocupa as bordas, que seriam úteis para a cena.
- **A etapa p≈0,6** é uma screenshot centralizada com duas tortas atrás: o "browser mockup" mais comum que existe.
- **Fantasma do fechamento no topo.** Em p=0, "Sistemas que saem…" aparece muito fraco atrás do título (à esquerda), nos dois temas. O CSS dá `opacity: 0.003` para `.hero-final`, então pode ser algo do Chromium headless. Vale conferir num navegador real.
- **Mobile.** No início, o terço de baixo da tela fica vazio. No fim, o fechamento ocupa a tela inteira e "Ver projetos" encosta na borda inferior. Não sobra respiro.

**Onde cabe a cena 3D sem brigar com o texto**
- **Desktop, início (p 0→0,3):** o fundo inteiro. O título está centrado e só ocupa a faixa central (~350–1080px × 300–630px). A cena pode ser a tela cheia por trás, com a mesa abaixo da linha do título e a luminária no alto de um dos lados.
- **Desktop, fim (p≥0,7):** a metade direita (~740–1345px × 300–625px) é exatamente onde hoje fica a janela do projeto. É o lugar natural do **monitor**, e a tela do monitor pode ser a própria janela do projeto.
- **Mobile:** no início, a metade de baixo (abaixo do título). No fim, só a faixa de cima (~0–330px), que hoje é a janela do projeto. A cena tem que caber ali ou ficar atrás do texto bem escurecida.

## 3. Blender

`blender --version` **não funciona** no terminal: o Blender não está no PATH.

Está instalado (pelo winget) em:

```
C:\Program Files\Blender Foundation\Blender 5.3\blender.exe
```

`Blender 5.3.0`, build de 2026-11-10. Para configurar, há duas opções: adicionar `C:\Program Files\Blender Foundation\Blender 5.3` ao PATH do usuário, ou chamar o caminho completo nos scripts de render (`& "C:\Program Files\Blender Foundation\Blender 5.3\blender.exe" -b cena.blend -a`).

## 4. Como eu encaixaria a animação

**Regra geral.** A cena substitui só `.hero-light` e `.hero-grid` (o fundo decorativo). Texto, CTAs e a coreografia de `--p` continuam iguais. Um `<canvas>` no lugar desses dois divs lê o mesmo progresso que `Effects.tsx` já calcula e desenha o frame `round(lit × (N−1))`. Não precisa de lib nova nem de um segundo listener de scroll: reaproveito o `requestAnimationFrame` que já existe. A cena começa escura e termina no `#08060f` exato nas bordas (o último frame encosta no fundo do site, sem emenda).

**Desktop (≥1024px).** Cena 16:9, desenhada em "cover", cerca de 120 frames (~1920px, WebP/AVIF, ~40–80 KB cada, ~5–8 MB no total). A luminária acende entre p 0,04 e 0,38 (a faixa de `--lit`). Depois a câmera aproxima do monitor enquanto o título sai, e no fechamento o monitor fica na metade direita, no lugar da janela do projeto.

**Mobile (<1024px).** Uma sequência própria em retrato (9:16, ~750px, 60–80 frames, ~2–3 MB), com a mesa enquadrada na metade de baixo no início e o monitor no alto no fim, para não ficar atrás do texto do fechamento.

**Carregamento e fallbacks.** O primeiro frame vai como poster `<img>` com prioridade (protege o LCP). Os demais carregam depois do `load`. Com `prefers-reduced-motion`, modo `lite` ou sem JS, fica um frame estático e nada é baixado além dele. Os frames saem direto de `public/`, **sem passar pelo `next/image`**: o último commit mostrou que o otimizador de imagens já chegava a OOM no container, e centenas de frames piorariam isso.

## 5. Decisões tomadas

1. **O hero fica sempre escuro, nos dois temas.** A cena tem uma sequência só, que termina no `#08060f`. No tema claro, o hero continua escuro e o tema claro começa depois dele.
2. **A janela do projeto deixa de ser HTML.** Um print real de um projeto vira a textura da tela do monitor no render. Trocar o print exige renderizar de novo.
3. **O HUD sai** (cantos, "disponível para novos projetos", "deploy", "sistema sob medida").

## 6. A cena no Blender

- **Script:** `scripts/blender/hero_scene.py`. Ele monta a cena por código e importa três modelos: o PC, o teclado e o mouse. Os parâmetros ficam no topo do arquivo, inclusive a tabela de planos de câmera (`SHOTS`).
- **Roteiro (240 frames):**

| frames | trecho |
|---|---|
| 1–30 | Entrada automática: a luminária acende, o RGB liga e a câmera se aproxima. |
| 31–75 | A câmera vai até a luminária e passa pela cúpula acesa. |
| 76–120 | A câmera desce para a mesa: primeiro o teclado de perto, depois o mouse. |
| 121–165 | A câmera vai para o PC: o vidro e as fans de perto. |
| 166–190 | A câmera vira e centraliza no monitor, e a tela acende. |
| 191–240 | A câmera mergulha na tela até ela ocupar o quadro inteiro. |

- **Textura da tela:** `scripts/blender/assets/screen.png` é o print, em 1920×1080 e tema escuro, da seção que vem depois do hero, sem o header.
- **Comandos** (com `& "C:\Program Files\Blender Foundation\Blender 5.3\blender.exe" -b -P scripts/blender/hero_scene.py -- …`):
  - `--test`: só os frames-chave, em baixa resolução, saem em `renders/test/`.
  - `--preview`: os 240 frames em 1280×720, WebP, saem em `renders/preview/`.
  - Sem flag: o render final, que sai em `renders/frames/` (1600×900, 40 amostras, WebP 78%: 6 MB nos 240 frames, o maior com 48 KB). É ele que vai para `public/hero-frames/dark/` (e o `--light`, para `public/hero-frames/light/`), de onde o site lê.
- **Fora do git:** a pasta `renders/` e as pastas dos modelos.

### Modo claro

O hero segue o tema. As duas versões usam a mesma câmera e o mesmo tempo de texto.

| | escuro (padrão) | claro (`-- --light`) |
|---|---|---|
| entrada | as luzes acendem: luminária, RGB, fita de LED | o dia clareia: a persiana abre e o sol entra em listras |
| view transform | AgX (segura as luzes fortes) | Standard (branco de verdade, print da tela com as cores exatas) |
| luminária | acesa | apagada |
| RGB | forte | discreto (luzes coloridas na parede a 10%) |
| tela | `assets/screen.png` | `assets/screen-light.png` |
| frames no site | `public/hero-frames/dark/` | `public/hero-frames/light/` |

- **A persiana:** fica fora do quadro, entre o sol e a mesa. Ela não aparece na câmera nem em reflexos, só projeta as listras.
- **No site:** o canvas baixa só a sequência do tema ativo. Se a pessoa troca de tema pela lâmpada, ele baixa a outra (começando pelo frame que está na tela) e troca no mesmo frame.

## 7. Modelos de terceiros: créditos e licenças

Os três vieram do Sketchfab e estão em `scripts/blender/assets/` (fora do git). Os frames renderizados no site são obras derivadas deles.

| pasta | modelo | autor | licença | o que exige |
|---|---|---|---|---|
| `pc/` | [PC [model]](https://sketchfab.com/3d-models/pc-model-ef80b29ad9f94dfc9af23db81e09de2b) | [Meilov](https://sketchfab.com/meilov3D) | Sketchfab Standard | Pode ser usado em renders e obras derivadas, mas o arquivo do modelo não pode ser redistribuído. |
| `keyboard/` | [Mechanical keyboard](https://sketchfab.com/3d-models/mechanical-keyboard-0161b6232216457aa8f4f3393960ec85) | [virtualtimecapsule](https://sketchfab.com/virtualtimecapsule) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) | Crédito ao autor; uso comercial permitido. |
| `mouse/` | [Razer Mouse](https://sketchfab.com/3d-models/razer-mouse-9f0a3283cbca4454bf04c8d43494247a) | [Fred Drabble](https://sketchfab.com/FredDrabble) | [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) | Crédito ao autor; uso comercial permitido. |

Texto de crédito pedido pelas licenças CC-BY, para colocar onde o site for publicado (rodapé ou README):

> This work is based on "Mechanical keyboard" (https://sketchfab.com/3d-models/mechanical-keyboard-0161b6232216457aa8f4f3393960ec85) by virtualtimecapsule (https://sketchfab.com/virtualtimecapsule) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/).
>
> This work is based on "Razer Mouse" (https://sketchfab.com/3d-models/razer-mouse-9f0a3283cbca4454bf04c8d43494247a) by Fred Drabble (https://sketchfab.com/FredDrabble) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/).

As modificações feitas nos modelos (vale registrar, já que a CC-BY pede indicação de alterações):
- **Teclado:** foi endireitado e nivelado pela base, teve as teclas fora do perfil rebaixadas, a textura escurecida e dessaturada e ganhou retroiluminação RGB entre as teclas.
- **Mouse:** perdeu o cabo e teve o anel recolorido para `#8b5cf6`.
- **PC:** perdeu a base e o cabo e teve os materiais refeitos na paleta do site.
