"use client";

import { BarChart3, Users, Lightbulb, Target, TrendingUp, Shield } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

export function ServicesGrid() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-10 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
          Our <span className="gradient-text">Core Services</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Comprehensive business solutions designed to accelerate your growth and drive sustainable success.
        </p>
      </div>
      
      <ul className="grid grid-cols-1 grid-rows-none gap-6 md:grid-cols-12 md:grid-rows-3 lg:gap-6 xl:max-h-[40rem] xl:grid-rows-2">
        <GridItem
          area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
          icon={<BarChart3 className="h-5 w-5" aria-label="Strategic Analytics icon" />}
          title="Strategic Analytics"
          description="Transform your data into actionable insights with our advanced analytics solutions and business intelligence frameworks."
        />
        <GridItem
          area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
          icon={<Users className="h-5 w-5" aria-label="Organizational Excellence icon" />}
          title="Organizational Excellence"
          description="Optimize your team structure and processes for maximum efficiency and sustainable growth."
        />
        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
          icon={<Lightbulb className="h-5 w-5" aria-label="Innovation Strategy icon" />}
          title="Innovation Strategy"
          description="Drive innovation through strategic planning, technology adoption, and competitive market positioning."
        />
        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
          icon={<Target className="h-5 w-5" />}
          title="Performance Optimization"
          description="Identify bottlenecks and implement solutions that boost operational efficiency and ROI."
        />
        <GridItem
          area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
          icon={<TrendingUp className="h-5 w-5" />}
          title="Growth Acceleration"
          description="Scale your business with proven strategies and data-driven methodologies for sustainable expansion."
        />
      </ul>
    </section>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[16rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border border-border/50 p-2 md:rounded-[1.5rem] md:p-3 glass-card">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-border/30 bg-card/50 p-6 backdrop-blur-sm shadow-elegant">
          <div className="relative flex flex-1 flex-col justify-between gap-4">
            <div className="w-fit rounded-lg border border-border/50 bg-primary/10 text-primary p-3">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                {title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};