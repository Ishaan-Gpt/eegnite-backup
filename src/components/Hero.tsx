import { motion } from 'framer-motion';
import { ArrowRight, Play, TrendingUp, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Revenue Generated', value: '$50M+', icon: TrendingUp },
  { label: 'Clients Served', value: '200+', icon: Users },
  { label: 'Average ROI', value: '340%', icon: Zap },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
      {/* Advanced Background Elements */}
      <div className="absolute inset-0">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_30%_20%,hsl(var(--eegnite-orange)/0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_70%_80%,hsl(var(--eegnite-orange)/0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_60%,hsl(var(--eegnite-orange-light)/0.06)_0%,transparent_40%)]" />
        
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E")' }} />
      </div>
      
      {/* Floating Glass Elements */}
      <motion.div
        className="absolute top-24 left-16 w-4 h-4 rounded-full glass"
        animate={{
          y: [0, -25, 0],
          rotate: [0, 180, 360],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-32 right-24 w-3 h-3 rounded-full"
        style={{ background: 'var(--gradient-orange-glow)' }}
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-32 left-12 w-2 h-2 rounded-full bg-primary/60"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-1/2 right-8 w-6 h-6 rounded-full glass-strong"
        animate={{
          y: [0, -30, 0],
          rotate: [0, -180, -360],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <div className="canvas-wide text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-flex items-center px-6 py-3 rounded-full glass mb-10 hover-lift group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-inter font-medium text-foreground/90">
                Trusted by 200+ Growing Businesses
              </span>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="w-1 h-1 bg-primary rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Powerful Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl font-clash font-bold leading-[0.9] mb-8"
          >
            <span className="text-foreground block">Stop Chasing</span>
            <span className="gradient-text block">Start Converting</span>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-foreground/80 text-3xl md:text-4xl lg:text-5xl font-medium block mt-4"
            >
              Like Never Before
            </motion.span>
          </motion.h1>

          {/* Compelling Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 font-inter leading-relaxed"
          >
            We don't just run campaigns—we architect <span className="text-primary font-semibold">growth systems</span> that turn your 
            biggest marketing challenges into <span className="text-foreground font-semibold">competitive advantages</span>.
          </motion.p>

          {/* Premium CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
          >
            <Button 
              asChild 
              size="lg" 
              className="neumorphism hover-glow px-8 py-4 text-lg font-inter font-semibold rounded-2xl group transition-all duration-300"
              style={{ background: 'var(--gradient-orange)' }}
            >
              <Link to="/contact" className="flex items-center space-x-3">
                <span>Get Your Growth Plan</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="glass hover-lift px-8 py-4 text-lg font-inter font-medium rounded-2xl border-2 border-foreground/20">
              <Link to="/case-studies" className="flex items-center space-x-3">
                <Play className="w-5 h-5" />
                <span>View Success Stories</span>
              </Link>
            </Button>
          </motion.div>

          {/* Premium Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 + index * 0.15 }}
                  className="neumorphism hover-lift p-8 rounded-3xl text-center group cursor-pointer"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-2xl glass-strong group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl lg:text-4xl font-clash font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <p className="text-muted-foreground font-inter text-sm font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}