export function getRandomPrice(min = 9.9, max = 99.9) {
  const price = Math.random() * (max - min) + min;
  return Number(price.toFixed(2));
}
