import React, { useState } from 'react';
import { Bell, CheckCircle2, ChevronDown, Mail, MessageCircle, PlayCircle, PlugZap, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { config } from '../config';
import { Reveal, fadeUp, premiumTransition, stagger } from './animation';

const faqs = [
  ['Can GymSetu work for a small gym?', 'Yes. The plans and modules are suitable for small gyms, studios and growing multi-branch teams.'],
  ['Do members get their own app?', 'Yes. Member apps support attendance, plans, workouts, diet details and communication workflows.'],
  ['Can staff have limited access?', 'Yes. Role-based staff access keeps sensitive owner controls protected.'],
  ['How do downloads work?', 'Available platforms download directly. Unavailable platforms show a professional coming-soon flow.'],
] as const;

export const ProfessionalSections: React.FC = () => {
  const [open, setOpen] = useState(0);

  return (
    <>
      <section className="bg-white px-[5%] py-20">
        <div className="mx-auto grid max-w-[1280px] gap-6 lg:grid-cols-3">
          {[
            [ShieldCheck, 'Security & Reliability', 'Role-based access, careful data workflows, dependable uptime and clear operational controls.'],
            [PlugZap, 'Integrations Ready', 'Designed to connect with payments, messaging, analytics and support systems as your business grows.'],
            [PlayCircle, 'Product Video', 'A polished product walkthrough space ready for your launch video or demo recording.'],
          ].map(([Icon, title, copy]) => (
            <Reveal key={title as string} className="premium-card premium-shadow rounded-[18px] border border-blue-100 bg-white p-6">
              <Icon className="text-blue-600" size={26} />
              <h2 className="mt-5 text-[20px] font-black text-slate-950">{title as string}</h2>
              <p className="mt-3 text-[14px] leading-7 text-slate-500">{copy as string}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#f8fbff] px-[5%] py-20">
        <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="text-[12px] font-black uppercase tracking-[0.14em] text-blue-600">Customer Success</p>
            <h2 className="mt-3 text-[32px] font-black leading-tight tracking-tight text-slate-950 md:text-[38px]">Practical wins for busy gym owners</h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-500">GymSetu focuses on outcomes: faster billing, cleaner attendance, fewer missed renewals and better member communication.</p>
          </Reveal>
          <motion.div className="grid gap-5 md:grid-cols-3" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {['Billing follow-ups became faster', 'Staff accountability improved', 'Reports replaced manual spreadsheets'].map((story) => (
              <motion.article key={story} className="premium-card rounded-[18px] border border-blue-100 bg-white p-5" variants={fadeUp} transition={premiumTransition}>
                <CheckCircle2 className="text-cyan-500" size={22} />
                <h3 className="mt-4 text-[16px] font-black leading-snug text-slate-950">{story}</h3>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-[5%] py-20">
        <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="text-[12px] font-black uppercase tracking-[0.14em] text-blue-600">FAQ</p>
            <h2 className="mt-3 text-[32px] font-black tracking-tight text-slate-950">Questions owners ask before launch</h2>
          </Reveal>
          <div className="space-y-3">
            {faqs.map(([question, answer], index) => (
              <div key={question} className="rounded-2xl border border-blue-100 bg-white">
                <button type="button" onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[14px] font-black text-slate-900">
                  {question}
                  <ChevronDown size={17} className={`shrink-0 transition-transform ${open === index ? 'rotate-180' : ''}`} />
                </button>
                {open === index && <p className="px-5 pb-5 text-[14px] leading-7 text-slate-500">{answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-[5%] pb-10">
        <div className="premium-surface mx-auto grid max-w-[980px] min-w-0 gap-5 rounded-[18px] border-blue-100 bg-white p-5 md:grid-cols-[auto_1fr] md:items-center md:p-6">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
            <Mail size={22} />
          </div>
          <div className="grid min-w-0 gap-4 lg:grid-cols-[1fr_minmax(320px,0.8fr)] lg:items-center">
            <div className="min-w-0">
              <h2 className="max-w-full text-[22px] font-black leading-tight tracking-tight text-slate-950 md:text-[24px]">Get product updates and launch notes</h2>
              <p className="mt-2 text-[13px] font-semibold leading-6 text-slate-500">Newsletter subscription placeholder for future email marketing integration.</p>
            </div>
            <form className="grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_auto]" onSubmit={(event) => event.preventDefault()}>
              <input aria-label="Email address" type="email" placeholder="Email address" className="h-11 min-w-0 rounded-xl border border-blue-100 bg-white px-4 text-[13px] font-bold text-slate-900 outline-none" />
              <button type="submit" className="premium-button h-11 rounded-xl bg-slate-950 px-5 text-[13px] font-black text-white">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export const FloatingSupport: React.FC = () => (
  <div className="fixed bottom-20 right-5 z-50 flex flex-col gap-3">
    <a href={config.company.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp support" className="grid h-11 w-11 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_rgba(37,211,102,0.28)]">
      <MessageCircle size={18} />
    </a>
    <button type="button" aria-label="Live chat placeholder" className="grid h-11 w-11 place-items-center rounded-full border border-blue-100 bg-white text-blue-600 shadow-[0_14px_34px_rgba(37,99,235,0.18)]" title="Live chat coming soon">
      <Bell size={18} />
    </button>
  </div>
);
