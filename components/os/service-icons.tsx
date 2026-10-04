import type { ServiceIconName } from "@/lib/os/services-data"
import type { ReactNode, SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

function Icon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden {...props}>
      {children}
    </svg>
  )
}

function MarkIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <circle cx="12" cy="12" r="2.5" />
    </Icon>
  )
}

function PagesIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 3.5h11.5V16H8z" />
      <path d="M4.5 8H16v12.5H4.5z" />
    </Icon>
  )
}

function ScreensIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2.5" y="5" width="12" height="8.5" rx="1" />
      <path d="M6 16.5h5" strokeLinecap="round" />
      <rect x="15" y="8" width="6.5" height="11" rx="1" />
    </Icon>
  )
}

function InboxIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 12.5h4.2L10 15h4l1.8-2.5H20V19H4v-6.5z" strokeLinejoin="round" />
      <path d="M4 12.5 6.5 5.5h11L20 12.5" strokeLinejoin="round" />
    </Icon>
  )
}

function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="10.5" cy="10.5" r="5.5" />
      <path d="M14.8 14.8 20 20" strokeLinecap="round" />
    </Icon>
  )
}

function EditIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 6.5h16M4 12h9M4 17.5h6" strokeLinecap="round" />
      <path d="M15.5 15.5 19 12l1.5 1.5-3.5 3.5H15.5v-1.5z" strokeLinejoin="round" />
    </Icon>
  )
}

function LiveIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="6" />
      <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2" strokeLinecap="round" />
    </Icon>
  )
}

export const serviceIcons: Record<ServiceIconName, (props: IconProps) => ReactNode> = {
  mark: MarkIcon,
  pages: PagesIcon,
  screens: ScreensIcon,
  inbox: InboxIcon,
  search: SearchIcon,
  edit: EditIcon,
  live: LiveIcon,
}
