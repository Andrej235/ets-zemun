import Vector2 from "./vector2";

export default function createCirclePath(
  radius: number,
  centerX: number,
  centerY: number
): string;

export default function createCirclePath(
  radius: number,
  center: Vector2
): string;

export default function createCirclePath(
  radius: number,
  centerX: number | Vector2,
  centerY?: number
): string {
  centerY ??= 0;
  if (typeof centerX === "object") {
    centerY = centerX.y;
    centerX = centerX.x;
  }

  // Magic number for cubic Bézier circle approximation
  const k = radius * 0.5522847;

  // Format numbers to 4 decimal places and trim trailing zeros
  const format = (n: number) => n.toFixed(4).replace(/\.?0+$/, "");

  return [
    // Move to starting point (rightmost position)
    `M ${format(centerX + radius)} ${format(centerY)}`,
    // Top-right quadrant
    `C ${format(centerX + radius)} ${format(centerY - k)}`,
    `${format(centerX + k)} ${format(centerY - radius)}`,
    `${format(centerX)} ${format(centerY - radius)}`,
    // Top-left quadrant
    `C ${format(centerX - k)} ${format(centerY - radius)}`,
    `${format(centerX - radius)} ${format(centerY - k)}`,
    `${format(centerX - radius)} ${format(centerY)}`,
    // Bottom-left quadrant
    `C ${format(centerX - radius)} ${format(centerY + k)}`,
    `${format(centerX - k)} ${format(centerY + radius)}`,
    `${format(centerX)} ${format(centerY + radius)}`,
    // Bottom-right quadrant
    `C ${format(centerX + k)} ${format(centerY + radius)}`,
    `${format(centerX + radius)} ${format(centerY + k)}`,
    `${format(centerX + radius)} ${format(centerY)}`,
    "Z", // Close path
  ].join(" ");
}

