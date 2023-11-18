import { Layer } from '../layer';

export const createLushGreenGrass = (layer: Layer) => {
  const COLORS = [
    [0, 158, 0, 255],
    [10, 158, 10, 255],
    [0, 168, 0, 255],
    [20, 140, 20, 255],
    [0, 178, 0, 255],
  ];

  for (let x = 0; x < layer.width; x++) {
    for (let y = 0; y < layer.height; y++) {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      layer.setTile(x, y, color[0], color[1], color[2], color[3]);
    }
  }
};
