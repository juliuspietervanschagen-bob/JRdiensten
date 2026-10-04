import { readFile } from "node:fs/promises"
import path from "node:path"

export async function GET() {
  const file = await readFile(path.join(process.cwd(), "node_modules/@babel/standalone/babel.min.js"))
  return new Response(file, {
    headers: {
      "content-type": "text/javascript; charset=utf-8",
      "cache-control": "public, max-age=86400",
      "cross-origin-resource-policy": "same-origin",
    },
  })
}
