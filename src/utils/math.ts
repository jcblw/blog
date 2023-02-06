export type Point = [number, number]

export const normalize = (
  n: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number
) => ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2

export const distance = ([x, y]: Point, [x1, y1]: Point) =>
  Math.hypot(x - x1, y - y1)

export const angleToRadian = (x: number) => x * 0.0174533

export const radianBetweenPoints = (p1: Point, p2: Point) =>
  Math.atan2(p2[1] - p1[1], p2[0] - p1[0])

export const getPointOnCircle = (
  cx: number,
  cy: number,
  radian: number,
  radius: number
): Point => [cx + radius * Math.cos(radian), cy + radius * Math.sin(radian)]
