// Refração do vidro líquido (estilo Apple) para as peças .vidro, .vidro-claro e .vl.
// Para cada peça gera um mapa de deslocamento neutro no centro que empurra o fundo
// para dentro perto das bordas, como uma lente, e entrega o filtro SVG em --refracao
// (usado no backdrop-filter do CSS). Só roda em navegadores Chromium, que aceitam
// filtro SVG no backdrop-filter; nos demais o vidro continua fosco, sem distorção.

const SELETOR = '.vidro, .vidro-claro, .vl';
const NS = 'http://www.w3.org/2000/svg';

export function iniciarRefracao() {
  const chromium = (navigator as any).userAgentData?.brands?.some((b: { brand: string }) => b.brand === 'Chromium');
  if (!chromium || matchMedia('(prefers-reduced-transparency: reduce)').matches) return;

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.position = 'absolute';
  document.body.appendChild(svg);

  let contador = 0;
  const ids = new WeakMap<Element, string>();
  const tamanhos = new WeakMap<Element, string>();

  const criar = (tag: string, attrs: Record<string, string | number>) => {
    const el = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
    return el;
  };

  // Mapa em meia resolução (o feImage estica para o tamanho da peça)
  const mapa = (w: number, h: number, raio: number, borda: number) => {
    const f = 0.5;
    const cw = Math.max(2, Math.ceil(w * f)), ch = Math.max(2, Math.ceil(h * f));
    const c = document.createElement('canvas');
    c.width = cw; c.height = ch;
    const ctx = c.getContext('2d')!;
    const img = ctx.createImageData(cw, ch);
    const d = img.data;
    const r = Math.min(raio, w / 2, h / 2);
    for (let j = 0; j < ch; j++) {
      for (let i = 0; i < cw; i++) {
        const x = (i + 0.5) / f, y = (j + 0.5) / f;
        const cx = x - w / 2, cy = y - h / 2;
        const px = Math.abs(cx) - (w / 2 - r), py = Math.abs(cy) - (h / 2 - r);
        const ox = Math.max(px, 0), oy = Math.max(py, 0);
        const dist = -(Math.hypot(ox, oy) + Math.min(Math.max(px, py), 0) - r); // > 0 dentro
        let dx = 0, dy = 0;
        if (dist > 0 && dist < borda) {
          const m = Math.pow(1 - dist / borda, 1.7); // forte na borda, some rumo ao centro
          let nx = 0, ny = 0;
          if (px > 0 && py > 0) { const l = Math.hypot(ox, oy) || 1; nx = ox / l; ny = oy / l; }
          else if (px > py) nx = 1; else ny = 1;
          dx = -nx * Math.sign(cx) * m;
          dy = -ny * Math.sign(cy) * m;
        }
        const k = (j * cw + i) * 4;
        d[k] = 128 + dx * 127; d[k + 1] = 128 + dy * 127; d[k + 2] = 128; d[k + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    return c.toDataURL();
  };

  const aplicar = (el: HTMLElement) => {
    const w = Math.round(el.offsetWidth), h = Math.round(el.offsetHeight);
    if (w < 24 || h < 24) return;
    const chave = `${w}x${h}`;
    if (tamanhos.get(el) === chave) return;
    tamanhos.set(el, chave);

    const menor = Math.min(w, h);
    const raio = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
    const borda = Math.max(8, Number(el.dataset.borda) || menor * (h < 70 ? 0.5 : 0.24));
    const escuro = el.classList.contains('vidro');
    const escala = Number(el.dataset.escala) || Math.min(escuro ? 44 : 60, Math.max(8, menor * 0.2));

    let id = ids.get(el);
    if (!id) { id = `refracao-${contador++}`; ids.set(el, id); }
    svg.querySelector(`#${id}`)?.remove();

    const filtro = criar('filter', { id, x: 0, y: 0, width: w, height: h, filterUnits: 'userSpaceOnUse', primitiveUnits: 'userSpaceOnUse', 'color-interpolation-filters': 'sRGB' });
    const imagem = criar('feImage', { x: 0, y: 0, width: w, height: h, preserveAspectRatio: 'none', result: 'mapa' });
    imagem.setAttribute('href', mapa(w, h, raio, borda));
    filtro.appendChild(imagem);

    if (menor > 120) {
      // leve aberração cromática: cada canal desloca um pouco diferente
      const canais: [string, number, string][] = [
        ['R', 1.08, '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0'],
        ['G', 1, '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0'],
        ['B', 0.92, '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0'],
      ];
      for (const [c, k, m] of canais) {
        filtro.appendChild(criar('feDisplacementMap', { in: 'SourceGraphic', in2: 'mapa', scale: escala * k, xChannelSelector: 'R', yChannelSelector: 'G', result: `d${c}` }));
        filtro.appendChild(criar('feColorMatrix', { in: `d${c}`, type: 'matrix', values: m, result: `c${c}` }));
      }
      filtro.appendChild(criar('feBlend', { in: 'cR', in2: 'cG', mode: 'screen', result: 'rg' }));
      filtro.appendChild(criar('feBlend', { in: 'rg', in2: 'cB', mode: 'screen' }));
    } else {
      filtro.appendChild(criar('feDisplacementMap', { in: 'SourceGraphic', in2: 'mapa', scale: escala, xChannelSelector: 'R', yChannelSelector: 'G' }));
    }
    svg.appendChild(filtro);
    el.style.setProperty('--refracao', `url(#${id})`);
  };

  // Recalcula quando a peça muda de tamanho (troca de layout, fonte carregada etc.)
  const esperas = new WeakMap<Element, number>();
  const ro = new ResizeObserver((itens) => {
    for (const i of itens) {
      const el = i.target as HTMLElement;
      clearTimeout(esperas.get(el));
      esperas.set(el, window.setTimeout(() => aplicar(el), 120));
    }
  });

  // Só gera o mapa quando a peça chega perto da tela
  const io = new IntersectionObserver((itens) => {
    for (const i of itens) {
      if (!i.isIntersecting) continue;
      io.unobserve(i.target);
      aplicar(i.target as HTMLElement);
      ro.observe(i.target);
    }
  }, { rootMargin: '300px 0px' });

  document.querySelectorAll<HTMLElement>(SELETOR).forEach((el) => {
    if (!el.closest('[data-sem-refracao]')) io.observe(el);
  });
}
