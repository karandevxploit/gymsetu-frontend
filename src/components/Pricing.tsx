import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { fadeUp, premiumTransition, Reveal, stagger } from './animation';
import { linkHandler } from '../navigation';

const plans = [
  ['Basic', 'Best for gyms starting with digital member and attendance management.', '999', ['Core member tools', 'Attendance tracking', 'Billing & invoices', 'Basic reports', 'Owner mobile app']],
  ['Pro', 'Best for growing gyms that want a premium branded experience.', '1999', ['Everything in Basic', 'Workout & Diet Plans', 'Staff Management', 'Advanced Reports', 'Priority Support', 'Free Website', 'Free White Label Branding']],
] as const;

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="bg-white py-20">
      <div className="mx-auto max-w-[1280px] px-[5%]">
        <Reveal className="mb-9 text-center">
          <p className="text-[12px] font-black text-blue-600">Simple Gym Owners Pricing</p>
          <h2 className="mt-2 text-[32px] font-black leading-tight tracking-tight text-slate-950 md:text-[38px]">Trusted by Gym Owners <span className="text-blue-600">Across India</span></h2>
          <p className="mt-3 text-[15px] text-slate-500">All plans include core features. No hidden charges.</p>
        </Reveal>

        <motion.div className="grid gap-6 lg:grid-cols-[1fr_1fr_1.1fr]" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          {plans.map(([name, desc, price, features], index) => {
            const popular = index === 1;
            return (
              <motion.div key={name} className={`premium-card relative flex min-h-[370px] flex-col rounded-[18px] border bg-white/95 p-6 shadow-[0_14px_38px_rgba(37,99,235,0.07)] ${popular ? 'animated-gradient border-blue-500 shadow-[0_24px_68px_rgba(37,99,235,0.18)]' : 'border-blue-100'}`} variants={fadeUp} transition={premiumTransition} whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(37,99,235,0.17)' }}>
                {popular && <span className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded bg-blue-600 px-5 py-1 text-[10px] font-black text-white">Most Popular</span>}
                <h3 className="text-[18px] font-black text-slate-950">{name}</h3>
                <p className="mt-2 min-h-[46px] text-[13px] leading-5 text-slate-500">{desc}</p>
                <div className="my-5">
                  <span className="text-[32px] font-black tracking-tight text-slate-950">Rs {price}</span>
                  <span className="text-[11px] font-semibold text-slate-500"> /month</span>
                </div>
                <ul className="mb-5 space-y-2.5">
                  {features.map((item) => (
                    <motion.li key={item} className="flex items-center gap-2 text-[13px] font-semibold text-slate-700" initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }}>
                      <Check size={14} className="text-blue-500" /> {item}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-auto grid gap-2">
                  <motion.a href="/#apps" onClick={linkHandler('/#apps')} className={`premium-button flex h-[44px] items-center justify-center rounded-xl border px-[18px] text-[13px] font-black ${popular ? 'border-blue-600 bg-blue-600 text-white' : 'border-blue-100 bg-white text-blue-700'}`} whileHover={{ boxShadow: '0 18px 40px rgba(37,99,235,0.23)' }} whileTap={{ scale: 0.96 }}>Download App</motion.a>
                  <motion.a href="/contact" onClick={linkHandler('/contact')} className="flex h-[40px] items-center justify-center rounded-xl border border-blue-100 bg-white text-[12px] font-black text-slate-600 hover:text-blue-700" whileTap={{ scale: 0.98 }}>Book Demo</motion.a>
                </div>
              </motion.div>
            );
          })}

          <motion.div className="premium-card premium-surface relative min-h-[370px] rounded-[18px] p-6" variants={fadeUp} transition={premiumTransition} whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(37,99,235,0.16)' }}>
            <h3 className="max-w-[240px] text-[22px] font-black leading-tight tracking-tight text-slate-950">Not sure which plan is right for you?</h3>
            <p className="mt-4 max-w-[230px] text-[14px] leading-6 text-slate-500">Book a free demo and we'll help you choose the best fit.</p>
            <motion.a href="/contact" onClick={linkHandler('/contact')} className="premium-button mt-6 inline-flex h-[46px] items-center rounded-xl bg-blue-600 px-[22px] text-[15px] font-black text-white" whileHover={{ y: -4, boxShadow: '0 20px 46px rgba(37,99,235,0.28)' }} whileTap={{ scale: 0.96 }}>Book a Demo</motion.a>
            <div className="pointer-events-none absolute bottom-0 right-3 hidden h-[78%] w-[44%] lg:block">
              <img
                src="/trainer-cutout.png"
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute bottom-3 right-0 h-full w-auto object-contain object-bottom"
              />
              <div className="absolute bottom-3 right-3 h-5 w-28 rounded-full bg-slate-950/12 blur-md" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
