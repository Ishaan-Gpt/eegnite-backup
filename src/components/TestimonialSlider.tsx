import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 lg:py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-5xl font-clash font-bold text-foreground mb-4">
            What Our <span className="text-primary">Partners</span> Say
          </h2>
          <p className="text-lg text-muted-foreground font-satoshi max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our growth partners have to say about working with EEGNITE.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div 
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-card/80 backdrop-blur-lg border-border shadow-soft">
                  <CardContent className="p-8 lg:p-12">
                    {/* Quote Icon */}
                    <Quote className="w-12 h-12 text-primary/20 mb-6" />
                    
                    {/* Rating */}
                    <div className="flex items-center mb-6">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Content */}
                    <blockquote className="text-lg lg:text-xl text-foreground font-satoshi leading-relaxed mb-8">
                      "{currentTestimonial.content}"
                    </blockquote>

                    {/* Author & Results */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="mb-4 lg:mb-0">
                        <div className="font-clash font-semibold text-foreground text-lg">
                          {currentTestimonial.name}
                        </div>
                        <div className="text-muted-foreground font-satoshi">
                          {currentTestimonial.role} at {currentTestimonial.company}
                        </div>
                      </div>
                      
                      {currentTestimonial.results && (
                        <div className="text-right">
                          <div className="text-2xl font-clash font-bold text-primary">
                            {currentTestimonial.results.improvement}
                          </div>
                          <div className="text-sm text-muted-foreground font-satoshi">
                            {currentTestimonial.results.metric}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-16">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full bg-card/80 backdrop-blur-sm border-border hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronLeft className="w-4 h-4" aria-label="Previous testimonial" />
              </Button>
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-16">
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full bg-card/80 backdrop-blur-sm border-border hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary w-8' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}