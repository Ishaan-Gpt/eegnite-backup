export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  category: 'growth' | 'content' | 'technical';
}

export const services: Service[] = [
  {
    id: 'seo',
    title: 'Strategic SEO',
    description: 'Data-driven SEO strategies that put your brand in front of your ideal customers when they\'re actively searching.',
    features: [
      'Comprehensive keyword research & analysis',
      'Technical SEO audits & optimization',
      'Content strategy & creation',
      'Local SEO for regional dominance',
      'Link building & authority development'
    ],
    icon: 'search',
    category: 'technical'
  },
  {
    id: 'ppc',
    title: 'Performance PPC',
    description: 'High-converting paid campaigns across Google, Meta, and LinkedIn that maximize ROI and drive qualified leads.',
    features: [
      'Google Ads campaign management',
      'Meta (Facebook & Instagram) advertising',
      'LinkedIn B2B campaign optimization',
      'Conversion tracking & attribution',
      'Landing page optimization'
    ],
    icon: 'target',
    category: 'growth'
  },
  {
    id: 'email',
    title: 'Email Marketing',
    description: 'Automated email sequences and campaigns that nurture leads and drive customer lifetime value.',
    features: [
      'Email automation workflows',
      'List segmentation & personalization',
      'A/B testing & optimization',
      'Newsletter campaigns',
      'Customer retention sequences'
    ],
    icon: 'mail',
    category: 'content'
  },
  {
    id: 'linkedin',
    title: 'LinkedIn Strategy',
    description: 'Personal branding and B2B lead generation through strategic LinkedIn content and outreach.',
    features: [
      'Personal brand development',
      'Content calendar & creation',
      'Connection building strategies',
      'LinkedIn advertising',
      'Thought leadership positioning'
    ],
    icon: 'linkedin',
    category: 'growth'
  },
  {
    id: 'analytics',
    title: 'Growth Analytics',
    description: 'Comprehensive tracking and data analysis to optimize your entire marketing funnel.',
    features: [
      'Conversion tracking setup',
      'Custom dashboard creation',
      'Monthly performance reports',
      'Growth opportunity identification',
      'ROI measurement & optimization'
    ],
    icon: 'trending-up',
    category: 'technical'
  },
  {
    id: 'content',
    title: 'Content Strategy',
    description: 'Compelling content that positions your brand as the go-to expert in your industry.',
    features: [
      'Content strategy & planning',
      'Blog writing & SEO optimization',
      'Social media content creation',
      'Video content strategy',
      'Brand messaging & positioning'
    ],
    icon: 'edit-3',
    category: 'content'
  }
];