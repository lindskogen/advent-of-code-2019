import { Channel } from "@jfet97/csp";
import "@jfet97/csp/dist/operators/broadcast";
import { parseInput, runProgram } from "./program";

function* permute<T>(a: T[], n = a.length): Generator<T[]> {
  if (n <= 1) {
    yield a.slice();
  } else {
    for (let i = 0; i < n; i++) {
      yield* permute(a, n - 1);
      const j = n % 2 ? 0 : i;
      [a[n - 1], a[j]] = [a[j], a[n - 1]];
    }
  }
}

const range = (n: number) => [...Array(n).keys()];

export const maxThrusters = async (program: string): Promise<number> => {
  const codes = parseInput(program);

  const outputsChannel = new Channel<number>();

  for (let input of permute([5, 6, 7, 8, 9])) {
    const programChannels = range(input.length).map(() => ({
      input: new Channel<number>(),
      output: new Channel<number>()
    }));



    let promises = Promise.all(
      input.map((setting, index) =>
        runProgram(index, codes.slice(), programChannels[index].input, programChannels[index].output)
      )
    );

    programChannels.forEach((channel, i) => {
      channel.input.put(input[i]);
      channel.output.broadcast(
        programChannels[(i + 1) % programChannels.length].input,
        outputsChannel
      );
    });

    await programChannels[0].input.put(0);

    await promises;
  }
  const outputs = await outputsChannel.drain();

  return outputs.reduce((max, output) => {
    if (output > max) {
      return output;
    }
    return max;
  }, 0);
};
