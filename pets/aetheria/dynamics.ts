import { motion } from "./emotions";

export type SpringState = { position: number; velocity: number };

/** A bounded spring step shared by DOM, native, and canvas hosts. Delta is seconds. */
export function stepPetSpring(state: SpringState, target: number, delta: number): SpringState {
  if (!Number.isFinite(target) || !Number.isFinite(delta)) return state;
  const dt = Math.min(.064, Math.max(0, delta));
  const steps = Math.max(1, Math.ceil(dt * 120));
  const step = dt / steps;
  let { position, velocity } = state;
  const { stiffness, damping, mass } = motion.spring;
  for (let index = 0; index < steps; index++) {
    velocity += ((target - position) * stiffness - velocity * damping) / mass * step;
    position += velocity * step;
  }
  return { position, velocity };
}
