import {
  LayoutDashboard,
  CalendarDays,
  CalendarPlus,
  Users,
  Settings,
  UserCircle,
  Home,
} from 'lucide-react'
import { ROUTES } from '@/routes/routes'
import { ToothIcon } from '@/components/icons/ToothIcon'

/**
 * Main navigation items for the Sidebar.
 * Each item can optionally have `children` for nested menus (future feature).
 *
 * @typedef {Object} NavItem
 * @property {string} id - Unique identifier
 * @property {string} label - Display label
 * @property {string} path - Route path
 * @property {import('lucide-react').LucideIcon} icon - Lucide icon component
 * @property {string} [description] - Short description (for tooltips in collapsed state)
 * @property {string[]} roles - Allowed roles for this item (e.g. ['admin', 'user'])
 */

/** @type {NavItem[]} */
export const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    description: 'Resumen general',
    roles: ['admin'],
  },
  {
    id: 'user-dashboard',
    label: 'Inicio',
    path: ROUTES.USER_DASHBOARD,
    icon: Home,
    description: 'Panel de fidelización',
    roles: ['user'],
  },
  {
    id: 'appointments',
    label: 'Citas',
    path: ROUTES.APPOINTMENTS,
    icon: CalendarDays,
    description: 'Gestión de citas',
    roles: ['admin', 'user'],
  },
  {
    id: 'clients',
    label: 'Pacientes',
    path: ROUTES.CLIENTS,
    icon: Users,
    description: 'Base de pacientes',
    roles: ['admin'],
  },
  {
    id: 'services',
    label: 'Tratamientos',
    path: ROUTES.SERVICES,
    icon: ToothIcon,
    description: 'Tratamientos y precios',
    roles: ['admin', 'user'],
  },
  {
    id: 'booking',
    label: 'Solicitar Cita',
    path: ROUTES.BOOKING,
    icon: CalendarPlus,
    description: 'Solicitar una cita',
    roles: ['user'],
  },
  // {
  //   id: 'reports',
  //   label: 'Reportes',
  //   path: ROUTES.REPORTS,
  //   icon: ChartBar,
  //   description: 'Estadísticas e ingresos',
  //   roles: ['admin'],
  // },
  {
    id: 'settings',
    label: 'Configuración',
    path: ROUTES.SETTINGS,
    icon: Settings,
    description: 'Ajustes del sistema',
    roles: ['admin'],
  },
  {
    id: 'profile',
    label: 'Mi Perfil',
    path: ROUTES.PROFILE,
    icon: UserCircle,
    description: 'Datos y preferencias',
    roles: ['admin', 'user'],
  },
]
