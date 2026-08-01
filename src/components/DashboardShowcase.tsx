import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Laptop, Smartphone, BarChart3 } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const DashboardShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'owner' | 'member' | 'reports'>('owner');

  const tabs = [
    { id: 'owner', label: 'Owner Panel', icon: <Laptop size={16} /> },
    { id: 'member', label: 'Member App', icon: <Smartphone size={16} /> },
    { id: 'reports', label: 'Reports Room', icon: <BarChart3 size={16} /> }
  ] as const;

  return (
    <section className="py-24 bg-white dark:bg-[#081C15] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-4"
          >
            Interactive Playground
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-emerald-950 dark:text-white mb-6">
            Explore the Interface
          </h2>
          
          <p className="text-emerald-900/60 dark:text-white/60 text-lg">
            Toggle between panels to view how the application behaves for owners, staff, and gym members.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-[#F8FAF9] dark:bg-[#0c241b] p-1.5 rounded-2xl border border-emerald-500/10 max-w-md w-full relative">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 relative z-10 transition-colors ${
                  activeTab === tab.id 
                    ? 'text-white' 
                    : 'text-emerald-900/60 dark:text-[#F8FAF9]/60 hover:text-emerald-700'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-emerald-600 rounded-xl z-[-1]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Showcase Panel */}
        <div className="bg-[#F8FAF9] dark:bg-[#0c241b] border border-emerald-500/10 rounded-[32px] p-6 sm:p-8 lg:p-12 shadow-2xl relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'owner' && (
              <motion.div 
                key="owner"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5 text-left space-y-6">
                  <span className="text-xs bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    Full Admin Control
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 dark:text-white leading-tight">
                    Your Complete Gym Management Command Center
                  </h3>
                  <p className="text-sm text-emerald-900/65 dark:text-white/65 leading-relaxed">
                    Track live occupancy trends, verify membership payouts, configure recurring subscription products, and control multi-location registers directly from a web or native interface.
                  </p>
                  <ul className="space-y-3 text-sm text-emerald-950 dark:text-white font-medium">
                    <li className="flex items-center gap-2">✓ Real-time occupancy analytics</li>
                    <li className="flex items-center gap-2">✓ Multi-branch billing integration</li>
                    <li className="flex items-center gap-2">✓ automated daily check-in reports</li>
                  </ul>
                </div>
                
                <div className="lg:col-span-7 bg-white dark:bg-emerald-950/20 border border-emerald-500/10 rounded-2xl p-6 shadow-md">
                  <div className="flex justify-between items-center pb-4 border-b border-emerald-500/5 mb-4">
                    <span className="text-xs font-bold text-emerald-950 dark:text-white">Active Classes (Today)</span>
                    <span className="text-xs text-emerald-600 font-semibold">4 Classes Scheduled</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'HIIT Cardio Burn', trainer: 'Coach Rohan', time: '08:00 AM', status: 'In Progress', capacity: '18/20' },
                      { name: 'Strength Foundations', trainer: 'Coach Priya', time: '10:30 AM', status: 'Upcoming', capacity: '12/20' },
                      { name: 'Yoga Flex & Stretch', trainer: 'Coach Sarah', time: '05:00 PM', status: 'Upcoming', capacity: '5/15' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/5">
                        <div>
                          <p className="text-xs font-bold text-emerald-950 dark:text-white">{item.name}</p>
                          <p className="text-[10px] text-emerald-900/50 dark:text-white/50">{item.trainer} • {item.time}</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                            item.status === 'In Progress' ? 'bg-emerald-600 text-white' : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                          }`}>{item.status}</span>
                          <p className="text-[9px] text-emerald-900/60 dark:text-white/60 mt-1 font-mono">{item.capacity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'member' && (
              <motion.div 
                key="member"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5 text-left space-y-6">
                  <span className="text-xs bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    Member App Flow
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 dark:text-white leading-tight">
                    Empower Members to Track Progress Seamlessly
                  </h3>
                  <p className="text-sm text-emerald-900/65 dark:text-white/65 leading-relaxed">
                    GymSetu member application allows clients to scan check-in QR codes, log daily dietary patterns, download dynamic PDFs of workout cards, and execute online renewals without visiting the reception counter.
                  </p>
                  <ul className="space-y-3 text-sm text-emerald-950 dark:text-white font-medium">
                    <li className="flex items-center gap-2">✓ Personal barcode/QR scan check-in</li>
                    <li className="flex items-center gap-2">✓ Digital workout trackers</li>
                    <li className="flex items-center gap-2">✓ Meal plan summaries & macros</li>
                  </ul>
                </div>

                <div className="lg:col-span-7 flex justify-center">
                  <div className="w-[280px] bg-white dark:bg-emerald-950/20 border border-emerald-500/10 rounded-[32px] p-4 shadow-xl">
                    <div className="w-12 h-1 bg-emerald-500/10 rounded-full mx-auto mb-4" />
                    <div className="space-y-4">
                      {/* Member Greeting */}
                      <div className="flex items-center gap-3">
                        <BrandLogo size={40} className="rounded-full" />
                        <div className="text-left">
                          <p className="text-xs font-bold text-emerald-950 dark:text-white">Hello, John S.</p>
                          <p className="text-[9px] text-emerald-900/50">Membership valid till Oct 2026</p>
                        </div>
                      </div>

                      {/* Dynamic Macro tracker */}
                      <div className="bg-emerald-500/5 p-3 rounded-2xl border border-emerald-500/5">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-bold text-emerald-950 dark:text-white">Daily Calorie Target</span>
                          <span className="text-[9px] text-emerald-600 font-mono">1,820 / 2,400 kcal</span>
                        </div>
                        <div className="w-full bg-emerald-600/10 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-600 h-full rounded-full" style={{ width: '75%' }} />
                        </div>
                      </div>

                      {/* Next session reminder */}
                      <div className="bg-emerald-600 p-3 rounded-2xl text-white text-left">
                        <p className="text-[8px] uppercase tracking-wider font-bold opacity-80">Next Recommended Class</p>
                        <p className="text-xs font-bold mt-1">Legs & Core Dynamic Routine</p>
                        <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/20">
                          <span className="text-[9px] font-medium">Coach Rohan • 08:00 AM</span>
                          <span className="text-[9px] bg-white/25 px-2 py-0.5 rounded-full font-bold">Booked</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'reports' && (
              <motion.div 
                key="reports"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5 text-left space-y-6">
                  <span className="text-xs bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    Finance Room
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 dark:text-white leading-tight">
                    Premium Visualizations of All Gym Finances
                  </h3>
                  <p className="text-sm text-emerald-900/65 dark:text-white/65 leading-relaxed">
                    Instantly export automated PDF and Excel invoices, review monthly net profit distributions, analyze client attendance percentages, and identify top trainers based on recurring check-in feedback.
                  </p>
                  <ul className="space-y-3 text-sm text-emerald-950 dark:text-white font-medium">
                    <li className="flex items-center gap-2">✓ Auto-calculated daily taxes and profits</li>
                    <li className="flex items-center gap-2">✓ PDF invoice auto-generator</li>
                    <li className="flex items-center gap-2">✓ Member retention rate tracker</li>
                  </ul>
                </div>

                <div className="lg:col-span-7 bg-white dark:bg-emerald-950/20 border border-emerald-500/10 rounded-2xl p-6 shadow-md text-left">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950 dark:text-white">Annual Financial Outlook</h4>
                      <p className="text-[10px] text-emerald-900/50">Fiscal summary 2026</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-600">₹ 2,48,500</span>
                      <p className="text-[9px] text-emerald-900/40">Total revenue generated</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { source: 'Membership Subscription Purchases', amount: '₹ 1,82,400', percentage: '73%' },
                      { source: 'Personal Training Bundles', amount: '₹ 45,900', percentage: '18%' },
                      { source: 'Store & Supplement Sales', amount: '₹ 20,200', percentage: '9%' }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-emerald-950 dark:text-white">
                          <span>{item.source}</span>
                          <span className="font-bold">{item.amount} ({item.percentage})</span>
                        </div>
                        <div className="w-full bg-emerald-600/10 h-2 rounded-full">
                          <div 
                            className="bg-emerald-600 h-full rounded-full" 
                            style={{ width: item.percentage }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
