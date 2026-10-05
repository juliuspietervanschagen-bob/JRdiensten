import { readFile } from "node:fs/promises"
import path from "node:path"

const workers = {
  editor: "node_modules/monaco-editor/min/vs/assets/editor.worker-_vAIFJDs.js",
  typescript: "node_modules/monaco-editor/min/vs/assets/ts.worker-g3pjEjl4.js",
} as const

export async function GET(request: Request) {
  const kind = new URL(request.url).searchParams.get("kind") === "typescript" ? "typescript" : "editor"
  const file = await readFile(path.join(process.cwd(), workers[kind]))
  return new Response(file, {
    headers: {
      "content-type": "text/javascript; charset=utf-8",
      "cache-control": "public, max-age=86400",
      "cross-origin-resource-policy": "same-origin",
    },
  })
}
