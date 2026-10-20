/**
 * BRANDING SERVICE
 * Gestiona configuración de marca y feature flags desde Firestore
 */

import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';

const BRANDING_DOC_PATH = 'settings/branding';

/**
 * Valores por defecto del branding
 */
export const DEFAULT_BRANDING = {
  businessName: 'Clínica Dental',
  tagline: 'Tu salud dental es nuestra prioridad',
  logoUrl: '',
  phone: '',
  whatsapp: '',
  address: '',
  instagram: '',
  colors: {
    primary: '#0E7490',      // Cyan-700 (azul clínico)
    secondary: '#06B6D4',    // Cyan-500 (cyan claro)
    accent: '#10B981'        // Emerald-500 (verde menta)
  }
};

/**
 * Feature flags por defecto
 */
export const DEFAULT_FEATURES = {
  payments: false,           // Oculta sistema de señas/depósitos/pagos
  showPrices: false,         // Oculta precios en catálogo y reserva
  benefits: false,           // Oculta programa de fidelización/puntos
  advancedReports: false,    // Muestra solo resumen simple (hoy, pendientes, próximos)
  autoConfirm: true          // Si payments=false, confirma automáticamente las citas
};

/**
 * Obtiene configuración de branding desde Firestore
 */
export async function getBranding() {
  try {
    const docRef = doc(db, BRANDING_DOC_PATH);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...DEFAULT_BRANDING,
        ...data,
        colors: {
          ...DEFAULT_BRANDING.colors,
          ...(data.colors || {})
        }
      };
    }

    // Si no existe, crear con valores por defecto
    await setDoc(docRef, {
      ...DEFAULT_BRANDING,
      features: DEFAULT_FEATURES,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return {
      ...DEFAULT_BRANDING,
      features: DEFAULT_FEATURES
    };
  } catch (error) {
    console.error('Error fetching branding:', error);
    return {
      ...DEFAULT_BRANDING,
      features: DEFAULT_FEATURES
    };
  }
}

/**
 * Actualiza configuración de branding en Firestore
 */
export async function updateBranding(brandingData) {
  try {
    const docRef = doc(db, BRANDING_DOC_PATH);
    
    await setDoc(docRef, {
      ...brandingData,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    return { success: true };
  } catch (error) {
    console.error('Error updating branding:', error);
    throw error;
  }
}

/**
 * Obtiene solo los feature flags
 */
export async function getFeatureFlags() {
  try {
    const branding = await getBranding();
    return {
      ...DEFAULT_FEATURES,
      ...(branding.features || {})
    };
  } catch (error) {
    console.error('Error fetching feature flags:', error);
    return DEFAULT_FEATURES;
  }
}

/**
 * Actualiza solo los feature flags
 */
export async function updateFeatureFlags(features) {
  try {
    const docRef = doc(db, BRANDING_DOC_PATH);
    
    await setDoc(docRef, {
      features: {
        ...DEFAULT_FEATURES,
        ...features
      },
      updatedAt: new Date().toISOString()
    }, { merge: true });

    return { success: true };
  } catch (error) {
    console.error('Error updating feature flags:', error);
    throw error;
  }
}

/**
 * Suscripción en tiempo real a cambios de branding
 */
export function subscribeToBranding(callback) {
  const docRef = doc(db, BRANDING_DOC_PATH);
  
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      callback({
        ...DEFAULT_BRANDING,
        ...data,
        colors: {
          ...DEFAULT_BRANDING.colors,
          ...(data.colors || {})
        },
        features: {
          ...DEFAULT_FEATURES,
          ...(data.features || {})
        }
      });
    } else {
      callback({
        ...DEFAULT_BRANDING,
        features: DEFAULT_FEATURES
      });
    }
  }, (error) => {
    console.error('Error in branding subscription:', error);
    callback({
      ...DEFAULT_BRANDING,
      features: DEFAULT_FEATURES
    });
  });
}

/**
 * Aplica los colores al documento (CSS variables)
 */
export function applyBrandColors(colors) {
  const root = document.documentElement;
  
  if (colors.primary) {
    root.style.setProperty('--color-brand-primary', colors.primary);
  }
  if (colors.secondary) {
    root.style.setProperty('--color-brand-secondary', colors.secondary);
  }
  if (colors.accent) {
    root.style.setProperty('--color-brand-accent', colors.accent);
  }
}

/**
 * Resetea colores a valores por defecto
 */
export function resetBrandColors() {
  applyBrandColors(DEFAULT_BRANDING.colors);
}
