import { supabase } from './supabase';

// Types matching the ACTUAL database schema
export type ServiceWithUI = {
  id: string; // slug for URL routing
  db_id: string; // actual UUID from DB
  name: string;
  description: string;
  icon: string; // lucide icon name
  basePrice: number; // camelCase for ServiceCard component
  base_price: number; // snake_case from DB
  category: string;
  color: string;
  iconColor: string;
  features: string[];
  duration: string;
  popular: boolean;
};

export type BookingWithDetails = {
  id: string;
  customer_id: string | null;
  provider_id: string | null;
  service_id: string | null;
  status: string;
  scheduled_date: string | null;
  scheduled_time: string;
  address: string;
  city: string;
  notes: string | null;
  total_amount: number;
  payment_method: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
  service_name: string;
  provider_name: string | null;
  provider_rating: number | null;
  service_icon: string | null;
  service_category: string | null;
  customer_name: string | null;
};

export type TechnicianRow = {
  id: string;
  user_id: string | null;
  tech_id: string;
  username: string;
  full_name: string;
  phone: string;
  assigned_category: string;
  assigned_services: string[];
  city: string;
  status: string;
  rating: number;
  total_jobs: number;
  total_earnings: number;
  is_available: boolean;
  created_at: string;
};

export type PaymentRow = {
  id: string;
  booking_id: string | null;
  customer_id: string | null;
  customer_name: string | null;
  amount: number;
  upi_id: string;
  transaction_id: string | null;
  status: string;
  payment_method: string;
  created_at: string;
};

export type EarningRow = {
  id: string;
  technician_id: string | null;
  booking_id: string | null;
  amount: number;
  platform_fee: number;
  net_amount: number;
  status: string;
  created_at: string;
};

// Service UI mapping for when DB columns are missing
const SERVICE_UI_MAP: Record<string, { color: string; iconColor: string; features: string[]; duration: string; popular: boolean }> = {
  'AC Service': {
    color: 'from-blue-500/20 to-blue-600/10',
    iconColor: 'text-blue-400',
    features: ['Deep Cleaning', 'Gas Refill', 'Filter Wash', 'Cooling Check'],
    duration: '2-3 hrs',
    popular: true,
  },
  'CCTV Installation': {
    color: 'from-green-500/20 to-green-600/10',
    iconColor: 'text-green-400',
    features: ['HD Cameras', 'DVR Setup', 'Night Vision', 'Mobile Access'],
    duration: '3-4 hrs',
    popular: false,
  },
  'Plumbing': {
    color: 'from-cyan-500/20 to-cyan-600/10',
    iconColor: 'text-cyan-400',
    features: ['Leak Fix', 'Pipe Repair', 'Tap Install', 'Drain Clear'],
    duration: '1-2 hrs',
    popular: false,
  },
  'Electrician': {
    color: 'from-yellow-500/20 to-yellow-600/10',
    iconColor: 'text-yellow-400',
    features: ['Wiring', 'Switchboard', 'Fan Install', 'MCB Repair'],
    duration: '1-2 hrs',
    popular: true,
  },
  'Refrigerator Repair': {
    color: 'from-teal-500/20 to-teal-600/10',
    iconColor: 'text-teal-400',
    features: ['Cooling Fix', 'Compressor', 'Door Seal', 'Gas Charge'],
    duration: '2-3 hrs',
    popular: false,
  },
  'Washing Machine': {
    color: 'from-orange-500/20 to-orange-600/10',
    iconColor: 'text-orange-400',
    features: ['Drum Clean', 'Motor Check', 'Inlet Fix', 'Error Codes'],
    duration: '2-3 hrs',
    popular: false,
  },
};

const ICON_NAME_MAP: Record<string, string> = {
  Wind: 'Wind', Camera: 'Camera', Droplets: 'Droplets', Zap: 'Zap',
  Thermometer: 'Thermometer', Wrench: 'Wrench', RefreshCw: 'RefreshCw',
  wind: 'Wind', camera: 'Camera', droplets: 'Droplets', zap: 'Zap',
  thermometer: 'Thermometer', wrench: 'Wrench', circle: 'RefreshCw',
};

export function getIconName(dbIcon: string): string {
  return ICON_NAME_MAP[dbIcon] || 'Wrench';
}

// ---------- FETCH FUNCTIONS ----------

