interface GameRound {
  cubesShown: {
    red: number;
    green: number;
    blue: number;
    [key: string]: number;
  };
}

interface Game {
  id: number;
  rounds: GameRound[];
}

function parseGames(input: string): Game[] {
  // Use `filter` to ignore empty lines.
  const lines = input.split(/[\r\n]+/).filter(Boolean);

  // Each game played is on a separate line
  return lines.map((line) => {
    // Split game info into segments.
    const segments = line.split(/[:;]/);
    // The first segment is separated by `:` and contains the game ID. It is
    // removed from the segments array with `shift()` so that only the
    // individual game rounds remain in the array.
    const id = Number(segments.shift()?.match(/(\d+).*/)?.[1]) ?? 0;
    // Loop through each game round and extract information on the cubes shown.
    const rounds = segments.map((roundStr) => {
      const gameRound: GameRound = {
        cubesShown: {
          red: 0,
          green: 0,
          blue: 0,
        },
      };

      roundStr?.split(",").forEach((x) => {
        const [amount, color] = x.trim().split(" ");
        gameRound.cubesShown[color] =
          (gameRound.cubesShown[color] ?? 0) + Number(amount);
      });

      return gameRound;
    });
    return { id, rounds };
  });
}

//#region Part 1
/**
 * Check if a given game is valid. A game is considered valid if none of the
 * rounds had more cubes of a specific color shown than what's in the bag.
 */
function isGameValid(game: Game): boolean {
  // Need to use `Record<>` here because TS can't narrow keys.
  const numberOfCubesInBag: Record<string, number> = {
    red: 12,
    green: 13,
    blue: 14,
  };

  for (const round of game.rounds) {
    for (const [color, amount] of Object.entries(round.cubesShown)) {
      if (
        !(color in numberOfCubesInBag) ||
        numberOfCubesInBag[color] < amount
      ) {
        return false;
      }
    }
  }
  return true;
}

export function sumOfPossibleGameIds(input: string): number {
  const games: Game[] = parseGames(input);
  const validGames = games.filter(isGameValid);
  const validGamesIdSum = validGames.reduce((acc, x) => acc + x.id, 0);

  return validGamesIdSum;
}
//#endregion

//#region Part 2
export function minimumNumberOfCubesNeededToPlayAGame(
  game: Game
): Record<string, number> {
  const cubesNeeded: Record<string, number> = {};

  for (const round of game.rounds) {
    for (const [color, amount] of Object.entries(round.cubesShown)) {
      cubesNeeded[color] = Math.max(cubesNeeded[color] ?? 0, amount);
    }
  }
  return cubesNeeded;
}

export function sumOfPowerOfSets(input: string): number {
  const games = parseGames(input);

  // Loop through each game
  const result = games.reduce(
    (acc, game) =>
      // Combine results of powers of each game
      acc +
      // Multiply each number of cubes needed for this game. We
      // use`Object.values()` since we only care about the number of the cubes,
      // not their colors.
      Object.values(minimumNumberOfCubesNeededToPlayAGame(game)).reduce(
        (acc, x) => acc * x,
        1
      ),
    0
  );

  return result;
}
//#endregion
