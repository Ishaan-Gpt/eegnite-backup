"use client";
import React from "react";
import { motion } from "motion/react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-10 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full" key={i}>
                  <div className="text-muted-foreground font-satoshi leading-relaxed mb-6">{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-foreground font-satoshi">{name}</div>
                      <div className="leading-5 opacity-60 tracking-tight text-muted-foreground font-satoshi text-sm">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const testimonials = [
  {
    text: "EEGNITE transformed our digital marketing strategy completely. We saw a 340% increase in qualified leads within 6 months. Their data-driven approach is unmatched.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612e2bb?w=150&h=150&fit=crop&crop=face",
    name: "Sarah Johnson",
    role: "CEO, TechFlow Solutions",
  },
  {
    text: "Working with EEGNITE was a game-changer for our B2B growth. Their strategic insights and execution helped us scale from $2M to $8M ARR in 18 months.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "Marcus Chen",
    role: "Founder, Innovate Capital",
  },
  {
    text: "The ROI we've seen from EEGNITE's campaigns exceeded all expectations. They don't just run ads, they build sustainable growth systems that compound over time.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    name: "Emily Rodriguez",
    role: "CMO, GreenTech Innovations",
  },
  {
    text: "EEGNITE's conversion optimization strategies increased our website conversion rate by 180%. Their attention to detail and testing methodology is exceptional.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    name: "David Thompson",
    role: "VP Marketing, Elite Consulting",
  },
  {
    text: "From LinkedIn advertising to email automation, EEGNITE helped us build a complete growth engine. Our pipeline has never been stronger.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    name: "Jessica Martinez",
    role: "Head of Growth, SaaS Dynamics",
  },
  {
    text: "The marketing attribution system EEGNITE built for us finally gave us clarity on what's working. We can now invest confidently in channels that drive results.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Alex Kumar",
    role: "CEO, DataDriven Inc",
  },
  {
    text: "EEGNITE doesn't just deliver campaigns, they educate and empower our team. The knowledge transfer has been invaluable for our long-term success.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    name: "Rachel Park",
    role: "Marketing Director, FinTech Pro",
  },
  {
    text: "Their creative approach to problem-solving is what sets EEGNITE apart. They found growth opportunities we never knew existed in our business.",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
    name: "Michael Foster",
    role: "Co-founder, StartupLaunch",
  },
  {
    text: "Working with EEGNITE feels like having an in-house growth team, but with the expertise of a world-class agency. Best investment we've made.",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    name: "Amanda Collins",
    role: "CEO, ScaleUp Ventures",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="bg-background py-20 relative">
      <div className="container z-10 mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-border py-1 px-4 rounded-lg bg-muted text-muted-foreground font-satoshi text-sm">
              Client Success Stories
            </div>
          </div>

          <h2 className="text-3xl lg:text-5xl font-clash font-bold text-foreground text-center mt-6 mb-4">
            What Our <span className="text-primary">Growth Partners</span> Say
          </h2>
          <p className="text-center text-muted-foreground font-satoshi leading-relaxed">
            Real results from real businesses. See how we've helped companies scale their growth.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;