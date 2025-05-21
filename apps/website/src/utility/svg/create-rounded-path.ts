export default function createRoundedCornerPath(
  startX: number,
  startY: number,
  segments: {
    type: "horizontal" | "vertical";
    value: number;
  }[],
  radius: number,
) {
  let path = ``;
  let currentX = startX;
  let currentY = startY;

  for (let i = 0; i < segments.length; i++) {
    const currentSegment = segments[i];
    const nextSegment = segments[i + 1];

    const { newPath, newX, newY } = handleSegment(
      currentSegment,
      nextSegment,
      currentX,
      currentY,
      radius,
    );

    path += newPath;
    currentX = newX;
    currentY = newY;
  }

  return path;

  function handleSegment(
    currentSegment: { type: "horizontal" | "vertical"; value: number },
    nextSegment: { type: "horizontal" | "vertical"; value: number } | undefined,
    currentX: number,
    currentY: number,
    radius: number,
  ) {
    let path = "";
    let newX = currentX;
    let newY = currentY;

    if (currentSegment.type === "horizontal") {
      const { newPath, adjustedX } = handleHorizontalSegment(
        currentSegment,
        nextSegment,
        currentX,
        radius,
      );
      path += newPath;
      newX = adjustedX;
    } else if (currentSegment.type === "vertical") {
      const { newPath, adjustedY } = handleVerticalSegment(
        currentSegment,
        nextSegment,
        currentY,
        radius,
      );
      path += newPath;
      newY = adjustedY;
    }

    if (nextSegment) {
      const { newPath, arcX, arcY } = addArc(
        currentSegment,
        nextSegment,
        newX,
        newY,
        radius,
      );
      path += newPath;
      newX = arcX;
      newY = arcY;
    }

    return { newPath: path, newX, newY };
  }

  function handleHorizontalSegment(
    currentSegment: { type: "horizontal" | "vertical"; value: number },
    nextSegment: { type: "horizontal" | "vertical"; value: number } | undefined,
    currentX: number,
    radius: number,
  ) {
    const targetX = currentSegment.value;
    const dx = targetX - currentX;
    const dirX = dx > 0 ? 1 : -1;

    const adjustedX = nextSegment ? targetX - dirX * radius : targetX;
    const path = ` H ${adjustedX}`;

    return { newPath: path, adjustedX };
  }

  function handleVerticalSegment(
    currentSegment: { type: "horizontal" | "vertical"; value: number },
    nextSegment: { type: "horizontal" | "vertical"; value: number } | undefined,
    currentY: number,
    radius: number,
  ) {
    const targetY = currentSegment.value;
    const dy = targetY - currentY;
    const dirY = dy > 0 ? 1 : -1;

    const adjustedY = nextSegment ? targetY - dirY * radius : targetY;
    const path = ` V ${adjustedY}`;

    return { newPath: path, adjustedY };
  }

  function addArc(
    currentSegment: { type: "horizontal" | "vertical"; value: number },
    nextSegment: { type: "horizontal" | "vertical"; value: number },
    currentX: number,
    currentY: number,
    radius: number,
  ) {
    let path = "";
    let arcX = currentX;
    let arcY = currentY;

    if (currentSegment.type === "horizontal") {
      const dx = currentSegment.value - currentX;
      const dirCurrent = dx > 0 ? 1 : -1;
      const dy = nextSegment.value - currentY;
      const dirNext = dy > 0 ? 1 : -1;

      arcX = currentX + dirCurrent * radius;
      arcY = currentY + dirNext * radius;
      const sweepFlag = dirCurrent * dirNext > 0 ? 1 : 0;

      path = ` A ${radius} ${radius} 0 0 ${sweepFlag} ${arcX} ${arcY}`;
    } else if (currentSegment.type === "vertical") {
      const dy = currentSegment.value - currentY;
      const dirCurrent = dy > 0 ? 1 : -1;
      const dx = nextSegment.value - currentX;
      const dirNext = dx > 0 ? 1 : -1;

      arcX = currentX + dirNext * radius;
      arcY = currentY + dirCurrent * radius;
      const sweepFlag = dirCurrent * dirNext > 0 ? 0 : 1;

      path = ` A ${radius} ${radius} 0 0 ${sweepFlag} ${arcX} ${arcY}`;
    }

    return { newPath: path, arcX, arcY };
  }
}