export async function fetchServices(): Promise<ServiceWithUI[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('base_price', { ascending: true });

  if (error || !data || data.length === 0) return getFallbackServices();

  return data.map(s => {
    const ui = SERVICE_UI_MAP[s.name] || {
      color: 'from-orange-500/20 to-orange-600/10',
      iconColor: 'text-orange-400',
      features: ['Professional Service'],
      duration: '1-2 hrs',
      popular: false,
    };
    return {
      id: s.slug || s.name.toLowerCase().replace(/\s+/g, '-'),
      db_id: s.id,
      name: s.name,
      description: s.description || '',
      icon: getIconName(s.icon_name || ''),
      basePrice: s.base_price || 0,
      base_price: s.base_price || 0,
      category: s.category || 'home',
      color: ui.color,
      iconColor: ui.iconColor,
      features: s.features?.length ? s.features : ui.features,
      duration: s.duration_minutes ? `${Math.floor(s.duration_minutes / 60)}-${Math.ceil(s.duration_minutes / 60)} hrs` : ui.duration,
      popular: s.is_popular ?? ui.popular,
    };
  });
}

export async function fetchServiceBySlug(slug: string): Promise<ServiceWithUI | null> {
  const services = await fetchServices();
  return services.find(s => s.id === slug) || null;
}

export async function fetchBookings(customerId: string): Promise<BookingWithDetails[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('id, customer_id, provider_id, service_id, status, scheduled_date, scheduled_time, address, city, notes, total_amount, payment_method, payment_status, created_at, updated_at')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  // Enrich with provider and service data
  const enriched = await Promise.all(data.map(async (b: any) => {
    let provider_name = null;
    let provider_rating = null;
    let service_icon = null;
    let service_category = null;
    let service_name = 'Service';
    let customer_name = null;

    if (b.provider_id) {
      const { data: prov } = await supabase.from('providers').select('business_name, rating').eq('id', b.provider_id).maybeSingle();
      if (prov) { provider_name = prov.business_name; provider_rating = prov.rating; }
    }
    if (b.service_id) {
      const { data: svc } = await supabase.from('services').select('icon_name, category, name').eq('id', b.service_id).maybeSingle();
      if (svc) { service_icon = svc.icon_name; service_category = svc.category; service_name = svc.name; }
    }
    if (b.customer_id) {
      const { data: prof } = await supabase.from('profiles').select('full_name').eq('id', b.customer_id).maybeSingle();
      if (prof) { customer_name = prof.full_name; }
    }

    return { ...b, provider_name, provider_rating, service_icon, service_category, service_name, customer_name };
  }));

  return enriched as BookingWithDetails[];
}

export async function fetchBookingById(bookingId: string, customerId: string): Promise<BookingWithDetails | null> {
  const { data, error } = await supabase
    .from('bookings')
    .select('id, customer_id, provider_id, service_id, status, scheduled_date, scheduled_time, address, city, notes, total_amount, payment_method, payment_status, created_at, updated_at')
    .eq('id', bookingId)
    .eq('customer_id', customerId)
    .maybeSingle();

  if (error || !data) return null;

  let provider_name = null;
  let provider_rating = null;
  let service_icon = null;
  let service_category = null;
  let service_name = 'Service';

  if ((data as any).provider_id) {
    const { data: prov } = await supabase.from('providers').select('business_name, rating').eq('id', (data as any).provider_id).maybeSingle();
    if (prov) { provider_name = prov.business_name; provider_rating = prov.rating; }
  }
  if ((data as any).service_id) {
    const { data: svc } = await supabase.from('services').select('icon_name, category, name').eq('id', (data as any).service_id).maybeSingle();
    if (svc) { service_icon = svc.icon_name; service_category = svc.category; service_name = svc.name; }
  }

  return { ...(data as any), provider_name, provider_rating, service_icon, service_category, service_name, customer_name: null };
}

export async function createBooking(booking: {
  customer_id: string;
  service_id: string | null;
  scheduled_date: string;
  scheduled_time: string;
  address: string;
  notes: string;
  total_amount: number;
  payment_method?: string;
}): Promise<any | null> {
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      customer_id: booking.customer_id,
      service_id: booking.service_id,
      scheduled_date: booking.scheduled_date,
      scheduled_time: booking.scheduled_time,
      address: booking.address,
      notes: booking.notes || null,
      total_amount: booking.total_amount,
      payment_method: booking.payment_method || 'upi',
      status: 'pending',
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error('Booking creation error:', error);
    return null;
  }
  return data;
}

