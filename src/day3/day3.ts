import consola from "consola";

//#region Part 1
function getNumbersAdjacentToSymbols(schematic: string) {
  interface Pos {
    x: number;
    y: number;
  }

  const schematicSize = {
    x: schematic.indexOf("\n"),
    y: schematic.match(/\n/g)?.length || 0,
  };

  /**
   * Is position out of bounds of the schematic.
   */
  const isPosOutOfBounds = (p: Pos): boolean => {
    return !(
      0 <= p.x &&
      p.x < schematicSize.x &&
      0 <= p.y &&
      p.y < schematicSize.y
    );
  };

  /**
   * Get index by XY coordinates. Returns -1 if index is out of bounds.
   */
  const getIndexByPos = (p: Pos): number => {
    return isPosOutOfBounds(p) ? -1 : p.x + p.y * (schematicSize.x + 1);
  };

  /**
   * Get XY coordinates from an index.
   */
  const getPosByIndex = (i: number): Pos => {
    return {
      x: i % (schematicSize.x + 1),
      y: Math.floor(i / (schematicSize.y + 1)),
    };
  };

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const digitRegex = /\d/;
  const symbolRegex = /[^\d\.]/;
  const storedNumbers: number[] = [];

  let currentNumberStr = "";
  let storeCurrentNumber = false;

  for (let i = 0; i < schematic.length; i++) {
    const currentCharacter = schematic[i];
    const currentPos = getPosByIndex(i);

    // If current character is not a digit or we're at the end of a row...
    if (
      +currentCharacter !== +currentCharacter ||
      currentPos.x + 1 > schematicSize.x
    ) {
      // Store current number if it was adjacent to a symbol.
      if (currentNumberStr && storeCurrentNumber) {
        consola.debug(
          "Number",
          currentNumberStr,
          "is next to a symbol. Storing it."
        );
        storedNumbers.push(Number(currentNumberStr));
      }

      currentNumberStr = "";
      storeCurrentNumber = false;

      // Search rest of the string for the next digit.
      const nextDigitSkip = schematic.substring(i).search(digitRegex);

      // End the loop if no next digit was found.
      if (nextDigitSkip === -1) {
        break;
      }

      // Skip loop to the next digit
      i += nextDigitSkip - 1;

      consola.debug(`Next digit is at ${i}`);

      continue;
    }

    // At this point the current character is a digit. We add it to
    // `currentNumberStr` to combine full number from adjacent digits.
    currentNumberStr += currentCharacter;

    // If we haven't determined that the number is adjacent to a symbol...
    if (!storeCurrentNumber) {
      // Look at all adjacent characters
      for (const dir of directions) {
        const adjacentPos: Pos = {
          x: currentPos.x + dir[0],
          y: currentPos.y + dir[1],
        };
        const i2 = getIndexByPos(adjacentPos);
        // If the adjacent position is in bounds and is a symbol...
        if (i2 > -1 && symbolRegex.test(schematic[i2])) {
          consola.debug(
            "Character at",
            adjacentPos,
            "is a symbol:",
            schematic[i2]
          );
          // Store the current number.
          storeCurrentNumber = true;
          break;
        }
      }
    }
  }

  return storedNumbers;
}

export function sumOfPartNumbersInEngineSchematic(input: string): number {
  // Remove blank lines from input
  input = input.replace(/^\s*[\r\n]/gm, "");

  const numbers = getNumbersAdjacentToSymbols(input);

  const result = numbers.reduce((acc, x) => acc + x);

  consola.debug(result);

  return result;
}
//#endregion
