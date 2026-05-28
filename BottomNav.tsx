'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Search, CalendarCheck, User, LayoutDashboard } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/services', icon: Search, label: 'Services' },
  { href: '/bookings', icon: CalendarCheck, label: 'Bookings' },
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const pathname = usePathname();

  const hideOn = ['/login', '/book/', '/admin', '/provider/register', '/technician'];
  const shouldHide = hideOn.some(p => pathname.startsWith(p) && p !== '/');
  if (shouldHide) return null;

  return (
    <motion.nav
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50 pb-safe"
    >
      <div className="glass-strong mx-3 mb-3 rounded-2xl">
        <div className="flex items-center justify-around px-1 pt-1.5 pb-2">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link key={href} href={href} className="flex flex-col items-center gap-0.5 min-w-[52px] py-1.5 px-1 group">
                <div className="relative p-2 rounded-xl">
                  <motion.div
                    layoutId={isActive ? 'nav-active' : undefined}
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: isActive
                        ? 'linear-gradient(to bottom right, rgba(249,115,22,0.25), rgba(234,88,12,0.1))'
                        : 'transparent',
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                  <Icon
                    size={20}
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive ? 'text-orange-500' : 'text-white/30 group-hover:text-white/60'
                    }`}
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="nav-dot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full glow-orange-xs"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </div>
                <span className={`text-[9px] font-semibold tracking-wide transition-colors duration-300 ${
                  isActive ? 'text-orange-500' : 'text-white/25 group-hover:text-white/50'
                }`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
