export const StandingPill = ({ returned }: { returned: boolean }) => (
  <span className={`pill ${returned ? 'pill-returned' : 'pill-funded'}`}>{returned ? 'Returned' : 'Current'}</span>
)
