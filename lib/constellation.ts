type Point = readonly [x: number, y: number, z: number];
type Coordinates = readonly [x: number, y: number];
type Segment = {
  from: Coordinates;
  to: Coordinates;
  weight: number;
  spread: number;
  depth: number;
};
type Shape = 0 | 1 | 2;

const TAU = 2 * Math.PI;
const PALETTE = ["99,123,255", "144,114,255", "185,133,255", "216,173,255", "247,232,255", "162,208,255"];
const STAR_PATH = "M0 -.98 C-.04 -.24 -.24 -.04 -.98 0 C-.24 .04 -.04 .24 0 .98 C.04 .24 .24 .04 .98 0 C.24 -.04 .04 -.24 0 -.98Z";
const WORKSPACE_FRAME: Coordinates[] = [[-1.04, -.56], [1.04, -.56], [1.10, -.50], [1.10, .52], [1.04, .58], [-1.04, .58], [-1.10, .52], [-1.10, -.50], [-1.04, -.56]];
const DOCUMENT_FRAME: Coordinates[] = [[-.66, -.88], [.26, -.88], [.64, -.49], [.64, .82], [-.66, .82], [-.66, -.88]];

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (from: number, to: number, mix: number) => from + (to - from) * mix;

function line(from: Coordinates, to: Coordinates, weight: number, spread: number, depth: number): Segment {
  return { from, to, weight: Math.hypot(to[0] - from[0], to[1] - from[1]) * weight, spread, depth };
}

function outline(points: Coordinates[], weight: number, spread: number, depth: number) {
  return points.slice(1).map((point, index) => line(points[index], point, weight, spread, depth));
}

const WORKSPACE_LINES = [
  ...outline(WORKSPACE_FRAME, 1.65, .016, .075),
  ...outline(WORKSPACE_FRAME, .62, .014, -.12),
  line([-1.06, -.36], [1.06, -.36], 1.4, .012, .08),
  line([-.57, -.36], [-.57, .55], 1.35, .012, .08),
  ...outline([[-.16, -.17], [-.36, .02], [-.16, .21]], 2.6, .022, .12),
  ...outline([[.64, -.17], [.84, .02], [.64, .21]], 2.6, .022, .12),
  line([.39, -.21], [.09, .25], 2.6, .021, .12),
  ...[-.19, .02, .23, .37].map((y, index) => line([-.96, y], [-.71 - (index % 2) * .075, y], 1.45, .013, .1)),
  line([-.36, .39], [.86, .39], .65, .011, .09),
  ...[-.95, -.84, -.73].map((x) => line([x, -.46], [x + .036, -.46], 3, .018, .08)),
];

const DOCUMENT_LINES = [
  ...outline(DOCUMENT_FRAME, 1.65, .018, .07),
  ...outline(DOCUMENT_FRAME, .53, .014, -.13),
  ...outline([[.26, -.88], [.26, -.49], [.64, -.49]], 1.9, .017, .10),
  ...outline([[-.34, -.08], [-.12, .15], [.30, -.28]], 3.2, .024, .16),
  line([-.38, .40], [.37, .40], 1.55, .013, .09),
  line([-.38, .58], [.21, .58], 1.35, .013, .09),
];

function createParticles(mask: CanvasRenderingContext2D, count: number) {
  let seed = 876512;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const noise = () => random() + random() + random() - 1.5;
  const star = new Path2D(STAR_PATH);

  function starPoint(): Point {
    if (random() < .27) {
      const angle = random() * TAU;
      const radius = .60 + noise() * .023;
      return [Math.cos(angle) * radius, Math.sin(angle) * radius, -.16 + noise() * .09];
    }
    let x: number;
    let y: number;
    do {
      x = random() * 1.96 - .98;
      y = random() * 1.96 - .98;
    } while (!mask.isPointInPath(star, x, y));
    const depth = Math.max(0, 1 - Math.hypot(x, y)) * .14 + .05;
    return [x, y, (random() < .72 ? depth : -depth) + noise() * .08];
  }

  function sampleSegments(segments: Segment[]) {
    let total = 0;
    const stops = segments.map((segment) => {
      total += segment.weight;
      return total;
    });
    return (): Point => {
      const pick = random() * total;
      const { from, to, spread, depth } = segments[stops.findIndex((stop) => pick < stop)];
      const at = random();
      return [lerp(from[0], to[0], at) + noise() * spread, lerp(from[1], to[1], at) + noise() * spread, depth + noise() * .04];
    };
  }

  const workspacePoint = sampleSegments(WORKSPACE_LINES);
  const documentPoint = sampleSegments(DOCUMENT_LINES);
  const particles = Array.from({ length: count }, () => {
    const distance = .28 + 1.18 * Math.sqrt(random());
    const arm = Math.floor(random() * 3) * TAU / 3 + distance * 2.7;
    const angle = random() < .65 ? arm + noise() * 1.25 : random() * TAU;
    const points: readonly [Point, Point, Point] = [starPoint(), workspacePoint(), documentPoint()];
    return { points, angle, distance, phase: random(), depth: random(), size: random(), color: Math.floor(random() * PALETTE.length) };
  });
  const stars = Array.from({ length: 1050 }, () => ({
    x: random(), y: random(), depth: random(), flare: random(), color: Math.floor(random() * PALETTE.length),
  }));
  return { particles, stars };
}

