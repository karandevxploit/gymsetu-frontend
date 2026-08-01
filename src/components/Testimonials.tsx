import React, { useEffect, useState } from 'react';
import { Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Reveal } from './animation';

const testimonials = [
  ['Rahul Mehra', 'The Fit Zone, Delhi', 'GymSetu transformed our daily operations. Attendance, billing and reports now feel effortless.'],
  ['Karan Yadav', 'Iron House Fitness', 'The dashboard looks premium and helps our team act faster. Member follow-ups are much cleaner now.'],
  ['Sneha Kapoor', 'Body Line Fitness', 'We moved from spreadsheets to GymSetu and saved hours every week. The platform feels fast and reliable.'],
] as const;

export const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % testimonials.length), 3600);
    return () => window.clearInterval(timer);
  }, [paused]);

  const [name, gym, quote] = testimonials[active];

  return (
    <section className="bg-white py-20">
      <Reveal className="mx-auto max-w-[1000px] px-5 lg:px-[5%]">
        <div className="mb-10 text-center">
          <p className="text-[12px] font-black text-blue-600">Loved by Gym Owners</p>
          <h2 className="mt-2 text-[34px] font-black leading-tight tracking-tight text-slate-950 md:text-[42px]">Premium experience, practical results</h2>
        </div>

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="premium-surface relative overflow-hidden rounded-[30px] p-9">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 26, rotate: 1.5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -26, rotate: -1.5 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }} className="mb-5 text-blue-500">
              <Quote size={38} />
            </motion.div>
            <p className="text-[22px] font-bold leading-9 text-slate-800">"{quote}"</p>
            <div className="mt-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-base font-black text-slate-950">{name}</p>
                <p className="mt-1 text-[12px] font-semibold text-slate-500">{gym}</p>
              </div>
              <div className="flex gap-1 text-amber-400">
                {[0, 1, 2, 3, 4].map((item) => (
                  <motion.span key={item} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: item * 0.05 }}>
                    <Star size={17} fill="currentColor" />
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
};
