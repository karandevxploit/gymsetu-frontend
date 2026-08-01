import React from 'react';
import { BarChart3, CalendarCheck, CreditCard, Dumbbell, LayoutDashboard, MessageSquare, ShieldCheck, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedNumber, fadeUp, premiumTransition, Reveal, stagger } from './animation';

const modules = [
  [LayoutDashboard, 'Dashboard', 'Real-time overview of your gym performance.'],
  [Users, 'Members', 'Complete member management system.'],
  [CalendarCheck, 'Attendance', 'Track check-ins, absentees & logs.'],
  [Dumbbell, 'Workouts', 'Custom workout plans & exercises.'],
  [ShieldCheck, 'Diet Plans', 'Nutrition plans for your members.'],
  [CreditCard, 'Billing', 'Invoices, payments & dues management.'],
  [BarChart3, 'Reports', 'Advanced reports & data analytics.'],
  [MessageSquare, 'Messages', 'Send announcements & notifications.'],
] as const;

export const Modules: React.FC = () => {
  return (
    <section id="modules" className="bg-white px-[5%] py-20">
      <Reveal className="premium-surface mx-auto max-w-[1280px] rounded-[22px] px-6 py-10 lg:px-[5%]">
        <div className="mb-9 text-center">
          <p className="mb-3 text-[12px] font-black text-blue-600">Powerful Modules</p>
          <h2 className="text-[32px] font-black leading-tight tracking-tight text-slate-950 md:text-[38px]">All Essential Modules, One <span className="text-blue-600">Powerful Platform</span></h2>
          <p className="mx-auto mt-3 max-w-[680px] text-[15px] leading-7 text-slate-500">GymSetu comes with all the tools you need to simplify operations and deliver a premium experience.</p>
        </div>

        <div className="relative">
          <motion.div className="absolute left-0 right-0 top-5 hidden h-px origin-left bg-gradient-to-r from-transparent via-blue-300 to-transparent lg:block" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} />
          <motion.div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-8" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          {modules.map(([Icon, title, desc]) => (
            <motion.div key={title} className="premium-card group relative text-center" variants={fadeUp} transition={premiumTransition} whileHover={{ y: -8 }}>
              <motion.div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600 ring-4 ring-white transition-colors group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_0_28px_rgba(37,99,235,0.30)]">
                <Icon size={18} />
              </motion.div>
              <h3 className="text-[12px] font-black text-slate-950 transition-colors group-hover:text-blue-600">{title}</h3>
              <p className="mt-2 text-[10px] leading-5 text-slate-500">{desc}</p>
            </motion.div>
          ))}
          </motion.div>
        </div>

        <motion.div className="animated-gradient mt-10 grid rounded-[20px] bg-gradient-to-r from-violet-600 via-blue-600 to-sky-500 text-center text-white shadow-[0_20px_58px_rgba(37,99,235,0.22)] sm:grid-cols-5" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          {[
            [250, '+', 'Happy Gym Owners', 0],
            [10, 'K+', 'Active Members', 0],
            [50, 'K+', 'Check-ins Recorded', 0],
            [99.9, '%', 'Uptime & Reliability', 1],
            [24, '/7', 'Customer Support', 0],
          ].map(([value, suffix, label, decimals]) => (
            <div key={label} className="border-white/20 px-5 py-5 sm:border-r sm:last:border-r-0">
              <p className="text-[28px] font-black tracking-tight"><AnimatedNumber end={value as number} suffix={suffix as string} decimals={decimals as number} /></p>
              <p className="mt-2 text-[12px] font-bold text-white/85">{label}</p>
            </div>
          ))}
        </motion.div>
      </Reveal>
    </section>
  );
};
