/**
 * HOOK: useFeatures
 * Acceso rápido a feature flags
 */

import { useBranding } from './useBranding';

export function useFeatures() {
  const { features } = useBranding();
  
  return features;
}

/**
 * Hook para verificar si un feature específico está habilitado
 */
export function useFeatureFlag(featureName) {
  const features = useFeatures();
  return features[featureName] === true;
}
