import { motion } from 'framer-motion';
import { Check, ArrowRight, Star, Zap, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";

const serviceCategories = [
  {
    id: 'performance',
    title: 'Performance Marketing',
    description: 'Data-driven campaigns that maximize ROI',
    icon: TrendingUp,
    color: 'text-primary'
  },
  {
    id: 'strategy',
    title: 'Growth Strategy',
    description: 'Comprehensive roadmaps for sustainable growth',
    icon: Target,
    color: 'text-blue-500'
  },
  {
    id: 'optimization',
    title: 'Conversion Optimization',
    description: 'Turn more visitors into customers',
    icon: Zap,
    color: 'text-green-500'
  }
];

const pricingTiers = [
  {
    name: 'Startup',
    price: '$2,500',
    period: '/month',
    description: 'Perfect for early-stage companies ready to scale',
    features: [
      'Google Ads Management',
      'Facebook & Instagram Ads',
      'Landing Page Optimization',
      'Monthly Strategy Sessions',
      'Performance Reporting',
      'Email Marketing Setup'
    ],
    popular: false,
    cta: 'Start Growing'
  },
  {
    name: 'Scale',
    price: '$5,000',
    period: '/month',
    description: 'For growing businesses ready to dominate their market',
    features: [
      'Everything in Startup',
      'Advanced Attribution Modeling',
      'Custom Conversion Tracking',
      'A/B Testing Framework',
      'LinkedIn Advertising',
      'SEO Optimization',
      'Weekly Strategy Calls',
      'Dedicated Account Manager'
    ],
    popular: true,
    cta: 'Scale Your Business'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Comprehensive growth solutions for established companies',
    features: [
      'Everything in Scale',
      'Custom Growth Stack',
      'Advanced Analytics Setup',
      'Marketing Automation',
      'Sales Funnel Optimization',
      'Team Training & Support',
      'Priority Support',
      'Quarterly Business Reviews'
    ],
    popular: false,
    cta: 'Get Custom Quote'
  }
];

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

        {/* Service Categories */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <Tabs defaultValue="performance" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-16">
                {serviceCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <IconComponent className="w-5 h-5 mr-2" />
                      {category.title}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              
              {serviceCategories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl lg:text-5xl font-clash font-bold text-foreground mb-4">
                      {category.title}
                    </h2>
                    <p className="text-lg text-muted-foreground font-satoshi max-w-2xl mx-auto">
                      {category.description}
                    </p>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Process */}
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
                A systematic approach that has generated over $50M in revenue for our clients.
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
              {pricingTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative bg-card border rounded-2xl p-8 ${
                    tier.popular 
                      ? 'border-primary ring-2 ring-primary/20 shadow-orange' 
                      : 'border-border hover:border-primary/50'
                  } transition-all duration-300`}
                >
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-orange text-primary-foreground font-clash font-semibold">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-clash font-bold text-foreground mb-2">
                      {tier.name}
                    </h3>
                    <div className="flex items-baseline justify-center mb-4">
                      <span className="text-4xl lg:text-5xl font-clash font-bold text-primary">
                        {tier.price}
                      </span>
                      {tier.period && (
                        <span className="text-muted-foreground font-satoshi ml-2">
                          {tier.period}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground font-satoshi">
                      {tier.description}
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-foreground font-satoshi">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    asChild
                    className={`w-full font-clash font-semibold ${
                      tier.popular 
                        ? 'bg-gradient-orange hover:bg-gradient-orange/90 text-primary-foreground' 
                        : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                    }`}
                  >
                    <Link to="/contact">
                      {tier.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-subtle">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl lg:text-5xl font-clash font-bold text-foreground mb-6">
                Ready to <span className="text-primary">Scale Your Growth?</span>
              </h2>
              <p className="text-lg text-muted-foreground font-satoshi max-w-2xl mx-auto mb-8">
                Book a free strategy session and get a custom growth roadmap for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-gradient-orange hover:bg-gradient-orange/90 text-primary-foreground font-clash font-semibold text-lg px-8 py-4">
                  <Link to="/contact">
                    Book Strategy Session
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="font-clash font-semibold text-lg px-8 py-4">
                  <Link to="/case-studies">
                    View Case Studies
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;