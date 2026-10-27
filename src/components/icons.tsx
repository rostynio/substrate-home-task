import type { ReactNode } from 'react'

type IconName = 'dashboard' | 'loans' | 'applications' | 'mail' | 'text' | 'phone' | 'settings' | 'signout' | 'info'

const paths: Record<IconName, ReactNode> = {
  dashboard: (
    <>
      <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1" />
      <rect x="9" y="1.5" width="5.5" height="5.5" rx="1" />
      <rect x="1.5" y="9" width="5.5" height="5.5" rx="1" />
      <rect x="9" y="9" width="5.5" height="5.5" rx="1" />
    </>
  ),
  loans: (
    <>
      <circle cx="8" cy="8" r="6.2" />
      <path d="M8 4.8v3.4l2.2 1.3" />
    </>
  ),
  applications: (
    <>
      <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h7" />
    </>
  ),
  mail: (
    <>
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
      <path d="M2 4.2 8 8.6 14 4.2" />
    </>
  ),
  text: (
    <>
      <path d="M2.5 3.5h11a1 1 0 0 1 1 1v6.2a1 1 0 0 1-1 1H7.2L4 14.2v-2.5H2.5a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
    </>
  ),
  phone: (
    <path d="M4.2 2.4h2.1l1 2.4-1.3 1a8.4 8.4 0 0 0 3.2 3.2l1-1.3 2.4 1v2.1c0 .6-.5 1.1-1.1 1A10.2 10.2 0 0 1 3.2 3.5c-.1-.6.4-1.1 1-1.1Z" />
  ),
  settings: (
    <>
      <circle cx="8" cy="8" r="2" />
      <path d="M8 1.8v1.6M8 12.6v1.6M1.8 8h1.6M12.6 8h1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M12.6 3.4l-1.1 1.1M4.5 11.5l-1.1 1.1" />
    </>
  ),
  signout: (
    <>
      <path d="M6.5 2.5H3.2a.8.8 0 0 0-.8.8v9.4a.8.8 0 0 0 .8.8h3.3" />
      <path d="M7 8h7M11.2 5.2 14 8l-2.8 2.8" />
    </>
  ),
  info: (
    <>
      <circle cx="8" cy="8" r="6.2" />
      <path d="M8 7.2V11.2M8 5.1v.2" />
    </>
  ),
}

export const Icon = ({ name }: { name: IconName }) => (
  <svg className="icon" viewBox="0 0 16 16" aria-hidden="true">
    {paths[name]}
  </svg>
)
