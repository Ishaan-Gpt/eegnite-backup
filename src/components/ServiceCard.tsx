import { motion } from 'framer-motion';
import { ArrowRight, Search, Target, Mail, Linkedin, TrendingUp, Edit3 } from 'lucide-react';
import { Service } from '@/data/services';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const iconMap = {
  search: Search,
  target: Target,
  mail: Mail,
  linkedin: Linkedin,
  'trending-up': TrendingUp,
  'edit-3': Edit3,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = iconMap[service.icon as keyof typeof iconMap] || Search;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -14, scale: 1.035 }}
      className="group h-full"
    >
      <Card
        className="h-full card-glass neumorphism bg-white/80 border border-orange-200/40 shadow-[0_8px_32px_0_rgba(255,88,0,0.13),0_2px_8px_0_rgba(255,88,0,0.10)] transition-all duration-300 overflow-hidden hover:shadow-orange-glow hover:scale-[1.04] hover:border-primary/40 hover:shadow-2xl hover:brightness-105 focus-within:ring-2 focus-within:ring-primary/40 !rounded-2xl"
      >
        <CardContent className="p-7 lg:p-10 h-full flex flex-col">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-orange-100 border border-primary/20 flex items-center justify-center shadow-[0_2px_16px_0_rgba(255,88,0,0.13)] group-hover:shadow-orange-glow group-hover:scale-110 transition-all duration-300 relative">
              <span className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent blur-lg opacity-60 group-hover:opacity-80 transition-all duration-300 pointer-events-none" />
              <Icon className="w-7 h-7 text-primary drop-shadow-[0_2px_8px_rgba(255,88,0,0.15)]" aria-label={service.title + ' icon'} />
            </div>
          </div>

          {/* Category Badge */}
          <div className="mb-4 text-center">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-satoshi font-medium shadow-sm border backdrop-blur-sm bg-white/60 ${
              service.category === 'growth'
                ? 'text-primary border-primary/30'
                : service.category === 'technical'
                ? 'text-blue-400 border-blue-400/30'
                : 'text-purple-400 border-purple-400/30'
            }`}>
              {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl lg:text-2xl font-clash font-semibold text-foreground mb-4 group-hover:text-primary transition-colors text-center">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground font-satoshi leading-relaxed mb-6 flex-grow text-center">
            {service.description}
          </p>

          {/* Features */}
          <div className="mb-6">
            <ul className="space-y-2">
              {service.features.slice(0, 3).map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start space-x-2 text-sm text-muted-foreground font-satoshi">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
              {service.features.length > 3 && (
                <li className="text-sm text-primary font-satoshi">
                  +{service.features.length - 3} more features
                </li>
              )}
            </ul>
          </div>

          {/* CTA */}
          <Button
            asChild
            className="bg-gradient-orange text-primary-foreground font-satoshi font-semibold px-6 py-3 rounded-xl shadow hover:shadow-orange-glow hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2"
          >
            <Link to="/services">
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}