const products = [
  { name: "T-shirt Classic", price: "€ 29,95", tone: "bg-[#1f1f1f]", kind: "shirt" },
  { name: "Hoodie Premium", price: "€ 69,95", tone: "bg-[#2a2a2a]", kind: "hoodie" },
  { name: "Sneaker Urban", price: "€ 89,95", tone: "bg-[#f4f4f2]", kind: "shoe" },
  { name: "Cap Essential", price: "€ 24,95", tone: "bg-[#111]", kind: "cap" },
] as const

const orders = [
  { id: "#10224", status: "Verstuurd" },
  { id: "#10223", status: "Betaald" },
  { id: "#10222", status: "Nieuw" },
]

export function DeviceShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-[680px]" aria-hidden>
      <svg
        className="pointer-events-none absolute -top-6 -right-2 h-[108%] w-[78%] text-brand"
        viewBox="0 0 420 520"
        fill="none"
      >
        <path
          d="M30 90C150 20 210 180 400 120"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M10 430C150 360 230 500 400 410"
          stroke="currentColor"
          strokeWidth="1.6"
          opacity="0.8"
        />
      </svg>

      <div className="float-slow relative z-10 pr-[18%] sm:pr-[22%]">
        <Laptop />
      </div>

      <div className="float-phone absolute right-0 bottom-[7%] z-20 w-[38%] max-w-[210px] min-w-[132px]">
        <Phone />
      </div>
    </div>
  )
}

