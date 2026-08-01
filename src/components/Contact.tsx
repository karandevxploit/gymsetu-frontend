import React, { useMemo, useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { config } from '../config';

const inputClass = 'h-11 rounded-xl border border-blue-100 bg-white px-4 text-[13px] font-semibold text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100';

export const Contact: React.FC<{ variant?: 'section' | 'page' }> = ({ variant = 'section' }) => {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionDate = useMemo(() => new Date().toISOString(), []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.currentTarget;
    const body = new FormData(form);
    const submittedAt = new Date().toLocaleString();
    const lead = {
      name: String(body.get('Name') || ''),
      gymName: String(body.get('Gym Name') || ''),
      phone: String(body.get('Phone') || ''),
      email: String(body.get('Email') || ''),
      city: String(body.get('City') || ''),
      state: String(body.get('State') || ''),
      members: String(body.get('Members') || ''),
      product: String(body.get('Interested Product') || ''),
      message: String(body.get('Message') || ''),
      submittedAt,
    };
    body.append('_subject', 'New GymSetu Demo Request');
    body.append('_captcha', 'false');
    body.append('_template', 'table');
    body.append('Submission Date', submittedAt);
    body.append('IP', 'Unavailable from browser-only static form');

    try {
      const response = await fetch(`https://formsubmit.co/${config.formSubmitEmail}`, { method: 'POST', body });
      if (!response.ok) throw new Error(`Form submit failed: ${response.status}`);
      setSent(true);
      form.reset();
      const whatsappMessage = [
        'New GymSetu Demo Request',
        `Name: ${lead.name}`,
        `Gym Name: ${lead.gymName}`,
        `Phone: ${lead.phone}`,
        `Email: ${lead.email}`,
        `City: ${lead.city}`,
        `State: ${lead.state}`,
        `Members: ${lead.members}`,
        `Product: ${lead.product}`,
        `Message: ${lead.message}`,
        `Submission Date: ${lead.submittedAt}`,
      ].join('\n');
      window.open(`${config.company.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Contact form submit failed', error);
      setSent(false);
      alert(`We could not send the form right now. Please email ${config.company.email} or try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`bg-white px-[5%] ${variant === 'page' ? 'pb-20' : 'py-20'}`}>
      <div className="premium-surface mx-auto grid max-w-[1280px] gap-8 rounded-[22px] p-6 lg:grid-cols-[0.78fr_1.22fr] lg:p-8">
        <div>
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-blue-600">Contact</p>
          <h2 className="mt-3 text-[32px] font-black leading-tight tracking-tight text-slate-950 md:text-[38px]">Book a GymSetu demo</h2>
          <p className="mt-3 text-[15px] leading-7 text-slate-500">Tell us about your gym and the product you are interested in. Your request is sent to {config.company.email}.</p>

          <div className="mt-7 space-y-4">
            {[
              [MessageCircle, 'WhatsApp', config.company.phone],
              [Mail, 'Email', config.company.email],
              [Phone, 'Phone', config.company.phone],
              [MapPin, 'Address', config.company.address],
            ].map(([Icon, label, value]) => (
              <div key={label as string} className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon size={18} /></span>
                <div>
                  <p className="text-[12px] font-black text-slate-950">{label as string}</p>
                  <p className="mt-1 text-[13px] leading-5 text-slate-500">{value as string}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="Submission Seed Date" value={submissionDate} />
          <div className="grid gap-4 sm:grid-cols-2">
            <input required name="Name" placeholder="Name" className={inputClass} />
            <input required name="Gym Name" placeholder="Gym Name" className={inputClass} />
            <input required name="Phone" placeholder="Phone Number" className={inputClass} />
            <input required name="Email" type="email" placeholder="Email" className={inputClass} />
            <input required name="City" placeholder="City" className={inputClass} />
            <input required name="State" placeholder="State" className={inputClass} />
            <input required name="Members" type="number" min="1" placeholder="Number of Members" className={inputClass} />
            <select required name="Interested Product" className={inputClass} defaultValue="">
              <option value="" disabled>Interested Product</option>
              <option>Owner Desktop</option>
              <option>Owner Mobile</option>
              <option>Member App</option>
            </select>
          </div>
          <textarea required name="Message" placeholder="Message" rows={5} className="w-full resize-none rounded-xl border border-blue-100 bg-white px-4 py-3 text-[13px] font-semibold text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100" />
          {sent && <p className="rounded-xl border border-cyan-100 bg-cyan-50 px-4 py-3 text-[13px] font-bold text-cyan-700">Thanks. Your demo request was sent successfully. WhatsApp message window has also opened.</p>}
          <button type="submit" disabled={isSubmitting} className="premium-button flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-[14px] font-black text-white shadow-[0_18px_42px_rgba(37,99,235,0.24)] disabled:bg-blue-300">
            {isSubmitting ? 'Sending...' : 'Book Demo'} <Send size={15} />
          </button>
        </form>
      </div>
    </section>
  );
};
