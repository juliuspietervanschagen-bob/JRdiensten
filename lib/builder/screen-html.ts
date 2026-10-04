import type { WidgetNode } from "@/lib/builder/codec"

export function screenHtml(nodes: readonly WidgetNode[]): string {
  const cards =
    nodes.length === 0
      ? `<p style="color:#a1a1aa;letter-spacing:0.08em;font-size:12px">Drop a widget on the grid.</p>`
      : nodes
          .map((node) => {
            const facts = Object.entries(node.props)
              .map(
                ([key, value]) =>
                  `<p style="margin:4px 0;color:#a1a1aa;font-size:11px">${escapeHtml(key)} <span style="color:#fff">${escapeHtml(String(value))}</span></p>`,
              )
              .join("")
            return `<article style="position:absolute;left:${node.x * 6}px;top:${node.y * 6}px;width:240px;border:1px solid #27272a;background:#09090b;padding:12px">
              <p style="margin:0 0 8px;color:#10b981;font-size:10px;letter-spacing:0.16em">${escapeHtml(node.kind)}</p>
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
<body style="margin:0;min-height:100vh;background:#000;color:#fff;font-family:ui-monospace,monospace">
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
