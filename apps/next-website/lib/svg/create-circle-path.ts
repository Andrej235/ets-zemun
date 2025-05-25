import Vector2 from "./vector2";

export default function createCirclePath(
  radius: number,
  centerX: number,
  centerY: number,
): string;

export default function createCirclePath(
  radius: number,
  center: Vector2,
): string;

export default function createCirclePath(
  radius: number,
  centerX: number | Vector2,
  centerY?: number,
): string {
  centerY ??= 0;
  if (typeof centerX === "object") {
    centerY = centerX.y;
    centerX = centerX.x;
  }

  const k = radius * 0.5522847; // Bézier curvature factor
  const format = (n: number) => n.toFixed(4).replace(/\.?0+$/, "");

  return [
    // Top-right quadrant (drawing clockwise to 3 o'clock)
    `C ${format(centerX + k)} ${format(centerY - radius)}`,
    `${format(centerX + radius)} ${format(centerY - k)}`,
    `${format(centerX + radius)} ${format(centerY)}`,

    // Bottom-right quadrant (drawing clockwise to 6 o'clock)
    `C ${format(centerX + radius)} ${format(centerY + k)}`,
    `${format(centerX + k)} ${format(centerY + radius)}`,
    `${format(centerX)} ${format(centerY + radius)}`,

    // Bottom-left quadrant (drawing clockwise to 9 o'clock)
    `C ${format(centerX - k)} ${format(centerY + radius)}`,
    `${format(centerX - radius)} ${format(centerY + k)}`,
    `${format(centerX - radius)} ${format(centerY)}`,

    // Top-left quadrant (drawing clockwise back to 12 o'clock)
    `C ${format(centerX - radius)} ${format(centerY - k)}`,
    `${format(centerX - k)} ${format(centerY - radius)}`,
    `${format(centerX)} ${format(centerY - radius)}`,

    // Top-right quadrant (drawing clockwise to 3 o'clock)
    `C ${format(centerX + k)} ${format(centerY - radius)}`,
    `${format(centerX + radius)} ${format(centerY - k)}`,
    `${format(centerX + radius)} ${format(centerY)}`,

    // Bottom-right quadrant (drawing clockwise to 6 o'clock)
    `C ${format(centerX + radius)} ${format(centerY + k)}`,
    `${format(centerX + k)} ${format(centerY + radius)}`,
    `${format(centerX)} ${format(centerY + radius)}`,
  ].join(" ");
}
