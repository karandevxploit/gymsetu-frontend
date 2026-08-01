import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  ['What is GymSetu AI?', 'GymSetu AI is an all-in-one platform for gym members, attendance, payments, plans and reports.'],
  ['Is my data safe with GymSetu AI?', 'Yes, gym and member data is handled with secure cloud storage and protected access.'],
  ['Can I use it on multiple devices?', 'Yes, owner and member apps are designed for Android, iOS, Windows and macOS workflows.'],
  ['Is there a free trial available?', 'Yes, you can request a demo or starter setup before choosing a paid plan.'],
  ['How does the attendance system work?', 'Members can check in through QR based attendance and owner-side verification.'],
];

export const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div id="faq" className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm h-full">
      <h2 className="text-[22px] font-black text-slate-950 mb-4">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqs.map(([question, answer], index) => (
          <div key={question} className="rounded-md border border-slate-200 bg-slate-50">
            <button onClick={() => setOpen(open === index ? null : index)} className="w-full min-h-9 px-4 flex items-center justify-between text-left text-[12px] font-bold text-slate-800">
              {question}
              <Plus size={13} className={`transition-transform ${open === index ? 'rotate-45' : ''}`} />
            </button>
            {open === index && <p className="px-4 pb-3 text-[11px] leading-relaxed text-slate-600">{answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};
