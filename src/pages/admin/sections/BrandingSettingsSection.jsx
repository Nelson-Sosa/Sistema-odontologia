/**
 * BRANDING SETTINGS SECTION
 * Panel de administración para configurar marca y colores
 */

import { useState, useEffect } from 'react';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import ColorPicker from '../../../components/ui/ColorPicker';
import { useBranding } from '../../../hooks/useBranding';
import { updateBranding } from '../../../services/branding/brandingService';

const DENTAL_COLOR_PRESETS = [
  '#0E7490', // Cyan-700 (azul clínico principal)
  '#06B6D4', // Cyan-500 (cyan claro)
  '#0891B2', // Cyan-600
  '#10B981', // Emerald-500 (verde menta)
  '#14B8A6', // Teal-500
  '#3B82F6', // Blue-500
  '#6366F1', // Indigo-500
  '#8B5CF6'  // Violet-500
];

export function BrandingSettingsSection() {
  const { branding, loading: contextLoading } = useBranding();
  const [formData, setFormData] = useState(branding);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!contextLoading) {
      setFormData(branding);
    }
  }, [branding, contextLoading]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleColorChange = (colorKey, value) => {
    setFormData(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      await updateBranding(formData);
      setMessage({ type: 'success', text: 'Configuración guardada exitosamente' });
    } catch (error) {
      console.error('Error saving branding:', error);
      setMessage({ type: 'error', text: 'Error al guardar la configuración' });
    } finally {
      setSaving(false);
    }
  };

  if (contextLoading) {
    return (
      <Card>
        <div className="p-6 text-center text-gray-500">
          Cargando configuración...
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Configuración de Marca
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Personaliza el nombre, logo y colores de tu clínica dental
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Información básica */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Información Básica
          </h3>
          
          <Input
            label="Nombre del negocio"
            value={formData.businessName}
            onChange={(e) => handleChange('businessName', e.target.value)}
            placeholder="Clínica Dental"
            required
          />

          <Input
            label="Eslogan / Tagline"
            value={formData.tagline}
            onChange={(e) => handleChange('tagline', e.target.value)}
            placeholder="Tu salud dental es nuestra prioridad"
          />

          <Input
            label="URL del Logo"
            value={formData.logoUrl}
            onChange={(e) => handleChange('logoUrl', e.target.value)}
            placeholder="https://ejemplo.com/logo.png"
            type="url"
          />
        </div>

        {/* Información de contacto */}
        <div className="space-y-4 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Información de Contacto
          </h3>

          <Input
            label="Teléfono"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+54 9 11 1234-5678"
            type="tel"
          />

          <Input
            label="WhatsApp"
            value={formData.whatsapp}
            onChange={(e) => handleChange('whatsapp', e.target.value)}
            placeholder="+54 9 11 1234-5678"
            type="tel"
          />

          <Input
            label="Dirección"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Calle Ejemplo 123, Ciudad"
          />

          <Input
            label="Instagram"
            value={formData.instagram}
            onChange={(e) => handleChange('instagram', e.target.value)}
            placeholder="@clinica_dental"
          />
        </div>

        {/* Colores */}
        <div className="space-y-4 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Paleta de Colores
          </h3>
          <p className="text-sm text-gray-600">
            Los cambios se aplican inmediatamente en toda la interfaz
          </p>

          <ColorPicker
            label="Color Primario"
            value={formData.colors.primary}
            onChange={(value) => handleColorChange('primary', value)}
            presetColors={DENTAL_COLOR_PRESETS}
          />

          <ColorPicker
            label="Color Secundario"
            value={formData.colors.secondary}
            onChange={(value) => handleColorChange('secondary', value)}
            presetColors={DENTAL_COLOR_PRESETS}
          />

          <ColorPicker
            label="Color de Acento"
            value={formData.colors.accent}
            onChange={(value) => handleColorChange('accent', value)}
            presetColors={DENTAL_COLOR_PRESETS}
          />
        </div>

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
          <Button
            type="submit"
            variant="primary"
            disabled={saving}
          >
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default BrandingSettingsSection;
