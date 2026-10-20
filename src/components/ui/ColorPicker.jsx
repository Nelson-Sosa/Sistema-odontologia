/**
 * COLOR PICKER COMPONENT
 * Selector de color simple para configuración de branding
 */

import { useState } from 'react';

function ColorPicker({ 
  label, 
  value, 
  onChange, 
  presetColors = [] 
}) {
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (newColor) => {
    onChange(newColor);
    setShowPicker(false);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="flex items-center gap-3">
        {/* Color preview */}
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="w-12 h-12 rounded-lg border-2 border-gray-300 shadow-sm hover:border-gray-400 transition-colors"
          style={{ backgroundColor: value }}
          aria-label={`Seleccionar color: ${value}`}
        />
        
        {/* Input de texto */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono text-sm"
          placeholder="#000000"
          pattern="^#[0-9A-Fa-f]{6}$"
        />
        
        {/* Input nativo de color (hidden) */}
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-0 h-0 opacity-0 absolute"
          id={`color-input-${label}`}
        />
        
        <label
          htmlFor={`color-input-${label}`}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors text-sm font-medium"
        >
          Elegir
        </label>
      </div>

      {/* Presets */}
      {presetColors.length > 0 && showPicker && (
        <div className="flex gap-2 flex-wrap p-3 bg-gray-50 rounded-lg">
          <span className="w-full text-xs text-gray-600 mb-1">
            Colores sugeridos:
          </span>
          {presetColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleColorChange(color)}
              className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-500 hover:scale-110 transition-all"
              style={{ backgroundColor: color }}
              aria-label={`Usar color ${color}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ColorPicker
