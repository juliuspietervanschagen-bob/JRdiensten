import type { WidgetNode } from "@/lib/builder/codec"

export function screenHtml(nodes: readonly WidgetNode[]): string {
  const cards =
    nodes.length === 0
      ? `<p style="color:#5e5e5e;letter-spacing:0.08em;font-size:12px">Kies een onderdeel.</p>`
      : nodes
          .map((node) => {
            const facts = Object.entries(node.props)
              .map(
                ([key, value]) =>
                  `<p style="margin:4px 0;color:#5e5e5e;font-size:11px">${escapeHtml(key)} <span style="color:#141414">${escapeHtml(String(value))}</span></p>`,
              )
              .join("")
            return `<article style="position:absolute;left:${node.x * 6}px;top:${node.y * 6}px;width:240px;border:1px solid #e8e8e3;background:#ffffff;border-radius:16px;padding:12px">
              <p style="margin:0 0 8px;color:#16a34a;font-size:10px;letter-spacing:0.16em">${escapeHtml(node.kind)}</p>
              ${facts}
            </article>`
          })
          .join("")

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>screen</title>
</head>
<body style="margin:0;min-height:100vh;background:#f6f6f4;color:#141414;font-family:ui-sans-serif,system-ui,sans-serif">
  <main style="position:relative;min-height:100vh">${cards}</main>
</body>
</html>`
}

export const previewServerSource = `import { createServer } from "node:http"
import { readFile } from "node:fs/promises"

const server = createServer(async (_request, response) => {
  const html = await readFile(new URL("./index.html", import.meta.url))
  response.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" })
  response.end(html)
})

server.listen(3111, "0.0.0.0")
`

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}
