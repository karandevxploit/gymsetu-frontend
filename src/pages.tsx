import { BarChart3, Bell, Briefcase, CalendarCheck, CheckCircle2, Cookie, CreditCard, Dumbbell, FileText, Headphones, LayoutDashboard, Lock, Mail, MessageSquare, RefreshCcw, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Contact } from './components/Contact';
import { Downloads } from './components/Downloads';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Reveal, fadeUp, premiumTransition, stagger } from './components/animation';
import { config } from './config';
import { linkHandler } from './navigation';

const modules = [
  [Users, 'Member Module', 'Profiles, renewals, notes, tags, documents and lifecycle history for every member.'],
  [CalendarCheck, 'Attendance', 'QR-ready check-ins, missed visit alerts, daily logs and branch-wise reports.'],
  [CreditCard, 'Billing', 'Invoices, receipts, dues, payment follow-ups and collection performance.'],
  [Dumbbell, 'Workout', 'Reusable workout templates, member-specific plans and progress tracking.'],
  [ShieldCheck, 'Diet', 'Nutrition plans, meal preferences and simple member delivery workflows.'],
  [BarChart3, 'Reports', 'Revenue, retention, attendance, staff and member growth reporting.'],
  [Briefcase, 'Staff', 'Role-based staff access, branch permissions and operational accountability.'],
  [Bell, 'Notifications', 'Announcements, renewal reminders, payment nudges and member updates.'],
  [LayoutDashboard, 'Analytics', 'Owner dashboards that turn daily activity into decisions.'],
] as const;

const PageHero = ({ label, title, copy }: { label: string; title: string; copy: string }) => (
  <section className="bg-white px-[5%] pb-14 pt-[128px]">
    <Reveal className="mx-auto max-w-[1280px]">
      <p className="text-[12px] font-black uppercase tracking-[0.14em] text-blue-600">{label}</p>
      <h1 className="mt-4 max-w-4xl text-[38px] font-extrabold leading-[1.05] tracking-[-0.03em] text-slate-950 md:text-[52px]">{title}</h1>
      <p className="mt-5 max-w-2xl text-[16px] leading-7 text-slate-600">{copy}</p>
    </Reveal>
  </section>
);

export const FeaturesPage = () => (
  <>
    <PageHero label="Features" title="A calmer way to run every part of your fitness business." copy="GymSetu brings operations, member experience, billing, staff and reporting into one polished product." />
    <Features />
    <Testimonials />
  </>
);

