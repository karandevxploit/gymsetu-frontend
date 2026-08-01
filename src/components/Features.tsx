import React from 'react';
import { BarChart3, CalendarCheck, CreditCard, Dumbbell, ShieldCheck, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { fadeUp, premiumTransition, Reveal, stagger } from './animation';

const features = [
  [Users, 'Member Management', 'Add, manage & track all your members in one place.'],
  [CalendarCheck, 'Attendance Tracking', 'Real-time attendance tracking with check-in & reports.'],
  [CreditCard, 'Billing & Invoices', 'Create invoices, manage payments & track dues.'],
  [BarChart3, 'Reports & Analytics', 'Powerful insights to help you make smart business decisions.'],
  [Dumbbell, 'Workout & Diet Plans', 'Create & assign workouts and diet plans easily.'],
  [ShieldCheck, 'Role & Staff Access', 'Manage staff roles and permissions securely.'],
] as const;

const colors = [
  'bg-blue-50 text-blue-600',
  'bg-violet-50 text-violet-600',
  'bg-emerald-50 text-emerald-600',
  'bg-orange-50 text-orange-500',
  'bg-pink-50 text-pink-500',
  'bg-cyan-50 text-cyan-600',
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="relative bg-white py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-72 max-w-5xl rounded-full bg-cyan-100/35 blur-3xl" />
      <div className="relative mx-auto max-w-[1280px] px-[5%]">
        <Reveal className="mb-9 text-center">
          <p className="mb-3 text-[12px] font-black text-blue-600">Why GymSetu?</p>
          <h2 className="mx-auto max-w-3xl text-[32px] font-black leading-tight tracking-tight text-slate-950 md:text-[38px]">Everything you need to run your gym <span className="text-blue-600">effortlessly</span></h2>
          <p className="mx-auto mt-3 max-w-[660px] text-[15px] leading-7 text-slate-500">
            From member management to billing and analytics, GymSetu helps you save time, reduce manual work and grow your gym.
          </p>
        </Reveal>
        <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          {features.map(([Icon, title, desc], index) => (
            <motion.div
              key={title}
              className="premium-card premium-shadow group flex min-h-[210px] flex-col items-center rounded-[18px] border border-blue-100 bg-white/90 p-6 text-center"
              variants={fadeUp}
              transition={premiumTransition}
              whileHover={{ y: -12, borderColor: 'rgba(37,99,235,0.32)', boxShadow: '0 22px 54px rgba(37,99,235,0.16)' }}
            >
              <motion.div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colors[index]} transition-colors group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-cyan-50`} whileHover={{ rotate: 4 }}>
                <Icon size={21} />
              </motion.div>
              <h3 className="text-[18px] font-black leading-tight text-slate-950 lg:text-[13px] xl:text-[14px]">{title}</h3>
              <p className="mt-2 text-[12px] leading-5 text-slate-500">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
