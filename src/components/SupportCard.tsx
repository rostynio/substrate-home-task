import { useState } from 'react'
import { Mail, MessageSquare, Phone } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export type SupportTopic = 'application' | 'loan'

const channels = [
  {
    label: 'Email',
    icon: Mail,
    wait: '30min',
    value: 'support@joinsubstrate.com',
    href: 'mailto:support@joinsubstrate.com',
  },
  {
    label: 'Text',
    icon: MessageSquare,
    wait: '10min',
    value: '(276) 465-7864',
    href: 'sms:2764657864',
  },
  {
    label: 'Call',
    icon: Phone,
    wait: null,
    value: '(276) 465-7864',
    href: 'tel:2764657864',
  },
]

const abby =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3E%3Ccircle cx='18' cy='15' r='6' fill='%236b5344'/%3E%3Cpath d='M8 33c1.2-7 4.4-10 10-10s8.8 3 10 10' fill='%236b5344'/%3E%3C/svg%3E\")"

export const SupportCard = ({ topic }: { topic: SupportTopic }) => {
  const [faqOpen, setFaqOpen] = useState(false)
  const heading = topic === 'loan' ? 'Questions about your loan?' : 'Questions about your financing?'

  return (
    <Card asChild size="sm" className="px-3">
      <aside>
        <div className="mb-3 flex items-center gap-2.5">
          <span
            className="relative size-9 shrink-0 rounded-full bg-[#d9c3b0] bg-cover"
            style={{ backgroundImage: abby }}
            aria-hidden="true"
          >
            <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-white bg-paid" />
          </span>
          <span>
            <strong className="block text-[13px] leading-snug font-semibold">{heading}</strong>
            <span className="block text-[13px] text-muted-foreground">Abby is online and here to help.</span>
          </span>
        </div>
        <div className="grid gap-3">
          {channels.map((channel) => {
            const Icon = channel.icon
            return (
              <a
                key={channel.label}
                className="flex items-start gap-2.5 rounded-[10px] bg-muted px-2.5 py-2 text-foreground no-underline hover:bg-accent"
                href={channel.href}
              >
                <Icon className="mt-0.5 size-4 shrink-0" />
                <span>
                  <span className="flex items-center gap-2 font-medium">
                    {channel.label}
                    {channel.wait && <Badge variant="current">{channel.wait}</Badge>}
                  </span>
                  <span className="block text-[13px] text-muted-foreground">{channel.value}</span>
                </span>
              </a>
            )
          })}
        </div>
        <p className="mt-2.5 text-xs text-muted-foreground">
          <Button variant="link" className="h-auto p-0 text-xs" type="button" onClick={() => setFaqOpen((open) => !open)}>
            FAQs
          </Button>
        </p>
        {faqOpen && (
          <div className="mt-3 rounded-[10px] border bg-[#fafafa] px-3 py-3">
            <h3 className="text-[13px] font-semibold">What if a debit is returned?</h3>
            <p className="text-[13px] text-[#3f3f3f]">The installment is still due. It does not reduce what you owe.</p>
            <h3 className="mt-2.5 text-[13px] font-semibold">What is the payoff quote?</h3>
            <p className="text-[13px] text-[#3f3f3f]">
              An estimate of principal plus interest through the date you pick. It is not a payoff letter.
            </p>
          </div>
        )}
      </aside>
    </Card>
  )
}
