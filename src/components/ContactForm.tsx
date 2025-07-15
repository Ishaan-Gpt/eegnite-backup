import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/lib/supabaseClient';
import { CheckCircle, Send } from 'lucide-react';

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

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name is required'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  phone: z.string().optional(),
  service: z.string().min(2, 'Service is required'),
  budget: z.string().min(2, 'Budget is required'),
  message: z.string().min(10, 'Please provide more details'),
  newsletter: z.boolean().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm({
  heading = 'Start Your Growth Journey',
  onSuccess
}: {
  heading?: string;
  onSuccess?: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      website: '',
      phone: '',
      service: '',
      budget: '',
      message: '',
      newsletter: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('ContactSubmission').insert([
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          company: data.company,
          website: data.website,
          phone: data.phone,
          service: data.service,
          budget: data.budget,
          message: data.message,
          newsletter: !!data.newsletter,
        },
      ]);
      if (error) throw new Error(error.message);
      // Newsletter subscription logic
      if (data.newsletter) {
        const { error: newsletterError } = await supabase.from('NewsletterSignup').insert([
          {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
          },
        ]);
        if (newsletterError && !newsletterError.message.includes('duplicate key')) {
          toast({
            title: 'Newsletter Error',
            description: newsletterError.message,
            variant: 'destructive',
          });
        } else if (!newsletterError) {
          toast({
            title: 'Subscribed!',
            description: "You've been added to our newsletter.",
          });
        }
      }
      toast({
        title: 'Message Sent!',
        description: "We'll get back to you within 24 hours.",
      });
      reset();
      setCurrentStep(1);
      if (onSuccess) onSuccess();
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-card border border-border rounded-2xl p-8 max-w-3xl mx-auto mt-16 mb-16"
      >
        <h2 className="text-2xl lg:text-3xl font-clash font-bold text-foreground mb-4 text-center">
          {heading}
        </h2>
        <div className="flex items-center mb-6 justify-center">
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
                <Input id="firstName" {...register('firstName')} className="bg-white border border-border focus:ring-primary" />
                {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" {...register('lastName')} className="bg-white border border-border focus:ring-primary" />
                {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName.message}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" type="email" {...register('email')} className="bg-white border border-border focus:ring-primary" />
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" {...register('phone')} className="bg-white border border-border focus:ring-primary" />
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
              <Input id="company" {...register('company')} className="bg-white border border-border focus:ring-primary" />
              {errors.company && <p className="text-destructive text-sm mt-1">{errors.company.message}</p>}
            </div>
            <div>
              <Label htmlFor="website">Website URL</Label>
              <Input id="website" {...register('website')} className="bg-white border border-border focus:ring-primary" />
              {errors.website && <p className="text-destructive text-sm mt-1">{errors.website.message}</p>}
            </div>
            <div>
              <Label htmlFor="service">Service Interest *</Label>
              <Select value={watch('service')} onValueChange={val => setValue('service', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>{service}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.service && <p className="text-destructive text-sm mt-1">{errors.service.message}</p>}
            </div>
            <div>
              <Label htmlFor="budget">Monthly Budget Range *</Label>
              <Select value={watch('budget')} onValueChange={val => setValue('budget', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((range) => (
                    <SelectItem key={range} value={range}>{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.budget && <p className="text-destructive text-sm mt-1">{errors.budget.message}</p>}
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
              <Textarea id="message" rows={6} {...register('message')} className="bg-white border border-border focus:ring-primary" />
              {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="newsletter" checked={watch('newsletter')} onCheckedChange={checked => setValue('newsletter', !!checked)} />
              <Label htmlFor="newsletter" className="text-sm font-satoshi">
                Subscribe to our newsletter for growth tips and industry insights
              </Label>
            </div>
          </motion.div>
        )}
        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8 justify-end">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="font-satoshi"
            >
              Previous
            </Button>
          )}
          {currentStep < 3 ? (
            <Button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-gradient-orange hover:bg-gradient-orange/90 text-primary-foreground font-satoshi ml-auto"
              disabled={Object.keys(errors).length > 0}
            >
              Next Step
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting || Object.keys(errors).length > 0}
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
      </motion.div>
    </form>
  );
} 