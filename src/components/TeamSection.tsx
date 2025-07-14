import { motion } from 'framer-motion';
import { AnimatedSlideshow } from '@/components/ui/animated-slideshow';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const teamMembers = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'CEO & Growth Strategist',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b332a34f?w=400&h=400&fit=crop&crop=face',
    bio: 'With 10+ years in digital marketing, Sarah has led growth initiatives for Fortune 500 companies, specializing in data-driven strategies that deliver measurable results.',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    role: 'Head of Performance Marketing',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Marcus specializes in PPC campaigns and conversion optimization, having managed over $50M in ad spend with an average ROAS of 4.2x across various industries.',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  {
    id: '3',
    name: 'Emily Johnson',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bio: 'Emily brings creative vision to life through compelling campaigns. Her work has won multiple industry awards and consistently drives engagement rates 3x above industry average.',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Analytics & Insights Lead',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'David transforms complex data into actionable insights. His analytics frameworks have helped clients increase ROI by an average of 180% within the first year.',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    role: 'Content Strategy Manager',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    bio: 'Lisa crafts content strategies that resonate with target audiences. Her campaigns have generated over 100M impressions and consistently achieve 5x higher engagement than industry benchmarks.',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  }
];

export function TeamSection() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,88,0,0.1)_0%,transparent_50%)]" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-satoshi font-medium mb-4">
            Meet Our Team
          </div>
          <h2 className="text-3xl lg:text-5xl font-clash font-bold text-foreground mb-6">
            The Growth Experts Behind 
            <span className="bg-gradient-orange bg-clip-text text-transparent"> Your Success</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground font-satoshi max-w-3xl mx-auto">
            Our team of seasoned professionals brings decades of combined experience in digital marketing, 
            data analytics, and growth strategy to drive your business forward.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <AnimatedSlideshow 
            items={teamMembers}
            autoPlay={true}
            interval={6000}
            showControls={true}
            className="max-w-4xl mx-auto"
          />
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-4xl font-clash font-bold text-primary mb-2">50+</div>
            <p className="text-muted-foreground font-satoshi">Years Combined Experience</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-clash font-bold text-primary mb-2">200+</div>
            <p className="text-muted-foreground font-satoshi">Successful Campaigns</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-clash font-bold text-primary mb-2">$100M+</div>
            <p className="text-muted-foreground font-satoshi">Revenue Generated</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}