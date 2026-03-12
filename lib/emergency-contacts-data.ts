export type ContactCategory = 'police-fire' | 'medical' | 'utilities' | 'officials' | 'disaster'

export interface EmergencyContact {
  id: string
  name: string
  category: ContactCategory
  phone: string
  description: string
  icon: string
  color: 'red' | 'green' | 'blue' | 'purple' | 'orange'
}

export const emergencyContacts: EmergencyContact[] = [
  // CRITICAL EMERGENCIES - Police & Fire
  {
    id: 'police-edakkad',
    name: 'Edakkad Police Station',
    category: 'police-fire',
    phone: '+91-497-2341234',
    description: 'Main police station for Ezhara Division 34',
    icon: 'Shield',
    color: 'red',
  },
  {
    id: 'fire-kannur',
    name: 'Kannur Fire & Rescue',
    category: 'police-fire',
    phone: '101',
    description: 'Emergency fire and rescue services',
    icon: 'Flame',
    color: 'red',
  },
  {
    id: 'women-helpline',
    name: 'Women Helpline',
    category: 'police-fire',
    phone: '1091',
    description: '24/7 women safety and support',
    icon: 'Phone',
    color: 'red',
  },
  {
    id: 'child-helpline',
    name: 'Child Helpline',
    category: 'police-fire',
    phone: '1098',
    description: '24/7 child protection helpline',
    icon: 'Heart',
    color: 'red',
  },
  {
    id: 'disaster-management',
    name: 'Disaster Management Control Room',
    category: 'police-fire',
    phone: '1077',
    description: 'Natural disaster emergency response',
    icon: 'AlertTriangle',
    color: 'red',
  },

  // MEDICAL & AMBULANCE
  {
    id: 'phc-ezhara',
    name: 'Primary Health Centre, Ezhara',
    category: 'medical',
    phone: '+91-497-2356789',
    description: 'Basic medical services and vaccinations',
    icon: 'Stethoscope',
    color: 'green',
  },
  {
    id: 'ambulance-24x7',
    name: '24/7 Ezhara Ambulance Service',
    category: 'medical',
    phone: '108',
    description: 'Emergency medical transport',
    icon: 'AlertCircle',
    color: 'green',
  },
  {
    id: 'private-clinic-wellness',
    name: 'Wellness Medical Clinic, Ezhara',
    category: 'medical',
    phone: '+91-497-2345678',
    description: 'Private clinic with emergency services',
    icon: 'Stethoscope',
    color: 'green',
  },
  {
    id: 'dist-hospital-kannur',
    name: 'District Hospital, Kannur',
    category: 'medical',
    phone: '+91-497-2705555',
    description: 'Tertiary care hospital in Kannur',
    icon: 'Building2',
    color: 'green',
  },
  {
    id: 'govt-hospital-kannur',
    name: 'Government Medical College Hospital, Kannur',
    category: 'medical',
    phone: '+91-497-2705000',
    description: 'Medical college hospital with trauma center',
    icon: 'Building2',
    color: 'green',
  },
  {
    id: 'baby-care-hospital',
    name: 'Baby Care Hospital, Kannur',
    category: 'medical',
    phone: '+91-497-2741414',
    description: 'Pediatric and maternity hospital',
    icon: 'Heart',
    color: 'green',
  },
  {
    id: 'dental-center',
    name: 'Kannur Dental Care Centre',
    category: 'medical',
    phone: '+91-497-2356456',
    description: 'Emergency dental services',
    icon: 'Stethoscope',
    color: 'green',
  },
  {
    id: 'eye-hospital',
    name: 'Kannur Eye Hospital',
    category: 'medical',
    phone: '+91-497-2741999',
    description: 'Eye care and emergency services',
    icon: 'Eye',
    color: 'green',
  },

  // UTILITIES & CIVIC SERVICES
  {
    id: 'kseb-office',
    name: 'KSEB Section Office, Ezhara',
    category: 'utilities',
    phone: '+91-497-2345900',
    description: 'Electricity breakdown and complaints',
    icon: 'Zap',
    color: 'blue',
  },
  {
    id: 'kwa-office',
    name: 'Kerala Water Authority (KWA)',
    category: 'utilities',
    phone: '+91-497-2356000',
    description: 'Water supply and maintenance',
    icon: 'Droplet',
    color: 'blue',
  },
  {
    id: 'bsnl-office',
    name: 'BSNL Office, Ezhara',
    category: 'utilities',
    phone: '197',
    description: 'Telephone and broadband services',
    icon: 'Phone',
    color: 'blue',
  },
  {
    id: 'post-office',
    name: 'Ezhara Post Office',
    category: 'utilities',
    phone: '+91-497-2345456',
    description: 'Postal services',
    icon: 'Mail',
    color: 'blue',
  },

  // WARD OFFICIALS
  {
    id: 'councilor-faslim',
    name: 'Councilor Faslim T.P. (Ward 34)',
    category: 'officials',
    phone: '+91-9876543210',
    description: 'Ward councilor office',
    icon: 'Users',
    color: 'purple',
  },
  {
    id: 'ward-office',
    name: 'Ward 34 Office Secretary',
    category: 'officials',
    phone: '+91-497-2345789',
    description: 'Administrative office',
    icon: 'Building',
    color: 'purple',
  },
  {
    id: 'corporation-office',
    name: 'Kannur Corporation Office',
    category: 'officials',
    phone: '+91-497-2705566',
    description: 'Municipal corporation services',
    icon: 'Building2',
    color: 'purple',
  },

  // DISASTER MANAGEMENT
  {
    id: 'disaster-control',
    name: 'Disaster Management Control Room',
    category: 'disaster',
    phone: '1077',
    description: 'Flood, landslide, and emergency relief',
    icon: 'CloudRain',
    color: 'orange',
  },
  {
    id: 'rescue-team',
    name: 'National Disaster Response Force (NDRF)',
    category: 'disaster',
    phone: '+91-011-26701111',
    description: 'Rescue and disaster management',
    icon: 'AlertTriangle',
    color: 'orange',
  },
]

export const categories = [
  { id: 'all', label: 'All Services' },
  { id: 'police-fire', label: 'Police & Fire' },
  { id: 'medical', label: 'Medical & Ambulance' },
  { id: 'utilities', label: 'Utilities' },
  { id: 'officials', label: 'Ward Officials' },
  { id: 'disaster', label: 'Disaster Management' },
]
