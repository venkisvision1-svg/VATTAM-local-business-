// Mock data store for VATTAM Admin Control System
// In production, this would be replaced with Supabase queries

export type Technician = {
  id: string;
  techId: string;
  username: string;
  password: string;
  fullName: string;
  phone: string;
  assignedCategory: string;
  assignedServices: string[];
  city: string;
  status: 'active' | 'blocked' | 'removed';
  rating: number;
  totalJobs: number;
  totalEarnings: number;
  isAvailable: boolean;
  createdAt: string;
};

export type Booking = {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  technicianId: string | null;
  technicianName: string | null;
  serviceId: string;
  serviceName: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  technicianStatus: 'pending' | 'accepted' | 'rejected' | 'in_progress' | 'completed';
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  notes: string;
  totalAmount: number;
  workPhotoUrl: string | null;
  createdAt: string;
};

export type UPIPayment = {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  amount: number;
  upiId: string;
  transactionId: string;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  paymentMethod: 'upi' | 'qr' | 'link';
  createdAt: string;
};

export type TechnicianEarning = {
  id: string;
  technicianId: string;
  bookingId: string;
  amount: number;
  platformFee: number;
  netAmount: number;
  status: 'pending' | 'paid' | 'held';
  createdAt: string;
};

// ---------- MOCK TECHNICIANS ----------

export const MOCK_TECHNICIANS: Technician[] = [
  {
    id: 't1', techId: 'TECH-001', username: 'rajan.elec', password: 'Rajan@123',
    fullName: 'Rajan Kumar', phone: '+91 98765 43210', assignedCategory: 'home',
    assignedServices: ['AC Service', 'Electrician'], city: 'Chennai',
    status: 'active', rating: 4.8, totalJobs: 127, totalEarnings: 84500, isAvailable: true,
    createdAt: '2024-03-15',
  },
  {
    id: 't2', techId: 'TECH-002', username: 'secure.cam', password: 'Secure@456',
    fullName: 'Suresh Babu', phone: '+91 87654 32109', assignedCategory: 'security',
    assignedServices: ['CCTV Installation'], city: 'Chennai',
    status: 'active', rating: 4.6, totalJobs: 89, totalEarnings: 134000, isAvailable: true,
    createdAt: '2024-05-20',
  },
  {
    id: 't3', techId: 'TECH-003', username: 'pipe.expert', password: 'Pipe@789',
    fullName: 'Murugan S.', phone: '+91 76543 21098', assignedCategory: 'home',
    assignedServices: ['Plumbing'], city: 'Coimbatore',
    status: 'active', rating: 4.5, totalJobs: 56, totalEarnings: 28000, isAvailable: false,
    createdAt: '2025-01-10',
  },
  {
    id: 't4', techId: 'TECH-004', username: 'cool.air', password: 'Cool@101',
    fullName: 'Karthik Raja', phone: '+91 65432 10987', assignedCategory: 'appliance',
    assignedServices: ['AC Service', 'Refrigerator Repair', 'Washing Machine'], city: 'Madurai',
    status: 'blocked', rating: 3.2, totalJobs: 15, totalEarnings: 9500, isAvailable: false,
    createdAt: '2025-06-01',
  },
  {
    id: 't5', techId: 'TECH-005', username: 'wire.pro', password: 'Wire@202',
    fullName: 'Bala Murugan', phone: '+91 54321 09876', assignedCategory: 'home',
    assignedServices: ['Electrician'], city: 'Chennai',
    status: 'active', rating: 4.7, totalJobs: 98, totalEarnings: 52000, isAvailable: true,
    createdAt: '2024-08-12',
  },
];

