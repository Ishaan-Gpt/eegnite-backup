import { motion } from 'framer-motion';
import { Hero } from '@/components/Hero';
import { ServiceCard } from '@/components/ServiceCard';
import { TestimonialSlider } from '@/components/TestimonialSlider';
import { CTASection } from '@/components/CTASection';
import { InteractiveTools } from '@/components/InteractiveTools';
import { services } from '@/data/services';
import { Zap, Target, Users, TrendingUp } from 'lucide-react';

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Services Section */}
      <section className="py-24 bg-background">
        <div className="canvas-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-clash font-bold text-foreground mb-6">
              Strategic Services That <span className="text-primary">Drive Results</span>
            </h2>
            <p className="text-lg text-muted-foreground font-satoshi max-w-3xl mx-auto">
              We don't believe in one-size-fits-all solutions. Each service is tailored to your specific business goals and market dynamics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

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

      {/* Interactive Tools */}
      <InteractiveTools />

      {/* Testimonials */}
      <TestimonialSlider />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default Index;
