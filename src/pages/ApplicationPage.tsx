import { useParams } from 'react-router-dom'
import { ActionLink } from '../components/ActionLink'
import { ApplicationStatus } from '../components/ApplicationStatus'
import { BackLink, Shell } from '../components/Shell'
import { applicationById } from '../fixtures'
import { formatMoney } from '../utils/format'

export const ApplicationPage = () => {
  const { applicationId } = useParams()
  const application = applicationId ? applicationById(applicationId) : undefined

  if (!application) {
    return (
      <Shell topic="application">
        <BackLink to="/applications">Your applications</BackLink>
        <h1>Application not found</h1>
      </Shell>
    )
  }

  return (
    <Shell topic="application">
      <BackLink to="/applications">Your applications</BackLink>
      <div className="card-top title-row">
        <h1>{application.equipment}</h1>
        <ApplicationStatus status={application.status} />
      </div>
      <p className="meta">
        {application.buyer} · {application.dealer} · {formatMoney(application.offerCents)} Offer
      </p>
      <article className="card detail-card">
        <p>{application.detail || 'This application has been funded.'}</p>
        {application.notice && <p className="notice">{application.notice}</p>}
        {application.loanId && <ActionLink to={`/loans/${application.loanId}`}>View loan</ActionLink>}
      </article>
    </Shell>
  )
}
