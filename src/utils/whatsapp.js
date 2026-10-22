/**
 * Genera la URL de WhatsApp para enviar o confirmar los detalles de una cita.
 *
 * @param {Object} params
 * @param {string} [params.phone] - Número de teléfono/WhatsApp de la clínica
 * @param {string} params.clientName - Nombre del paciente
 * @param {string} params.serviceName - Nombre del tratamiento
 * @param {string} params.dateLabel - Fecha formateada (ej. "Lunes 27 de octubre")
 * @param {string} params.time - Horario (ej. "10:00")
 * @param {string} [params.businessName] - Nombre de la clínica
 * @returns {string} URL de WhatsApp lista para abrir en web o app
 */
export function buildWhatsAppConfirmationUrl({
  phone,
  clientName,
  serviceName,
  dateLabel,
  time,
  businessName = 'Gestión de Clínica Dental',
}) {
  const cleanPhone = phone ? phone.replace(/[^\d]/g, '') : ''

  const message =
    `¡Hola! 👋 Quisiera confirmar mi cita en *${businessName}*:\n\n` +
    `👤 *Paciente:* ${clientName || 'Paciente'}\n` +
    `🦷 *Tratamiento:* ${serviceName || 'Consulta dental'}\n` +
    `📅 *Fecha:* ${dateLabel || 'Fecha programada'}\n` +
    `⏰ *Horario:* ${time ? `${time} hs` : ''}\n\n` +
    `¡Muchas gracias!`

  const encoded = encodeURIComponent(message)

  return cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encoded}`
    : `https://api.whatsapp.com/send?text=${encoded}`
}
