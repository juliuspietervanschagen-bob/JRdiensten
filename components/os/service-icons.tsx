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

function BagIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 9h12l-1 11H7L6 9z" strokeLinejoin="round" />
      <path d="M9 9V7a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </Icon>
  )
}

function CheckoutIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M7 12h10M10 17h4" strokeLinecap="round" />
      <circle cx="18" cy="17" r="2" />
    </Icon>
  )
}

function CardIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="6" width="18" height="12" rx="1.5" />
      <path d="M3 10h18" />
    </Icon>
  )
}

function OrdersIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 5h14v14H5z" />
      <path d="M8 9h8M8 12h8M8 15h5" strokeLinecap="round" />
    </Icon>
  )
}

function PhoneIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11 18.5h2" strokeLinecap="round" />
    </Icon>
  )
}

function ReceiptIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 3.5h10v17l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2V3.5z" strokeLinejoin="round" />
      <path d="M9.5 8h5M9.5 11.5h5" strokeLinecap="round" />
    </Icon>
  )
}

function TrialIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="m8.5 12.2 2.2 2.2 4.8-5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

function StoresIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 9.5 6 4.5h12l2 5" strokeLinejoin="round" />
      <path d="M4 9.5h16V19H4z" />
      <path d="M10 19v-4h4v4" />
    </Icon>
  )
}

function BrandIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="5" width="17" height="12" rx="1.5" />
      <path d="M8 17.5v2M16 17.5v2M7 19.5h10" strokeLinecap="round" />
    </Icon>
  )
}

function PlatformsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="6" width="8" height="12" rx="1.5" />
      <rect x="13" y="4" width="8" height="14" rx="1.5" />
    </Icon>
  )
}

function AccountIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="9" r="3" />
      <path d="M6 19c1.2-2.6 3.2-3.8 6-3.8S16.8 16.4 18 19" strokeLinecap="round" />
    </Icon>
  )
}

function DevicesIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="7" width="10" height="8" rx="1" />
      <rect x="15" y="5" width="6" height="12" rx="1" />
      <path d="M6 17.5h4" strokeLinecap="round" />
    </Icon>
  )
}

function PatchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 4v10" strokeLinecap="round" />
      <path d="m8 11 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 19h12" strokeLinecap="round" />
    </Icon>
  )
}

function ReleaseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 19V7" strokeLinecap="round" />
      <path d="m8 10 4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19h14" strokeLinecap="round" />
    </Icon>
  )
}

function HandworkIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 16c2-4 4-6 7-6 2 0 3 1 3 2.5S12 15 10 17" strokeLinecap="round" />
      <path d="M14 8.5 18 5l1.5 1.5-3.2 3.2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

function LinkIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 12h6" strokeLinecap="round" />
      <path d="M10 8H8a4 4 0 0 0 0 8h2M14 8h2a4 4 0 0 1 0 8h-2" strokeLinecap="round" />
    </Icon>
  )
}

function ForwardIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 12h12" strokeLinecap="round" />
      <path d="m12 7 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

function TraceIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="6" cy="7" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="18" cy="17" r="2" />
      <path d="M7.6 8.4 10.4 10.6M13.6 13.4l2.8 2.2" strokeLinecap="round" />
    </Icon>
  )
}

function SampleIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 4h8v6l3 7H5l3-7V4z" strokeLinejoin="round" />
      <path d="M10 4V2.8M14 4V2.8" strokeLinecap="round" />
    </Icon>
  )
}

function GuideIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 4.5h9.5A2.5 2.5 0 0 1 18 7v12.5H8.5A2.5 2.5 0 0 0 6 17V4.5z" />
      <path d="M6 17a2.5 2.5 0 0 1 2.5-2.5H18" />
    </Icon>
  )
}

function HandoffIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="7" cy="9" r="2.2" />
      <circle cx="17" cy="9" r="2.2" />
      <path d="M9.2 10.2h5.6M4.5 18c.6-2 1.8-3 3.5-3M16 15c1.7 0 2.9 1 3.5 3" strokeLinecap="round" />
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
  bag: BagIcon,
  checkout: CheckoutIcon,
  card: CardIcon,
  orders: OrdersIcon,
  phone: PhoneIcon,
  receipt: ReceiptIcon,
  trial: TrialIcon,
  stores: StoresIcon,
  brand: BrandIcon,
  platforms: PlatformsIcon,
  account: AccountIcon,
  devices: DevicesIcon,
  patch: PatchIcon,
  release: ReleaseIcon,
  handwork: HandworkIcon,
  link: LinkIcon,
  forward: ForwardIcon,
  trace: TraceIcon,
  sample: SampleIcon,
  guide: GuideIcon,
  handoff: HandoffIcon,
}
