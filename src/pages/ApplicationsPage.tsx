import { Link } from 'react-router-dom'
import { ActionLink } from '../components/ActionLink'
import { ApplicationStatus } from '../components/ApplicationStatus'
import { Shell } from '../components/Shell'
import { Icon } from '../components/icons'
import { applications } from '../fixtures'
import { formatMoney } from '../utils/format'

export const ApplicationsPage = () => {
  return (
    <Shell topic="application">
      <section className="banner">
        <div className="banner-copy">
          <p className="banner-title">
            <Icon name="info" />
            Action Needed
          </p>
          <p>You have pending items that need to move your applications along. Review what&apos;s needed below.</p>
        </div>
        <div className="banner-row">
          <p>
            You have 4 actions required on your <strong>2025 Kubota KX080-4</strong> application.
          </p>
          <Link className="banner-action" to="/applications/kubota-kx080-4">
            See actions required
          </Link>
        </div>
      </section>

      <div className="list-head">
        <div>
          <h1>Your applications</h1>
          <p className="lede">View and manage your applications</p>
        </div>
        <button type="button" className="quiet">
          Start new application
        </button>
      </div>

      <div className="cards">
        {applications.map((application) => {
          const funded = application.status === 'funded' && application.loanId
          const href = funded ? `/loans/${application.loanId}` : `/applications/${application.id}`
          const action = funded ? 'View loan' : 'See app'
          return (
            <article key={application.id} className="card">
              <div className="card-top">
                <h2>{application.equipment}</h2>
                <ApplicationStatus status={application.status} />
              </div>
              <p className="meta">
                {application.buyer} · {application.dealer} · {formatMoney(application.offerCents)}{' '}
                <button type="button" className="info" title="Offer amount from the dealer" aria-label="About the offer amount">
                  i
                </button>
              </p>
              <div className="card-bottom">
                <div>
                  {application.detail && <p>{application.detail}</p>}
                  {application.notice && <p className="notice">{application.notice}</p>}
                </div>
                <ActionLink to={href}>{action}</ActionLink>
              </div>
            </article>
          )
        })}
      </div>
    </Shell>
  )
}
