type Vec2 = { x: number; y: number };

interface DemoState {
  pointer: Vec2;
  targetPointer: Vec2;
  time: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function createVertices() {
  const points: Array<[number, number, number]> = [];
  const rings = 48;
  const spokes = 24;

  for (let ring = 0; ring < rings; ring += 1) {
    const phi = (ring / rings) * Math.PI;
    for (let spoke = 0; spoke < spokes; spoke += 1) {
      const theta = (spoke / spokes) * Math.PI * 2;
      const radius = 0.28 + 0.42 * Math.sin(phi * 2) * Math.cos(theta * 3);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      points.push([x, y, z]);
    }
  }

  return points;
}

function project(point: [number, number, number], width: number, height: number, rotation: number, pointer: Vec2) {
  const [x0, y0, z0] = point;
  const cosY = Math.cos(rotation * 0.65 + pointer.x * 1.2);
  const sinY = Math.sin(rotation * 0.65 + pointer.x * 1.2);
  const cosX = Math.cos(rotation * 0.42 + pointer.y * 1.1);
  const sinX = Math.sin(rotation * 0.42 + pointer.y * 1.1);

  const x1 = x0 * cosY - z0 * sinY;
  const z1 = x0 * sinY + z0 * cosY;
  const y1 = y0 * cosX - z1 * sinX;
  const z2 = y0 * sinX + z1 * cosX + 1.45;

  const scale = 320 / z2;
  return {
    x: width / 2 + x1 * scale,
    y: height / 2 + y1 * scale,
    depth: z2
  };
}

function drawScene(canvas: HTMLCanvasElement, state: DemoState, vertices: Array<[number, number, number]>) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || canvas.width;
  const height = canvas.clientHeight || canvas.height;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#112531");
  gradient.addColorStop(1, "#e7b78c");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const faint = ctx.createRadialGradient(width * 0.7, height * 0.2, 10, width * 0.7, height * 0.2, width * 0.9);
  faint.addColorStop(0, "rgba(255,255,255,0.22)");
  faint.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = faint;
  ctx.fillRect(0, 0, width, height);

  const center = { x: width / 2, y: height / 2 };
  const projected = vertices
    .map((vertex) => project(vertex, width, height, state.time, state.pointer))
    .sort((a, b) => b.depth - a.depth);

  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  for (let index = 0; index < projected.length; index += 1) {
    const point = projected[index];
    const alpha = clamp(1.8 - point.depth, 0.08, 0.38);
    ctx.fillStyle = `rgba(255, 248, 240, ${alpha})`;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 1.4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.lineWidth = 1.1;
  ctx.strokeStyle = "rgba(255, 248, 240, 0.24)";
  for (let i = 0; i < projected.length - 1; i += 4) {
    const a = projected[i];
    const b = projected[(i + 7) % projected.length];
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(17, 37, 49, 0.28)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(center.x, center.y, Math.min(width, height) * 0.24, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

export function startWebGLDemo(canvasId: string) {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
  if (!canvas) {
    return;
  }

  const state: DemoState = {
    pointer: { x: 0, y: 0 },
    targetPointer: { x: 0, y: 0 },
    time: 0
  };

  const vertices = createVertices();

  const updatePointer = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    state.targetPointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    state.targetPointer.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
  };

  canvas.addEventListener("pointermove", updatePointer);
  canvas.addEventListener("pointerleave", () => {
    state.targetPointer.x = 0;
    state.targetPointer.y = 0;
  });

  const frame = () => {
    state.pointer.x += (state.targetPointer.x - state.pointer.x) * 0.08;
    state.pointer.y += (state.targetPointer.y - state.pointer.y) * 0.08;
    state.time += 0.01;
    drawScene(canvas, state, vertices);
    requestAnimationFrame(frame);
  };

  frame();
}
