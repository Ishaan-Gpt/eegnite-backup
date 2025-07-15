import { motion } from 'framer-motion';
import { Award, Users, Target, Zap, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { companyStats } from '@/data/companyStats';
import { EegniteTimeline } from '@/components/EegniteTimeline';
import { TeamSection } from '@/components/TeamSection';
import Testimonials from '@/components/ui/testimonials-columns-1';

const founderStory = {
  name: "Alex Chen",
  title: "Founder & Chief Growth Officer",
  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=600&fit=crop&crop=face",
  story: "After scaling 3 startups from zero to 8-figures, I discovered the exact growth framework that separates industry leaders from everyone else. EEGNITE was born from one mission: democratize enterprise-level growth strategies for ambitious businesses."
};

const certifications = [
  "Google Ads Premier Partner",
  "Facebook Marketing Partner", 
  "HubSpot Diamond Partner",
  "Google Analytics Certified"
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About | EEGNITE</title>
        <meta name="description" content="Learn about EEGNITE's mission, team, and expertise in digital marketing and growth strategy." />
        <meta property="og:title" content="About | EEGNITE" />
        <meta property="og:description" content="Learn about EEGNITE's mission, team, and expertise in digital marketing and growth strategy." />
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
                Built by Growth <span className="text-primary">Obsessed</span> Entrepreneurs
              </h1>
              <p className="text-xl text-muted-foreground font-satoshi leading-relaxed">
                We're not just another marketing agency. We're growth partners who've been in your shoes, 
                built successful companies, and cracked the code on scalable growth systems.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Founder Story */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <img 
                    src={founderStory.image} 
                    alt={founderStory.name}
                    className="w-full h-[500px] object-cover rounded-2xl shadow-elegant"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-orange">
                    <Award className="w-8 h-8" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl lg:text-4xl font-clash font-bold text-foreground mb-4">
                    Meet Your Growth Partner
                  </h2>
                  <h3 className="text-xl font-clash font-semibold text-primary mb-2">
                    {founderStory.name}
                  </h3>
                  <p className="text-lg text-muted-foreground font-satoshi mb-6">
                    {founderStory.title}
                  </p>
                </div>
                
                <p className="text-lg text-muted-foreground font-satoshi leading-relaxed">
                  {founderStory.story}
                </p>
                
                <Button asChild className="bg-gradient-orange hover:bg-gradient-orange/90 text-primary-foreground font-clash font-semibold">
                  <Link to="/contact">
                    Book a Strategy Call
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-5xl font-clash font-bold text-foreground mb-6">
                Proven Track Record of <span className="text-primary">Success</span>
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {companyStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl lg:text-5xl font-clash font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-satoshi">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section (shared with landing page) */}
        <TeamSection />

        {/* Certifications */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-clash font-bold text-foreground mb-6">
                Certified & <span className="text-primary">Trusted</span>
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-elegant transition-shadow duration-300"
                >
                  <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="font-satoshi font-medium text-foreground">
                    {cert}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Timeline Section (duplicated from landing page) */}
        <EegniteTimeline />

        {/* Testimonials Section (shared with landing page) */}
        <Testimonials />

        {/* Newsletter Subscription (unified with Resources page) */}
        {/* Import and use the same newsletter subscription form/logic as Resources page here */}
        {/* <NewsletterForm /> or inline newsletter code from Resources page */}
      </div>
    </>
  );
};

export default About;