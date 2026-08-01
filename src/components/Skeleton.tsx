import React, { memo } from 'react';
import { motion } from 'motion/react';

type SkeletonProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const SkeletonBlock = memo(({ className = '', style }: SkeletonProps) => (
  <span aria-hidden="true" className={`skeleton-shimmer block rounded-xl ${className}`} style={style} />
));

SkeletonBlock.displayName = 'SkeletonBlock';

export const SkeletonText = memo(({ lines = 1, className = '' }: SkeletonProps & { lines?: number }) => (
  <div aria-hidden="true" className={`grid gap-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <SkeletonBlock
        key={index}
        className={`h-3 ${index === lines - 1 && lines > 1 ? 'w-[72%]' : 'w-full'}`}
      />
    ))}
  </div>
));

SkeletonText.displayName = 'SkeletonText';

export const SkeletonFade = ({ children, className = '' }: React.PropsWithChildren<SkeletonProps>) => (
  <motion.div
    className={className}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export const AppShellSkeleton = memo(() => (
  <SkeletonFade className="min-h-screen bg-white">
    <header className="fixed inset-x-0 top-0 z-[90] border-b border-blue-50 bg-white/90 px-[5%] backdrop-blur">
      <div className="mx-auto flex h-[74px] max-w-[1280px] items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <SkeletonBlock className="h-11 w-11 rounded-2xl" />
          <SkeletonBlock className="h-5 w-28" />
        </div>
        <div className="hidden items-center gap-3 md:flex">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-4 w-16 rounded-full" />
          ))}
        </div>
        <SkeletonBlock className="h-11 w-32 rounded-xl" />
      </div>
    </header>
    <MarketingPageSkeleton />
  </SkeletonFade>
));

AppShellSkeleton.displayName = 'AppShellSkeleton';

export const MarketingPageSkeleton = memo(() => (
  <div className="bg-white pt-[78px]">
    <section className="relative px-[5%] py-14 lg:py-16">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[0.78fr_1.12fr]">
        <div>
          <SkeletonBlock className="mb-5 h-8 w-64 rounded-full" />
          <div className="grid max-w-[560px] gap-3">
            <SkeletonBlock className="h-12 w-full sm:h-14" />
            <SkeletonBlock className="h-12 w-[86%] sm:h-14" />
            <SkeletonBlock className="h-12 w-[76%] sm:h-14" />
          </div>
          <SkeletonText lines={3} className="mt-6 max-w-[480px]" />
          <div className="mt-7 flex flex-wrap gap-3">
            <SkeletonBlock className="h-[46px] w-36 rounded-xl" />
            <SkeletonBlock className="h-[46px] w-40 rounded-xl" />
          </div>
          <div className="mt-6 flex items-center gap-3">
            <SkeletonBlock className="h-8 w-32 rounded-full" />
            <div className="grid gap-2">
              <SkeletonBlock className="h-3 w-40" />
              <SkeletonBlock className="h-3 w-32" />
            </div>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[640px] px-[clamp(46px,7vw,86px)] pb-[clamp(36px,4.5vw,56px)] pt-2">
          <SkeletonBlock className="aspect-[1.45] w-full rounded-[26px]" />
          <SkeletonBlock className="absolute bottom-1 left-0 aspect-[0.48] w-[clamp(82px,24%,160px)] max-w-[28%] rounded-[24px]" />
        </div>
      </div>
    </section>
    <section className="border-y border-blue-100 px-[5%] py-6">
      <div className="mx-auto max-w-[1280px] rounded-[22px] border border-blue-100 p-4">
        <SkeletonBlock className="mx-auto mb-5 h-3 w-56" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-[62px] rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
    <section className="px-[5%] py-20">
      <SectionHeadingSkeleton />
      <CardGridSkeleton count={6} columns="sm:grid-cols-2 lg:grid-cols-6" />
    </section>
    <section className="px-[5%] py-20">
      <div className="mx-auto max-w-[1280px] rounded-[22px] border border-blue-100 p-6 lg:p-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeadingSkeleton align="left" />
          </div>
          <SkeletonBlock className="h-[330px] rounded-[28px]" />
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <DownloadCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  </div>
));

MarketingPageSkeleton.displayName = 'MarketingPageSkeleton';

export const SectionHeadingSkeleton = memo(({ align = 'center' }: { align?: 'left' | 'center' }) => (
  <div className={`mb-9 ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    <SkeletonBlock className={`${align === 'center' ? 'mx-auto' : ''} mb-3 h-3 w-28`} />
    <SkeletonBlock className={`${align === 'center' ? 'mx-auto' : ''} h-9 max-w-3xl`} />
    <SkeletonText lines={2} className={`${align === 'center' ? 'mx-auto' : ''} mt-4 max-w-[660px]`} />
  </div>
));

SectionHeadingSkeleton.displayName = 'SectionHeadingSkeleton';

export const CardGridSkeleton = memo(({ count = 6, columns = 'md:grid-cols-2 lg:grid-cols-3' }: { count?: number; columns?: string }) => (
  <div className={`mx-auto grid max-w-[1280px] gap-6 ${columns}`}>
    {Array.from({ length: count }).map((_, index) => (
      <FeatureCardSkeleton key={index} />
    ))}
  </div>
));

CardGridSkeleton.displayName = 'CardGridSkeleton';

export const FeatureCardSkeleton = memo(() => (
  <article className="flex min-h-[210px] flex-col items-center rounded-[18px] border border-blue-100 bg-white/90 p-6 text-center shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
    <SkeletonBlock className="mb-4 h-12 w-12 rounded-xl" />
    <SkeletonBlock className="h-4 w-28" />
    <SkeletonText lines={3} className="mt-4 w-full" />
  </article>
));

FeatureCardSkeleton.displayName = 'FeatureCardSkeleton';

export const DownloadCardSkeleton = memo(() => (
  <article className="flex min-h-[260px] flex-col rounded-[18px] border border-blue-100 bg-white/95 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
    <div className="flex items-start gap-4">
      <SkeletonBlock className="h-12 w-12 shrink-0 rounded-xl" />
      <div className="w-full">
        <SkeletonBlock className="h-3 w-28" />
        <SkeletonBlock className="mt-3 h-5 w-44" />
      </div>
    </div>
    <SkeletonText lines={3} className="mt-5 flex-1" />
    <SkeletonBlock className="mt-5 h-3 w-24" />
    <SkeletonBlock className="mt-5 h-11 w-full rounded-xl" />
  </article>
));

DownloadCardSkeleton.displayName = 'DownloadCardSkeleton';

export const DashboardSkeleton = memo(() => (
  <SkeletonFade className="grid gap-6">
    <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 md:flex-row md:items-center">
      <div className="w-full max-w-xl">
        <SkeletonBlock className="h-8 w-64" />
        <SkeletonText lines={2} className="mt-4 max-w-md" />
      </div>
      <div className="flex gap-3">
        <SkeletonBlock className="h-10 w-32 rounded-lg" />
        <SkeletonBlock className="h-10 w-36 rounded-lg" />
      </div>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <MetricCardSkeleton key={index} />
      ))}
    </div>
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(340px,1fr)]">
      <ChartSkeleton />
      <ChartSkeleton compact />
    </div>
    <div className="grid gap-4 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <PanelSkeleton key={index} />
      ))}
    </div>
    <ListSkeleton rows={5} />
  </SkeletonFade>
));

