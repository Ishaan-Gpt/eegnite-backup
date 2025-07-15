import { motion } from 'framer-motion';
import { Check, ArrowRight, Star, Zap, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { services } from '@/data/services';
import { ServiceCard } from '@/components/ServiceCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { CTASection } from '@/components/CTASection';
import { ServicesGrid } from '@/components/ServicesGrid';

const processSteps = [
  {
    step: '01',
    title: 'Growth Audit',
    description: 'Deep dive analysis of your current marketing performance and growth potential'
  },
  {
    step: '02', 
    title: 'Strategy Development',
    description: 'Custom growth roadmap with clear KPIs and milestone targets'
  },
  {
    step: '03',
    title: 'Implementation',
    description: 'Launch optimized campaigns across your highest-impact channels'
  },
  {
    step: '04',
    title: 'Optimization',
    description: 'Continuous testing and refinement to maximize your ROI'
  }
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services | EEGNITE</title>
        <meta name="description" content="Explore EEGNITE's full suite of digital marketing, analytics, and growth services." />
        <meta property="og:title" content="Services | EEGNITE" />
        <meta property="og:description" content="Explore EEGNITE's full suite of digital marketing, analytics, and growth services." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-16 lg:pb-24 bg-gradient-subtle">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl lg:text-6xl font-clash font-bold text-foreground mb-6">
                Growth Services That <span className="text-primary">Actually Work</span>
              </h1>
              <p className="text-xl text-muted-foreground font-satoshi leading-relaxed mb-8">
                Stop throwing money at marketing tactics that don't scale. Get a proven growth system 
                that turns your business into a revenue-generating machine.
              </p>
              <Button asChild className="bg-gradient-orange hover:bg-gradient-orange/90 text-primary-foreground font-clash font-semibold text-lg px-8 py-4">
                <Link to="/contact">
                  Get Your Growth Plan
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Services Grid Section (unified with landing page) */}
        <ServicesGrid />

        {/* Client Logos/Brands Carousel Section */}
        {/* REMOVED: Client Logos/Brands Carousel and 'As Featured In' sections for a cleaner, more focused Services page. */}

        {/* Process Section (unified with landing page) */}
        <section className="py-16 lg:py-24 bg-gradient-subtle">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-clash font-bold text-foreground mb-6">
                Our Proven <span className="text-primary">Growth Process</span>
              </h2>
              <p className="text-lg text-muted-foreground font-satoshi max-w-3xl mx-auto">
                A systematic approach to digital marketing that has generated over $50M in revenue for our clients.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center relative"
                >
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent transform translate-x-4" />
                  )}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-orange text-primary-foreground flex items-center justify-center font-clash font-bold text-xl mx-auto mb-4 shadow-orange">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-clash font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground font-satoshi leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-clash font-bold text-foreground mb-6">
                Investment Options for <span className="text-primary">Every Stage</span>
              </h2>
              <p className="text-lg text-muted-foreground font-satoshi max-w-3xl mx-auto">
                Choose the growth package that matches your business stage and ambitions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* The pricing tiers are removed, so this section is now empty */}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription (unified with Resources page) */}
        {/* Import and use the same newsletter subscription form/logic as Resources page here */}
        {/* <NewsletterForm /> or inline newsletter code from Resources page */}

        {/* CTA Section (shared with landing page) */}
        <CTASection />
      </div>
    </>
  );
};

export default Services;