export function randomPosition(
  maxX: number,
  maxY: number
): { x: number; y: number } {
  return { x: Math.random() * maxX, y: Math.random() * maxY };
}

export function randomNearbyPosition(
  base: { x: number; y: number },
  radius: number
): { x: number; y: number } {
  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.random() * radius;
  return {
    x: base.x + distance * Math.cos(angle),
    y: base.y + distance * Math.sin(angle),
  };
}

export function distance(
  a: { x: number; y: number },
  b: { x: number; y: number }
): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function addVectors(
  a: { x: number; y: number },
  b: { x: number; y: number }
): { x: number; y: number } {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function subtractVectors(
  a: { x: number; y: number },
  b: { x: number; y: number }
): { x: number; y: number } {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function multiplyVector(
  a: { x: number; y: number },
  scalar: number
): { x: number; y: number } {
  return { x: a.x * scalar, y: a.y * scalar };
}

export function limitVector(
  a: { x: number; y: number },
  max: number
): { x: number; y: number } {
  const mag = Math.hypot(a.x, a.y);
  if (mag > max) {
    return multiplyVector(a, max / mag);
  }
  return a;
}
