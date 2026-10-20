/**
 * LABELS DE TERMINOLOGÍA - SISTEMA DENTAL
 * 
 * Centraliza toda la terminología de la aplicación.
 * Mapeo: Barbería → Clínica Dental
 */

export const LABELS = {
  // ========== ENTIDADES ==========
  service: 'tratamiento',
  services: 'tratamientos',
  Service: 'Tratamiento',
  Services: 'Tratamientos',
  
  client: 'paciente',
  clients: 'pacientes',
  Client: 'Paciente',
  Clients: 'Pacientes',
  
  professional: 'odontólogo',
  professionals: 'odontólogos',
  Professional: 'Odontólogo',
  Professionals: 'Odontólogos',
  professionalFemale: 'odontóloga',
  
  appointment: 'cita',
  appointments: 'citas',
  Appointment: 'Cita',
  Appointments: 'Citas',
  
  // ========== ACCIONES DE RESERVA ==========
  bookAction: 'Solicitar cita',
  bookActionLower: 'solicitar cita',
  booking: 'Solicitud de cita',
  newBooking: 'Nueva solicitud de cita',
  
  reserveAppointment: 'Solicitar cita',
  scheduleAppointment: 'Agendar cita',
  cancelAppointment: 'Cancelar cita',
  confirmAppointment: 'Confirmar cita',
  
  // ========== CATEGORÍAS DE SERVICIOS ==========
  categories: {
    consultation: 'Consulta',
    cleaning: 'Limpieza',
    orthodontics: 'Ortodoncia',
    aesthetics: 'Estética dental',
    emergency: 'Urgencia'
  },
  
  // ========== UI / FORMULARIOS ==========
  selectService: 'Seleccionar tratamiento',
  serviceDetails: 'Detalles del tratamiento',
  serviceName: 'Nombre del tratamiento',
  serviceDuration: 'Duración del tratamiento',
  servicePrice: 'Precio del tratamiento',
  
  selectProfessional: 'Seleccionar odontólogo/a',
  assignedProfessional: 'Odontólogo/a asignado',
  
  clientName: 'Nombre del paciente',
  clientPhone: 'Teléfono del paciente',
  clientEmail: 'Email del paciente',
  clientInfo: 'Información del paciente',
  
  appointmentDate: 'Fecha de la cita',
  appointmentTime: 'Hora de la cita',
  appointmentDetails: 'Detalles de la cita',
  
  // ========== DASHBOARD / ADMIN ==========
  todayAppointments: 'Citas de hoy',
  upcomingAppointments: 'Próximas citas',
  pendingAppointments: 'Citas pendientes',
  completedAppointments: 'Citas completadas',
  
  manageServices: 'Gestionar tratamientos',
  manageClients: 'Gestionar pacientes',
  manageAppointments: 'Gestionar citas',
  manageProfessionals: 'Gestionar odontólogos',
  
  // ========== ESTADOS ==========
  status: {
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    completed: 'Completada',
    cancelled: 'Cancelada',
    noShow: 'No asistió'
  },
  
  // ========== NOTIFICACIONES ==========
  notifications: {
    appointmentConfirmed: 'Su cita ha sido confirmada',
    appointmentCancelled: 'Su cita ha sido cancelada',
    appointmentReminder: 'Recordatorio de cita',
    newAppointmentRequest: 'Nueva solicitud de cita recibida'
  },
  
  // ========== MENSAJES ==========
  messages: {
    noServicesAvailable: 'No hay tratamientos disponibles',
    noClientsFound: 'No se encontraron pacientes',
    noAppointmentsFound: 'No hay citas registradas',
    selectServiceFirst: 'Primero seleccione un tratamiento',
    appointmentCreatedSuccess: 'Cita solicitada exitosamente',
    appointmentUpdatedSuccess: 'Cita actualizada exitosamente',
    appointmentCancelledSuccess: 'Cita cancelada exitosamente'
  }
};

/**
 * Helper para obtener label con fallback
 */
export function getLabel(path, defaultValue = '') {
  const keys = path.split('.');
  let value = LABELS;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return defaultValue;
    }
  }
  
  return value || defaultValue;
}

export default LABELS;
