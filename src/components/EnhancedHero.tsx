import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mockup } from "@/components/ui/mockup";
import { Glow } from "@/components/ui/glow";
import { Floating3D } from "@/components/ui/floating-3d";
import { ArrowRight, Play, Star, Users, TrendingUp, Award } from "lucide-react";
import { useRef, useState } from "react";
import heroMockup from "@/assets/hero-bg.jpg";

const testimonials = [
  { name: "Sarah Chen", company: "TechCorp", text: "EEGNITE transformed our growth strategy completely", rating: 5 },
  { name: "Michael Rodriguez", company: "StartupXYZ", text: "Revenue increased by 340% in 6 months", rating: 5 },
  { name: "Emily Johnson", company: "ScaleUp Inc", text: "Best marketing investment we've ever made", rating: 5 }
]

export function EnhancedHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 overflow-hidden"
      style={{ y, opacity, scale }}
    >
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-conic from-primary/10 via-transparent to-accent/5" />
      <Floating3D />
      
      {/* Animated Grid Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.02 }}
        transition={{ duration: 2 }}
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary"
            >
              <Award className="w-4 h-4" />
              <span>Award-Winning Growth Partner</span>
            </motion.div>

            {/* Main Headline with Advanced Typography */}
            <motion.div className="space-y-4">
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                <motion.span 
                  className="inline-block bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Transform
                </motion.span>
                <br />
                <motion.span 
                  className="inline-block"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Your Business
                </motion.span>
                <br />
                <motion.span 
                  className="inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Growth
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                We deliver <strong>proven marketing strategies</strong> that generate qualified leads, 
                increase revenue, and scale your business to new heights.
              </motion.p>
            </motion.div>

            {/* Social Proof Stats */}
            <motion.div 
              className="flex flex-wrap gap-6 py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              {[
                { icon: Users, value: "500+", label: "Clients Served" },
                { icon: TrendingUp, value: "340%", label: "Avg Growth" },
                { icon: Star, value: "4.9/5", label: "Client Rating" }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <Glow intensity="lg" color="primary">
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden px-8 py-4 text-base font-semibold"
                >
                  <motion.span
                    className="relative z-10 flex items-center gap-2"
                    whileHover={{ x: 2 }}
                  >
                    Get Your Free Strategy Call
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Glow>
              
              <Button 
                variant="outline" 
                size="lg"
                className="group px-8 py-4 text-base font-semibold border-2 hover:border-primary/50"
              >
                <Play className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                Watch Success Stories
              </Button>
            </motion.div>

            {/* Contextual Testimonial with Gestures */}
            <div className="touch-pan-x">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl max-w-md cursor-pointer"
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              >
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div className="text-xs font-medium">
                  {testimonials[currentTestimonial].name} - {testimonials[currentTestimonial].company}
                </div>
                <div className="flex gap-1 mt-2">
                  {testimonials.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentTestimonial ? 'bg-primary' : 'bg-muted'
                      }`} 
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Mockup */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50, rotateY: 15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Glow intensity="xl" color="primary">
              <motion.div
                whileHover={{ 
                  scale: 1.02, 
                  rotateY: -5,
                  rotateX: 5 
                }}
                transition={{ type: "spring", stiffness: 200 }}
                className="perspective-1000"
              >
                <Mockup variant="browser" className="w-full max-w-2xl mx-auto">
                  <motion.img
                    src={heroMockup}
                    alt="EEGNITE Platform Dashboard"
                    className="w-full h-auto rounded-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  />
                </Mockup>
              </motion.div>
            </Glow>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 p-3 bg-green-500 text-white rounded-full shadow-lg"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0] 
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              <TrendingUp className="w-6 h-6" />
            </motion.div>

            <motion.div
              className="absolute -bottom-8 -left-8 p-4 bg-blue-500 text-white rounded-full shadow-lg"
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 0] 
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            >
              <Users className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-2 bg-primary rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.section>
  )
}