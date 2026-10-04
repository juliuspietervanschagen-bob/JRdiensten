/** Terminal palette for Agency OS surfaces. The marketing site keeps paper, ink, and brand. */
export const osTokens = {
  black: "#000000",
  slate: "#09090b",
  white: "#ffffff",
  mist: "#a1a1aa",
  line: "#27272a",
  green: "#10b981",
  signal: "#00ff66",
} as const

export type OsToken = keyof typeof osTokens
