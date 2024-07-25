export function getRandomIndex(array: any[]): number {
  const randomIndex = Math.floor(Math.random() * array.length);
  return randomIndex;
}
