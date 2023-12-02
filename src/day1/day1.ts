export function findCalibractionValue(input: string): number {
  // Regex to find first (and possibly last digit on each line)
  const r = /^.*?(\d)(?:.*(\d)|.*$)/gm;
  // Use `matchAll` to get all matches from each line
  const matches = [...input.matchAll(r)];
  // Combine digits. If a line only has a single digit, it is repeated twice.
  const result = matches?.reduce(
    (acc, m) => acc + Number(m[1] + (m[2] ?? m[1])),
    0
  );
  return result;
}