DashboardSkeleton.displayName = 'DashboardSkeleton';

export const MetricCardSkeleton = memo(() => (
  <article className="min-h-[112px] rounded-xl border border-slate-200 bg-white p-5">
    <div className="flex items-start justify-between gap-4">
      <SkeletonBlock className="h-4 w-28" />
      <SkeletonBlock className="h-9 w-9 rounded-lg" />
    </div>
    <SkeletonBlock className="mt-5 h-8 w-24" />
    <SkeletonBlock className="mt-4 h-3 w-36" />
  </article>
));

MetricCardSkeleton.displayName = 'MetricCardSkeleton';

export const ChartSkeleton = memo(({ compact = false }: { compact?: boolean }) => (
  <article className="h-[340px] rounded-xl border border-slate-200 bg-white p-5">
    <div className="flex items-start justify-between gap-4">
      <div>
        <SkeletonBlock className="h-5 w-36" />
        <SkeletonBlock className="mt-3 h-3 w-56" />
      </div>
      <SkeletonBlock className="h-8 w-40 rounded-lg" />
    </div>
    <div className="mt-8 flex h-[230px] items-end gap-3">
      {Array.from({ length: compact ? 7 : 12 }).map((_, index) => (
        <SkeletonBlock
          key={index}
          className="w-full rounded-t-lg"
          style={{ height: `${42 + ((index * 19) % 58)}%` } as React.CSSProperties}
        />
      ))}
    </div>
  </article>
));

ChartSkeleton.displayName = 'ChartSkeleton';

export const PanelSkeleton = memo(() => (
  <article className="min-h-[230px] rounded-xl border border-slate-200 bg-white p-5">
    <div className="flex items-center justify-between gap-4">
      <SkeletonBlock className="h-5 w-40" />
      <SkeletonBlock className="h-4 w-16" />
    </div>
    <div className="mt-6 grid gap-5">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index}>
          <div className="mb-2 flex justify-between">
            <SkeletonBlock className="h-3 w-24" />
            <SkeletonBlock className="h-3 w-12" />
          </div>
          <SkeletonBlock className="h-2 w-full rounded-full" />
        </div>
      ))}
    </div>
  </article>
));

PanelSkeleton.displayName = 'PanelSkeleton';

export const ListSkeleton = memo(({ rows = 8 }: { rows?: number }) => (
  <article className="rounded-xl border border-slate-200 bg-white p-5">
    <div className="mb-5 flex items-center justify-between gap-4">
      <SkeletonBlock className="h-5 w-48" />
      <SkeletonBlock className="h-9 w-28 rounded-lg" />
    </div>
    <div className="divide-y divide-slate-100">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="grid min-h-[72px] grid-cols-[44px_minmax(0,1fr)_88px] items-center gap-4 py-4">
          <SkeletonBlock className="h-11 w-11 rounded-xl" />
          <div>
            <SkeletonBlock className="h-4 w-48 max-w-full" />
            <SkeletonBlock className="mt-3 h-3 w-72 max-w-full" />
          </div>
          <SkeletonBlock className="h-7 w-20 rounded-full" />
        </div>
      ))}
    </div>
  </article>
));

ListSkeleton.displayName = 'ListSkeleton';

export const TableSkeleton = memo(({ rows = 8, columns = 5 }: { rows?: number; columns?: number }) => (
  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
    <div className="grid gap-4 border-b border-slate-100 bg-slate-50 p-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {Array.from({ length: columns }).map((_, index) => (
        <SkeletonBlock key={index} className="h-4 w-24" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, row) => (
      <div key={row} className="grid min-h-[64px] gap-4 border-b border-slate-100 p-4 last:border-b-0" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {Array.from({ length: columns }).map((_, column) => (
          <SkeletonBlock key={column} className="h-4 w-full" />
        ))}
      </div>
    ))}
  </div>
));

TableSkeleton.displayName = 'TableSkeleton';