// ---------- MOCK BOOKINGS ----------

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'B001', customerId: 'c1', customerName: 'Priya Ramesh', customerPhone: '+91 98765 11111',
    technicianId: 't1', technicianName: 'Rajan Kumar',
    serviceId: 'ac-service', serviceName: 'AC Service',
    status: 'confirmed', technicianStatus: 'accepted',
    scheduledDate: '2026-05-28', scheduledTime: '10:00 AM',
    address: '45, Anna Nagar, Chennai', notes: 'Bring gas refill kit',
    totalAmount: 646, workPhotoUrl: null, createdAt: '2026-05-26',
  },
  {
    id: 'B002', customerId: 'c2', customerName: 'Karthik M.', customerPhone: '+91 98765 22222',
    technicianId: 't2', technicianName: 'Suresh Babu',
    serviceId: 'cctv-installation', serviceName: 'CCTV Installation',
    status: 'completed', technicianStatus: 'completed',
    scheduledDate: '2026-05-24', scheduledTime: '02:00 PM',
    address: '12, T Nagar, Chennai', notes: '4 camera setup',
    totalAmount: 1748, workPhotoUrl: '/work-photos/b002.jpg', createdAt: '2026-05-22',
  },
  {
    id: 'B003', customerId: 'c3', customerName: 'Anitha S.', customerPhone: '+91 98765 33333',
    technicianId: null, technicianName: null,
    serviceId: 'plumbing', serviceName: 'Plumbing',
    status: 'pending', technicianStatus: 'pending',
    scheduledDate: '2026-05-30', scheduledTime: '09:00 AM',
    address: '78, Velachery, Chennai', notes: 'Kitchen pipe leak',
    totalAmount: 520, workPhotoUrl: null, createdAt: '2026-05-26',
  },
  {
    id: 'B004', customerId: 'c4', customerName: 'Mani K.', customerPhone: '+91 98765 44444',
    technicianId: 't5', technicianName: 'Bala Murugan',
    serviceId: 'electrician', serviceName: 'Electrician',
    status: 'in_progress', technicianStatus: 'in_progress',
    scheduledDate: '2026-05-26', scheduledTime: '11:00 AM',
    address: '56, OMR, Chennai', notes: 'Switchboard replacement',
    totalAmount: 460, workPhotoUrl: null, createdAt: '2026-05-24',
  },
  {
    id: 'B005', customerId: 'c1', customerName: 'Priya Ramesh', customerPhone: '+91 98765 11111',
    technicianId: 't1', technicianName: 'Rajan Kumar',
    serviceId: 'electrician', serviceName: 'Electrician',
    status: 'completed', technicianStatus: 'completed',
    scheduledDate: '2026-05-15', scheduledTime: '03:00 PM',
    address: '45, Anna Nagar, Chennai', notes: 'Fan installation',
    totalAmount: 460, workPhotoUrl: '/work-photos/b005.jpg', createdAt: '2026-05-13',
  },
  {
    id: 'B006', customerId: 'c5', customerName: 'Lakshmi D.', customerPhone: '+91 98765 55555',
    technicianId: 't4', technicianName: 'Karthik Raja',
    serviceId: 'refrigerator-repair', serviceName: 'Refrigerator Repair',
    status: 'cancelled', technicianStatus: 'rejected',
    scheduledDate: '2026-05-10', scheduledTime: '01:00 PM',
    address: '90, Porur, Chennai', notes: '',
    totalAmount: 0, workPhotoUrl: null, createdAt: '2026-05-08',
  },
];

// ---------- MOCK UPI PAYMENTS ----------

export const MOCK_UPI_PAYMENTS: UPIPayment[] = [
  {
    id: 'PAY001', bookingId: 'B001', customerId: 'c1', customerName: 'Priya Ramesh',
    amount: 646, upiId: 'priya@upi', transactionId: 'TXN3847261',
    status: 'success', paymentMethod: 'upi', createdAt: '2026-05-26',
  },
  {
    id: 'PAY002', bookingId: 'B002', customerId: 'c2', customerName: 'Karthik M.',
    amount: 1748, upiId: 'karthik@paytm', transactionId: 'TXN5938472',
    status: 'success', paymentMethod: 'qr', createdAt: '2026-05-24',
  },
  {
    id: 'PAY003', bookingId: 'B004', customerId: 'c4', customerName: 'Mani K.',
    amount: 460, upiId: 'mani@upi', transactionId: '',
    status: 'pending', paymentMethod: 'upi', createdAt: '2026-05-24',
  },
  {
    id: 'PAY004', bookingId: 'B005', customerId: 'c1', customerName: 'Priya Ramesh',
    amount: 460, upiId: 'priya@upi', transactionId: 'TXN8273645',
    status: 'success', paymentMethod: 'upi', createdAt: '2026-05-15',
  },
];

// ---------- MOCK TECHNICIAN EARNINGS ----------

export const MOCK_TECHNICIAN_EARNINGS: TechnicianEarning[] = [
  { id: 'e1', technicianId: 't1', bookingId: 'B001', amount: 500, platformFee: 49, netAmount: 451, status: 'pending', createdAt: '2026-05-26' },
  { id: 'e2', technicianId: 't1', bookingId: 'B005', amount: 350, platformFee: 49, netAmount: 301, status: 'paid', createdAt: '2026-05-15' },
  { id: 'e3', technicianId: 't2', bookingId: 'B002', amount: 1200, platformFee: 49, netAmount: 1151, status: 'paid', createdAt: '2026-05-24' },
  { id: 'e4', technicianId: 't5', bookingId: 'B004', amount: 350, platformFee: 49, netAmount: 301, status: 'pending', createdAt: '2026-05-24' },
];

// ---------- CATEGORY OPTIONS ----------

export const SERVICE_CATEGORIES = [
  { id: 'appliance', label: 'Appliance', services: ['AC Service', 'Refrigerator Repair', 'Washing Machine'] },
  { id: 'home', label: 'Home', services: ['Plumbing', 'Electrician'] },
  { id: 'security', label: 'Security', services: ['CCTV Installation'] },
];

export const TECHNICIAN_STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  active: { label: 'Active', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30' },
  blocked: { label: 'Blocked', color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30' },
  removed: { label: 'Removed', color: 'text-white/40', bg: 'bg-white/5', border: 'border-white/15' },
};

export const PAYMENT_STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  success: { label: 'Success', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30' },
  pending: { label: 'Pending', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30' },
  failed: { label: 'Failed', color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30' },
  refunded: { label: 'Refunded', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30' },
};
