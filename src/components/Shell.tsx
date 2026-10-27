import type { ReactNode } from 'react'
import { ArrowLeft, Files, Landmark, LayoutDashboard, LogOut, Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { SupportCard, type SupportTopic } from './SupportCard'

const navItem =
  'h-auto w-full justify-start gap-2.5 px-2.5 py-2 font-normal aria-[current=page]:bg-muted aria-[current=page]:font-semibold'

const Mark = () => (
  <svg className="size-3.5 fill-foreground" viewBox="0 0 16 16" aria-hidden="true">
    <rect x="1" y="1" width="6" height="6" rx="1" />
    <rect x="9" y="1" width="6" height="6" rx="1" />
    <rect x="1" y="9" width="6" height="6" rx="1" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
  </svg>
)

const buyerPortrait =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3E%3Ccircle cx='18' cy='14' r='6' fill='%238a7b6c'/%3E%3Cpath d='M7 32c1.5-6 5-9 11-9s9.5 3 11 9' fill='%238a7b6c'/%3E%3C/svg%3E\")"

export const Shell = ({ topic, children }: { topic: SupportTopic; children: ReactNode }) => {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <div className="grid min-h-0 w-full flex-1 grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="flex min-h-0 min-w-0 flex-col gap-[18px] overflow-auto border-r border-border bg-background px-3 pt-5 pb-4">
          <div className="flex items-center gap-2.5 px-2">
            <span
              className="size-9 shrink-0 rounded-full bg-[#e7e3dc] bg-cover"
              style={{ backgroundImage: buyerPortrait }}
              aria-hidden="true"
            />
            <span>
              <strong className="block text-sm whitespace-nowrap">Hi Dane</strong>
              <span className="block text-[13px] text-muted-foreground">dane@daneexcavation.com</span>
            </span>
          </div>
          <nav className="grid gap-1" aria-label="Account">
            <Button variant="ghost" className={navItem} asChild>
              <NavLink end to="/">
                <LayoutDashboard />
                Dashboard
              </NavLink>
            </Button>
            <Button variant="ghost" className={navItem} asChild>
              <NavLink to="/loans">
                <Landmark />
                Active loans
              </NavLink>
            </Button>
            <Button variant="ghost" className={navItem} asChild>
              <NavLink to="/applications">
                <Files />
                My applications
              </NavLink>
            </Button>
          </nav>
          <div className="mt-auto grid gap-2.5">
            <SupportCard topic={topic} />
            <Button variant="ghost" className={navItem} type="button">
              <Settings />
              Settings
            </Button>
            <Button variant="ghost" className={navItem} type="button">
              <LogOut />
              Sign out
            </Button>
          </div>
        </aside>
        <div className="flex min-h-0 min-w-0 flex-col overflow-hidden">
          <header className="flex h-16 shrink-0 items-center justify-center gap-2 border-b border-border bg-background text-xs font-semibold tracking-[0.16em] uppercase">
            <Mark />
            <span>Substrate</span>
          </header>
          <main className="mx-auto min-h-0 w-full max-w-[760px] flex-1 overflow-auto px-7 pt-7 pb-12 max-md:px-4 max-md:pt-5">
            {children}
          </main>
        </div>
      </div>
      <footer className="flex w-full shrink-0 items-center justify-between gap-4 bg-[#171717] px-7 py-4 text-xs tracking-wide text-[#d5d5d5] max-md:grid">
        <span>Powered by Substrate</span>
        <span className="flex gap-4 max-md:mt-2">
          <a className="text-[#d5d5d5] no-underline" href="tel:2764657864">
            (276) 465-7864
          </a>
          <a className="text-[#d5d5d5] no-underline" href="mailto:support@joinsubstrate.com">
            support@joinsubstrate.com
          </a>
        </span>
      </footer>
    </div>
  )
}

export const BackLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Button variant="link" className="mb-4 h-auto justify-start p-0 text-[#4d4d4d] no-underline" asChild>
    <NavLink to={to}>
      <ArrowLeft />
      {children}
    </NavLink>
  </Button>
)
