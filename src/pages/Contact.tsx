import { motion } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Office Location',
    details: ['123 Growth Street', 'San Francisco, CA 94102']
  },
  {
    icon: Phone,
    title: 'Phone Number',
    details: ['+1 (555) 123-4567']
  },
  {
    icon: Mail,
    title: 'Email Address',
    details: ['hello@eegnite.com']
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Mon - Fri: 9:00 AM - 6:00 PM PST']
  }
];

const services = [
  'Performance Marketing',
  'Conversion Optimization',
  'Email Marketing',
  'Social Media Advertising',
  'SEO & Content Marketing',
  'Marketing Automation',
  'Growth Strategy Consulting',
  'Other'
];

const budgetRanges = [
  'Less than $5,000/month',
  '$5,000 - $10,000/month',
  '$10,000 - $25,000/month',
  '$25,000 - $50,000/month',
  '$50,000+/month'
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    website: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
    newsletter: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      website: '',
      phone: '',
      service: '',
      budget: '',
      message: '',
      newsletter: false
    });
    setCurrentStep(1);
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email;
      case 2:
        return formData.company && formData.service && formData.budget;
      case 3:
        return formData.message;
      default:
        return false;
    }
  };

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
              Let's Build Your <span className="text-primary">Growth Strategy</span>
            </h1>
            <p className="text-xl text-muted-foreground font-satoshi leading-relaxed">
              Ready to accelerate your business growth? Get in touch for a free strategy session 
              and discover how we can help you achieve your ambitious goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <div className="mb-8">
                  <h2 className="text-2xl lg:text-3xl font-clash font-bold text-foreground mb-4">
                    Start Your Growth Journey
                  </h2>
                  
                  {/* Progress Indicator */}
                  <div className="flex items-center mb-6">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-clash font-semibold ${
                          step <= currentStep 
                            ? 'bg-gradient-orange text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                        </div>
                        {step < 3 && (
                          <div className={`w-12 h-0.5 mx-2 ${
                            step < currentStep ? 'bg-primary' : 'bg-muted'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-clash font-semibold text-foreground mb-4">
                        Personal Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            placeholder="John"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="john@company.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Business Information */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-clash font-semibold text-foreground mb-4">
                        Business Information
                      </h3>
                      
                      <div>
                        <Label htmlFor="company">Company Name *</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          placeholder="Your Company Inc."
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="website">Website URL</Label>
                        <Input
                          id="website"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="https://yourcompany.com"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="service">Service Interest *</Label>
                        <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="budget">Monthly Budget Range *</Label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Project Details */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-clash font-semibold text-foreground mb-4">
                        Tell Us About Your Goals
                      </h3>
                      
                      <div>
                        <Label htmlFor="message">Project Details *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Tell us about your business goals, current challenges, and what you're looking to achieve..."
                          rows={6}
                          required
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="newsletter"
                          checked={formData.newsletter}
                          onCheckedChange={(checked) => handleInputChange('newsletter', checked as boolean)}
                        />
                        <Label htmlFor="newsletter" className="text-sm font-satoshi">
                          Subscribe to our newsletter for growth tips and industry insights
                        </Label>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePreviousStep}
                        className="font-satoshi"
                      >
                        Previous
                      </Button>
                    )}
                    
                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        disabled={!isStepValid(currentStep)}
                        className="bg-gradient-orange hover:bg-gradient-orange/90 text-primary-foreground font-satoshi ml-auto"
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting || !isStepValid(currentStep)}
                        className="bg-gradient-orange hover:bg-gradient-orange/90 text-primary-foreground font-satoshi ml-auto"
                      >
                        {isSubmitting ? (
                          'Sending...'
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-xl font-clash font-bold text-foreground mb-6">
                    Get in Touch
                  </h3>
                  
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => {
                      const IconComponent = info.icon;
                      return (
                        <div key={index} className="flex items-start">
                          <div className="w-12 h-12 rounded-lg bg-gradient-orange text-primary-foreground flex items-center justify-center mr-4 flex-shrink-0">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-clash font-semibold text-foreground mb-1">
                              {info.title}
                            </h4>
                            {info.details.map((detail, detailIndex) => (
                              <p key={detailIndex} className="text-muted-foreground font-satoshi">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Response Time */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h4 className="font-clash font-semibold text-foreground mb-3">
                    Quick Response Time
                  </h4>
                  <p className="text-muted-foreground font-satoshi mb-4">
                    We typically respond to all inquiries within 24 hours during business days.
                  </p>
                  <div className="text-2xl font-clash font-bold text-primary">
                    &lt; 24 hours
                  </div>
                </div>

                {/* Calendly Integration Placeholder */}
                <div className="bg-gradient-subtle border border-border rounded-xl p-6">
                  <h4 className="font-clash font-semibold text-foreground mb-3">
                    Book a Strategy Call
                  </h4>
                  <p className="text-muted-foreground font-satoshi mb-4">
                    Skip the form and book a 30-minute strategy call directly.
                  </p>
                  <Button className="w-full bg-gradient-orange hover:bg-gradient-orange/90 text-primary-foreground font-satoshi">
                    Schedule Call
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-muted rounded-2xl h-96 flex items-center justify-center"
          >
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-clash font-bold text-foreground mb-2">
                Our San Francisco Office
              </h3>
              <p className="text-muted-foreground font-satoshi">
                Interactive map integration coming soon
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;