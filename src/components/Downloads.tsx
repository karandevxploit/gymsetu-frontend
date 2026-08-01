import React, { useState } from 'react';
import { Apple, Download, Monitor, Smartphone, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { config } from '../config';
import { linkHandler } from '../navigation';
import { fadeUp, premiumTransition, Reveal, stagger } from './animation';

type Platform = {
  appName: string;
  copy: string;
  group: 'Gym Owner' | 'Gym Member';
  href: string;
  icon: React.ReactNode;
  platform: string;
  version: string;
};

const owner = config.downloads.owner;
const member = config.downloads.member;

const platforms: Platform[] = [
  { group: 'Gym Owner', platform: 'Desktop App (Windows)', appName: 'GymSetu Owner Desktop', copy: 'Full control for billing, reports, staff and front-desk workflows.', href: owner.windows.exe, version: owner.windows.version, icon: <Monitor size={22} /> },
  { group: 'Gym Owner', platform: 'Android App', appName: 'GymSetu Owner Mobile', copy: 'Manage members, renewals and attendance while moving around the gym.', href: owner.android.apk || owner.android.playStore, version: owner.android.version, icon: <Smartphone size={22} /> },
  { group: 'Gym Owner', platform: 'iOS App', appName: 'GymSetu Owner iOS', copy: 'A polished owner app for iPhone-based operations and quick reviews.', href: owner.ios.appStore, version: owner.ios.version, icon: <Apple size={22} /> },
  { group: 'Gym Member', platform: 'Android App', appName: 'GymSetu Member Mobile', copy: 'Members can view attendance, plans, workouts, diets and gym updates.', href: member.android.apk || member.android.playStore, version: member.android.version, icon: <Smartphone size={22} /> },
  { group: 'Gym Member', platform: 'iOS App', appName: 'GymSetu Member iOS', copy: 'Premium member experience for plans, reminders and progress updates.', href: member.ios.appStore, version: member.ios.version, icon: <Apple size={22} /> },
];

const isAvailable = (href: string) => Boolean(
  href
  && href !== '#'
  && href !== 'https://play.google.com/store'
  && href !== 'https://apps.apple.com/app',
);

const DownloadCard = ({ item, onUnavailable }: { item: Platform; onUnavailable: (item: Platform) => void }) => {
  const available = isAvailable(item.href);
  const buttonClass = 'premium-button mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-[13px] font-black';

  return (
    <motion.article className="premium-card premium-shadow flex min-h-[260px] flex-col rounded-[18px] border border-blue-100 bg-white/95 p-5" variants={fadeUp} transition={premiumTransition} whileHover={{ y: -6, boxShadow: '0 24px 58px rgba(37,99,235,0.16)' }}>
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">{item.icon}</span>
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.12em] text-cyan-600">{item.platform}</p>
          <h3 className="mt-1 text-[17px] font-black leading-tight text-slate-950">{item.appName}</h3>
        </div>
      </div>
      <p className="mt-4 flex-1 text-[13px] leading-6 text-slate-500">{item.copy}</p>
      <p className="text-[11px] font-bold text-slate-400">Version {item.version}</p>
      {available ? (
        <a href={item.href} download={item.href.startsWith('/') || item.href.endsWith('.exe') || item.href.endsWith('.apk')} className={`${buttonClass} bg-slate-950 text-white`}>
          <Download size={15} /> Download
        </a>
      ) : (
        <button type="button" onClick={() => onUnavailable(item)} className={`${buttonClass} border border-blue-100 bg-white text-blue-700`}>
          Coming Soon
        </button>
      )}
    </motion.article>
  );
};

export const Downloads: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [modal, setModal] = useState<Platform | null>(null);
  const groups = ['Gym Owner', 'Gym Member'] as const;

  return (
    <section id="apps" className="bg-white px-[5%] py-20">
      <Reveal className="premium-surface mx-auto max-w-[1280px] rounded-[22px] p-6 lg:p-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-[12px] font-black text-blue-600">Access Anywhere, Anytime</p>
            <h2 className="mt-2 text-[32px] font-black leading-tight tracking-tight text-slate-950 md:text-[38px]">Owner and member apps for every workflow</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-500">Download the right GymSetu app for front-desk operations, owner visibility, and member self-service.</p>
          </div>

          <div className="relative mx-auto h-[330px] w-full max-w-[520px]">
            <motion.div className="absolute bottom-8 right-0 w-[92%]" animate={reduceMotion ? {} : { y: [0, -8, 0] }} transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}>
              <img src="/gymsetu-dashboard-mockup.png" alt="GymSetu desktop dashboard" loading="lazy" className="h-auto w-full max-w-full object-contain drop-shadow-[0_28px_70px_rgba(15,23,42,0.22)]" />
            </motion.div>
            <motion.div className="absolute bottom-0 left-0 w-[34%]" animate={reduceMotion ? {} : { y: [0, -8, 0] }} transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}>
              <img src="/gymsetu-phone-mockup.png" alt="GymSetu mobile app" loading="lazy" className="h-auto w-full max-w-full object-contain drop-shadow-[0_26px_56px_rgba(15,23,42,0.35)]" />
            </motion.div>
          </div>
        </div>

        <div className="mt-9 space-y-8">
          {groups.map((group) => (
            <div key={group}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-[18px] font-black text-slate-950">{group}</h3>
                <span className="h-px flex-1 bg-blue-100" />
              </div>
              <motion.div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                {platforms.filter((item) => item.group === group).map((item) => <DownloadCard key={`${item.group}-${item.platform}`} item={item} onUnavailable={setModal} />)}
              </motion.div>
            </div>
          ))}
        </div>
      </Reveal>

      {modal && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/40 px-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="download-modal-title">
          <motion.div className="w-full max-w-md rounded-[22px] bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.25)]" initial={{ opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] font-black uppercase tracking-[0.14em] text-blue-600">Coming Soon</p>
                <h2 id="download-modal-title" className="mt-2 text-[22px] font-black text-slate-950">{modal.platform}</h2>
              </div>
              <button type="button" aria-label="Close modal" onClick={() => setModal(null)} className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50">
                <X size={16} />
              </button>
            </div>
            <p className="mt-4 text-[14px] leading-7 text-slate-500">This download is not publicly available yet. Book a demo and the GymSetu team will share the correct installer or app access when your workspace is ready.</p>
            <a href="/contact" onClick={linkHandler('/contact')} className="premium-button mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-blue-600 text-[13px] font-black text-white">Book Demo</a>
          </motion.div>
        </div>
      )}
    </section>
  );
};
