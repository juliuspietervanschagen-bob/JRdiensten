import { Button } from "@/components/ui/button"
import { cn } from "cn"
import Link from "next/link"

export function BrandButton({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string
  children: React.ReactNode
  variant?: "solid" | "outline"
  className?: string
}) {
  return (
    <Button
      nativeButton={false}
      render={<Link href={href} />}
      variant={variant === "solid" ? "default" : "outline"}
      className={cn(
        "h-11 rounded-full px-5 text-[0.95rem] font-medium",
        variant === "solid" &&
          "bg-brand text-white shadow-[0_10px_24px_-14px_rgba(22,163,74,0.95)] hover:bg-brand-dark",
        variant === "outline" &&
          "border-[#d8d8d3] bg-white text-ink shadow-none hover:bg-white hover:border-[#c4c4be]",
        className,
      )}
    >
      {children}
    </Button>
  )
}
