import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Dumbbell, Play } from 'lucide-react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { linkHandler } from '../navigation';

const typingDelay = 50;
const linePause = 200;

const Cursor = () => (
  <motion.span
    aria-hidden="true"
    data-typing-cursor="true"
    className="ml-1 inline-block h-[0.82em] w-[3px] translate-y-[0.08em] rounded-full bg-blue-600"
    animate={{ opacity: [1, 0.18, 1] }}
    transition={{ duration: 0.82, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const BrandWord = ({ text, complete }: { text: string; complete: boolean }) => {
  const gymCount = Math.min(text.length, 3);
  const setuCount = Math.min(Math.max(text.length - 3, 0), 4);
  const hasDot = text.length > 7;

  return (
    <motion.span
      className="relative inline-block overflow-hidden whitespace-nowrap"
      animate={complete ? { opacity: [1, 0.96, 1], scale: [0.98, 1] } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <span className="text-[#1D4ED8]">{'Gym'.slice(0, gymCount)}</span>
      <span className="text-[#06B6D4]">{'Setu'.slice(0, setuCount)}{hasDot ? '.' : ''}</span>
      {complete && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[42%] bg-gradient-to-r from-transparent via-white/45 to-transparent"
          initial={{ x: '-130%', opacity: 0 }}
          animate={{ x: '270%', opacity: [0, 0.55, 0] }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.08 }}
        />
      )}
    </motion.span>
  );
};

const TypewriterHeading = () => {
  const reduceMotion = useReducedMotion();
  const lines = useMemo(() => ['Manage.', 'Grow.', 'Transform with', 'GymSetu.'], []);
  const [lineIndex, setLineIndex] = useState(reduceMotion ? lines.length : 0);
  const [charIndex, setCharIndex] = useState(reduceMotion ? lines[lines.length - 1].length : 0);
  const complete = reduceMotion || lineIndex >= lines.length;

  useEffect(() => {
    if (reduceMotion || complete) return;

    const currentLine = lines[lineIndex];
    const delay = charIndex < currentLine.length ? typingDelay : linePause;
    const timer = window.setTimeout(() => {
      if (charIndex < currentLine.length) {
        setCharIndex((value) => value + 1);
        return;
      }

      setLineIndex((value) => value + 1);
      setCharIndex(0);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [charIndex, complete, lineIndex, lines, reduceMotion]);

  const visibleLine = (index: number) => {
    if (index < lineIndex || complete) return lines[index];
    if (index === lineIndex) return lines[index].slice(0, charIndex);
    return '';
  };

  const cursorLine = Math.min(lineIndex, lines.length - 1);

  return (
    <motion.h1
      className="max-w-[560px] whitespace-nowrap text-[38px] font-extrabold leading-[1.05] tracking-[-0.03em] text-slate-950 sm:text-[46px] lg:text-[54px] 2xl:text-[58px]"
      animate={complete ? { opacity: [1, 0.985, 1], scale: [0.98, 1] } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {lines.map((line, index) => {
        const typed = visibleLine(index);
        const showCursor = !complete && index === cursorLine;

        return (
          <span key={line} className="block min-h-[1.05em]">
            {index === 3 ? <BrandWord text={typed} complete={complete} /> : typed}
            {showCursor && <Cursor />}
          </span>
        );
      })}
    </motion.h1>
  );
};

const DashboardMock = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 130, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 130, damping: 22 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    mouseY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetTilt = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative mx-auto w-full max-w-[640px] px-[clamp(46px,7vw,86px)] pb-[clamp(36px,4.5vw,56px)] pt-2 sm:max-w-[660px] lg:max-w-[620px] xl:max-w-[650px]"
      initial={{ opacity: 0, scale: 0.92, y: 28 }}
      animate={reduceMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={reduceMotion ? { duration: 0.7, delay: 0.48, ease: [0.16, 1, 0.3, 1] } : { opacity: { duration: 0.7, delay: 0.48 }, scale: { duration: 0.7, delay: 0.48 }, y: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' } }}
    >
      <motion.div
        className="premium-card relative z-10 w-full"
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        onMouseMove={onMouseMove}
        onMouseLeave={resetTilt}
      >
        <img
          src="/gymsetu-dashboard-mockup.png"
          alt="GymSetu web dashboard with analytics, charts, members and payments"
          loading="eager"
          className="h-auto w-full max-w-full object-contain drop-shadow-[0_30px_70px_rgba(37,99,235,0.22)]"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-1 left-0 z-20 w-[clamp(82px,24%,160px)] max-w-[28%]"
      >
        <img
          src="/gymsetu-phone-mockup.png"
          alt="GymSetu mobile app showing attendance, revenue, quick actions and member list"
          loading="eager"
          className="h-auto w-full max-w-full object-contain drop-shadow-[0_26px_54px_rgba(15,23,42,0.38)]"
        />
      </motion.div>
    </motion.div>
  );
};

export const Hero: React.FC = () => {
  const logos = ['Energie Fitness', 'The Fit Zone', 'Ultimate Gym', 'Iron House', 'Volt Fitness', 'Body Line', 'Core Pulse', 'PeakFit Club', 'Urban Lift', 'Flex Arena'];

  return (
    <section id="home" className="relative flex min-h-[80vh] flex-col justify-center bg-white pt-[78px]">
      <motion.div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(56,189,248,0.18),transparent_34%),linear-gradient(180deg,#f8fbff_0%,#fff_60%)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }} />
      <motion.div className="pointer-events-none absolute right-0 top-14 h-[520px] w-[52%] max-w-[700px] rounded-bl-[220px] bg-blue-50/75 blur-0" animate={{ y: [0, 12, 0], x: [0, -6, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-10 px-[5%] py-14 lg:grid-cols-[0.78fr_1.12fr] lg:py-16">
        <div>
          <motion.div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3.5 py-1.5 text-[11px] font-black text-blue-700 shadow-[0_12px_30px_rgba(37,99,235,0.10)] backdrop-blur" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.24 }}>
            <Dumbbell size={14} /> All-in-One Gym Management Platform
          </motion.div>

          <TypewriterHeading />
          <motion.p className="mt-5 max-w-[480px] text-[16px] leading-7 text-slate-600" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.92, ease: [0.16, 1, 0.3, 1] }}>
            Complete solution for gym owners to manage members, attendance, billing, staff, workouts and grow their business - all in one place.
          </motion.p>

          <motion.div className="mt-7 flex flex-wrap gap-3" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 1.08 } } }}>
            <motion.a href="/contact" onClick={linkHandler('/contact')} className="premium-button group inline-flex h-[46px] items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-[22px] text-[15px] font-black text-white shadow-[0_18px_44px_rgba(37,99,235,0.28)] hover:from-blue-500 hover:to-cyan-400" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }} whileHover={{ y: -4, boxShadow: '0 24px 58px rgba(37,99,235,0.32)' }} whileTap={{ scale: 0.96 }}>
              Book a Demo <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a href="/features" onClick={linkHandler('/features')} className="premium-button group inline-flex h-[46px] items-center gap-2 rounded-xl border border-blue-100 bg-white/80 px-[22px] text-[15px] font-black text-slate-800 shadow-sm backdrop-blur hover:border-blue-200" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }} whileHover={{ y: -4, boxShadow: '0 18px 42px rgba(37,99,235,0.14)' }} whileTap={{ scale: 0.96 }}>
              Explore Features <Play size={14} className="text-blue-600 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>

          <motion.div className="mt-6 flex items-center gap-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex -space-x-2">
              {['R', 'A', 'K', 'S', 'M'].map((item, index) => (
                <span key={item} className={`grid h-8 w-8 place-items-center rounded-full border-2 border-white text-[10px] font-black text-white shadow-sm ${index % 3 === 0 ? 'bg-blue-600' : index % 3 === 1 ? 'bg-cyan-500' : 'bg-slate-900'}`}>
                  {item}
                </span>
              ))}
            </div>
            <div>
              <p className="text-[13px] font-black text-slate-900">Trusted by 250+ Gym Owners</p>
              <p className="text-[11px] font-semibold text-slate-500">Rated 5 stars by fitness businesses</p>
            </div>
          </motion.div>

          <motion.div className="mt-5 grid max-w-[480px] grid-cols-3 gap-3 text-[10px] font-bold text-slate-600" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 1.32 } } }}>
            {['250+ Gym Owners', '10K+ Active Members', '99.9% Uptime'].map((item) => (
              <motion.span key={item} className="flex items-center gap-1.5" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                <CheckCircle2 size={13} className="text-blue-600" />{item}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <DashboardMock />
      </div>

      <div className="relative border-y border-blue-100 bg-white/90 px-[5%] py-6">
        <div className="premium-surface mx-auto max-w-[1280px] rounded-[22px] px-[5%] py-4 text-center">
          <p className="mb-5 text-[12px] font-black text-slate-600">Trusted by leading gyms & fitness centers</p>
          <div className="overflow-hidden">
            <div className="trusted-marquee flex w-max gap-4">
              {[...logos, ...logos].map((brand, index) => (
              <motion.span key={`${brand}-${index}`} className="flex min-w-[196px] items-center gap-3 rounded-2xl border border-slate-100 bg-white/85 px-4 py-3 text-left text-[12px] font-black uppercase tracking-tight text-slate-600 grayscale transition duration-300 hover:border-blue-100 hover:text-blue-600 hover:grayscale-0 hover:shadow-[0_14px_34px_rgba(37,99,235,0.16)]">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 text-[11px] text-white">{brand.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span>
                <span>{brand}</span>
              </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
