/**
 * BRANDING CONTEXT
 * Provee branding y feature flags a toda la aplicación
 */

import { createContext, useState, useEffect } from 'react';
import { 
  subscribeToBranding, 
  applyBrandColors,
  DEFAULT_BRANDING,
  DEFAULT_FEATURES 
} from '../services/branding/brandingService';

export const BrandingContext = createContext({
  branding: DEFAULT_BRANDING,
  features: DEFAULT_FEATURES,
  loading: true
});

export function BrandingProvider({ children }) {
  const [branding, setBranding] = useState(DEFAULT_BRANDING);
  const [features, setFeatures] = useState(DEFAULT_FEATURES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Suscripción en tiempo real a cambios de branding
    const unsubscribe = subscribeToBranding((data) => {
      setBranding({
        businessName: data.businessName,
        tagline: data.tagline,
        logoUrl: data.logoUrl,
        phone: data.phone,
        whatsapp: data.whatsapp,
        address: data.address,
        instagram: data.instagram,
        colors: data.colors
      });

      setFeatures(data.features || DEFAULT_FEATURES);

      // Aplicar colores al documento
      if (data.colors) {
        applyBrandColors(data.colors);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    branding,
    features,
    loading
  };

  return (
    <BrandingContext.Provider value={value}>
      {children}
    </BrandingContext.Provider>
  );
}
