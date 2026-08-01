import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { AppShellSkeleton } from './Skeleton';

const easeOut = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const premiumTransition = {
  duration: 0.8,
  ease: easeOut,
};

export const Reveal: React.FC<React.PropsWithChildren<{ className?: string; delay?: number }>> = ({ children, className = '', delay = 0 }) => (
  <motion.div
    className={className}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    transition={{ ...premiumTransition, delay }}
  >
    {children}
  </motion.div>
);

export const AnimatedNumber: React.FC<{ end: number; suffix?: string; prefix?: string; decimals?: number; className?: string }> = ({
  end,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(reduceMotion ? end : 0);

  useEffect(() => {
    if (!inView || reduceMotion) {
      if (reduceMotion) setValue(end);
      return;
    }

    const duration = 2000;
    const startedAt = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, inView, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}{value.toFixed(decimals)}{suffix}
    </span>
  );
};

export const PageLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), reduceMotion ? 80 : 520);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  if (!loading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: easeOut }}
    >
      <AppShellSkeleton />
    </motion.div>
  );
};

export const CursorGlow: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const smoothX = useSpring(x, { stiffness: 80, damping: 24, mass: 0.4 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 24, mass: 0.4 });

  useEffect(() => {
    if (reduceMotion || window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX - 225);
      y.set(event.clientY - 225);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduceMotion, x, y]);

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[1] hidden h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.16),rgba(37,99,235,0.07)_38%,transparent_68%)] blur-2xl lg:block"
      style={{ x: smoothX, y: smoothY }}
    />
  );
};

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-5 right-5 z-50 grid h-11 w-11 place-items-center rounded-full border border-blue-100 bg-white text-blue-600 shadow-[0_14px_34px_rgba(37,99,235,0.18)]"
      initial={false}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.9, pointerEvents: 'none' }}
      whileHover={{ width: 116, borderRadius: 999, boxShadow: '0 18px 42px rgba(37,99,235,0.25)' }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.35, ease: easeOut }}
    >
      <span className="sr-only">Back to top</span>
      <ArrowUp size={17} />
    </motion.button>
  );
};