function Laptop() {
  return (
    <div className="relative">
      <div className="rounded-[1.15rem] bg-gradient-to-b from-[#d5d6da] to-[#b7b8bd] p-[7px] shadow-[0_30px_60px_-28px_rgba(20,20,20,0.55)] ring-1 ring-black/10">
        <div className="overflow-hidden rounded-[0.8rem] bg-[#111] p-[7px]">
          <div className="overflow-hidden rounded-[0.45rem] bg-white">
            <div className="grid min-h-[280px] grid-cols-[68px_1fr_108px] sm:min-h-[330px] sm:grid-cols-[84px_1fr_132px]">
              <aside className="border-r border-[#f0f0ee] bg-[#fbfbfa] px-2 py-3 sm:px-2.5">
                <p className="px-1 text-[11px] font-extrabold tracking-[-0.05em] text-ink">JR</p>
                <ul className="mt-3 space-y-1">
                  {[
                    ["Dashboard", true],
                    ["Producten", false],
                    ["Orders", false],
                    ["Klanten", false],
                    ["Marketing", false],
                  ].map(([label, active]) => (
                    <li
                      key={String(label)}
                      className={
                        active
                          ? "rounded-md bg-[#e9f7ee] px-1.5 py-1 text-[8px] font-semibold text-brand sm:text-[9px]"
                          : "px-1.5 py-1 text-[8px] text-[#8a8a8a] sm:text-[9px]"
                      }
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </aside>

              <div className="px-2.5 py-2.5 sm:px-3 sm:py-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] font-semibold text-ink sm:text-xs">Producten</p>
                  <div className="h-4 w-16 rounded-full bg-[#f3f3f1] sm:w-24" />
                </div>
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  <Stat label="Bestellingen" value="1.248" delta="+12%" />
                  <Stat label="Omzet" value="€ 12.480" delta="+8%" />
                  <Stat label="Klanten" value="892" delta="+5%" />
                </div>
                <p className="mt-2.5 text-[8px] font-medium text-[#8d8d8d] sm:text-[9px]">
                  Populaire producten
                </p>
                <div className="mt-1.5 grid grid-cols-4 gap-1.5">
                  {products.map((product) => (
                    <div key={product.name}>
                      <div
                        className={`grid aspect-square place-items-center rounded-md ${product.tone}`}
                      >
                        <Garment kind={product.kind} />
                      </div>
                      <p className="mt-1 truncate text-[7px] text-[#6d6d6d] sm:text-[8px]">
                        {product.name}
                      </p>
                      <p className="text-[7px] font-semibold text-ink sm:text-[8px]">
                        {product.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="border-l border-[#f0f0ee] px-2 py-2.5 sm:px-2.5">
                <p className="text-[8px] font-medium text-[#8d8d8d] sm:text-[9px]">Omzet</p>
                <svg viewBox="0 0 120 54" className="mt-1 h-12 w-full">
                  <path
                    d="M2 42 C 18 40, 24 28, 38 30 S 58 18, 72 16 S 96 22, 118 8"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2 42 C 18 40, 24 28, 38 30 S 58 18, 72 16 S 96 22, 118 8 V 52 H 2 Z"
                    fill="#16a34a"
                    opacity="0.12"
                  />
                </svg>
                <p className="mt-2 text-[8px] font-medium text-[#8d8d8d] sm:text-[9px]">
                  Recente orders
                </p>
                <ul className="mt-1.5 space-y-1.5">
                  {orders.map((order) => (
                    <li key={order.id} className="flex items-center justify-between gap-1">
                      <span className="text-[8px] font-medium text-ink sm:text-[9px]">
                        {order.id}
                      </span>
                      <span className="text-[7px] text-brand sm:text-[8px]">{order.status}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto h-2.5 w-[108%] -translate-x-[3.5%] rounded-b-xl bg-gradient-to-b from-[#c5c6ca] to-[#a9aab0] shadow-[0_10px_16px_-12px_rgba(0,0,0,0.6)]" />
      <div className="mx-auto mt-1 h-1 w-16 rounded-full bg-[#9a9ba0]" />
    </div>
  )
}

function Stat({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-md border border-[#f0f0ee] px-1.5 py-1.5">
      <p className="truncate text-[7px] text-[#8d8d8d] sm:text-[8px]">{label}</p>
      <p className="mt-0.5 text-[9px] font-semibold text-ink sm:text-[11px]">{value}</p>
      <p className="text-[7px] font-medium text-brand sm:text-[8px]">{delta}</p>
    </div>
  )
}

function Garment({ kind }: { kind: (typeof products)[number]["kind"] }) {
  if (kind === "shoe") {
    return (
      <svg viewBox="0 0 48 32" className="w-8">
        <path
          d="M6 20c6-1 8-8 14-8 4 0 6 3 10 3 6 0 8 4 12 4v5H6v-4Z"
          fill="#111"
        />
        <path d="M8 24h34" stroke="#16a34a" strokeWidth="1.4" />
      </svg>
    )
  }
  if (kind === "cap") {
    return (
      <svg viewBox="0 0 48 32" className="w-8">
        <path d="M10 16c2-7 26-7 28 0 2 4-2 6-6 6H16c-4 0-8-2-6-6Z" fill="#f5f5f3" />
        <path d="M8 22h24c6 0 8-2 10-4" stroke="#f5f5f3" strokeWidth="2" fill="none" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 40 40" className="w-7">
      <path
        d={
          kind === "hoodie"
            ? "M12 14l8-4 8 4 4 4v14H8V18l4-4Z"
            : "M13 12l7-3 7 3 3 3v16H10V15l3-3Z"
        }
        fill={kind === "hoodie" ? "#f2f2f0" : "#f7f7f5"}
      />
    </svg>
  )
}

function Phone() {
  return (
    <div className="rounded-[1.7rem] bg-[#1b1b1d] p-1.5 shadow-[0_24px_40px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/20">
      <div className="overflow-hidden rounded-[1.35rem] bg-white">
        <div className="flex items-center justify-between px-3 pt-2">
          <span className="text-[10px] font-extrabold tracking-[-0.05em]">JR</span>
          <span className="h-1.5 w-8 rounded-full bg-[#111]" />
          <span className="size-2 rounded-full bg-[#111]" />
        </div>
        <div className="relative mx-2 mt-2 overflow-hidden rounded-xl bg-[#171717] px-3 pt-6 pb-3">
          <div className="mx-auto h-16 w-12 rounded-t-full bg-[#2a2a2a]" />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute right-2 bottom-2 left-2 text-white">
            <p className="text-[11px] font-semibold">New collection</p>
            <p className="text-[8px] text-white/70">Premium basics</p>
            <span className="mt-1.5 inline-flex rounded-full bg-brand px-2 py-0.5 text-[8px] font-medium text-white">
              Shop nu
            </span>
          </div>
        </div>
        <p className="px-3 pt-2 text-[9px] font-medium text-[#888]">Populaire producten</p>
        <div className="grid grid-cols-2 gap-2 px-3 pt-1.5 pb-3">
          {products.slice(0, 2).map((product) => (
            <div key={product.name}>
              <div className={`grid aspect-[4/3] place-items-center rounded-lg ${product.tone}`}>
                <Garment kind={product.kind} />
              </div>
              <p className="mt-1 text-[8px] font-medium text-ink">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
