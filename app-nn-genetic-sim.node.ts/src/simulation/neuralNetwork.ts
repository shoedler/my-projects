export class NeuralNetwork {
  public readonly inputSize: number;
  private hiddenSize: number;
  public readonly outputSize: number;
  private weightsInputHidden: number[][];
  private weightsHiddenOutput: number[][];

  constructor(inputSize: number, hiddenSize: number, outputSize: number) {
    this.inputSize = inputSize;
    this.hiddenSize = hiddenSize;
    this.outputSize = outputSize;
    this.weightsInputHidden = this.initializeWeights(inputSize, hiddenSize);
    this.weightsHiddenOutput = this.initializeWeights(hiddenSize, outputSize);
  }

  private initializeWeights(rows: number, cols: number): number[][] {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => Math.random() * 2 - 1)
    );
  }

  private sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
  }

  private feedForward(inputs: number[]): number[] {
    const hidden = this.weightsInputHidden.map((row) =>
      this.sigmoid(row.reduce((sum, weight, j) => sum + weight * inputs[j], 0))
    );
    return this.weightsHiddenOutput.map((row) =>
      this.sigmoid(row.reduce((sum, weight, j) => sum + weight * hidden[j], 0))
    );
  }

  public predict(inputs: number[]): number[] {
    return this.feedForward(inputs);
  }

  public getWeights(): {
    weightsInputHidden: number[][];
    weightsHiddenOutput: number[][];
  } {
    return {
      weightsInputHidden: this.weightsInputHidden,
      weightsHiddenOutput: this.weightsHiddenOutput,
    };
  }

  public setWeights(weights: {
    weightsInputHidden: number[][];
    weightsHiddenOutput: number[][];
  }) {
    this.weightsInputHidden = weights.weightsInputHidden;
    this.weightsHiddenOutput = weights.weightsHiddenOutput;
  }

  public mutate(rate: number) {
    this.weightsInputHidden = this.weightsInputHidden.map((row) =>
      row.map((weight) =>
        Math.random() < rate ? weight + Math.random() * 2 - 1 : weight
      )
    );
    this.weightsHiddenOutput = this.weightsHiddenOutput.map((row) =>
      row.map((weight) =>
        Math.random() < rate ? weight + Math.random() * 2 - 1 : weight
      )
    );
  }

  public crossover(partner: NeuralNetwork): NeuralNetwork {
    const child = new NeuralNetwork(
      this.inputSize,
      this.hiddenSize,
      this.outputSize
    );
    const parentWeights1 = this.getWeights();
    const parentWeights2 = partner.getWeights();

    const mix = (w1: number[][], w2: number[][]) =>
      w1.map((row, i) =>
        row.map((weight, j) => (Math.random() < 0.5 ? weight : w2[i][j]))
      );

    child.setWeights({
      weightsInputHidden: mix(
        parentWeights1.weightsInputHidden,
        parentWeights2.weightsInputHidden
      ),
      weightsHiddenOutput: mix(
        parentWeights1.weightsHiddenOutput,
        parentWeights2.weightsHiddenOutput
      ),
    });

    return child;
  }
}
