export default function getPathTotalLength(pathString: string): number {
  const tokens =
    pathString.match(/[A-Za-z]|[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g) ||
    [];
  let totalLength = 0;
  let currentX = 0;
  let currentY = 0;
  let prevControlX: number | null = null;
  let prevControlY: number | null = null;
  let prevQControlX: number | null = null;
  let prevQControlY: number | null = null;
  let i = 0;

  const splitParams = (params: number[], perSegment: number): number[][] => {
    const segments: number[][] = [];
    for (let i = 0; i < params.length; i += perSegment) {
      const segment = params.slice(i, i + perSegment);
      if (segment.length === perSegment) segments.push(segment);
    }
    return segments;
  };

  const approximateCubicBezierLength = (
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    steps = 100
  ): number => {
    let length = 0;
    let prevX = x0;
    let prevY = y0;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const currentX =
        (1 - t) ** 3 * x0 +
        3 * (1 - t) ** 2 * t * x1 +
        3 * (1 - t) * t ** 2 * x2 +
        t ** 3 * x3;
      const currentY =
        (1 - t) ** 3 * y0 +
        3 * (1 - t) ** 2 * t * y1 +
        3 * (1 - t) * t ** 2 * y2 +
        t ** 3 * y3;
      const dx = currentX - prevX;
      const dy = currentY - prevY;
      length += Math.sqrt(dx * dx + dy * dy);
      prevX = currentX;
      prevY = currentY;
    }
    return length;
  };

  const approximateQuadraticBezierLength = (
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    steps = 100
  ): number => {
    let length = 0;
    let prevX = x0;
    let prevY = y0;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const currentX = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * x1 + t ** 2 * x2;
      const currentY = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * y1 + t ** 2 * y2;
      const dx = currentX - prevX;
      const dy = currentY - prevY;
      length += Math.sqrt(dx * dx + dy * dy);
      prevX = currentX;
      prevY = currentY;
    }
    return length;
  };

  const approximateEllipticalArcLength = (
    x0: number,
    y0: number,
    x: number,
    y: number,
    rx: number,
    ry: number,
    phi: number,
    largeArcFlag: boolean,
    sweepFlag: boolean,
    steps = 100
  ): number => {
    if (rx === 0 || ry === 0) return Math.hypot(x - x0, y - y0);

    const cosPhi = Math.cos(phi);
    const sinPhi = Math.sin(phi);
    const dx = (x0 - x) / 2;
    const dy = (y0 - y) / 2;
    const x0p = cosPhi * dx + sinPhi * dy;
    const y0p = -sinPhi * dx + cosPhi * dy;
    const lambda = x0p ** 2 / rx ** 2 + y0p ** 2 / ry ** 2;
    if (lambda > 1) {
      const sqrtLambda = Math.sqrt(lambda);
      rx *= sqrtLambda;
      ry *= sqrtLambda;
    }

    const denominator = Math.sqrt(
      (rx ** 2 * ry ** 2 - rx ** 2 * y0p ** 2 - ry ** 2 * x0p ** 2) /
        (rx ** 2 * y0p ** 2 + ry ** 2 * x0p ** 2)
    );
    const cxp =
      (largeArcFlag === sweepFlag ? -1 : 1) * denominator * ((rx * y0p) / ry);
    const cyp =
      (largeArcFlag === sweepFlag ? -1 : 1) * denominator * ((-ry * x0p) / rx);
    const cx = cosPhi * cxp - sinPhi * cyp + (x0 + x) / 2;
    const cy = sinPhi * cxp + cosPhi * cyp + (y0 + y) / 2;
    const theta1 = Math.atan2((y0p - cyp) / ry, (x0p - cxp) / rx);
    const theta2 = Math.atan2((-y0p - cyp) / ry, (-x0p - cxp) / rx);
    let thetaDelta = theta2 - theta1;

    if (!sweepFlag && thetaDelta > 0) thetaDelta -= 2 * Math.PI;
    else if (sweepFlag && thetaDelta < 0) thetaDelta += 2 * Math.PI;

    let length = 0;
    let prevX = x0;
    let prevY = y0;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const theta = theta1 + t * thetaDelta;
      const currentX =
        cx + rx * Math.cos(theta) * cosPhi - ry * Math.sin(theta) * sinPhi;
      const currentY =
        cy + rx * Math.cos(theta) * sinPhi + ry * Math.sin(theta) * cosPhi;
      const dx = currentX - prevX;
      const dy = currentY - prevY;
      length += Math.hypot(dx, dy);
      prevX = currentX;
      prevY = currentY;
    }
    return length;
  };

  while (i < tokens.length) {
    const token = tokens[i];
    if (/^[A-Za-z]$/.test(token)) {
      const cmd = token.toUpperCase();
      const isAbsolute = token === cmd;
      i++;
      const params: number[] = [];
      while (i < tokens.length && !/[A-Za-z]/.test(tokens[i])) {
        params.push(parseFloat(tokens[i]));
        i++;
      }
      switch (cmd) {
        case "M": {
          const segments = splitParams(params, 2);
          if (!segments.length) break;
          const [x, y] = segments[0];
          if (isAbsolute) {
            currentX = x;
            currentY = y;
          } else {
            currentX += x;
            currentY += y;
          }
          for (let j = 1; j < segments.length; j++) {
            const [x, y] = segments[j];
            const newX = isAbsolute ? x : currentX + x;
            const newY = isAbsolute ? y : currentY + y;
            totalLength += Math.hypot(newX - currentX, newY - currentY);
            currentX = newX;
            currentY = newY;
          }
          break;
        }
        case "L": {
          const segments = splitParams(params, 2);
          for (const [xParam, yParam] of segments) {
            const newX = isAbsolute ? xParam : currentX + xParam;
            const newY = isAbsolute ? yParam : currentY + yParam;
            totalLength += Math.hypot(newX - currentX, newY - currentY);
            currentX = newX;
            currentY = newY;
          }
          break;
        }
        case "H": {
          const segments = splitParams(params, 1);
          for (const [xParam] of segments) {
            const newX = isAbsolute ? xParam : currentX + xParam;
            totalLength += Math.abs(newX - currentX);
            currentX = newX;
          }
          break;
        }
        case "V": {
          const segments = splitParams(params, 1);
          for (const [yParam] of segments) {
            const newY = isAbsolute ? yParam : currentY + yParam;
            totalLength += Math.abs(newY - currentY);
            currentY = newY;
          }
          break;
        }
        case "C": {
          const segments = splitParams(params, 6);
          for (const [x1, y1, x2, y2, x, y] of segments) {
            const cx1 = isAbsolute ? x1 : currentX + x1;
            const cy1 = isAbsolute ? y1 : currentY + y1;
            const cx2 = isAbsolute ? x2 : currentX + x2;
            const cy2 = isAbsolute ? y2 : currentY + y2;
            const cx = isAbsolute ? x : currentX + x;
            const cy = isAbsolute ? y : currentY + y;
            totalLength += approximateCubicBezierLength(
              currentX,
              currentY,
              cx1,
              cy1,
              cx2,
              cy2,
              cx,
              cy
            );
            currentX = cx;
            currentY = cy;
            prevControlX = cx2;
            prevControlY = cy2;
          }
          break;
        }
        case "S": {
          const segments = splitParams(params, 4);
          for (const [x2, y2, x, y] of segments) {
            const cx1 =
              prevControlX !== null ? 2 * currentX - prevControlX : currentX;
            const cy1 =
              prevControlY !== null ? 2 * currentY - prevControlY : currentY;
            const cx2 = isAbsolute ? x2 : currentX + x2;
            const cy2 = isAbsolute ? y2 : currentY + y2;
            const cx = isAbsolute ? x : currentX + x;
            const cy = isAbsolute ? y : currentY + y;
            totalLength += approximateCubicBezierLength(
              currentX,
              currentY,
              cx1,
              cy1,
              cx2,
              cy2,
              cx,
              cy
            );
            currentX = cx;
            currentY = cy;
            prevControlX = cx2;
            prevControlY = cy2;
          }
          break;
        }
        case "Q": {
          const segments = splitParams(params, 4);
          for (const [x1, y1, x, y] of segments) {
            const cx1 = isAbsolute ? x1 : currentX + x1;
            const cy1 = isAbsolute ? y1 : currentY + y1;
            const cx = isAbsolute ? x : currentX + x;
            const cy = isAbsolute ? y : currentY + y;
            totalLength += approximateQuadraticBezierLength(
              currentX,
              currentY,
              cx1,
              cy1,
              cx,
              cy
            );
            currentX = cx;
            currentY = cy;
            prevQControlX = cx1;
            prevQControlY = cy1;
          }
          break;
        }
        case "T": {
          const segments = splitParams(params, 2);
          for (const [x, y] of segments) {
            const cx1: number =
              prevQControlX !== null ? 2 * currentX - prevQControlX : currentX;
            const cy1: number =
              prevQControlY !== null ? 2 * currentY - prevQControlY : currentY;
            const cx = isAbsolute ? x : currentX + x;
            const cy = isAbsolute ? y : currentY + y;
            totalLength += approximateQuadraticBezierLength(
              currentX,
              currentY,
              cx1,
              cy1,
              cx,
              cy
            );
            currentX = cx;
            currentY = cy;
            prevQControlX = cx1;
            prevQControlY = cy1;
          }
          break;
        }
        case "A": {
          const segments = splitParams(params, 7);
          for (const [rx, ry, phi, largeArc, sweep, x, y] of segments) {
            const cx = isAbsolute ? x : currentX + x;
            const cy = isAbsolute ? y : currentY + y;
            totalLength += approximateEllipticalArcLength(
              currentX,
              currentY,
              cx,
              cy,
              rx,
              ry,
              (phi * Math.PI) / 180,
              largeArc !== 0,
              sweep !== 0
            );
            currentX = cx;
            currentY = cy;
          }
          break;
        }
      }
    } else {
      i++;
    }
  }
  return totalLength;
}

