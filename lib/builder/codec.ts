export const WIDGET_KINDS = [
  "MetricsDash",
  "DataGridPro",
  "SearchField",
  "OrderStatus",
  "PersonRow",
  "KeyFacts",
  "ProgressTrack",
  "Note",
  "AuthGate",
  "DynamicForm",
  "Button",
] as const

export type WidgetKind = (typeof WIDGET_KINDS)[number]

export type PropValue = string | number | boolean

export type WidgetProps = {
  MetricsDash: { label: string; value: string; trend: "up" | "down" | "flat" }
  DataGridPro: { title: string; rows: number }
  SearchField: { placeholder: string; query: string }
  OrderStatus: { ref: string; state: "processing" | "packed" | "shipped" }
  PersonRow: { name: string; detail: string }
  KeyFacts: { title: string; lines: number }
  ProgressTrack: { label: string; value: number }
  Note: { text: string; tone: "info" | "warning" | "ok" }
  AuthGate: { label: string; locked: boolean }
  DynamicForm: { title: string; steps: number }
  Button: { label: string; variant: "solid" | "outline" }
}

export type WidgetNode<K extends WidgetKind = WidgetKind> = {
  [P in K]: {
    id: string
    kind: P
    x: number
    y: number
    props: WidgetProps[P]
  }
}[K]

type Field = {
  key: string
  label: string
  type: "string" | "number" | "boolean" | "enum"
  options?: readonly string[]
}

type WidgetDef<K extends WidgetKind> = {
  kind: K
  blurb: string
  defaults: WidgetProps[K]
  fields: readonly Field[]
}

export const WIDGET_DEFS: { [K in WidgetKind]: WidgetDef<K> } = {
  MetricsDash: {
    kind: "MetricsDash",
    blurb: "Live figure with a sparkline",
    defaults: { label: "Revenue", value: "128k", trend: "up" },
    fields: [
      { key: "label", label: "Label", type: "string" },
      { key: "value", label: "Value", type: "string" },
      { key: "trend", label: "Trend", type: "enum", options: ["up", "down", "flat"] },
    ],
  },
  DataGridPro: {
    kind: "DataGridPro",
    blurb: "Virtualized rows",
    defaults: { title: "Orders", rows: 24 },
    fields: [
      { key: "title", label: "Title", type: "string" },
      { key: "rows", label: "Rows", type: "number" },
    ],
  },
  SearchField: {
    kind: "SearchField",
    blurb: "Filter the orders",
    defaults: { placeholder: "Search orders", query: "" },
    fields: [
      { key: "placeholder", label: "Placeholder", type: "string" },
      { key: "query", label: "Query", type: "string" },
    ],
  },
  OrderStatus: {
    kind: "OrderStatus",
    blurb: "Where an order stands",
    defaults: { ref: "#TF24-10-26-987", state: "processing" },
    fields: [
      { key: "ref", label: "Reference", type: "string" },
      { key: "state", label: "State", type: "enum", options: ["processing", "packed", "shipped"] },
    ],
  },
  PersonRow: {
    kind: "PersonRow",
    blurb: "Customer on the order",
    defaults: { name: "Sarah J.", detail: "Seattle · FedEx Express" },
    fields: [
      { key: "name", label: "Name", type: "string" },
      { key: "detail", label: "Detail", type: "string" },
    ],
  },
  KeyFacts: {
    kind: "KeyFacts",
    blurb: "Reference, date, and total",
    defaults: { title: "Order", lines: 3 },
    fields: [
      { key: "title", label: "Title", type: "string" },
      { key: "lines", label: "Lines", type: "number" },
    ],
  },
  ProgressTrack: {
    kind: "ProgressTrack",
    blurb: "How far packing has gone",
    defaults: { label: "Packed", value: 64 },
    fields: [
      { key: "label", label: "Label", type: "string" },
      { key: "value", label: "Percent", type: "number" },
    ],
  },
  Note: {
    kind: "Note",
    blurb: "Context next to a figure",
    defaults: { text: "Two items, ready for the same shipment.", tone: "info" },
    fields: [
      { key: "text", label: "Text", type: "string" },
      { key: "tone", label: "Tone", type: "enum", options: ["info", "warning", "ok"] },
    ],
  },
  AuthGate: {
    kind: "AuthGate",
    blurb: "Signed-in perimeter",
    defaults: { label: "Staff only", locked: true },
    fields: [
      { key: "label", label: "Label", type: "string" },
      { key: "locked", label: "Locked", type: "boolean" },
    ],
  },
  DynamicForm: {
    kind: "DynamicForm",
    blurb: "Schema-driven steps",
    defaults: { title: "Onboarding", steps: 3 },
    fields: [
      { key: "title", label: "Title", type: "string" },
      { key: "steps", label: "Steps", type: "number" },
    ],
  },
  Button: {
    kind: "Button",
    blurb: "Action control",
    defaults: { label: "Publish", variant: "solid" },
    fields: [
      { key: "label", label: "Label", type: "string" },
      { key: "variant", label: "Variant", type: "enum", options: ["solid", "outline"] },
    ],
  },
}

