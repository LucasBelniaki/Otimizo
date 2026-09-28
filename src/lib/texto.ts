// Converte um trecho da copy em HTML seguro:
// - [pendência] vira <mark class="pend"> (destaque amarelo para o time preencher)
// - **negrito** vira <strong>
const escapar = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function copy(texto: string): string {
  return escapar(texto)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]/g, '<mark class="pend">[$1]</mark>');
}
