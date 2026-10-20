import { CreditCard, Clock, Gift, Palette, Sliders } from 'lucide-react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useFeatures } from '@/hooks/useFeatures'
import PaymentSettingsSection from './components/PaymentSettingsSection'
import BusinessSettingsSection from './components/BusinessSettingsSection'
import BenefitsSettingsSection from './components/BenefitsSettingsSection'
import BrandingSettingsSection from '../admin/sections/BrandingSettingsSection'
import FeatureFlagsSection from '../admin/sections/FeatureFlagsSection'

function SettingsPage() {
  usePageTitle('Configuración')
  const features = useFeatures()

  return (
    <div className="flex flex-col gap-8 max-w-4xl 2xl:max-w-6xl">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-brand-text">Configuración</h1>
        <p className="mt-1 text-sm text-brand-text-muted">
          Administrá los ajustes del sistema de la clínica.
        </p>
      </div>

      {/* ── Branding section (NEW) */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-pastel">
            <Palette className="h-4 w-4 text-brand-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-brand-text">Marca y Colores</h2>
            <p className="text-xs text-brand-text-muted">Personaliza el nombre, logo y paleta de colores</p>
          </div>
        </div>
        <BrandingSettingsSection />
      </section>

      {/* ── Feature Flags section (NEW) */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-pastel">
            <Sliders className="h-4 w-4 text-brand-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-brand-text">Funcionalidades</h2>
            <p className="text-xs text-brand-text-muted">Habilita o deshabilita funcionalidades del sistema</p>
          </div>
        </div>
        <FeatureFlagsSection />
      </section>

      {/* ── Business Hours section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-pastel">
            <Clock className="h-4 w-4 text-brand-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-brand-text">Horarios de atención</h2>
            <p className="text-xs text-brand-text-muted">Configurá los bloques horarios por día y el intervalo de la agenda</p>
          </div>
        </div>
        <div className="rounded-2xl border border-brand-border bg-brand-card p-4 sm:p-5">
          <BusinessSettingsSection />
        </div>
      </section>

      {/* ── Payments section (conditional) */}
      {features.payments && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-pastel">
              <CreditCard className="h-4 w-4 text-brand-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-brand-text">Pagos</h2>
              <p className="text-xs text-brand-text-muted">Configurá el sistema de seña por transferencia bancaria</p>
            </div>
          </div>
          <div className="rounded-2xl border border-brand-border bg-brand-card p-4 sm:p-5">
            <PaymentSettingsSection />
          </div>
        </section>
      )}

      {/* ── Benefits section (conditional) */}
      {features.benefits && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-pastel">
              <Gift className="h-4 w-4 text-brand-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-brand-text">Programa de Beneficios</h2>
              <p className="text-xs text-brand-text-muted">Configurá la fidelización: acumulación, tipo y vigencia de recompensas</p>
            </div>
          </div>
          <div className="rounded-2xl border border-brand-border bg-brand-card p-4 sm:p-5">
            <BenefitsSettingsSection />
          </div>
        </section>
      )}
    </div>
  )
}

export default SettingsPage
