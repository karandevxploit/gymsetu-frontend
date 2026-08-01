import React from 'react';
import { ArrowUpRight, Rocket } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Reveal } from './animation';

export const WhyChoose: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="why" className="bg-white pb-20 pt-10">
      <Reveal className="mx-auto max-w-[1280px] px-[5%]">
        <div className="animated-gradient grid items-center gap-6 rounded-[22px] bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 p-6 text-white shadow-[0_24px_64px_rgba(37,99,235,0.26)] md:grid-cols-[76px_1fr_auto] md:p-7">
          <motion.div className="grid h-16 w-16 place-items-center rounded-[18px] bg-white/15 shadow-[0_1px_0_rgba(255,255,255,0.18)_inset]" animate={reduceMotion ? {} : { y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
            <Rocket size={34} />
          </motion.div>
          <div>
            <h2 className="text-[28px] font-black leading-tight tracking-tight">Ready to Take Your Gym to the Next Level?</h2>
            <p className="mt-3 text-[15px] font-medium text-white/85">Join hundreds of gym owners who are growing their business with GymSetu.</p>
          </div>
          <motion.a href="#contact" className="premium-button group inline-flex h-[46px] items-center justify-center gap-2 rounded-xl bg-white px-[22px] text-[15px] font-black text-blue-700" animate={reduceMotion ? {} : { boxShadow: ['0 0 0 rgba(255,255,255,0)', '0 0 34px rgba(255,255,255,0.42)', '0 0 0 rgba(255,255,255,0)'] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} whileHover={{ y: -4 }} whileTap={{ scale: 0.96 }}>
            Book a Free Demo <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1" />
          </motion.a>
        </div>
      </Reveal>
    </section>
  );
};