export async function cancelBooking(bookingId: string, customerId: string): Promise<boolean> {
  const { error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled', updated_at: new Date().toISOString() })
    .eq('id', bookingId)
    .eq('customer_id', customerId);

  return !error;
}

export async function fetchPayments(customerId: string): Promise<PaymentRow[]> {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data as PaymentRow[];
}

export async function fetchAllPayments(): Promise<PaymentRow[]> {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data as PaymentRow[];
}

export async function fetchAllTechnicians(): Promise<TechnicianRow[]> {
  const { data, error } = await supabase
    .from('technicians')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data as TechnicianRow[];
}

export async function fetchAllBookings(): Promise<BookingWithDetails[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('id, customer_id, provider_id, service_id, status, scheduled_date, scheduled_time, address, city, notes, total_amount, payment_method, payment_status, created_at, updated_at')
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  const enriched = await Promise.all(data.map(async (b: any) => {
    let provider_name = null;
    let service_icon = null;
    let service_category = null;
    let service_name = 'Service';
    let customer_name = null;

    if (b.provider_id) {
      const { data: prov } = await supabase.from('providers').select('business_name').eq('id', b.provider_id).maybeSingle();
      if (prov) provider_name = prov.business_name;
    }
    if (b.service_id) {
      const { data: svc } = await supabase.from('services').select('icon_name, category, name').eq('id', b.service_id).maybeSingle();
      if (svc) { service_icon = svc.icon_name; service_category = svc.category; service_name = svc.name; }
    }
    if (b.customer_id) {
      const { data: prof } = await supabase.from('profiles').select('full_name').eq('id', b.customer_id).maybeSingle();
      if (prof) customer_name = prof.full_name;
    }

    return { ...b, provider_name, provider_rating: null, service_icon, service_category, service_name, customer_name };
  }));

  return enriched as BookingWithDetails[];
}

export async function fetchEarnings(technicianId: string): Promise<EarningRow[]> {
  const { data, error } = await supabase
    .from('technician_earnings')
    .select('*')
    .eq('technician_id', technicianId)
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data as EarningRow[];
}

export async function createTechnician(tech: {
  tech_id: string;
  username: string;
  password_hash: string;
  full_name: string;
  phone: string;
  assigned_category: string;
  assigned_services: string[];
  city: string;
}): Promise<TechnicianRow | null> {
  const { data, error } = await supabase
    .from('technicians')
    .insert(tech)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Technician creation error:', error);
    return null;
  }
  return data as TechnicianRow;
}

export async function updateTechnicianStatus(techId: string, status: string): Promise<boolean> {
  const { error } = await supabase
    .from('technicians')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', techId);

  return !error;
}

// ---------- FALLBACK DATA ----------

function getFallbackServices(): ServiceWithUI[] {
  return [
    {
      id: 'ac-service', db_id: '', name: 'AC Service', description: 'Cleaning, gas refill & repair',
      icon: 'Wind', basePrice: 499, base_price: 499, category: 'appliance',
      color: 'from-blue-500/20 to-blue-600/10', iconColor: 'text-blue-400',
      features: ['Deep Cleaning', 'Gas Refill', 'Filter Wash', 'Cooling Check'],
      duration: '2-3 hrs', popular: true,
    },
    {
      id: 'cctv-installation', db_id: '', name: 'CCTV Installation', description: 'Camera setup & configuration',
      icon: 'Camera', basePrice: 1499, base_price: 1499, category: 'security',
      color: 'from-green-500/20 to-green-600/10', iconColor: 'text-green-400',
      features: ['HD Cameras', 'DVR Setup', 'Night Vision', 'Mobile Access'],
      duration: '3-4 hrs', popular: false,
    },
    {
      id: 'plumbing', db_id: '', name: 'Plumbing', description: 'Pipe repair & installations',
      icon: 'Droplets', basePrice: 399, base_price: 399, category: 'home',
      color: 'from-cyan-500/20 to-cyan-600/10', iconColor: 'text-cyan-400',
      features: ['Leak Fix', 'Pipe Repair', 'Tap Install', 'Drain Clear'],
      duration: '1-2 hrs', popular: false,
    },
    {
      id: 'electrician', db_id: '', name: 'Electrician', description: 'Wiring & electrical repairs',
      icon: 'Zap', basePrice: 349, base_price: 349, category: 'home',
      color: 'from-yellow-500/20 to-yellow-600/10', iconColor: 'text-yellow-400',
      features: ['Wiring', 'Switchboard', 'Fan Install', 'MCB Repair'],
      duration: '1-2 hrs', popular: true,
    },
    {
      id: 'refrigerator-repair', db_id: '', name: 'Refrigerator Repair', description: 'Cooling & compressor service',
      icon: 'Thermometer', basePrice: 599, base_price: 599, category: 'appliance',
      color: 'from-teal-500/20 to-teal-600/10', iconColor: 'text-teal-400',
      features: ['Cooling Fix', 'Compressor', 'Door Seal', 'Gas Charge'],
      duration: '2-3 hrs', popular: false,
    },
    {
      id: 'washing-machine', db_id: '', name: 'Washing Machine', description: 'Drum & motor servicing',
      icon: 'RefreshCw', basePrice: 449, base_price: 449, category: 'appliance',
      color: 'from-orange-500/20 to-orange-600/10', iconColor: 'text-orange-400',
      features: ['Drum Clean', 'Motor Check', 'Inlet Fix', 'Error Codes'],
      duration: '2-3 hrs', popular: false,
    },
  ];
}
