import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { fadeUp, premiumTransition, stagger } from './animation';
import { BrandLogo } from './BrandLogo';
import { config } from '../config';
import { linkHandler } from '../navigation';

const columns = [
  ['Product', [['Home', '/'], ['Features', '/features'], ['Modules', '/modules'], ['Pricing', '/pricing'], ['Downloads', '/#apps']]],
  ['Company', [['About', '/about'], ['Contact', '/contact'], ['Support', '/support'], ['Blog', '/blog'], ['Careers', '/careers']]],
  ['Policies', [['Privacy Policy', '/privacy-policy'], ['Terms & Conditions', '/terms-and-conditions'], ['Refund Policy', '/refund-policy'], ['Cancellation Policy', '/cancellation-policy'], ['Cookie Policy', '/cookie-policy']]],
] as const;

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-white">
      <motion.div className="mx-auto grid max-w-[1280px] gap-9 px-[5%] py-12 lg:grid-cols-[1.35fr_0.8fr_0.8fr_0.95fr_1.2fr]" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
        <motion.div variants={fadeUp} transition={premiumTransition}>
          <div className="mb-5 flex items-center gap-3">
            <BrandLogo size={36} />
            <span className="text-[21px] font-black tracking-tight text-slate-950">GymSetu</span>
          </div>
          <p className="max-w-[290px] text-[14px] leading-7 text-slate-500">All-in-One Gym Management Platform to manage, grow and transform your fitness business.</p>
          <div className="mt-5 flex gap-2.5">
            {['f', 'ig', 'yt', 'in'].map((item) => (
              <motion.a key={item} href="#" className="grid h-8 w-8 place-items-center rounded-full border border-blue-100 bg-white text-[10px] font-black text-blue-600 shadow-sm hover:border-blue-200 hover:bg-blue-50" aria-label="Social link" whileHover={{ rotate: 6, boxShadow: '0 12px 28px rgba(37,99,235,0.18)' }} whileTap={{ scale: 0.96 }}>
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {columns.map(([title, links]) => (
          <motion.div key={title} variants={fadeUp} transition={premiumTransition}>
            <h3 className="mb-5 text-[13px] font-black text-slate-950">{title}</h3>
            <div className="space-y-3.5">
              {links.map(([label, href]) => <a key={label} href={href} onClick={linkHandler(href)} className="relative block w-fit text-[13px] font-semibold text-slate-500 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-blue-500 after:transition-transform hover:text-blue-600 hover:after:scale-x-100">{label}</a>)}
            </div>
          </motion.div>
        ))}

        <motion.div variants={fadeUp} transition={premiumTransition}>
          <h3 className="mb-5 text-[13px] font-black text-slate-950">Contact Us</h3>
          <div className="space-y-4 text-[13px] font-semibold leading-6 text-slate-500">
            <p className="flex items-start gap-3"><MapPin size={14} className="mt-0.5 text-blue-600" /> {config.company.address}</p>
            <p className="flex items-start gap-3"><Phone size={14} className="mt-0.5 text-blue-600" /> {config.company.phone}</p>
            <p className="flex items-start gap-3"><Mail size={14} className="mt-0.5 text-blue-600" /> {config.company.email}</p>
          </div>
        </motion.div>
      </motion.div>
      <div className="border-t border-blue-100 py-6 text-center text-[12px] text-slate-500">
        &copy; 2026 GymSetu. All rights reserved.
      </div>
    </footer>
  );
};
