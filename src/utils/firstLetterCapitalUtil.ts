export function FirstLetterCapitalUtil(phrase: string) {
  const phraseFormatted = phrase
    .toLowerCase()
    .replace(
      /([^A-zÀ-ú]?)([A-zÀ-ú]+)/g,
      (match, separator, word) => separator + word.charAt(0).toUpperCase() + word.slice(1),
    );

  return phraseFormatted;
}
