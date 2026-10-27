import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { SupportCard, type SupportTopic } from './SupportCard'
import { Icon } from './icons'

const Mark = () => (
  <svg className="mark" viewBox="0 0 16 16" aria-hidden="true">
    <rect x="1" y="1" width="6" height="6" rx="1" />
    <rect x="9" y="1" width="6" height="6" rx="1" />
    <rect x="1" y="9" width="6" height="6" rx="1" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
  </svg>
)

export const Shell = ({ topic, children }: { topic: SupportTopic; children: ReactNode }) => {
  return (
    <div className="frame">
      <div className="shell">
      <aside className="sidenav">
        <div className="account">
          <span className="avatar avatar-user" aria-hidden="true" />
          <span>
            <strong>Hi Dane</strong>
            <span className="muted">dane@daneexcavation.com</span>
          </span>
        </div>
        <nav className="sidenav-nav" aria-label="Account">
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} end to="/">
            <Icon name="dashboard" />
            Dashboard
          </NavLink>
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/loans">
            <Icon name="loans" />
            Active loans
          </NavLink>
          <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} to="/applications">
            <Icon name="applications" />
            My applications
          </NavLink>
        </nav>
        <div className="sidenav-bottom">
          <SupportCard topic={topic} />
          <button type="button" className="nav-item">
            <Icon name="settings" />
            Settings
          </button>
          <button type="button" className="nav-item">
            <Icon name="signout" />
            Sign out
          </button>
        </div>
      </aside>
      <div className="main-column">
        <header className="brand">
          <Mark />
          <span>Substrate</span>
        </header>
        <main className="stage">
          <div className="stage-main">{children}</div>
        </main>
      </div>
      </div>
      <footer className="footer">
        <span>Powered by Substrate</span>
        <span className="footer-links">
          <a href="tel:2764657864">(276) 465-7864</a>
          <a href="mailto:support@joinsubstrate.com">support@joinsubstrate.com</a>
        </span>
      </footer>
    </div>
  )
}

export const BackLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <NavLink className="back" to={to}>
    {children}
  </NavLink>
)
