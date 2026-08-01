import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Modules } from './components/Modules';
import { Downloads } from './components/Downloads';
import { Pricing } from './components/Pricing';
import { WhyChoose } from './components/WhyChoose';
import { Contact } from './components/Contact';
import { Testimonials } from './components/Testimonials';
import { FloatingSupport, ProfessionalSections } from './components/ProfessionalSections';
import { Footer } from './components/Footer';
import { BackToTop, CursorGlow, PageLoader } from './components/animation';
import { MarketingPageSkeleton } from './components/Skeleton';
import { config } from './config';
import { AboutPage, ContactPage, FeaturesPage, LegalPage, ModulesPage, PricingPage, SupportPage } from './pages';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [path, setPath] = useState(() => window.location.pathname);
  const [activeSection, setActiveSection] = useState('home');
  const [routeLoading, setRouteLoading] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark');
    localStorage.setItem('gymsetu-dark', 'false');
  }, [darkMode]);

  // Dynamically set SEO parameters in header
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': config.seo.metaTitle,
      '/features': 'Features - GymSetu',
      '/modules': 'Modules - GymSetu',
      '/pricing': 'Pricing - GymSetu',
      '/about': 'About - GymSetu',
      '/contact': 'Contact - GymSetu',
      '/support': 'Support - GymSetu',
      '/privacy-policy': 'Privacy Policy - GymSetu',
      '/terms-and-conditions': 'Terms & Conditions - GymSetu',
      '/refund-policy': 'Refund Policy - GymSetu',
      '/cancellation-policy': 'Cancellation Policy - GymSetu',
      '/cookie-policy': 'Cookie Policy - GymSetu',
      '/blog': 'Blog - GymSetu',
      '/careers': 'Careers - GymSetu',
    };
    document.title = titles[path] || config.seo.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', config.seo.metaDescription);
    }
    const setMeta = (selector: string, attr: string, value: string) => {
      const node = document.querySelector(selector);
      if (node) node.setAttribute(attr, value);
    };
    setMeta('meta[property="og:title"]', 'content', config.seo.metaTitle);
    setMeta('meta[property="og:description"]', 'content', config.seo.metaDescription);
    setMeta('meta[name="twitter:title"]', 'content', document.title);
    setMeta('meta[name="twitter:description"]', 'content', config.seo.metaDescription);
  }, [path]);

  useEffect(() => {
    const onNavigate = () => {
      setRouteLoading(true);
      setPath(window.location.pathname);
      if (window.location.hash) {
        window.setTimeout(() => document.querySelector(window.location.hash)?.scrollIntoView({ behavior: 'smooth' }), 40);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', onNavigate);
    window.addEventListener('gymsetu:navigate', onNavigate);
    return () => {
      window.removeEventListener('popstate', onNavigate);
      window.removeEventListener('gymsetu:navigate', onNavigate);
    };
  }, []);

  useEffect(() => {
    if (!routeLoading) return;
    const timer = window.setTimeout(() => setRouteLoading(false), reduceMotion ? 50 : 240);
    return () => window.clearTimeout(timer);
  }, [path, reduceMotion, routeLoading]);

  useEffect(() => {
    if (path !== '/') return;
    const ids = ['home', 'features', 'modules', 'apps', 'pricing', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { threshold: [0.24, 0.38, 0.55], rootMargin: '-90px 0px -45% 0px' },
    );
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [path]);

  const renderPage = () => {
    switch (path) {
      case '/features':
        return <FeaturesPage />;
      case '/modules':
        return <ModulesPage />;
      case '/pricing':
        return <PricingPage />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      case '/privacy-policy':
      case '/terms-and-conditions':
      case '/refund-policy':
      case '/cancellation-policy':
      case '/cookie-policy':
      case '/blog':
      case '/careers':
        return <LegalPage path={path} />;
      case '/support':
        return <SupportPage />;
      default:
        return (
          <>
            <Hero />
            <Features />
            <Modules />
            <Downloads />
            <Pricing />
            <Testimonials />
            <ProfessionalSections />
            <WhyChoose />
            <Contact variant="section" />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#07121f] transition-colors duration-300 font-sans antialiased">
      <PageLoader />
      <CursorGlow />
      <Navbar darkMode={false} setDarkMode={() => setDarkMode(false)} currentPath={path} activeSection={activeSection} />
      <main>
        <AnimatePresence mode="wait" initial={false}>
          {routeLoading ? (
            <MarketingPageSkeleton key={`loading-${path}`} />
          ) : (
            <motion.div
              key={path}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderPage()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
      <FloatingSupport />
    </div>
  );
}

export default App;
