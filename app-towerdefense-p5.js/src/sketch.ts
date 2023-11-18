import p5 from 'p5';
import { Engine } from './rendering/engine';
import { createLushGreenGrass } from './rendering/layer-generators/lush-green-grass';
import { createRandomPathway } from './rendering/layer-generators/random-pathway';
import { PixelDriver } from './rendering/pixel-driver';

export const PIXEL_DENSITY = 1;
export const TILE_SIZE_PX = 5;

export type GameState = {
  engine: Engine;
};

export const simulation = (p: p5) => {
  window.p = p;

  const state: GameState = {} as GameState;

  p.setup = () => {
    state.engine = new Engine(new PixelDriver(), 60);

    const frame = state.engine.useFrame();
    createLushGreenGrass(frame.baseLayer);
    createRandomPathway(0.9, frame.addLayer());

    p.background(31);
  };

  p.draw = () => {
    state.engine.render();
  };
};