export function createNode<K extends WidgetKind>(kind: K, x: number, y: number, id = newId()): WidgetNode<K> {
  return {
    id,
    kind,
    x: clamp(x),
    y: clamp(y),
    props: { ...WIDGET_DEFS[kind].defaults },
  }
}

export function generateScreen(nodes: readonly WidgetNode[]): string {
  const lines = nodes.map((node) => {
    const def = WIDGET_DEFS[node.kind]
    const props = def.fields.map((field) => formatProp(field, node.props[field.key as keyof typeof node.props] as PropValue))
    return `      <${node.kind} id="${escapeAttr(node.id)}" x={${Math.round(node.x)}} y={${Math.round(node.y)}} ${props.join(" ")} />`
  })
  const body = lines.length > 0 ? `${lines.join("\n")}\n` : ""
  return `export function Screen() {\n  return (\n    <>\n${body}    </>\n  )\n}\n`
}

export type ParseResult = { ok: true; nodes: WidgetNode[] } | { ok: false; error: string }

export function parseScreen(source: string): ParseResult {
  if (!/export\s+function\s+Screen\s*\(/.test(source)) {
    return { ok: false, error: "Expected export function Screen()." }
  }
  const nodes: WidgetNode[] = []
  const seen = new Set<string>()
  const tag = /<([A-Z][A-Za-z0-9]*)\b([^>]*?)\/>/g
  let match: RegExpExecArray | null
  while ((match = tag.exec(source))) {
    const kind = match[1]
    if (!isWidgetKind(kind)) {
      return { ok: false, error: `Unknown widget <${kind} />.` }
    }
    const attrs = parseAttrs(match[2] ?? "")
    const id = typeof attrs.id === "string" && attrs.id.length > 0 ? attrs.id : newId()
    const unique = seen.has(id) ? `${id}_${nodes.length}` : id
    seen.add(unique)
    const def = WIDGET_DEFS[kind]
    const props = { ...def.defaults } as WidgetProps[typeof kind]
    for (const field of def.fields) {
      const raw = attrs[field.key]
      if (raw === undefined) continue
      const coerced = coerce(field, raw)
      if (!coerced.ok) return { ok: false, error: coerced.error }
      ;(props as Record<string, PropValue>)[field.key] = coerced.value
    }
    nodes.push({
      id: unique,
      kind,
      x: typeof attrs.x === "number" ? clamp(attrs.x) : 8,
      y: typeof attrs.y === "number" ? clamp(attrs.y) : 8,
      props,
    } as WidgetNode)
  }
  return { ok: true, nodes }
}

function formatProp(field: Field, value: PropValue): string {
  if (field.type === "number") return `${field.key}={${Number(value) || 0}}`
  if (field.type === "boolean") return `${field.key}={${value === true || value === "true"}}`
  return `${field.key}="${escapeAttr(String(value))}"`
}

function coerce(field: Field, raw: PropValue): { ok: true; value: PropValue } | { ok: false; error: string } {
  if (field.type === "number") {
    const value = typeof raw === "number" ? raw : Number(raw)
    if (!Number.isFinite(value)) return { ok: false, error: `${field.key} must be a number.` }
    return { ok: true, value: Math.max(0, Math.round(value)) }
  }
  if (field.type === "boolean") {
    if (typeof raw === "boolean") return { ok: true, value: raw }
    if (raw === "true" || raw === "false") return { ok: true, value: raw === "true" }
    return { ok: false, error: `${field.key} must be true or false.` }
  }
  const text = String(raw)
  if (field.type === "enum" && field.options && !field.options.includes(text)) {
    return { ok: false, error: `${field.key} must be ${field.options.join(" or ")}.` }
  }
  return { ok: true, value: text }
}

function parseAttrs(raw: string): Record<string, PropValue> {
  const attrs: Record<string, PropValue> = {}
  const re = /([A-Za-z_][\w]*)=(?:"([^"]*)"|\{(true|false|-?\d+)\})/g
  let match: RegExpExecArray | null
  while ((match = re.exec(raw))) {
    const key = match[1]
    if (!key) continue
    if (match[2] !== undefined) attrs[key] = match[2]
    else if (match[3] === "true" || match[3] === "false") attrs[key] = match[3] === "true"
    else if (match[3] !== undefined) attrs[key] = Number(match[3])
  }
  return attrs
}

function isWidgetKind(value: string): value is WidgetKind {
  return (WIDGET_KINDS as readonly string[]).includes(value)
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;")
}

function clamp(value: number): number {
  if (!Number.isFinite(value)) return 8
  return Math.min(84, Math.max(2, Math.round(value)))
}

function newId(): string {
  return `w_${Math.random().toString(36).slice(2, 8)}`
}
