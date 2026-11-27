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

fn scene(pixel: vec2f) -> vec3f {
  return textureSampleLevel(backdrop, backdropSampler, pixel / glass.viewport.xy, 0.0).rgb;
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
  let normal = normalize(vec3f(vec2f(dx, dy) * shoulder, 0.7));
  let facing = normal.z;
  let rim = exp(-abs(distance + 1.0) * 0.65);
  let bend = normal.xy * glass.surface.z * (1.0 + glass.light.w * 0.32);
  let dispersion = normal.xy * shoulder * 2.8;
  let pixel = glass.rect.xy + local - bend;
  let refracted = vec3f(
    scene(pixel - dispersion).r,
    scene(pixel).g,
    scene(pixel + dispersion).b
  );

  let key = normalize(vec3f((glass.light.xy - 0.5) * 2.1 + vec2f(-0.38, -0.75), 0.78));
  let shine = pow(max(dot(normal, normalize(key + vec3f(0.0, 0.0, 1.0))), 0.0), 13.0);
  let glint = rim * (0.19 + shine * 0.94 + fresnel(facing) * 0.6);
  let halo = exp(-length((local / glass.rect.zw - glass.light.xy) * vec2f(2.1, 1.25)) * 2.8);
  let light = clamp(glint + halo * glass.light.z * 0.16 + shoulder * 0.10, 0.0, 1.0);
  let tint = mix(refracted, vec3f(0.34, 0.23, 0.62), 0.19);
  let color = mix(tint, vec3f(0.91, 0.84, 1.0), light);
  let opacity = coverage * glass.surface.w * (0.42 + shoulder * 0.20 + light * 0.38);
  return vec4f(color * opacity, opacity);
}
`;
