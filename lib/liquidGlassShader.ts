// Adapted from arya3d/liquid-glass-webgpu, commit 90cb739.
// MIT license and copyright: /licenses/liquid-glass-webgpu.txt
export const liquidGlassShader = /* wgsl */ `
struct Glass {
  rect: vec4f,
  viewport: vec4f,
  surface: vec4f,
  light: vec4f,
};

@group(0) @binding(0) var<uniform> glass: Glass;
@group(0) @binding(1) var backdropSampler: sampler;
@group(0) @binding(2) var backdrop: texture_2d<f32>;

@vertex
fn vertex(@builtin(vertex_index) index: u32) -> @builtin(position) vec4f {
  let corners = array<vec2f, 3>(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0));
  return vec4f(corners[index], 0.0, 1.0);
}

fn roundedBoxDistance(point: vec2f, halfSize: vec2f, radius: f32) -> f32 {
  let corner = abs(point) - halfSize + radius;
  return length(max(corner, vec2f(0.0))) + min(max(corner.x, corner.y), 0.0) - radius;
}

fn fresnel(facing: f32) -> f32 {
  return 0.04 + 0.96 * pow(1.0 - facing, 5.0);
}

fn scene(pixel: vec2f) -> vec4f {
  return textureSampleLevel(backdrop, backdropSampler, pixel / glass.viewport.xy, 0.0);
}

fn lensOffset(normal: vec3f, index: f32, thickness: f32) -> vec2f {
  let ray = refract(vec3f(0.0, 0.0, -1.0), normal, 1.0 / index);
  return ray.xy * (thickness / max(0.1, -ray.z));
}

@fragment
fn fragment(@builtin(position) coord: vec4f) -> @location(0) vec4f {
  let local = coord.xy / glass.viewport.zw * glass.rect.zw;
  let halfSize = glass.rect.zw * 0.5;
  let point = local - halfSize;
  let radius = glass.surface.x;
  let distance = roundedBoxDistance(point, halfSize - 0.5, radius);
  let coverage = 1.0 - smoothstep(-0.8, 0.4, distance);
  if (coverage <= 0.0) { return vec4f(0.0); }

  let depth = max(0.0, -distance);
  let shoulder = exp(-depth / glass.surface.y);
  let dx = roundedBoxDistance(point + vec2f(1.0, 0.0), halfSize, radius)
         - roundedBoxDistance(point - vec2f(1.0, 0.0), halfSize, radius);
  let dy = roundedBoxDistance(point + vec2f(0.0, 1.0), halfSize, radius)
         - roundedBoxDistance(point - vec2f(0.0, 1.0), halfSize, radius);
  // An elliptical shoulder rises quickly near the rim and levels into a flat face.
  let bevelDepth = clamp(depth / glass.surface.y, 0.012, 1.0);
  let slope = 0.58 * (1.0 - bevelDepth) * inverseSqrt(bevelDepth * (2.0 - bevelDepth));
  let normal = normalize(vec3f(vec2f(dx, dy) * (0.5 * slope), 1.0));
  let facing = normal.z;
  let rim = exp(-abs(distance + 1.5) * 0.92);
  let bevel = exp(-abs(distance + 4.4) * 0.66);
  let thickness = glass.surface.z * (1.0 + glass.light.z * 0.30);
  let pixel = glass.rect.xy + local;
  let red = scene(pixel + lensOffset(normal, 1.41, thickness));
  let green = scene(pixel + lensOffset(normal, 1.50, thickness));
  let blue = scene(pixel + lensOffset(normal, 1.63, thickness));
  let optics = shoulder * 0.92;
  let sampleAlpha = max(red.a, max(green.a, blue.a)) * optics;
  let refraction = vec3f(red.r, green.g, blue.b) * optics;

  let key = normalize(vec3f((glass.light.xy - 0.5) * 2.4 + vec2f(-0.25, -0.6), 0.55));
  let shine = pow(max(dot(normal, normalize(key + vec3f(0.0, 0.0, 1.0))), 0.0), 17.0);
  let falloff = 0.25 + 0.75 * exp(-length((local / glass.rect.zw - glass.light.xy) * vec2f(1.8, 0.7)) * 1.7);
  let rimAlpha = saturate(rim * (0.09 + shine * 1.08 + fresnel(facing) * 0.42) * falloff);
  let reflection = bevel * (0.04 + shine * 0.22) * falloff;
  // Offset the inner reflections by wavelength, even against a dark backdrop.
  let split = vec3f(
    exp(-abs(depth - 2.8) * 1.8),
    exp(-abs(depth - 4.0) * 1.8),
    exp(-abs(depth - 5.3) * 1.8)
  ) * (0.06 + shine * 0.25) * falloff;
  let edgeAlpha = saturate(rimAlpha + reflection + max(split.r, max(split.g, split.b)));
  let edgeColor = min(vec3f(edgeAlpha),
    vec3f(0.96, 0.99, 1.0) * rimAlpha + vec3f(0.71, 0.83, 1.0) * reflection + split
  );
  let opacity = coverage * glass.surface.w;
  return vec4f(
    (edgeColor + refraction * (1.0 - edgeAlpha)) * opacity,
    (edgeAlpha + sampleAlpha * (1.0 - edgeAlpha)) * opacity
  );
}
`;
