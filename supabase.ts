import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: 'customer' | 'provider' | 'admin' | 'technician';
  city: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string | null;
  base_price: number;
  duration_minutes: number;
  icon_name: string;
  color_class: string | null;
  bg_class: string | null;
  border_class: string | null;
  is_popular: boolean;
  features: string[];
  created_at: string;
};

export type Provider = {
  id: string;
  profile_id: string | null;
  business_name: string;
  tagline: string | null;
  bio: string | null;
  specializations: string[];
  rating: number;
  total_jobs: number;
  response_time: string;
  is_verified: boolean;
  qr_slug: string | null;
  created_at: string;
};

export type Booking = {
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
};
