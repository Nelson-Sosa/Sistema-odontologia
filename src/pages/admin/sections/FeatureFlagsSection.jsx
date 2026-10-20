/**
 * FEATURE FLAGS SECTION
 * Panel de administración para habilitar/deshabilitar funcionalidades
 */

import { useState, useEffect } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { useFeatures } from '../../../hooks/useFeatures';
import { updateFeatureFlags } from '../../../services/branding/brandingService';

const FEATURE_DEFINITIONS = [
  {
    key: 'payments',
    name: 'Sistema de Pagos',
    description: 'Habilita señas, depósitos, comprobantes de pago y aprobación de pagos. Si está deshabilitado, las citas se confirman automáticamente.',
    icon: '💳',
    warning: 'Deshabilitar ocultará toda la gestión de pagos'
  },
  {
    key: 'showPrices',
    name: 'Mostrar Precios',
    description: 'Muestra los precios de los tratamientos en el catálogo y durante la reserva.',
    icon: '💰',
    warning: null
  },
  {
    key: 'benefits',
    name: 'Programa de Beneficios',
    description: 'Habilita sistema de puntos, fidelización y recompensas para pacientes.',
    icon: '🎁',
    warning: 'Deshabilitar ocultará el programa de lealtad'
  },
  {
    key: 'advancedReports',
    name: 'Reportes Avanzados',
    description: 'Muestra estadísticas detalladas, ingresos y análisis avanzados. Si está deshabilitado, solo se muestran resúmenes simples.',
    icon: '📊',
    warning: null
  },
  {
    key: 'autoConfirm',
    name: 'Confirmación Automática',
    description: 'Las citas se confirman automáticamente sin requerir aprobación manual. Recomendado si los pagos están deshabilitados.',
    icon: '✅',
    warning: null
  }
];

export function FeatureFlagsSection() {
  const currentFeatures = useFeatures();
  const [features, setFeatures] = useState(currentFeatures);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setFeatures(currentFeatures);
  }, [currentFeatures]);

  const handleToggle = (key) => {
    const newFeatures = {
      ...features,
      [key]: !features[key]
    };

    setFeatures(newFeatures);
    setHasChanges(true);

    // Auto-toggle autoConfirm cuando se deshabilita payments
    if (key === 'payments' && newFeatures.payments === false) {
      newFeatures.autoConfirm = true;
    }
    
    setFeatures(newFeatures);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      await updateFeatureFlags(features);
      setMessage({ 
        type: 'success', 
        text: 'Configuración de funcionalidades guardada exitosamente' 
      });
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving feature flags:', error);
      setMessage({ 
        type: 'error', 
        text: 'Error al guardar la configuración' 
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setFeatures(currentFeatures);
    setHasChanges(false);
    setMessage(null);
  };

  return (
    <Card>
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Funcionalidades del Sistema
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Habilita o deshabilita funcionalidades según las necesidades de tu clínica
        </p>
      </div>

      <div className="p-6 space-y-4">
        {FEATURE_DEFINITIONS.map((feature) => {
          const isEnabled = features[feature.key];

          return (
            <div
              key={feature.key}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {/* Icon */}
              <div className="text-3xl flex-shrink-0 mt-1">
                {feature.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-medium text-gray-900">
                    {feature.name}
                  </h3>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      isEnabled
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {isEnabled ? 'Habilitado' : 'Deshabilitado'}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-2">
                  {feature.description}
                </p>

                {feature.warning && !isEnabled && (
                  <p className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                    ⚠️ {feature.warning}
                  </p>
                )}
              </div>

              {/* Toggle */}
              <button
                type="button"
                onClick={() => handleToggle(feature.key)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${
                  isEnabled ? 'bg-cyan-600' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={isEnabled}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          );
        })}

        {/* Warning sobre payments y autoConfirm */}
        {!features.payments && !features.autoConfirm && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              ⚠️ <strong>Advertencia:</strong> Tienes los pagos deshabilitados pero la confirmación automática también está deshabilitada. 
              Esto significa que todas las citas requerirán aprobación manual. Se recomienda habilitar "Confirmación Automática".
            </p>
          </div>
        )}

        {/* Mensaje de estado */}
        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex justify-end gap-3 pt-4">
          {hasChanges && (
            <Button
              type="button"
              variant="secondary"
              onClick={handleReset}
              disabled={saving}
            >
              Descartar Cambios
            </Button>
          )}

          <Button
            type="button"
            variant="primary"
            onClick={handleSave}
            disabled={saving || !hasChanges}
          >
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default FeatureFlagsSection;
