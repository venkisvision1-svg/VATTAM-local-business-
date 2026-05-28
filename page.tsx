'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Shield, Clock, ChevronRight, TrendingUp, MapPin, ArrowRight, BadgeCheck, Users, Quote } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import ServiceCard from '@/components/ServiceCard';
import { fetchServices, type ServiceWithUI } from '@/lib/supabase-data';

const STATS = [
  { label: 'Customers', value: '12K+', icon: Users },
  { label: 'Technicians', value: '480+', icon: BadgeCheck },
  { label: 'Cities', value: '8', icon: MapPin },
  { label: 'Jobs Done', value: '50K+', icon: TrendingUp },
];

const TESTIMONIALS = [
  { name: 'Priya R.', city: 'Chennai', rating: 5, comment: 'AC service was excellent! Technician arrived on time and fixed everything perfectly.', service: 'AC Service' },
  { name: 'Karthik M.', city: 'Coimbatore', rating: 5, comment: 'CCTV installation was smooth and professional. Great work!', service: 'CCTV Install' },
  { name: 'Anitha S.', city: 'Madurai', rating: 4, comment: 'Plumber fixed the leak quickly. Reasonable price and good service.', service: 'Plumbing' },
];

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [services, setServices] = useState<ServiceWithUI[]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetchServices();
      setServices(data);
    })();
  }, []);

  const filtered = services.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#070707] pb-24">
      <Header />

      {/* Hero Section */}
      <section className="px-4 pt-5 pb-5 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative rounded-3xl overflow-hidden p-6 pb-7 glow-orange"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1c0e00] via-[#0f0800] to-[#070707]" />
          <div className="absolute inset-0 dot-pattern opacity-30" />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.2, 0.15] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-0 right-0 w-56 h-56 bg-orange-500/15 rounded-full blur-[80px] -translate-y-1/3 translate-x-1/4"
          />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-600/8 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-3.5"
            >
              <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 border border-orange-500/25 px-3 py-1 rounded-full backdrop-blur-sm">
                TAMIL NADU&apos;S #1 SERVICE APP
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[32px] font-black text-white leading-[1.1] mb-2.5"
            >
              Expert Services
              <br />
              <span className="text-gradient">At Your Door</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/40 text-sm mb-5 leading-relaxed"
            >
              Trusted professionals for all home &amp; appliance needs across Tamil Nadu.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-black font-bold px-6 py-3.5 rounded-2xl transition-all duration-300 text-sm glow-orange-sm hover:glow-orange"
              >
                Book Now
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Search Bar */}
      <section className="px-4 pb-4 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
          <input
            type="text"
            placeholder="Search AC, Plumbing, Electrician..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full glass rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-orange-500/40 transition-all duration-300"
          />
        </motion.div>
      </section>

      {/* Stats Row */}
      <motion.section
        variants={stagger}
        initial="initial"
        animate="animate"
        className="px-4 pb-5 max-w-lg mx-auto"
      >
        <div className="grid grid-cols-4 gap-2">
          {STATS.map(({ label, value, icon: Icon }) => (
            <motion.div key={label} variants={fadeUp} className="glass rounded-2xl p-2.5 text-center glass-card">
              <Icon size={15} className="text-orange-500 mx-auto mb-1" />
              <p className="text-[15px] font-black text-white">{value}</p>
              <p className="text-[8px] text-white/30 leading-tight font-medium uppercase tracking-wider">{label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className="px-4 pb-5 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="flex items-center justify-between mb-4"
        >
          <div className="relative">
            <h2 className="text-lg font-black text-white">Our Services</h2>
            <div className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-orange-500 rounded-full" />
          </div>
          <Link href="/services" className="text-xs text-orange-500 flex items-center gap-1 hover:text-orange-400 font-semibold">
            View All <ChevronRight size={14} />
          </Link>
        </motion.div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-white/20 text-sm">No services found</div>
        ) : (
          <motion.div variants={stagger} initial="initial" animate="animate" className="grid grid-cols-2 gap-3">
            {filtered.map((service) => (
              <motion.div key={service.id} variants={fadeUp}>
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Why VATTAM */}
      <section className="px-4 pb-5 max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="relative mb-4">
          <h2 className="text-lg font-black text-white">Why Choose VATTAM?</h2>
          <div className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-orange-500 rounded-full" />
        </motion.div>
        <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-3">
          {[
            { icon: Shield, title: 'Verified Professionals', desc: 'Background-verified & trained technicians only', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/15' },
            { icon: Clock, title: 'On-Time Guarantee', desc: 'We arrive at your scheduled time slot, always', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/15' },
            { icon: Star, title: '30-Day Warranty', desc: 'All repairs backed by our satisfaction guarantee', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/15' },
          ].map(({ icon: Icon, title, desc, color, bg, border }) => (
            <motion.div key={title} variants={fadeUp} whileHover={{ x: 4 }} className="glass rounded-2xl p-4 glass-card flex items-start gap-4">
              <div className={`w-11 h-11 rounded-xl ${bg} border ${border} flex items-center justify-center shrink-0`}>
                <Icon size={18} className={color} />
              </div>
              <div>
                <p className="font-bold text-white text-sm">{title}</p>
                <p className="text-xs text-white/35 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="px-4 pb-5 max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="relative mb-4">
          <h2 className="text-lg font-black text-white">Customer Reviews</h2>
          <div className="absolute -bottom-1.5 left-0 w-8 h-0.5 bg-orange-500 rounded-full" />
        </motion.div>
        <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} variants={fadeUp} className="glass rounded-2xl p-4 glass-card">
              <div className="flex items-start justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500/25 to-orange-600/10 border border-orange-500/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-orange-500">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-[10px] text-white/30">{t.city}</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full">{t.service}</span>
              </div>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={11} className="text-orange-500 fill-orange-500" />
                ))}
              </div>
              <div className="relative pl-3">
                <Quote size={12} className="absolute left-0 top-0 text-orange-500/30" />
                <p className="text-xs text-white/45 leading-relaxed">{t.comment}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Provider CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="px-4 pb-5 max-w-lg mx-auto"
      >
        <div className="relative rounded-2xl p-5 overflow-hidden glow-orange">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500" />
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"
          />
          <div className="relative z-10">
            <p className="text-black/80 font-bold text-[10px] uppercase tracking-wider mb-1">Join our network</p>
            <p className="text-black font-black text-xl leading-tight">Are you a skilled technician?</p>
            <p className="text-black/60 text-xs mt-1 mb-4 leading-relaxed">Join VATTAM and grow your business across Tamil Nadu</p>
            <Link href="/provider/register" className="inline-flex items-center gap-2 bg-black/90 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-black transition-colors">
              Join as Provider <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="px-4 pb-4 max-w-lg mx-auto">
        <p className="text-[10px] text-white/15 font-medium tracking-widest uppercase text-center">
          Made with pride in Tamil Nadu
        </p>
      </motion.section>

      <BottomNav />
    </div>
  );
}
