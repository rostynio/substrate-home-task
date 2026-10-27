import { useParams } from 'react-router-dom'
import { ActionLink } from '../components/ActionLink'
import { ApplicationStatus } from '../components/ApplicationStatus'
import { BackLink, Shell } from '../components/Shell'
import { Card, CardContent } from '@/components/ui/card'
import { applicationById } from '../fixtures'
import { formatMoney } from '../utils/format'

export const ApplicationPage = () => {
  const { applicationId } = useParams()
  const application = applicationId ? applicationById(applicationId) : undefined

  if (!application) {
    return (
      <Shell topic="application">
        <BackLink to="/applications">Your applications</BackLink>
        <h1 className="text-[22px] font-semibold tracking-tight">Application not found</h1>
      </Shell>
    )
  }

  return (
    <Shell topic="application">
      <BackLink to="/applications">Your applications</BackLink>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-[22px] font-semibold tracking-tight">{application.equipment}</h1>
        <ApplicationStatus status={application.status} />
      </div>
      <p className="mt-1.5 text-[13px] text-muted-foreground">
        {application.buyer} · {application.dealer} · {formatMoney(application.offerCents)} Offer
      </p>
      <Card className="mt-[18px]">
        <CardContent className="grid gap-2">
          <p>{application.detail || 'This application has been funded.'}</p>
          {application.notice && <p className="text-[13px] text-notice">{application.notice}</p>}
          {application.loanId && <ActionLink to={`/loans/${application.loanId}`}>View loan</ActionLink>}
        </CardContent>
      </Card>
    </Shell>
  )
}
