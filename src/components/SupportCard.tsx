import { useState } from 'react'
import { Icon } from './icons'

export type SupportTopic = 'application' | 'loan'

const channels = [
  {
    label: 'Email',
    icon: 'mail' as const,
    wait: '30min',
    value: 'support@joinsubstrate.com',
    href: 'mailto:support@joinsubstrate.com',
  },
  {
    label: 'Text',
    icon: 'text' as const,
    wait: '10min',
    value: '(276) 465-7864',
    href: 'sms:2764657864',
  },
  {
    label: 'Call',
    icon: 'phone' as const,
    wait: null,
    value: '(276) 465-7864',
    href: 'tel:2764657864',
  },
]

export const SupportCard = ({ topic }: { topic: SupportTopic }) => {
  const [faqOpen, setFaqOpen] = useState(false)
  const heading = topic === 'loan' ? 'Questions about your loan?' : 'Questions about your financing?'

  return (
    <aside className="support">
      <div className="person">
        <span className="avatar avatar-abby" aria-hidden="true">
          <span className="presence" />
        </span>
        <span>
          <strong>{heading}</strong>
          <span className="muted">Abby is online and here to help.</span>
        </span>
      </div>
      <div className="channels">
        {channels.map((channel) => (
          <a key={channel.label} className="channel" href={channel.href}>
            <Icon name={channel.icon} />
            <span>
              <span className="channel-label">
                {channel.label}
                {channel.wait && <span className="fast">{channel.wait}</span>}
              </span>
              <span className="muted">{channel.value}</span>
            </span>
          </a>
        ))}
      </div>
      <p className="faq-line">
        <button type="button" className="text-button" onClick={() => setFaqOpen((open) => !open)}>
          FAQs
        </button>
      </p>
      {faqOpen && (
        <div className="faq">
          <h3>What if a debit is returned?</h3>
          <p>The installment is still due. It does not reduce what you owe.</p>
          <h3>What is the payoff quote?</h3>
          <p>An estimate of principal plus interest through the date you pick. It is not a payoff letter.</p>
        </div>
      )}
    </aside>
  )
}
