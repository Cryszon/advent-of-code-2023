const numbers = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

export function textOrNumberToNumber(text: string): number {
  // Return digits as numbers.
  if (!isNaN(Number(text))) {
    return Number(text);
  }

  // Find out, which array index this textual number corresponds to and return
  // it. There's no
  return numbers.indexOf(text.toLowerCase());
}

export function findCalibractionValue(input: string): number {
  // Construct number finding regex segment
  const numberR = "\\d|" + numbers.join("|");
  // Regex to find first (and possibly last digit on each line)
  const r = new RegExp(`^.*?(${numberR})(?:.*(${numberR})|.*$)`, "gm");
  // Use `matchAll` to get all matches from each line
  const matches = [...input.matchAll(r)];
  // Combine digits. If a line only has a single digit, it is repeated twice.
  const result = matches?.reduce((acc, m) => {
    const number1 = textOrNumberToNumber(m[1]);
    const number2 = textOrNumberToNumber(m[2] ?? m[1]);
    return acc + Number(`${number1}${number2}`);
  }, 0);
  return result;
}