export const ModulesPage = () => (
  <>
    <PageHero label="Modules" title="Detailed modules for owners, staff and members." copy="Every module is designed to reduce admin work while keeping owners close to the metrics that matter." />
    <section className="bg-white px-[5%] pb-20">
      <motion.div className="mx-auto grid max-w-[1280px] gap-6 md:grid-cols-2 lg:grid-cols-3" variants={stagger} initial="hidden" animate="visible">
        {modules.map(([Icon, title, copy]) => (
          <motion.article key={title} className="premium-card premium-shadow rounded-[18px] border border-blue-100 bg-white p-6" variants={fadeUp} transition={premiumTransition}>
            <div className="mb-5 h-[150px] rounded-2xl border border-slate-200 bg-[#f8fbff] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon size={20} /></span>
                <span className="h-2 w-24 rounded-full bg-cyan-100" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="h-16 rounded-xl bg-white shadow-sm" />
                <span className="h-16 rounded-xl bg-white shadow-sm" />
                <span className="h-16 rounded-xl bg-white shadow-sm" />
              </div>
            </div>
            <h2 className="text-[18px] font-black text-slate-950">{title}</h2>
            <p className="mt-3 text-[14px] leading-6 text-slate-500">{copy}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  </>
);

export const PricingPage = () => (
  <>
    <PageHero label="Pricing" title="Simple plans with a clear path to launch." copy="Compare plans, download the right app, or book a demo for a guided setup." />
    <Pricing />
    <section className="bg-white px-[5%] pb-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8">
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-blue-600">Complete Details</p>
          <h2 className="mt-3 text-[32px] font-black tracking-tight text-slate-950">Compare what each plan unlocks</h2>
        </div>
        <div className="overflow-x-auto rounded-[18px] border border-blue-100 bg-white shadow-[0_14px_38px_rgba(37,99,235,0.07)]">
          <table className="w-full min-w-[760px] text-left text-[13px]">
            <thead className="bg-blue-50 text-slate-950">
              <tr>
                {['Capability', 'Basic - Rs 999/mo', 'Pro - Rs 1999/mo'].map((item) => <th key={item} className="px-5 py-4 font-black">{item}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50 text-slate-600">
              {[
                ['Members', 'Core member tools', 'Up to 1000 members'],
                ['Attendance', 'Included', 'Advanced logs and follow-ups'],
                ['Billing', 'Billing & invoices', 'Dues, invoices and reporting'],
                ['Workout & Diet', 'Not included', 'Included'],
                ['Staff Access', 'Owner access', 'Staff management'],
                ['Reports', 'Basic reports', 'Advanced reports'],
                ['Website', 'Not included', 'Free website included'],
                ['Branding', 'GymSetu branding', 'Free white label branding'],
                ['Support', 'Standard', 'Priority support'],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => <td key={cell} className="px-5 py-4 font-semibold">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <Downloads />
  </>
);

export const ContactPage = () => (
  <>
    <PageHero label="Contact" title="Book a demo or talk to the GymSetu team." copy="Share your gym details and the team will follow up with a practical implementation plan." />
    <Contact variant="page" />
  </>
);

export const AboutPage = () => (
  <>
    <PageHero label="About GymSetu" title="Built for modern gyms that want less admin and better member experiences." copy="GymSetu is focused on practical software for Indian fitness businesses: fast onboarding, clear reporting and dependable daily workflows." />
    <section className="bg-white px-[5%] pb-20">
      <div className="mx-auto grid max-w-[1280px] gap-6 lg:grid-cols-3">
        {[
          ['Company Story', 'GymSetu was created to replace scattered spreadsheets, manual registers and disconnected communication with one reliable operating layer for gyms.'],
          ['Mission', 'Help gym owners manage operations with clarity, speed and confidence.'],
          ['Vision', 'Become the operating system for fitness businesses across India.'],
          ['Why GymSetu', 'Purpose-built modules, owner-friendly analytics and member apps that feel simple.'],
          ['Our Team', 'A product-focused team combining gym operations knowledge, SaaS engineering and customer success support.'],
          ['Technology', 'Modern React interfaces, secure role-based access and scalable cloud-ready workflows.'],
          ['Security', 'Least-privilege staff roles, careful data handling and operational transparency.'],
          ['FAQ', 'Designed for single gyms, growing studios and multi-branch fitness brands.'],
        ].map(([title, copy]) => (
          <article key={title} className="premium-card premium-shadow rounded-[18px] border border-blue-100 bg-white p-6">
            <h2 className="text-[18px] font-black text-slate-950">{title}</h2>
            <p className="mt-3 text-[14px] leading-6 text-slate-500">{copy}</p>
          </article>
        ))}
      </div>
    </section>
  </>
);

const legalContent: Record<string, [string, string, typeof FileText]> = {
  '/privacy-policy': ['Privacy Policy', 'We collect only the information required to provide demos, support, product access and communication. Customer data is handled with role-based access, operational safeguards, limited retention practices, internal access controls and clear support channels for correction or deletion requests.', Lock],
  '/terms-and-conditions': ['Terms & Conditions', 'GymSetu services are provided for business operations, member management and related workflows. Users are responsible for lawful use, accurate data entry, protecting account access, maintaining billing information and ensuring staff use the platform according to gym policies.', FileText],
  '/refund-policy': ['Refund Policy', 'Subscription refunds are reviewed based on plan status, activation date, usage and written requests. Approved refunds are processed to the original payment method where possible, and setup or onboarding charges may be handled separately when disclosed during purchase.', RefreshCcw],
  '/cancellation-policy': ['Cancellation Policy', 'Customers may request cancellation before the next billing cycle. Access remains available through the paid term unless otherwise required by support. Data export and transition assistance can be requested before account closure.', CheckCircle2],
  '/cookie-policy': ['Cookie Policy', 'GymSetu may use essential cookies and lightweight analytics to maintain sessions, improve performance and understand product usage. Non-essential tracking can be limited when browser settings or future consent controls support it.', Cookie],
  '/blog': ['Blog', 'Product updates, growth guides and practical operating advice for gyms will appear here as GymSetu publishes new resources.', Sparkles],
  '/careers': ['Careers', 'We are building a focused team across product, engineering, support and customer success. Open roles will be published as hiring begins.', Briefcase],
};

export const LegalPage = ({ path }: { path: string }) => {
  const [title, copy, Icon] = legalContent[path] || legalContent['/privacy-policy'];
  return (
    <>
      <PageHero label="GymSetu" title={title} copy={copy} />
      <section className="bg-white px-[5%] pb-20">
        <div className="premium-surface mx-auto max-w-[900px] rounded-[22px] p-8">
          <Icon className="mb-5 text-blue-600" size={32} />
          <h2 className="text-[22px] font-black text-slate-950">Professional SaaS policy summary</h2>
          <p className="mt-4 text-[15px] leading-8 text-slate-600">{copy}</p>
          <p className="mt-5 text-[13px] leading-6 text-slate-500">For questions, contact <a href={`mailto:${config.company.email}`} className="font-bold text-blue-600">{config.company.email}</a>.</p>
        </div>
      </section>
    </>
  );
};

export const SupportPage = () => (
  <>
    <PageHero label="Support" title="Support for onboarding, downloads and daily operations." copy="Get help with product setup, app access, billing workflows and staff training." />
    <section className="bg-white px-[5%] pb-20">
      <div className="mx-auto grid max-w-[1280px] gap-6 md:grid-cols-3">
        {[
          [Headphones, 'Priority Support', 'For active customers and demos in progress.'],
          [MessageSquare, 'Live Chat', 'Chat placeholder is ready for a support widget integration.'],
          [Mail, 'Email Support', config.company.email],
        ].map(([Icon, title, copy]) => (
          <article key={title as string} className="premium-card premium-shadow rounded-[18px] border border-blue-100 bg-white p-6">
            <Icon className="text-blue-600" size={24} />
            <h2 className="mt-4 text-[18px] font-black text-slate-950">{title as string}</h2>
            <p className="mt-3 text-[14px] leading-6 text-slate-500">{copy as string}</p>
          </article>
        ))}
      </div>
      <div className="mx-auto mt-8 max-w-[1280px]">
        <a href="/contact" onClick={linkHandler('/contact')} className="premium-button inline-flex h-12 items-center rounded-xl bg-blue-600 px-6 text-[14px] font-black text-white">Contact Support</a>
      </div>
    </section>
  </>
);
