import { motion } from 'framer-motion';
import { ArrowRight, Search, Target, Mail, Linkedin, TrendingUp, Edit3 } from 'lucide-react';
import { Service } from '@/data/services';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <Card className="h-full bg-card/50 backdrop-blur-sm border-border hover:border-primary/20 transition-all duration-300 overflow-hidden">
        <CardContent className="p-6 lg:p-8 h-full flex flex-col">
          {/* Icon */}
          <div className="mb-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          </div>

          {/* Category Badge */}
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-satoshi font-medium ${
              service.category === 'growth' 
                ? 'bg-primary/10 text-primary border border-primary/20'
                : service.category === 'technical'
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
            }`}>
              {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl lg:text-2xl font-clash font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground font-satoshi leading-relaxed mb-6 flex-grow">
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
            variant="ghost" 
            className="group/btn self-start p-0 h-auto text-primary hover:text-primary hover:bg-transparent"
          >
            <span className="font-satoshi font-medium">Learn More</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}