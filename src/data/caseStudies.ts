export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  timeline: string;
  services: string[];
  image?: string;
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'techflow-transformation',
    title: 'SaaS Lead Generation Transformation',
    client: 'TechFlow Solutions',
    industry: 'B2B SaaS',
    challenge: 'TechFlow was struggling with high customer acquisition costs and low-quality leads. Their existing marketing efforts were generating traffic but not converting to qualified prospects.',
    solution: 'We implemented a comprehensive inbound marketing strategy combining strategic SEO, targeted PPC campaigns, and automated email nurturing sequences. Our approach focused on attracting decision-makers actively searching for their solutions.',
    results: [
      {
        metric: 'Qualified Leads',
        before: '12/month',
        after: '52/month',
        improvement: '+340%'
      },
      {
        metric: 'Customer Acquisition Cost',
        before: '$1,250',
        after: '$420',
        improvement: '-66%'
      },
      {
        metric: 'Conversion Rate',
        before: '1.2%',
        after: '4.8%',
        improvement: '+300%'
      }
    ],
    timeline: '6 months',
    services: ['Strategic SEO', 'Performance PPC', 'Email Marketing'],
    featured: true
  },
  {
    id: 'greentech-growth',
    title: 'Sustainable Tech Market Leadership',
    client: 'GreenTech Innovations',
    industry: 'Clean Technology',
    challenge: 'GreenTech needed to establish thought leadership in the competitive clean energy market while driving qualified B2B leads for their enterprise solutions.',
    solution: 'We developed a content-first strategy combining LinkedIn thought leadership, technical blog content, and targeted B2B advertising to position their CEO as an industry expert.',
    results: [
      {
        metric: 'Organic Traffic',
        before: '2.5K/month',
        after: '18.2K/month',
        improvement: '+628%'
      },
      {
        metric: 'Enterprise Inquiries',
        before: '3/month',
        after: '15/month',
        improvement: '+400%'
      },
      {
        metric: 'LinkedIn Followers',
        before: '840',
        after: '12.5K',
        improvement: '+1,388%'
      }
    ],
    timeline: '8 months',
    services: ['Content Strategy', 'LinkedIn Strategy', 'Strategic SEO'],
    featured: true
  },
  {
    id: 'consulting-scale',
    title: 'Consulting Firm Digital Transformation',
    client: 'Elite Consulting Group',
    industry: 'Management Consulting',
    challenge: 'Elite Consulting relied heavily on referrals and wanted to build a scalable digital marketing system to reduce dependency on word-of-mouth marketing.',
    solution: 'We built a sophisticated lead generation funnel with high-value content offers, automated email sequences, and strategic partnerships to create multiple revenue streams.',
    results: [
      {
        metric: 'Monthly Revenue',
        before: '$45K',
        after: '$127K',
        improvement: '+182%'
      },
      {
        metric: 'Digital Leads',
        before: '8/month',
        after: '34/month',
        improvement: '+325%'
      },
      {
        metric: 'Email List Growth',
        before: '120',
        after: '2,840',
        improvement: '+2,267%'
      }
    ],
    timeline: '10 months',
    services: ['Email Marketing', 'Content Strategy', 'Growth Analytics'],
    featured: false
  }
];