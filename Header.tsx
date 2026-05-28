'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bell, MapPin, ChevronDown } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showLocation?: boolean;
  showNotification?: boolean;
}

export default function Header({ title, showLocation = true, showNotification = true }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="sticky top-0 z-40 glass-strong border-b border-white/[0.04]"
    >
      <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        {title ? (
          <h1 className="text-base font-bold text-white tracking-tight">{title}</h1>
        ) : (
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center glow-orange-sm"
            >
              <span className="text-black font-black text-sm tracking-tighter">V</span>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight leading-none">
                <span className="text-white">VAT</span>
                <span className="text-orange-500">TAM</span>
              </span>
              <span className="text-[8px] text-white/25 font-medium tracking-widest uppercase">Tamil Nadu</span>
            </div>
          </Link>
        )}

        <div className="flex items-center gap-2">
          {showLocation && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl glass hover:border-orange-500/20 transition-colors group"
            >
              <MapPin size={13} className="text-orange-500" />
              <span className="text-[11px] font-medium text-white/60 group-hover:text-white/80">Chennai</span>
              <ChevronDown size={10} className="text-white/30" />
            </motion.button>
          )}
          {showNotification && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2.5 rounded-xl glass hover:border-orange-500/20 transition-colors"
            >
              <Bell size={16} className="text-white/50" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full pulse-glow" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
