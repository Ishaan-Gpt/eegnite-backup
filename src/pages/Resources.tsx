import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Download, Calendar, ArrowRight, BookOpen, Calculator, FileText, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const resourceCategories = [
  { id: 'all', label: 'All Resources', icon: BookOpen },
  { id: 'guides', label: 'Guides & Ebooks', icon: FileText },
  { id: 'tools', label: 'Free Tools', icon: Calculator },
  { id: 'webinars', label: 'Webinars', icon: Video }
];

const resources = [
  {
    id: 1,
    title: 'The Complete Digital Marketing Audit Checklist',
    description: 'A comprehensive 50-point checklist to audit your current marketing performance and identify growth opportunities.',
    category: 'guides',
    type: 'PDF Guide',
    downloadUrl: '#',
    image: '/api/placeholder/400/250',
    featured: true,
    readTime: '15 min read'
  },
  {
    id: 2,
    title: 'ROI Calculator for Marketing Campaigns',
    description: 'Calculate the potential return on investment for your marketing campaigns with our advanced calculator.',
    category: 'tools',
    type: 'Interactive Tool',
    downloadUrl: '#',
    image: '/api/placeholder/400/250',
    featured: true,
    readTime: '5 min use'
  },
  {
    id: 3,
    title: 'Scaling to 7-Figures: A Growth Framework',
    description: 'Learn the exact framework we use to help businesses scale from 6 to 7 figures in revenue.',
    category: 'webinars',
    type: 'Webinar Recording',
    downloadUrl: '#',
    image: '/api/placeholder/400/250',
    featured: false,
    readTime: '45 min watch'
  },
  {
    id: 4,
    title: 'Email Marketing Automation Templates',
    description: 'Ready-to-use email templates and automation sequences for different stages of the customer journey.',
    category: 'guides',
    type: 'Template Pack',
    downloadUrl: '#',
    image: '/api/placeholder/400/250',
    featured: false,
    readTime: '10 min setup'
  },
  {
    id: 5,
    title: 'Conversion Rate Optimization Toolkit',
    description: 'Everything you need to optimize your conversion rates, including templates, checklists, and case studies.',
    category: 'tools',
    type: 'Toolkit',
    downloadUrl: '#',
    image: '/api/placeholder/400/250',
    featured: true,
    readTime: '30 min use'
  },
  {
    id: 6,
    title: 'Social Media Content Calendar Template',
    description: 'Plan and organize your social media content with our comprehensive calendar template.',
    category: 'guides',
    type: 'Spreadsheet',
    downloadUrl: '#',
    image: '/api/placeholder/400/250',
    featured: false,
    readTime: '5 min setup'
  },
  {
    id: 7,
    title: 'Advanced Facebook Ads Masterclass',
    description: 'Master Facebook advertising with advanced strategies for targeting, creative, and optimization.',
    category: 'webinars',
    type: 'Video Course',
    downloadUrl: '#',
    image: '/api/placeholder/400/250',
    featured: false,
    readTime: '2 hour watch'
  },
  {
    id: 8,
    title: 'Lead Scoring Model Builder',
    description: 'Build an effective lead scoring model to prioritize your sales efforts and improve conversion rates.',
    category: 'tools',
    type: 'Spreadsheet Tool',
    downloadUrl: '#',
    image: '/api/placeholder/400/250',
    featured: false,
    readTime: '20 min setup'
  }
];

const blogPosts = [
  {
    id: 1,
    title: '10 Growth Hacking Strategies That Actually Work in 2024',
    excerpt: 'Discover the most effective growth hacking strategies that are driving results for businesses this year.',
    author: 'Alex Chen',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Growth Strategy',
    image: '/api/placeholder/400/250'
  },
  {
    id: 2,
    title: 'How to Build a High-Converting Landing Page in 30 Minutes',
    excerpt: 'A step-by-step guide to creating landing pages that convert visitors into customers.',
    author: 'Sarah Rodriguez',
    date: '2024-01-12',
    readTime: '6 min read',
    category: 'Conversion Optimization',
    image: '/api/placeholder/400/250'
  },
  {
    id: 3,
    title: 'The Psychology Behind High-Converting Email Campaigns',
    excerpt: 'Learn how to use psychological triggers to create email campaigns that drive action.',
    author: 'Marcus Thompson',
    date: '2024-01-10',
    readTime: '10 min read',
    category: 'Email Marketing',
    image: '/api/placeholder/400/250'
  }
];

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  return (
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
              Free Growth <span className="text-primary">Resources</span>
            </h1>
            <p className="text-xl text-muted-foreground font-satoshi leading-relaxed mb-8">
              Access our library of proven templates, tools, and guides that have helped 
              hundreds of businesses accelerate their growth.
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-clash font-bold text-foreground mb-6">
              Most <span className="text-primary">Popular Resources</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-elegant transition-shadow duration-300"
              >
                <img 
                  src={resource.image} 
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="font-satoshi">
                      {resource.type}
                    </Badge>
                    <Badge className="bg-gradient-orange text-primary-foreground font-satoshi">
                      Popular
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-clash font-bold text-foreground mb-3">
                    {resource.title}
                  </h3>
                  
                  <p className="text-muted-foreground font-satoshi mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-satoshi">
                      {resource.readTime}
                    </span>
                    <Button className="bg-gradient-orange hover:bg-gradient-orange/90 text-primary-foreground font-satoshi">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Resources */}
      <section className="py-16 lg:py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4 lg:px-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-16">
              {resourceCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {category.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-elegant transition-shadow duration-300"
                >
                  <img 
                    src={resource.image} 
                    alt={resource.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="font-satoshi">
                        {resource.type}
                      </Badge>
                      {resource.featured && (
                        <Badge className="bg-gradient-orange text-primary-foreground font-satoshi">
                          Popular
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-clash font-bold text-foreground mb-3">
                      {resource.title}
                    </h3>
                    
                    <p className="text-muted-foreground font-satoshi mb-4 line-clamp-2">
                      {resource.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground font-satoshi">
                        {resource.readTime}
                      </span>
                      <Button variant="outline" className="font-satoshi">
                        <Download className="w-4 h-4 mr-2" />
                        Get Free
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Tabs>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-clash font-bold text-foreground mb-6">
              Latest <span className="text-primary">Growth Insights</span>
            </h2>
            <p className="text-lg text-muted-foreground font-satoshi max-w-3xl mx-auto">
              Stay up-to-date with the latest growth strategies, tactics, and industry insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-elegant transition-shadow duration-300"
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <Badge variant="secondary" className="font-satoshi mb-3">
                    {post.category}
                  </Badge>
                  
                  <h3 className="text-xl font-clash font-bold text-foreground mb-3">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground font-satoshi mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground font-satoshi">
                    <div className="flex items-center gap-2">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <Button variant="ghost" className="w-full mt-4 font-satoshi">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center bg-card border border-border rounded-2xl p-12"
          >
            <h2 className="text-3xl lg:text-4xl font-clash font-bold text-foreground mb-4">
              Get Weekly <span className="text-primary">Growth Tips</span>
            </h2>
            <p className="text-lg text-muted-foreground font-satoshi mb-8 max-w-2xl mx-auto">
              Join 5,000+ growth-focused entrepreneurs who receive our weekly newsletter 
              with actionable insights and strategies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="bg-gradient-orange hover:bg-gradient-orange/90 text-primary-foreground font-satoshi">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground font-satoshi mt-4">
              No spam. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Resources;