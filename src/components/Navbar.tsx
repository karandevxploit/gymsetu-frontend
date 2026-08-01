import React, { useState } from 'react';
import { ArrowUpRight, Download, Menu, MonitorDown, Smartphone, X } from 'lucide-react';
import { motion } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { linkHandler } from '../navigation';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  currentPath: string;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, activeSection }) => {
  const [open, setOpen] = useState(false);
  const links = [
    ['Home', '/', 'home'],
    ['Features', '/features', 'features'],
    ['Modules', '/modules', 'modules'],
    ['Pricing', '/pricing', 'pricing'],
    ['About', '/about', 'about'],
    ['Contact', '/contact', 'contact'],
  ];
  const isActive = (href: string, section: string) => (currentPath === '/' ? section === activeSection || href === '/' && activeSection === 'home' : currentPath === href);

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-50 border-b border-blue-100/70 bg-white/80 shadow-[0_12px_38px_rgba(15,23,42,0.06)] backdrop-blur-xl"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex h-[78px] max-w-[1280px] items-center justify-between px-[5%]">
        <motion.a href="/" onClick={linkHandler('/')} className="flex items-center gap-2" initial={{ opacity: 0, rotate: -5 }} animate={{ opacity: 1, rotate: 0 }} transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}>
          <BrandLogo size={36} />
          <span className="text-[19px] font-black tracking-tight text-slate-950">GymSetu</span>
        </motion.a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map(([label, href, section]) => (
            <motion.a
              key={label}
              href={href}
              onClick={linkHandler(href)}
              aria-current={isActive(href, section) ? 'page' : undefined}
              className={`relative flex h-[78px] items-center text-[13px] font-black hover:text-blue-600 ${isActive(href, section) ? 'text-blue-600 after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:w-9 after:-translate-x-1/2 after:rounded-t-full after:bg-gradient-to-r after:from-blue-600 after:to-cyan-400' : 'text-slate-700'}`}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.25 }}
            >
              {label}
            </motion.a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <motion.a href="/#apps" onClick={linkHandler('/#apps')} className="premium-button inline-flex h-[42px] items-center gap-2 rounded-xl border border-blue-100 bg-white/85 px-4 text-[11px] font-black text-slate-700 shadow-sm hover:border-blue-300" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -4, boxShadow: '0 16px 38px rgba(37,99,235,0.15)' }} whileTap={{ scale: 0.96 }}>
            <MonitorDown size={14} /> Desktop App <Download size={12} />
          </motion.a>
          <motion.a href="/#apps" onClick={linkHandler('/#apps')} className="premium-button inline-flex h-[42px] items-center gap-2 rounded-xl border border-blue-100 bg-white/85 px-4 text-[11px] font-black text-slate-700 shadow-sm hover:border-blue-300" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -4, boxShadow: '0 16px 38px rgba(37,99,235,0.15)' }} whileTap={{ scale: 0.96 }}>
            <Smartphone size={14} /> Mobile App <Download size={12} />
          </motion.a>
          <motion.a href="/contact" onClick={linkHandler('/contact')} className="premium-button group inline-flex h-[46px] items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-[22px] text-[12px] font-black text-white shadow-[0_12px_30px_rgba(37,99,235,0.24)] hover:from-blue-500 hover:to-cyan-400" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.32, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -4, boxShadow: '0 22px 50px rgba(37,99,235,0.30)' }} whileTap={{ scale: 0.96 }}>
            Book a Demo <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1" />
          </motion.a>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden" aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <motion.div className="border-t border-slate-200 bg-white p-4 lg:hidden" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {links.map(([label, href, section]) => (
            <a key={label} href={href} onClick={(event) => { linkHandler(href)(event); setOpen(false); }} className={`block rounded-lg px-3 py-3 text-sm font-bold hover:bg-blue-50 ${isActive(href, section) ? 'text-blue-600' : 'text-slate-700'}`}>
              {label}
            </a>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a href="/#apps" onClick={(event) => { linkHandler('/#apps')(event); setOpen(false); }} className="rounded-md border border-slate-300 px-4 py-3 text-center text-xs font-black">Downloads</a>
            <a href="/contact" onClick={(event) => { linkHandler('/contact')(event); setOpen(false); }} className="rounded-md bg-blue-600 px-4 py-3 text-center text-xs font-black text-white">Book Demo</a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