function createSprite(color: string, bright: boolean) {
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = 24;
  const context = sprite.getContext("2d");
  if (!context) return sprite;
  const gradient = context.createRadialGradient(12, 12, 0, 12, 12, 12);
  gradient.addColorStop(0, `rgba(${color},1)`);
  gradient.addColorStop(.25, `rgba(${color},.9)`);
  gradient.addColorStop(.52, `rgba(${color},${bright ? .26 : .10})`);
  gradient.addColorStop(1, `rgba(${color},0)`);
  context.fillStyle = gradient;
  context.fillRect(0, 0, 24, 24);
  return sprite;
}

type Frame = { offset: number; chapter: 0 | 1; progress: number };

export function createConstellationRenderer(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  const mask = document.createElement("canvas").getContext("2d");
  if (!context || !mask || typeof Path2D === "undefined") return null;
  const { particles, stars } = createParticles(mask, 6500);
  const dots = PALETTE.map((color) => createSprite(color, false));
  const sparks = PALETTE.map((color) => createSprite(color, true));
  const centers = [.725, .275, .71];
  const tilts = [.23, -.24, .17];
  const turns = [.20, -.11, -.13];
  let width = 0;
  let height = 0;
  let mobile = false;

  function resize(nextWidth: number, nextHeight: number, compact: boolean) {
    width = nextWidth;
    height = nextHeight;
    mobile = compact;
    const density = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.75);
    canvas.width = Math.round(width * density);
    canvas.height = Math.round(height * density);
    context?.setTransform(density, 0, 0, density, 0, 0);
  }

  function draw({ offset, chapter, progress }: Frame) {
    if (!context || !width || !height) return null;
    const next: Shape = chapter === 0 ? 1 : 2;
    const phase = clamp((progress - .12) / .73);
    const mix = phase * phase * (3 - 2 * phase);
    const dispersal = Math.pow(Math.sin(Math.PI * mix), 1.7);
    const center = mobile ? .5 : lerp(centers[chapter], centers[next], mix);
    const centerX = width * center;
    const centerY = mobile ? 148 : height * .48;
    const scale = mobile ? Math.min(width * .34, 137) : Math.min(width * .205, height * .34);
    const yaw = lerp(tilts[chapter], tilts[next], mix) + Math.sin(offset * .0017) * .13;
    const cosine = Math.cos(yaw);
    const sine = Math.sin(yaw);
    const roll = lerp(turns[chapter], turns[next], mix) + dispersal * .36;
    const rollCos = Math.cos(roll);
    const rollSin = Math.sin(roll);

    context.clearRect(0, 0, width, height);
    const starCount = mobile ? 480 : stars.length;
    for (let index = 0; index < starCount; index++) {
      const star = stars[index];
      const x = star.x * width;
      const drift = offset * (.05 + star.depth * .13);
      const y = ((star.y * height - drift) % height + height) % height;
      const size = 1.2 + star.flare * star.flare * 2.6;
      context.globalAlpha = .13 + star.depth * .47;
      context.drawImage(dots[star.color], x - size / 2, y - size / 2, size, size);
      if (star.flare > .992) {
        context.globalAlpha = .58;
        context.drawImage(sparks[star.color], x - 3.5, y - 3.5, 7, 7);
      }
    }

    const particleCount = mobile ? 3200 : particles.length;
    for (let index = 0; index < particleCount; index++) {
      const point = particles[index];
      const [fromX, fromY, fromZ] = point.points[chapter];
      const [toX, toY, toZ] = point.points[next];
      const angle = point.angle + dispersal * (1.8 + point.phase) + offset * .0006;
      const spread = point.distance * dispersal;
      const x = lerp(fromX, toX, mix) * (1 - dispersal * .30) + Math.cos(angle) * spread;
      const y = lerp(fromY, toY, mix) * (1 - dispersal * .30) + Math.sin(angle) * spread * .70;
      const z = lerp(fromZ, toZ, mix) + (point.depth - .5) * dispersal * .95;
      const rotatedX = x * cosine + z * sine;
      const rotatedZ = z * cosine - x * sine;
      const perspective = 1 / (1 - rotatedZ * .27);
      const px = centerX + (rotatedX * rollCos - y * rollSin) * scale * perspective;
      const py = centerY + (rotatedX * rollSin + y * rollCos) * scale * perspective;
      const band = Math.sin(x * 4.3 - y * 2.7 + rotatedZ * 5);
      const light = clamp(.56 + band * .24 + rotatedZ * .4);
      const hue = band > .69 ? 4 : band < -.35 ? (point.color % 2 === 0 ? 0 : 5) : point.color;
      const bright = point.size > .96 && light > .47;
      const dotSize = ((mobile ? 1.75 : 2) + point.size * point.size * 2.9 + (bright ? 2.4 : 0)) * perspective;
      context.globalAlpha = (.36 + light * .63) * (1 - dispersal * .18);
      context.drawImage((bright ? sparks : dots)[hue], px - dotSize / 2, py - dotSize / 2, dotSize, dotSize);
    }
    context.globalAlpha = 1;
    return center * 100;
  }

  return { resize, draw };
}
