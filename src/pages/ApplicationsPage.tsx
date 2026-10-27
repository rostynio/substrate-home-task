import { Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ActionLink } from '../components/ActionLink'
import { ApplicationStatus } from '../components/ApplicationStatus'
import { Shell } from '../components/Shell'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { applications } from '../fixtures'
import { formatMoney } from '../utils/format'

export const ApplicationsPage = () => {
  return (
    <Shell topic="application">
      <section className="mb-7 rounded-[10px] border-l-[3px] border-l-banner-line bg-banner px-[18px] pt-4 pb-3.5">
        <p className="mb-1.5 flex items-center gap-2 font-semibold">
          <Info className="size-4" />
          Action Needed
        </p>
        <p className="text-sm text-muted-foreground">
          You have pending items that need to move your applications along. Review what&apos;s needed below.
        </p>
        <div className="mt-3 flex items-center justify-between gap-4 border-t border-[#eadfce] pt-3 max-md:grid">
          <p>
            You have 4 actions required on your <strong>2025 Kubota KX080-4</strong> application.
          </p>
          <Button className="shrink-0" asChild>
            <Link to="/applications/kubota-kx080-4">See actions required</Link>
          </Button>
        </div>
      </section>

      <div className="mb-[18px] flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight">Your applications</h1>
          <p className="mt-1 text-[13px] text-muted-foreground">View and manage your applications</p>
        </div>
        <Button variant="ghost" className="h-auto px-0" type="button">
          Start new application
        </Button>
      </div>

      <div className="grid gap-3">
        {applications.map((application) => {
          const funded = application.status === 'funded' && application.loanId
          const href = funded ? `/loans/${application.loanId}` : `/applications/${application.id}`
          const action = funded ? 'View loan' : 'See app'
          return (
            <Card asChild key={application.id} size="sm">
              <article>
                <CardHeader>
                  <CardTitle asChild className="text-[15px] font-semibold">
                    <h2>{application.equipment}</h2>
                  </CardTitle>
                  <CardAction>
                    <ApplicationStatus status={application.status} />
                  </CardAction>
                </CardHeader>
                <CardContent className="text-[13px] text-muted-foreground">
                  {application.buyer} · {application.dealer} · {formatMoney(application.offerCents)}{' '}
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-xs"
                    className="ml-1.5 align-middle rounded-full"
                    title="Offer amount from the dealer"
                    aria-label="About the offer amount"
                  >
                    <Info />
                  </Button>
                </CardContent>
                <CardFooter className="items-center justify-between gap-4 border-0 bg-transparent">
                  <div>
                    {application.detail && <p>{application.detail}</p>}
                    {application.notice && <p className="mt-1 text-[13px] text-notice">{application.notice}</p>}
                  </div>
                  <ActionLink to={href}>{action}</ActionLink>
                </CardFooter>
              </article>
            </Card>
          )
        })}
      </div>
    </Shell>
  )
}
