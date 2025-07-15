import { motion } from "framer-motion";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import Testimonials from "@/components/ui/testimonials-columns-1";
import { InteractiveTools } from "@/components/InteractiveTools";
import { services } from "@/data/services";
import { EnhancedHero } from "@/components/EnhancedHero";
import { EegniteTimeline } from "@/components/EegniteTimeline";
import { ServicesGrid } from "@/components/ServicesGrid";
import { FeaturesShowcase } from "@/components/FeaturesShowcase";
import { Zap, Target, Users, TrendingUp } from 'lucide-react';
import { TeamSection } from "@/components/TeamSection";
import { Helmet } from "react-helmet-async";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { ContactForm } from '@/components/ContactForm';

const processSteps = [
  {
    number: "01",
    title: "Discover & Analyze",
    description: "We dive deep into your business, market, and current performance to identify the biggest opportunities for growth."
  },
  {
    number: "02", 
    title: "Strategize & Plan",
    description: "Based on our analysis, we create a custom growth roadmap with clear milestones and measurable outcomes."
  },
  {
    number: "03",
    title: "Execute & Optimize", 
    description: "We implement proven strategies while continuously testing and optimizing for maximum performance."
  },
  {
    number: "04",
    title: "Scale & Grow",
    description: "As results compound, we scale successful campaigns and explore new channels to accelerate your growth."
  }
];

const Index = () => {
  return (
    <>
      <Helmet>
        <title>EEGNITE - Digital Marketing Agency</title>
        <meta name="description" content="Unlock growth with EEGNITE's data-driven digital marketing, strategy, and analytics solutions." />
        <meta property="og:title" content="EEGNITE - Digital Marketing Agency" />
        <meta property="og:description" content="Unlock growth with EEGNITE's data-driven digital marketing, strategy, and analytics solutions." />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="EEGNITE - Digital Marketing Agency" />
        <meta name="twitter:description" content="Unlock growth with EEGNITE's data-driven digital marketing, strategy, and analytics solutions." />
      </Helmet>
      <div className="min-h-screen">
        {/* Enhanced Hero Section */}
        <EnhancedHero />

        {/* Services Grid Section */}
        <ServicesGrid />

        {/* Process Section */}
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
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center relative"
                >
                  {/* Connecting Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent transform translate-x-4" />
                  )}
                  
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-orange text-primary-foreground flex items-center justify-center font-clash font-bold text-xl mx-auto mb-4 shadow-orange">
                      {step.number}
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

        {/* Features Showcase */}
        <FeaturesShowcase />

        {/* Team Section */}
        <TeamSection />

        {/* Company Timeline */}
        <EegniteTimeline />

        {/* Interactive Tools */}
        <InteractiveTools />

        {/* Testimonials */}
        <Testimonials />

        {/* Contact Form (unified with Contact page) */}
        <ContactForm />

        {/* CTA Section */}
        <CTASection />

        {/* Newsletter Subscription (unified with Resources page) */}
        {/* Import and use the same newsletter subscription form/logic as Resources page here */}
        {/* <NewsletterForm /> or inline newsletter code from Resources page */}
      </div>
    </>
  );
};

export default Index;
