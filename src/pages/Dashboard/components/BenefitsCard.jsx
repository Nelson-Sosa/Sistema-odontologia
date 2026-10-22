import { Gift, Users, ChevronRight } from 'lucide-react'
import { useBenefitsSettings } from '@/hooks/useBenefits'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/routes/routes'

function BenefitsCard() {
  const { data: settings } = useBenefitsSettings()
  const navigate = useNavigate()

  if (!settings?.enabled) return null

  const rewardEvery = settings.rewardEveryVisits ?? 6
  const rewardLabel = settings.rewardDescription || `${settings.rewardValue ?? 20}% de descuento`

  return (
    <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-brand-card p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.18)] sm:p-5">
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-accent/5 blur-2xl" />

      <div className="relative space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-border bg-brand-alt-row text-brand-accent">
            <Gift className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-medium text-brand-text">Programa de Beneficios</p>
            <p className="text-[11px] text-brand-text-muted">
              {rewardEvery} visitas = {rewardLabel}
            </p>
          </div>
        </div>

        <p className="rounded-xl border border-brand-border bg-brand-alt-row/60 px-4 py-3 text-xs leading-relaxed text-brand-text-muted sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
          Tus pacientes acumulan una visita cada vez que completan una cita.
          Al llegar a {rewardEvery} visitas reciben automáticamente {rewardLabel}.
        </p>

        <button
          onClick={() => navigate(ROUTES.CLIENTS)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-primary transition-colors hover:text-brand-accent"
        >
          <Users className="h-3.5 w-3.5" />
          Ver pacientes con beneficios
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}

export default BenefitsCard
