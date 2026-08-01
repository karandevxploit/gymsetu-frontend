import React from 'react';
import { Reveal } from './animation';

export const DashboardPreview: React.FC = () => {
  return (
    <section id="dashboard" className="bg-[#fbfdff] py-8">
      <Reveal className="mx-auto max-w-[1320px] px-5 lg:px-8">
        <div className="premium-surface rounded-[30px] p-8 text-center">
          <p className="text-[12px] font-black text-blue-600">Access Anywhere, Anytime</p>
          <h2 className="mt-2 text-[34px] font-black leading-tight tracking-tight text-slate-950 md:text-[42px]">Available on Desktop, Android & iOS</h2>
          <p className="mt-3 text-[15px] text-slate-500">Download GymSetu and manage your gym on the go.</p>
        </div>
      </Reveal>
    </section>
  );
};
