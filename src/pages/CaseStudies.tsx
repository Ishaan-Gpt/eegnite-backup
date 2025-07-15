import { motion } from 'framer-motion';
import { useState } from 'react';
import { Filter, ArrowRight, ExternalLink, TrendingUp, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Helmet } from "react-helmet-async";

const industries = ['All', 'E-commerce', 'SaaS', 'Healthcare', 'Finance', 'Education'];

const caseStudies = [
  {
    id: 1,
    title: 'TechFlow SaaS',
    industry: 'SaaS',
    challenge: 'Low conversion rates and high customer acquisition costs',
    solution: 'Implemented conversion optimization and targeted ad campaigns',
    results: {
      revenue: '+340%',
      conversions: '+156%',
      roas: '4.8x',
      timeline: '6 months'
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    featured: true,
    metrics: [
      { label: 'Revenue Growth', value: '340%', icon: TrendingUp },
      { label: 'Conversion Rate', value: '156%', icon: Target },
      { label: 'ROAS', value: '4.8x', icon: Zap }
    ],
    description: 'TechFlow was struggling with low conversion rates despite having a solid product. We redesigned their entire funnel, implemented advanced tracking, and launched targeted campaigns that resulted in explosive growth.'
  },
  {
    id: 2,
    title: 'EcoShop Marketplace',
    industry: 'E-commerce',
    challenge: 'Seasonal sales fluctuations and low customer lifetime value',
    solution: 'Year-round marketing strategy with email automation and retention campaigns',
    results: {
      revenue: '+280%',
      conversions: '+120%',
      roas: '5.2x',
      timeline: '8 months'
    },
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
    featured: false,
    metrics: [
      { label: 'Revenue Growth', value: '280%', icon: TrendingUp },
      { label: 'Customer LTV', value: '120%', icon: Target },
      { label: 'ROAS', value: '5.2x', icon: Zap }
    ],
    description: 'EcoShop needed to break free from seasonal dependency. Our comprehensive strategy included email marketing, retargeting campaigns, and customer retention programs that transformed their business model.'
  },
  {
    id: 3,
    title: 'MedTech Innovations',
    industry: 'Healthcare',
    challenge: 'Complex sales cycle and difficulty reaching decision makers',
    solution: 'LinkedIn advertising and content marketing strategy for B2B lead generation',
    results: {
      revenue: '+420%',
      conversions: '+200%',
      roas: '6.1x',
      timeline: '10 months'
    },
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
    featured: true,
    metrics: [
      { label: 'Revenue Growth', value: '420%', icon: TrendingUp },
      { label: 'Lead Quality', value: '200%', icon: Target },
      { label: 'ROAS', value: '6.1x', icon: Zap }
    ],
    description: 'MedTech faced challenges in B2B healthcare sales. We developed a sophisticated LinkedIn strategy combined with thought leadership content that positioned them as industry experts and generated high-quality leads.'
  },
  {
    id: 4,
    title: 'FinanceFlow App',
    industry: 'Finance',
    challenge: 'Low app downloads and user acquisition in competitive market',
    solution: 'Mobile-first advertising strategy with ASO optimization',
    results: {
      revenue: '+250%',
      conversions: '+180%',
      roas: '4.2x',
      timeline: '5 months'
    },
    image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=600&h=400&fit=crop',
    featured: false,
    metrics: [
      { label: 'App Downloads', value: '250%', icon: TrendingUp },
      { label: 'User Acquisition', value: '180%', icon: Target },
      { label: 'ROAS', value: '4.2x', icon: Zap }
    ],
    description: 'FinanceFlow needed to stand out in the crowded fintech space. Our mobile-first approach combined with App Store Optimization and targeted campaigns delivered exceptional user acquisition results.'
  },
  {
    id: 5,
    title: 'EduPlatform Online',
    industry: 'Education',
    challenge: 'Low course enrollment and high student acquisition costs',
    solution: 'Content marketing and social proof strategy with automated funnels',
    results: {
      revenue: '+380%',
      conversions: '+165%',
      roas: '5.5x',
      timeline: '7 months'
    },
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop',
    featured: false,
    metrics: [
      { label: 'Course Sales', value: '380%', icon: TrendingUp },
      { label: 'Enrollment Rate', value: '165%', icon: Target },
      { label: 'ROAS', value: '5.5x', icon: Zap }
    ],
    description: 'EduPlatform needed to scale their online course business. We built a comprehensive content strategy with social proof elements and automated funnels that dramatically increased enrollment and revenue.'
  },
  {
    id: 6,
    title: 'RetailMax Chain',
    industry: 'E-commerce',
    challenge: 'Declining foot traffic and need for omnichannel presence',
    solution: 'Integrated online-offline marketing strategy with local SEO',
    results: {
      revenue: '+310%',
      conversions: '+140%',
      roas: '4.9x',
      timeline: '9 months'
    },
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
    featured: false,
    metrics: [
      { label: 'Online Revenue', value: '310%', icon: TrendingUp },
      { label: 'Store Visits', value: '140%', icon: Target },
      { label: 'ROAS', value: '4.9x', icon: Zap }
    ],
    description: 'RetailMax needed to bridge online and offline experiences. Our omnichannel strategy combined local SEO, Google Ads, and in-store promotions to create a seamless customer journey.'
  }
];

const CaseStudies = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  
  const filteredCaseStudies = selectedIndustry === 'All' 
    ? caseStudies 
    : caseStudies.filter(study => study.industry === selectedIndustry);

  const featuredStudies = caseStudies.filter(study => study.featured);

  return (
    <>
      <Helmet>
        <title>Case Studies | EEGNITE</title>
        <meta name="description" content="See real-world results from EEGNITE's digital marketing and growth strategies in our case studies." />
        <meta property="og:title" content="Case Studies | EEGNITE" />
        <meta property="og:description" content="See real-world results from EEGNITE's digital marketing and growth strategies in our case studies." />
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
                Real Results from <span className="text-primary">Real Businesses</span>
              </h1>
              <p className="text-xl text-muted-foreground font-satoshi leading-relaxed">
                See how we've helped companies across industries achieve breakthrough growth 
                with our proven strategies and systems.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Case Studies */}
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
                Featured <span className="text-primary">Success Stories</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {featuredStudies.slice(0, 2).map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-elegant transition-shadow duration-300"
                >
                  <img 
                    src={study.image} 
                    alt={study.title}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary" className="font-satoshi">
                        {study.industry}
                      </Badge>
                      <Badge className="bg-gradient-orange text-primary-foreground font-satoshi">
                        Featured
                      </Badge>
                    </div>
                    
                    <h3 className="text-2xl font-clash font-bold text-foreground mb-4">
                      {study.title}
                    </h3>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {study.metrics.map((metric, metricIndex) => {
                        const IconComponent = metric.icon;
                        return (
                          <div key={metricIndex} className="text-center">
                            <IconComponent className="w-6 h-6 text-primary mx-auto mb-2" />
                            <div className="text-2xl font-clash font-bold text-primary">
                              {metric.value}
                            </div>
                            <div className="text-sm text-muted-foreground font-satoshi">
                              {metric.label}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-gradient-orange hover:bg-gradient-orange/90 text-primary-foreground font-clash font-semibold">
                          View Full Case Study
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-clash font-bold">
                            {study.title} - Case Study
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          <img 
                            src={study.image} 
                            alt={study.title}
                            className="w-full h-64 object-cover rounded-lg"
                            loading="lazy"
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-clash font-semibold text-lg mb-2">Challenge</h4>
                              <p className="text-muted-foreground font-satoshi">{study.challenge}</p>
                            </div>
                            <div>
                              <h4 className="font-clash font-semibold text-lg mb-2">Solution</h4>
                              <p className="text-muted-foreground font-satoshi">{study.solution}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-clash font-semibold text-lg mb-4">Results</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div className="text-center p-4 bg-gradient-subtle rounded-lg">
                                <div className="text-2xl font-clash font-bold text-primary">
                                  {study.results.revenue}
                                </div>
                                <div className="text-sm text-muted-foreground">Revenue Growth</div>
                              </div>
                              <div className="text-center p-4 bg-gradient-subtle rounded-lg">
                                <div className="text-2xl font-clash font-bold text-primary">
                                  {study.results.conversions}
                                </div>
                                <div className="text-sm text-muted-foreground">Conversions</div>
                              </div>
                              <div className="text-center p-4 bg-gradient-subtle rounded-lg">
                                <div className="text-2xl font-clash font-bold text-primary">
                                  {study.results.roas}
                                </div>
                                <div className="text-sm text-muted-foreground">ROAS</div>
                              </div>
                              <div className="text-center p-4 bg-gradient-subtle rounded-lg">
                                <div className="text-2xl font-clash font-bold text-primary">
                                  {study.results.timeline}
                                </div>
                                <div className="text-sm text-muted-foreground">Timeline</div>
                              </div>
                            </div>
                            <p className="text-muted-foreground font-satoshi">{study.description}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* All Case Studies */}
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
                All <span className="text-primary">Case Studies</span>
              </h2>
              
              {/* Industry Filter */}
              <div className="flex flex-wrap justify-center gap-2 mt-8">
                {industries.map((industry) => (
                  <Button
                    key={industry}
                    variant={selectedIndustry === industry ? "default" : "outline"}
                    onClick={() => setSelectedIndustry(industry)}
                    className={`font-satoshi ${
                      selectedIndustry === industry 
                        ? 'bg-gradient-orange text-primary-foreground' 
                        : ''
                    }`}
                  >
                    {industry}
                  </Button>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCaseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-elegant transition-shadow duration-300"
                >
                  <img 
                    src={study.image} 
                    alt={study.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="font-satoshi">
                        {study.industry}
                      </Badge>
                      {study.featured && (
                        <Badge className="bg-gradient-orange text-primary-foreground font-satoshi">
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-clash font-bold text-foreground mb-3">
                      {study.title}
                    </h3>
                    
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-clash font-bold text-primary">
                          {study.results.revenue}
                        </div>
                        <div className="text-xs text-muted-foreground font-satoshi">
                          Revenue
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-clash font-bold text-primary">
                          {study.results.conversions}
                        </div>
                        <div className="text-xs text-muted-foreground font-satoshi">
                          Conversions
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-clash font-bold text-primary">
                          {study.results.roas}
                        </div>
                        <div className="text-xs text-muted-foreground font-satoshi">
                          ROAS
                        </div>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full font-satoshi">
                          View Details
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-clash font-bold">
                            {study.title} - Case Study
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          <img 
                            src={study.image} 
                            alt={study.title}
                            className="w-full h-64 object-cover rounded-lg"
                            loading="lazy"
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-clash font-semibold text-lg mb-2">Challenge</h4>
                              <p className="text-muted-foreground font-satoshi">{study.challenge}</p>
                            </div>
                            <div>
                              <h4 className="font-clash font-semibold text-lg mb-2">Solution</h4>
                              <p className="text-muted-foreground font-satoshi">{study.solution}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-clash font-semibold text-lg mb-4">Results</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div className="text-center p-4 bg-gradient-subtle rounded-lg">
                                <div className="text-2xl font-clash font-bold text-primary">
                                  {study.results.revenue}
                                </div>
                                <div className="text-sm text-muted-foreground">Revenue Growth</div>
                              </div>
                              <div className="text-center p-4 bg-gradient-subtle rounded-lg">
                                <div className="text-2xl font-clash font-bold text-primary">
                                  {study.results.conversions}
                                </div>
                                <div className="text-sm text-muted-foreground">Conversions</div>
                              </div>
                              <div className="text-center p-4 bg-gradient-subtle rounded-lg">
                                <div className="text-2xl font-clash font-bold text-primary">
                                  {study.results.roas}
                                </div>
                                <div className="text-sm text-muted-foreground">ROAS</div>
                              </div>
                              <div className="text-center p-4 bg-gradient-subtle rounded-lg">
                                <div className="text-2xl font-clash font-bold text-primary">
                                  {study.results.timeline}
                                </div>
                                <div className="text-sm text-muted-foreground">Timeline</div>
                              </div>
                            </div>
                            <p className="text-muted-foreground font-satoshi">{study.description}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl lg:text-5xl font-clash font-bold text-foreground mb-6">
                Ready to Be Our <span className="text-primary">Next Success Story?</span>
              </h2>
              <p className="text-lg text-muted-foreground font-satoshi max-w-2xl mx-auto mb-8">
                Let's discuss how we can achieve similar results for your business.
              </p>
              <Button className="bg-gradient-orange hover:bg-gradient-orange/90 text-primary-foreground font-clash font-semibold text-lg px-8 py-4">
                Start Your Growth Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CaseStudies;