'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Wind, Camera, Droplets, Zap, Thermometer, RefreshCw, Clock, ArrowRight } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Wind, Camera, Droplets, Zap, Thermometer, RefreshCw,
};

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  basePrice: number;
  color: string;
  iconColor: string;
  duration: string;
  popular?: boolean;
  compact?: boolean;
}

export default function ServiceCard({
  id, name, description, icon, basePrice, color, iconColor, duration, popular, compact
}: ServiceCardProps) {
  const Icon = ICON_MAP[icon] || Wind;

  if (compact) {
    return (
      <Link href={`/book/${id}`} className="block group">
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="service-card glass rounded-2xl p-3.5 cursor-pointer relative overflow-hidden"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-2.5`}
          >
            <Icon size={20} className={iconColor} />
          </motion.div>
          <p className="text-sm font-semibold text-white/90 leading-tight">{name}</p>
          <p className="text-[11px] text-orange-500/80 mt-0.5 font-medium">from ₹{basePrice}</p>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/book/${id}`} className="block group">
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="service-card glass rounded-2xl p-4 cursor-pointer relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

        {popular && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3"
          >
            <span className="text-[9px] font-bold text-orange-500 bg-orange-500/10 border border-orange-500/25 px-2 py-0.5 rounded-full backdrop-blur-sm">
              POPULAR
            </span>
          </motion.div>
        )}

        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-3.5`}
        >
          <Icon size={22} className={iconColor} />
        </motion.div>

        <h3 className="font-bold text-white/95 text-[15px] leading-tight">{name}</h3>
        <p className="text-xs text-white/40 mt-1 mb-3 leading-relaxed">{description}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Starting from</p>
            <p className="text-xl font-black text-gradient">₹{basePrice}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-1 text-white/30">
              <Clock size={10} />
              <span className="text-[10px] font-medium">{duration}</span>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500/15 to-orange-600/5 border border-orange-500/20 flex items-center justify-center"
            >
              <ArrowRight size={14} className="text-orange-500" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
