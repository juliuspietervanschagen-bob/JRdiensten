import type { Variants } from "framer-motion"

/** Slow fade used by the showcase hero. Reduced motion is handled at the call site. */
export const osFadeIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}
