import Link from "next/link"
import { cn } from "cn"

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 text-ink",
        className,
      )}
      aria-label="JR Intelligence, naar home"
    >
      <span className="text-[1.7rem] leading-none font-extrabold tracking-[-0.06em]">
        JR
      </span>
      <span className="text-[0.68rem] leading-none font-semibold tracking-[0.2em] sm:text-[0.72rem] sm:tracking-[0.22em]">
        INTELLIGENCE
      </span>
    </Link>
  )
}
