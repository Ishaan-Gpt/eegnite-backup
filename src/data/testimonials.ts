export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  avatar?: string;
  rating: number;
  results?: {
    metric: string;
    improvement: string;
  };
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    company: 'TechFlow Solutions',
    role: 'CEO & Founder',
    content: 'EEGNITE didn\'t just improve our marketing - they transformed our entire approach to growth. Their strategic thinking and execution are unmatched.',
    rating: 5,
    results: {
      metric: 'Lead Generation',
      improvement: '+340%'
    }
  },
  {
    id: '2',
    name: 'Marcus Chen',
    company: 'Innovate Capital',
    role: 'Managing Partner',
    content: 'Working with EEGNITE was a game-changer. They understand B2B marketing at a level that most agencies simply don\'t reach.',
    rating: 5,
    results: {
      metric: 'Conversion Rate',
      improvement: '+180%'
    }
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    company: 'GreenTech Innovations',
    role: 'Head of Marketing',
    content: 'The ROI we\'ve seen from EEGNITE\'s campaigns has exceeded all expectations. They\'re true growth partners, not just service providers.',
    rating: 5,
    results: {
      metric: 'Revenue Growth',
      improvement: '+250%'
    }
  },
  {
    id: '4',
    name: 'David Thompson',
    company: 'Elite Consulting Group',
    role: 'Founder',
    content: 'EEGNITE\'s data-driven approach and strategic insights have been instrumental in scaling our business to new heights.',
    rating: 5,
    results: {
      metric: 'Organic Traffic',
      improvement: '+420%'
    }
  }
];