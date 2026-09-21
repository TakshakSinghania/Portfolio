// Apple-grade spring and physics helpers based on WWDC Designing Fluid Interfaces

export const APPLE_EASING = {
  // Critically damped spring approximation
  default: [0.16, 1, 0.3, 1] as const,
  // Snappy responsive ease
  snappy: [0.2, 0.8, 0.2, 1] as const,
  // Gentle deceleration
  gentle: [0.25, 1, 0.5, 1] as const,
};

// Standard spring presets for Framer Motion
export const springPresets = {
  // Level 1: Micro-interactions (buttons, pills, indicators)
  micro: {
    type: "spring" as const,
    damping: 28,
    stiffness: 380,
    mass: 0.8,
  },
  // Level 2: Component transitions (Hindi flip, drawer slide)
  component: {
    type: "spring" as const,
    damping: 32,
    stiffness: 280,
    mass: 1,
  },
  // Level 3: Momentum gesture releases & 3D carousel
  momentum: {
    type: "spring" as const,
    damping: 24,
    stiffness: 200,
    mass: 1.1,
  },
  // Level 4: Full-page / sheet expansion
  sheet: {
    type: "spring" as const,
    damping: 36,
    stiffness: 240,
    mass: 1.2,
  },
};

/**
 * Apple's momentum projection formula (WWDC 2018 sample code)
 * Projects the resting position based on instantaneous release velocity.
 */
export function projectMomentum(
  initialVelocity: number,
  decelerationRate: number = 0.998
): number {
  return (initialVelocity / 1000) * decelerationRate / (1 - decelerationRate);
}

/**
 * Rubber-banding resistance past scroll/drag boundary
 */
export function rubberband(
  overshoot: number,
  dimension: number,
  constant: number = 0.55
): number {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}
