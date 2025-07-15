import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { CheckCircle, TrendingUp, Users, Award, Lightbulb, Target } from "lucide-react";

export function EegniteTimeline() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className="text-foreground text-xs md:text-sm font-normal mb-8">
            Launched comprehensive business consulting services with focus on digital transformation and strategic growth planning for enterprises.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <img
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=800&auto=format&fit=crop"
              alt="Business Strategy"
              className="rounded-lg object-cover h-32 md:h-44 lg:h-60 w-full shadow-elegant"
              loading="lazy"
            />
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
              alt="Data Analytics"
              className="rounded-lg object-cover h-32 md:h-44 lg:h-60 w-full shadow-elegant"
              loading="lazy"
            />
          </div>
          <div className="space-y-2">
            <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
              <CheckCircle className="w-4 h-4 text-primary" />
              Established strategic consulting framework
            </div>
            <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
              <TrendingUp className="w-4 h-4 text-primary" />
              Delivered 50+ successful business transformations
            </div>
            <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
              <Users className="w-4 h-4 text-primary" />
              Built team of expert consultants across industries
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <p className="text-foreground text-xs md:text-sm font-normal mb-8">
            Expanded service offerings to include advanced analytics, process optimization, and technology integration solutions for mid-market companies.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
              alt="Team Collaboration"
              className="rounded-lg object-cover h-32 md:h-44 lg:h-60 w-full shadow-elegant"
              loading="lazy"
            />
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
              alt="Business Analytics"
              className="rounded-lg object-cover h-32 md:h-44 lg:h-60 w-full shadow-elegant"
              loading="lazy"
            />
          </div>
          <div className="space-y-2">
            <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
              <Award className="w-4 h-4 text-primary" />
              Recognized as top business consulting firm
            </div>
            <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
              <Lightbulb className="w-4 h-4 text-primary" />
              Developed proprietary analytics methodology
            </div>
            <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
              <Target className="w-4 h-4 text-primary" />
              Achieved 95% client satisfaction rate
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Foundation",
      content: (
        <div>
          <p className="text-foreground text-xs md:text-sm font-normal mb-4">
            EEGNITE was founded with a vision to empower businesses through data-driven insights and strategic excellence.
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm mb-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Established core business consulting methodology
            </div>
            <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm mb-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Built foundation for scalable business solutions
            </div>
            <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm mb-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Developed client-centric service approach
            </div>
            <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
              <CheckCircle className="w-4 h-4 text-primary" />
              Created strategic partnerships with industry leaders
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
              alt="Business Foundation"
              className="rounded-lg object-cover h-32 md:h-44 lg:h-60 w-full shadow-elegant"
              loading="lazy"
            />
            <img
              src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=800&auto=format&fit=crop"
              alt="Strategic Planning"
              className="rounded-lg object-cover h-32 md:h-44 lg:h-60 w-full shadow-elegant"
              loading="lazy"
            />
          </div>
        </div>
      ),
    },
  ];

  return <Timeline data={data} />;
}