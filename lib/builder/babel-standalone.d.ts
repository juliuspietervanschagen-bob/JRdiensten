declare module "@babel/standalone" {
  export function transform(
    code: string,
    options: {
      filename?: string
      presets?: string[]
      sourceType?: "module" | "script" | "unambiguous"
    },
  ): { code: string | null }
}
