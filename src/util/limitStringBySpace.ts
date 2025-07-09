export const limitStringBySpace = (text: string | null | undefined, maxLength: number = 300) => {
  if(!text) return '';
  if (text.length <= maxLength) return text;

  // Zoek naar de laatste spatie vóór de limiet
  const breakpoint = text.lastIndexOf(' ', maxLength);

  if (breakpoint === -1) {
    // Geen spatie gevonden, knip gewoon af op max. length
    return text.slice(0, maxLength) + '…';
  }

  // Knip af tot aan de laatste spatie
  return text.slice(0, breakpoint) + '…';
}
