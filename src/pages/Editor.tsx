import { useEffect, useState, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { EnhancedHero } from "@/components/EnhancedHero";
import { FeaturesShowcase } from "@/components/FeaturesShowcase";
import { ServicesGrid } from "@/components/ServicesGrid";
import { TeamSection } from "@/components/TeamSection";
import { CTASection } from "@/components/CTASection";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { PanelLeft, Home, Users, Star, Zap, Layers, MessageCircle, Rocket, Activity } from "lucide-react";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";

const HOMEPAGE_SECTIONS = [
  { type: 'hero', label: 'Hero' },
  { type: 'services', label: 'Services' },
  { type: 'features', label: 'Features' },
  { type: 'process', label: 'Process' },
  { type: 'team', label: 'Team' },
  { type: 'testimonials', label: 'Testimonials' },
  { type: 'cta', label: 'CTA' },
  { type: 'velocityScroll', label: 'Velocity Scroll' },
];
const PAGES = [
  { slug: 'home', label: 'Homepage' },
  { slug: 'about', label: 'About', comingSoon: true },
  { slug: 'services', label: 'Services', comingSoon: true },
  { slug: 'case-studies', label: 'Case Studies', comingSoon: true },
  { slug: 'resources', label: 'Resources', comingSoon: true },
  { slug: 'contact', label: 'Contact', comingSoon: true },
];

// Add types for section and element
interface HeroStat { value: string; label: string; }
interface Feature { title: string; description: string; }
interface Service { title: string; description: string; }
interface Section {
  id: string;
  type: string;
  meta: Record<string, unknown>;
}
interface Element {
  id: string;
  section_id: string;
  type: string;
  content: Record<string, unknown>;
  order: number;
}

interface HeroCTA { text: string; link: string; }

interface SectionSidebarProps {
  sections: { type: string; label: string }[];
  selected: string;
  onSelect: (type: string) => void;
}
function SectionSidebar({ sections, selected, onSelect }: SectionSidebarProps) {
  return (
    <nav className="flex flex-col gap-2 p-4 border-r border-border/30 min-w-[180px] bg-card/80">
      {sections.map((s) => (
        <button
          key={s.type}
          className={`text-left px-4 py-2 rounded-lg font-medium transition-all ${selected === s.type ? 'bg-primary/10 text-primary' : 'hover:bg-muted/40 text-foreground'}`}
          onClick={() => onSelect(s.type)}
        >
          {s.label}
        </button>
      ))}
    </nav>
  );
}

interface PageSidebarProps {
  pages: { slug: string; label: string; comingSoon?: boolean }[];
  selected: string;
  onSelect: (slug: string) => void;
}
function PageSidebar({ pages, selected, onSelect }: PageSidebarProps) {
  return (
    <nav className="flex flex-col gap-2 p-4 border-r border-border/30 min-w-[180px] bg-background/80">
      {pages.map((p) => (
        <button
          key={p.slug}
          className={`text-left px-4 py-2 rounded-lg font-semibold transition-all ${selected === p.slug ? 'bg-primary/10 text-primary' : 'hover:bg-muted/40 text-foreground'} ${p.comingSoon ? 'opacity-60 cursor-not-allowed' : ''}`}
          onClick={() => !p.comingSoon && onSelect(p.slug)}
          disabled={p.comingSoon}
        >
          {p.slug === 'home' && <Home className="w-4 h-4" />}
          {p.slug === 'about' && <Users className="w-4 h-4" />}
          {p.slug === 'services' && <Star className="w-4 h-4" />}
          {p.slug === 'case-studies' && <Layers className="w-4 h-4" />}
          {p.slug === 'resources' && <Zap className="w-4 h-4" />}
          {p.slug === 'contact' && <MessageCircle className="w-4 h-4" />}
          <span>{p.label}</span>
          {p.comingSoon && <span className="text-xs ml-2">(Coming Soon)</span>}
        </button>
      ))}
    </nav>
  );
}

function SectionEditor({ section, elementContents, onSectionChange, onElementsChange }: { section: Section; elementContents: Record<string, unknown>[]; onSectionChange: (s: Section) => void; onElementsChange: (e: Record<string, unknown>[]) => void }) {
  // Advanced toggle for JSON (shared for all sections)
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const meta = section.meta || {};
  // Cast stats to correct type for each section
  const stats: Record<string, unknown>[] = elementContents;
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Helper for textarea JSON parsing
  function handleJsonChange(e: React.ChangeEvent<HTMLTextAreaElement>, cb: (val: unknown) => void) {
    try {
      const val = JSON.parse(e.target.value);
      setJsonError(null);
      cb(val);
    } catch (err) {
      setJsonError("Invalid JSON");
    }
  }

  // 1. Update previewClass to maximize width and allow scroll if needed
  const previewClass = "w-full aspect-[16/9] min-h-[400px] bg-black/90 rounded-2xl p-0 flex flex-col items-center justify-center shadow-xl overflow-x-auto overflow-y-auto max-h-[60vh] border border-border/40";

  // Utility: stop event propagation for inputs/buttons inside cards
  const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

  // Section-specific forms and previews
  switch (section.type) {
    case "hero": {
      // Ensure all HeroStat fields are present
      const heroStats: HeroStat[] = stats.map((s) => {
        if (typeof s === 'object' && s !== null && 'value' in s && 'label' in s) {
          const stat = s as unknown as HeroStat;
          return { value: stat.value || '', label: stat.label || '' };
        }
        return { value: '', label: '' };
      });
      // Type assertions for meta fields
      const titleLines = (meta.titleLines as string[] | undefined) || [];
      const subtitle = (meta.subtitle as string | undefined) || '';
      const ctaPrimary = (meta.ctaPrimary as HeroCTA | undefined) || { text: '', link: '' };
      const ctaSecondary = (meta.ctaSecondary as HeroCTA | undefined) || { text: '', link: '' };
      return (
        <div className="p-6 bg-card rounded-xl shadow-lg flex flex-col gap-8">
          <div className={previewClass}>
            <h4 className="text-lg font-semibold mb-2">Live Preview</h4>
            <EnhancedHero titleLines={titleLines} subtitle={subtitle} ctaPrimary={ctaPrimary} ctaSecondary={ctaSecondary} stats={heroStats} />
          </div>
          <div className="space-y-4">
            <label className="block font-semibold mb-1">Title Lines (comma separated)</label>
            <input className="w-full mb-2 p-2 rounded border border-border bg-muted/20" value={titleLines.join(", ")} onChange={e => onSectionChange({ ...section, meta: { ...meta, titleLines: e.target.value.split(",").map((s: string) => s.trim()) } })} />
            <label className="block font-semibold mb-1">Subtitle</label>
            <input className="w-full mb-2 p-2 rounded border border-border bg-muted/20" value={subtitle} onChange={e => onSectionChange({ ...section, meta: { ...meta, subtitle: e.target.value } })} />
            <label className="block font-semibold mb-1">Primary CTA Text</label>
            <input className="w-full mb-2 p-2 rounded border border-border bg-muted/20" value={ctaPrimary.text} onChange={e => onSectionChange({ ...section, meta: { ...meta, ctaPrimary: { ...(meta.ctaPrimary as object || {}), text: e.target.value } } })} />
            <label className="block font-semibold mb-1">Primary CTA Link</label>
            <input className="w-full mb-2 p-2 rounded border border-border bg-muted/20" value={ctaPrimary.link} onChange={e => onSectionChange({ ...section, meta: { ...meta, ctaPrimary: { ...(meta.ctaPrimary as object || {}), link: e.target.value } } })} />
            <label className="block font-semibold mb-1">Secondary CTA Text</label>
            <input className="w-full mb-2 p-2 rounded border border-border bg-muted/20" value={ctaSecondary.text} onChange={e => onSectionChange({ ...section, meta: { ...meta, ctaSecondary: { ...(meta.ctaSecondary as object || {}), text: e.target.value } } })} />
            <label className="block font-semibold mb-1">Secondary CTA Link</label>
            <input className="w-full mb-2 p-2 rounded border border-border bg-muted/20" value={ctaSecondary.link} onChange={e => onSectionChange({ ...section, meta: { ...meta, ctaSecondary: { ...(meta.ctaSecondary as object || {}), link: e.target.value } } })} />
            <label className="block font-semibold mb-1">Stats (JSON array)</label>
            <textarea className="w-full mb-2 p-2 rounded border border-border bg-muted/20 font-mono text-sm" rows={6} value={JSON.stringify(heroStats, null, 2)} onChange={e => handleJsonChange(e, arr => Array.isArray(arr) && onElementsChange(arr))} />
            {jsonError && <div className="text-red-500 text-xs">{jsonError}</div>}
          </div>
          <details className="mt-6">
            <summary className="cursor-pointer font-semibold">Raw JSON</summary>
            <pre className="bg-muted/20 p-4 rounded text-xs overflow-x-auto mt-2">{JSON.stringify({ meta, stats: heroStats }, null, 2)}</pre>
          </details>
        </div>
      );
    }
    // --- FEATURES ---
    case "features": {
      // Ensure all Feature fields are present
      const features: Feature[] = stats.map((f) => {
        if (typeof f === 'object' && f !== null && 'title' in f && 'description' in f) {
          const feat = f as unknown as Feature;
          return { title: feat.title || '', description: feat.description || '' };
        }
        return { title: '', description: '' };
      });
      // Handlers for card-based editing
      const handleFeatureChange = (idx: number, key: keyof Feature, value: string) => {
        const updated = features.map((f, i) => i === idx ? { ...f, [key]: value } : f);
        onElementsChange(updated as unknown as Record<string, unknown>[]);
      };
      const handleAddFeature = () => {
        onElementsChange((([...features, { title: '', description: '' }]) as unknown) as Record<string, unknown>[]);
      };
      const handleRemoveFeature = (idx: number) => {
        onElementsChange((features.filter((_, i) => i !== idx) as unknown) as Record<string, unknown>[]);
      };
      const handleMoveFeature = (idx: number, dir: -1 | 1) => {
        const newArr = [...features];
        const target = idx + dir;
        if (target < 0 || target >= features.length) return;
        [newArr[idx], newArr[target]] = [newArr[target], newArr[idx]];
        onElementsChange((newArr as unknown) as Record<string, unknown>[]);
      };
      return (
        <div className="p-6 bg-card rounded-xl shadow-lg flex flex-col gap-8">
          <div className={previewClass}>
            <h4 className="text-lg font-semibold mb-2">Live Preview</h4>
            {features.length > 0 ? (
              <FeaturesShowcase features={features} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground/70 text-lg font-semibold">No data to preview.</div>
            )}
          </div>
          <div className="space-y-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                tabIndex={0}
                className={`relative bg-muted/30 rounded-xl p-4 shadow-md flex flex-col gap-2 border border-border/30 group transition-all outline-none ${selectedIndex === idx ? 'ring-2 ring-primary' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedIndex(idx)}
                onFocus={() => setSelectedIndex(idx)}
              >
                <div className="flex gap-2 items-center mb-2">
                  <span className="font-semibold text-primary">Feature {idx + 1}</span>
                  <button type="button" className="ml-auto text-xs text-red-500 hover:underline" onClick={e => { stopPropagation(e); handleRemoveFeature(idx); }}>Remove</button>
                  <button type="button" className="text-xs text-muted-foreground hover:text-primary px-1" onClick={e => { stopPropagation(e); handleMoveFeature(idx, -1); }} disabled={idx === 0}>↑</button>
                  <button type="button" className="text-xs text-muted-foreground hover:text-primary px-1" onClick={e => { stopPropagation(e); handleMoveFeature(idx, 1); }} disabled={idx === features.length - 1}>↓</button>
                </div>
                <label className="block text-xs font-medium mb-1">Title</label>
                <input className="w-full mb-2 p-2 rounded border border-border bg-background/80" value={feature.title} onChange={e => handleFeatureChange(idx, 'title', e.target.value)} onClick={stopPropagation} onFocus={stopPropagation} />
                <label className="block text-xs font-medium mb-1">Description</label>
                <textarea className="w-full p-2 rounded border border-border bg-background/80" rows={2} value={feature.description} onChange={e => handleFeatureChange(idx, 'description', e.target.value)} onClick={stopPropagation} onFocus={stopPropagation} />
              </div>
            ))}
            <button type="button" className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition-all" onClick={handleAddFeature}>Add Feature</button>
            <button type="button" className="block mt-4 text-xs text-muted-foreground hover:underline" onClick={() => setShowAdvanced(v => !v)}>{showAdvanced ? 'Hide' : 'Show'} Advanced (JSON)</button>
            {showAdvanced && (
              <textarea className="w-full mt-2 p-2 rounded border border-border bg-muted/20 font-mono text-sm" rows={8} value={JSON.stringify(features, null, 2)} onChange={e => handleJsonChange(e, arr => Array.isArray(arr) && onElementsChange(arr))} />
            )}
            {jsonError && <div className="text-red-500 text-xs">{jsonError}</div>}
          </div>
          <details className="mt-6">
            <summary className="cursor-pointer font-semibold">Raw JSON</summary>
            <pre className="bg-muted/20 p-4 rounded text-xs overflow-x-auto mt-2">{JSON.stringify({ meta, features }, null, 2)}</pre>
          </details>
        </div>
      );
    }
    case "services": {
      // Ensure all Service fields are present
      const services: Service[] = stats.map((s) => {
        if (typeof s === 'object' && s !== null && 'title' in s && 'description' in s) {
          const serv = s as unknown as Service;
          return { title: serv.title || '', description: serv.description || '' };
        }
        return { title: '', description: '' };
      });
      const handleServiceChange = (idx: number, key: keyof Service, value: string) => {
        const updated = services.map((s, i) => i === idx ? { ...s, [key]: value } : s);
        onElementsChange(updated as unknown as Record<string, unknown>[]);
      };
      const handleAddService = () => {
        onElementsChange((([...services, { title: '', description: '' }]) as unknown) as Record<string, unknown>[]);
      };
      const handleRemoveService = (idx: number) => {
        onElementsChange((services.filter((_, i) => i !== idx) as unknown) as Record<string, unknown>[]);
      };
      const handleMoveService = (idx: number, dir: -1 | 1) => {
        const newArr = [...services];
        const target = idx + dir;
        if (target < 0 || target >= services.length) return;
        [newArr[idx], newArr[target]] = [newArr[target], newArr[idx]];
        onElementsChange((newArr as unknown) as Record<string, unknown>[]);
      };
      return (
        <div className="p-6 bg-card rounded-xl shadow-lg flex flex-col gap-8">
          <div className={previewClass}>
            <h4 className="text-lg font-semibold mb-2">Live Preview</h4>
            <ServicesGrid services={services.length > 0 ? services : [{ title: 'Sample Service', description: 'This is a sample service.' }]} />
          </div>
          <div className="space-y-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                tabIndex={0}
                className={`relative bg-muted/30 rounded-xl p-4 shadow-md flex flex-col gap-2 border border-border/30 group transition-all outline-none ${selectedIndex === idx ? 'ring-2 ring-primary' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedIndex(idx)}
                onFocus={() => setSelectedIndex(idx)}
              >
                <div className="flex gap-2 items-center mb-2">
                  <span className="font-semibold text-primary">Service {idx + 1}</span>
                  <button type="button" className="ml-auto text-xs text-red-500 hover:underline" onClick={e => { stopPropagation(e); handleRemoveService(idx); }}>Remove</button>
                  <button type="button" className="text-xs text-muted-foreground hover:text-primary px-1" onClick={e => { stopPropagation(e); handleMoveService(idx, -1); }} disabled={idx === 0}>↑</button>
                  <button type="button" className="text-xs text-muted-foreground hover:text-primary px-1" onClick={e => { stopPropagation(e); handleMoveService(idx, 1); }} disabled={idx === services.length - 1}>↓</button>
                </div>
                <label className="block text-xs font-medium mb-1">Title</label>
                <input className="w-full mb-2 p-2 rounded border border-border bg-background/80" value={service.title} onChange={e => handleServiceChange(idx, 'title', e.target.value)} onClick={stopPropagation} onFocus={stopPropagation} />
                <label className="block text-xs font-medium mb-1">Description</label>
                <textarea className="w-full p-2 rounded border border-border bg-background/80" rows={2} value={service.description} onChange={e => handleServiceChange(idx, 'description', e.target.value)} onClick={stopPropagation} onFocus={stopPropagation} />
              </div>
            ))}
            <button type="button" className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition-all" onClick={handleAddService}>Add Service</button>
            <button type="button" className="block mt-4 text-xs text-muted-foreground hover:underline" onClick={() => setShowAdvanced(v => !v)}>{showAdvanced ? 'Hide' : 'Show'} Advanced (JSON)</button>
            {showAdvanced && (
              <textarea className="w-full mt-2 p-2 rounded border border-border bg-muted/20 font-mono text-sm" rows={8} value={JSON.stringify(services, null, 2)} onChange={e => handleJsonChange(e, arr => Array.isArray(arr) && onElementsChange(arr))} />
            )}
            {jsonError && <div className="text-red-500 text-xs">{jsonError}</div>}
          </div>
          <details className="mt-6">
            <summary className="cursor-pointer font-semibold">Raw JSON</summary>
            <pre className="bg-muted/20 p-4 rounded text-xs overflow-x-auto mt-2">{JSON.stringify({ meta, services }, null, 2)}</pre>
          </details>
        </div>
      );
    }
    // --- TEAM ---
    case "team": {
      // For team, elements may be a mix of members and stats, so split by shape
      const members = stats.filter((el) => (el as { role?: string }).role);
      const teamStats = stats.filter((el) => !(el as { role?: string }).role);
      const handleMemberChange = (idx: number, key: string, value: string) => {
        const updated = members.map((m, i) => i === idx ? { ...m, [key]: value } : m);
        onElementsChange([...updated, ...teamStats] as unknown as Record<string, unknown>[]);
      };
      const handleAddMember = () => {
        onElementsChange(([
          ...members,
          { name: '', role: '', image: '', bio: '', linkedin: '', twitter: '' },
          ...teamStats
        ] as unknown) as Record<string, unknown>[]);
      };
      const handleRemoveMember = (idx: number) => {
        onElementsChange(([
          ...members.filter((_, i) => i !== idx),
          ...teamStats
        ] as unknown) as Record<string, unknown>[]);
      };
      const handleMoveMember = (idx: number, dir: -1 | 1) => {
        const newArr = [...members];
        const target = idx + dir;
        if (target < 0 || target >= members.length) return;
        [newArr[idx], newArr[target]] = [newArr[target], newArr[idx]];
        onElementsChange(([
          ...newArr,
          ...teamStats
        ] as unknown) as Record<string, unknown>[]);
      };
      const handleStatChange = (idx: number, key: string, value: string) => {
        const updated = teamStats.map((s, i) => i === idx ? { ...s, [key]: value } : s);
        onElementsChange([...members, ...updated] as unknown as Record<string, unknown>[]);
      };
      const handleAddStat = () => {
        onElementsChange(([
          ...members,
          ...teamStats,
          { label: '', value: '' }
        ] as unknown) as Record<string, unknown>[]);
      };
      const handleRemoveStat = (idx: number) => {
        onElementsChange(([
          ...members,
          ...teamStats.filter((_, i) => i !== idx)
        ] as unknown) as Record<string, unknown>[]);
      };
      const handleMoveStat = (idx: number, dir: -1 | 1) => {
        const newArr = [...teamStats];
        const target = idx + dir;
        if (target < 0 || target >= teamStats.length) return;
        [newArr[idx], newArr[target]] = [newArr[target], newArr[idx]];
        onElementsChange(([
          ...members,
          ...newArr
        ] as unknown) as Record<string, unknown>[]);
      };
      return (
        <div className="p-6 bg-card rounded-xl shadow-lg flex flex-col gap-8">
          <div className={previewClass}>
            <h4 className="text-lg font-semibold mb-2">Live Preview</h4>
            {members.length > 0 ? (
              <TeamSection members={members} stats={teamStats} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground/70 text-lg font-semibold">No data to preview.</div>
            )}
          </div>
          <div className="space-y-6">
            {members.map((member, idx) => (
              <div
                key={idx}
                tabIndex={0}
                className={`relative bg-muted/30 rounded-xl p-4 shadow-md flex flex-col gap-2 border border-border/30 group transition-all outline-none ${selectedIndex === idx ? 'ring-2 ring-primary' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedIndex(idx)}
                onFocus={() => setSelectedIndex(idx)}
              >
                <div className="flex gap-2 items-center mb-2">
                  <span className="font-semibold">Member {idx + 1}</span>
                  <button type="button" className="ml-auto text-xs text-red-500 hover:underline" onClick={e => { stopPropagation(e); handleRemoveMember(idx); }}>Remove</button>
                  <button type="button" className="text-xs text-muted-foreground hover:text-primary px-1" onClick={e => { stopPropagation(e); handleMoveMember(idx, -1); }} disabled={idx === 0}>↑</button>
                  <button type="button" className="text-xs text-muted-foreground hover:text-primary px-1" onClick={e => { stopPropagation(e); handleMoveMember(idx, 1); }} disabled={idx === members.length - 1}>↓</button>
                </div>
                <label className="block text-xs font-medium mb-1">Name</label>
                <input className="w-full mb-2 p-2 rounded border border-border bg-background/80" value={(member as any).name || ''} onChange={e => handleMemberChange(idx, 'name', e.target.value)} onClick={stopPropagation} onFocus={stopPropagation} />
                <label className="block text-xs font-medium mb-1">Role</label>
                <input className="w-full mb-2 p-2 rounded border border-border bg-background/80" value={(member as any).role || ''} onChange={e => handleMemberChange(idx, 'role', e.target.value)} onClick={stopPropagation} onFocus={stopPropagation} />
                <label className="block text-xs font-medium mb-1">Image URL</label>
                <input className="w-full mb-2 p-2 rounded border border-border bg-background/80" value={(member as any).image || ''} onChange={e => handleMemberChange(idx, 'image', e.target.value)} onClick={stopPropagation} onFocus={stopPropagation} />
                <label className="block text-xs font-medium mb-1">Bio</label>
                <textarea className="w-full p-2 rounded border border-border bg-background/80" rows={2} value={(member as any).bio || ''} onChange={e => handleMemberChange(idx, 'bio', e.target.value)} onClick={stopPropagation} onFocus={stopPropagation} />
                <label className="block text-xs font-medium mb-1">LinkedIn</label>
                <input className="w-full mb-2 p-2 rounded border border-border bg-background/80" value={(member as any).linkedin || ''} onChange={e => handleMemberChange(idx, 'linkedin', e.target.value)} onClick={stopPropagation} onFocus={stopPropagation} />
                <label className="block text-xs font-medium mb-1">Twitter</label>
                <input className="w-full mb-2 p-2 rounded border border-border bg-background/80" value={(member as any).twitter || ''} onChange={e => handleMemberChange(idx, 'twitter', e.target.value)} onClick={stopPropagation} onFocus={stopPropagation} />
              </div>
            ))}
            {teamStats.map((stat, idx) => (
              <div
                key={idx}
                tabIndex={0}
                className={`relative bg-muted/30 rounded-xl p-4 shadow-md flex flex-col gap-2 border border-border/30 group transition-all outline-none ${selectedIndex === idx + members.length ? 'ring-2 ring-primary' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedIndex(idx + members.length)}
                onFocus={() => setSelectedIndex(idx + members.length)}
              >
                <div className="flex gap-2 items-center mb-2">
                  <span className="font-semibold">Stat {idx + 1}</span>
                  <button type="button" className="ml-auto text-xs text-red-500 hover:underline" onClick={e => { stopPropagation(e); handleRemoveStat(idx); }}>Remove</button>
                  <button type="button" className="text-xs text-muted-foreground hover:text-primary px-1" onClick={e => { stopPropagation(e); handleMoveStat(idx, -1); }} disabled={idx === 0}>↑</button>
                  <button type="button" className="text-xs text-muted-foreground hover:text-primary px-1" onClick={e => { stopPropagation(e); handleMoveStat(idx, 1); }} disabled={idx === teamStats.length - 1}>↓</button>
                </div>
                <label className="block text-xs font-medium mb-1">Label</label>
                <input className="w-full mb-2 p-2 rounded border border-border bg-background/80" value={(stat as any).label || ''} onChange={e => handleStatChange(idx, 'label', e.target.value)} onClick={stopPropagation} onFocus={stopPropagation} />
                <label className="block text-xs font-medium mb-1">Value</label>
                <input className="w-full mb-2 p-2 rounded border border-border bg-background/80" value={(stat as any).value || ''} onChange={e => handleStatChange(idx, 'value', e.target.value)} onClick={stopPropagation} onFocus={stopPropagation} />
              </div>
            ))}
            <button type="button" className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition-all" onClick={handleAddMember}>Add Member</button>
            <button type="button" className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition-all" onClick={handleAddStat}>Add Stat</button>
            <button type="button" className="block mt-4 text-xs text-muted-foreground hover:underline" onClick={() => setShowAdvanced(v => !v)}>{showAdvanced ? 'Hide' : 'Show'} Advanced (JSON)</button>
            {showAdvanced && (
              <textarea className="w-full mt-2 p-2 rounded border border-border bg-muted/20 font-mono text-sm" rows={8} value={JSON.stringify([...members, ...teamStats], null, 2)} onChange={e => handleJsonChange(e, arr => Array.isArray(arr) && onElementsChange(arr))} />
            )}
            {jsonError && <div className="text-red-500 text-xs">{jsonError}</div>}
          </div>
          <details className="mt-6">
            <summary className="cursor-pointer font-semibold">Raw JSON</summary>
            <pre className="bg-muted/20 p-4 rounded text-xs overflow-x-auto mt-2">{JSON.stringify({ meta, members, stats: teamStats }, null, 2)}</pre>
          </details>
        </div>
      );
    }
    // --- TESTIMONIALS ---
    case "testimonials": {
      // LOCKED: Show Coming Soon luxury card, disable editing
      return (
        <div className="p-6 bg-card rounded-xl shadow-lg flex flex-col gap-8">
          <div className={previewClass + " flex items-center justify-center min-h-[300px]"}>
            <span className="luxury-h2 text-2xl md:text-3xl font-bold gradient-text text-center w-full">Testimonials Section<br/>Coming Soon</span>
          </div>
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <span className="text-lg font-semibold text-muted-foreground/80">Editing for testimonials is currently locked.<br/>Please check back soon.</span>
          </div>
        </div>
      );
    }
    // --- CTA ---
    case "cta": {
      // Type assertions for meta fields
      const title = (meta.title as string | undefined) || '';
      const subtitle = (meta.subtitle as string | undefined) || '';
      const primaryCTA = (meta.primaryCTA as { text: string; href: string } | undefined) || { text: '', href: '' };
      const secondaryCTA = (meta.secondaryCTA as { text: string; href: string } | undefined) || { text: '', href: '' };
      const trustIndicators = (meta.trustIndicators as string[] | undefined) || [];
      return (
        <div className="p-6 bg-card rounded-xl shadow-lg flex flex-col gap-8">
          <div className={previewClass}>
            <h4 className="text-lg font-semibold mb-2">Live Preview</h4>
            {title || subtitle || (trustIndicators && trustIndicators.length > 0) ? (
              <CTASection title={title} subtitle={subtitle} primaryCTA={primaryCTA} secondaryCTA={secondaryCTA} trustIndicators={trustIndicators} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground/70 text-lg font-semibold">No data to preview.</div>
            )}
          </div>
          <div className="space-y-4">
            <label className="block font-semibold mb-1">Title</label>
            <input className="w-full mb-2 p-2 rounded border border-border bg-muted/20" value={title} onChange={e => onSectionChange({ ...section, meta: { ...meta, title: e.target.value } })} />
            <label className="block font-semibold mb-1">Subtitle</label>
            <input className="w-full mb-2 p-2 rounded border border-border bg-muted/20" value={subtitle} onChange={e => onSectionChange({ ...section, meta: { ...meta, subtitle: e.target.value } })} />
            <label className="block font-semibold mb-1">Primary CTA Text</label>
            <input className="w-full mb-2 p-2 rounded border border-border bg-muted/20" value={primaryCTA.text} onChange={e => onSectionChange({ ...section, meta: { ...meta, primaryCTA: { ...(meta.primaryCTA as object || {}), text: e.target.value } } })} />
            <label className="block font-semibold mb-1">Primary CTA Link</label>
            <input className="w-full mb-2 p-2 rounded border border-border bg-muted/20" value={primaryCTA.href} onChange={e => onSectionChange({ ...section, meta: { ...meta, primaryCTA: { ...(meta.primaryCTA as object || {}), href: e.target.value } } })} />
            <label className="block font-semibold mb-1">Secondary CTA Text</label>
            <input className="w-full mb-2 p-2 rounded border border-border bg-muted/20" value={secondaryCTA.text} onChange={e => onSectionChange({ ...section, meta: { ...meta, secondaryCTA: { ...(meta.secondaryCTA as object || {}), text: e.target.value } } })} />
            <label className="block font-semibold mb-1">Secondary CTA Link</label>
            <input className="w-full mb-2 p-2 rounded border border-border bg-muted/20" value={secondaryCTA.href} onChange={e => onSectionChange({ ...section, meta: { ...meta, secondaryCTA: { ...(meta.secondaryCTA as object || {}), href: e.target.value } } })} />
            <label className="block font-semibold mb-1">Trust Indicators (JSON array of strings)</label>
            <textarea className="w-full mb-2 p-2 rounded border border-border bg-muted/20 font-mono text-sm" rows={4} value={JSON.stringify(trustIndicators, null, 2)} onChange={e => handleJsonChange(e, arr => Array.isArray(arr) && onSectionChange({ ...section, meta: { ...meta, trustIndicators: arr } }))} />
            {jsonError && <div className="text-red-500 text-xs">{jsonError}</div>}
          </div>
          <details className="mt-6">
            <summary className="cursor-pointer font-semibold">Raw JSON</summary>
            <pre className="bg-muted/20 p-4 rounded text-xs overflow-x-auto mt-2">{JSON.stringify(meta, null, 2)}</pre>
          </details>
        </div>
      );
    }
    // --- PROCESS & VELOCITY SCROLL & DEFAULT ---
    default: {
      // Card-based fallback editor for unknown/process/velocityScroll sections
      const elementsList = stats as Record<string, unknown>[];
      const handleElementChange = (idx: number, key: string, value: string) => {
        const updated = elementsList.map((el, i) => i === idx ? { ...el, [key]: value } : el);
        onElementsChange(updated as unknown as Record<string, unknown>[]);
      };
      const handleAddElement = () => {
        onElementsChange(([
          ...elementsList,
          { key: '', value: '' }
        ] as unknown) as Record<string, unknown>[]);
      };
      const handleRemoveElement = (idx: number) => {
        onElementsChange((elementsList.filter((_, i) => i !== idx) as unknown) as Record<string, unknown>[]);
      };
      const handleMoveElement = (idx: number, dir: -1 | 1) => {
        const newArr = [...elementsList];
        const target = idx + dir;
        if (target < 0 || target >= elementsList.length) return;
        [newArr[idx], newArr[target]] = [newArr[target], newArr[idx]];
        onElementsChange((newArr as unknown) as Record<string, unknown>[]);
      };
      return (
        <div className="p-6 bg-gradient-to-br from-[#181C24] via-[#23283A] to-[#10131A] rounded-2xl shadow-2xl border border-border/40 flex flex-col gap-8">
          <div className={previewClass}>
            <h4 className="text-lg font-semibold mb-2">Live Preview</h4>
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/70 text-lg font-semibold">
              <span>Preview not available for this section type.</span>
            </div>
          </div>
          <div className="space-y-6">
            {elementsList.map((el, idx) => (
              <div
                key={idx}
                tabIndex={0}
                className={`relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg flex flex-col gap-3 border border-border/30 group transition-all outline-none ${selectedIndex === idx ? 'ring-2 ring-primary' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedIndex(idx)}
                onFocus={() => setSelectedIndex(idx)}
              >
                <div className="flex gap-2 items-center mb-2">
                  <span className="font-semibold text-primary">Item {idx + 1}</span>
                  <button type="button" className="ml-auto text-xs text-red-500 hover:underline" onClick={e => { stopPropagation(e); handleRemoveElement(idx); }}>Remove</button>
                  <button type="button" className="text-xs text-muted-foreground hover:text-primary px-1" onClick={e => { stopPropagation(e); handleMoveElement(idx, -1); }} disabled={idx === 0}>↑</button>
                  <button type="button" className="text-xs text-muted-foreground hover:text-primary px-1" onClick={e => { stopPropagation(e); handleMoveElement(idx, 1); }} disabled={idx === elementsList.length - 1}>↓</button>
                </div>
                {Object.entries(el).map(([key, value], kidx) => (
                  <div key={kidx} className="flex flex-col gap-1">
                    <label className="block text-xs font-medium mb-1">{key}</label>
                    <input className="w-full mb-2 p-2 rounded border border-border bg-background/80" value={String(value ?? '')} onChange={e => handleElementChange(idx, key, e.target.value)} onClick={stopPropagation} onFocus={stopPropagation} />
                  </div>
                ))}
                <div className="flex flex-col gap-1">
                  <label className="block text-xs font-medium mb-1">Add New Key</label>
                  <input className="w-full mb-2 p-2 rounded border border-border bg-background/80" placeholder="key" onBlur={e => { if (e.target.value) handleElementChange(idx, e.target.value, ''); }} onClick={stopPropagation} onFocus={stopPropagation} />
                </div>
              </div>
            ))}
            <button type="button" className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition-all" onClick={handleAddElement}>Add Item</button>
            <button type="button" className="block mt-4 text-xs text-muted-foreground hover:underline" onClick={() => setShowAdvanced(v => !v)}>{showAdvanced ? 'Hide' : 'Show'} Advanced (JSON)</button>
            {showAdvanced && (
              <textarea className="w-full mt-2 p-2 rounded border border-border bg-muted/20 font-mono text-sm" rows={8} value={JSON.stringify(elementsList, null, 2)} onChange={e => handleJsonChange(e, arr => Array.isArray(arr) && onElementsChange(arr))} />
            )}
            {jsonError && <div className="text-red-500 text-xs">{jsonError}</div>}
          </div>
          <details className="mt-6">
            <summary className="cursor-pointer font-semibold">Raw JSON</summary>
            <pre className="bg-muted/20 p-4 rounded text-xs overflow-x-auto mt-2">{JSON.stringify({ meta, elements: elementsList }, null, 2)}</pre>
          </details>
        </div>
      );
    }
  }
}

export default function Editor() {
  const [selectedPage, setSelectedPage] = useState<string>('home');
  const [selectedSection, setSelectedSection] = useState<string>('hero');
  const [sections, setSections] = useState<Section[]>([]);
  const [elementsBySection, setElementsBySection] = useState<Record<string, Element[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [homepageOpen, setHomepageOpen] = useState<boolean>(true);

  // Fetch all homepage sections and elements
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      setSuccess(null);
      try {
        const { data: page } = await supabase.from('pages').select('id').eq('slug', 'home').single();
        if (!page) throw new Error('No homepage found');
        const { data: fetchedSections } = await supabase.from('sections').select('*').eq('page_id', page.id).order('order');
        if (!mounted) return;
        setSections(fetchedSections || []);
        const sectionIds = (fetchedSections || []).map((s: Section) => s.id);
        const { data: fetchedElements } = await supabase.from('elements').select('*').in('section_id', sectionIds).order('order');
        if (!mounted) return;
        const bySection: Record<string, Element[]> = {};
        for (const s of fetchedSections || []) {
          bySection[s.type] = (fetchedElements || []).filter((el: Element) => el.section_id === s.id);
        }
        setElementsBySection(bySection);
      } catch (e: unknown) {
        if (!mounted) return;
        setError((e as Error).message || 'Failed to load homepage sections');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Section state for editing
  const section = useMemo(() => sections.find(s => s.type === selectedSection) || { id: '', type: selectedSection, meta: {} as Record<string, unknown> }, [sections, selectedSection]);
  const elements = useMemo(() => elementsBySection[selectedSection] || [], [elementsBySection, selectedSection]);
  const [editSection, setEditSection] = useState<Section>(section);
  const [editElements, setEditElements] = useState<Record<string, unknown>[]>(elements.map((el) => el.content));
  useEffect(() => {
    setEditSection(section);
    setEditElements(elements.map((el) => el.content));
  }, [section, elements]);

  // Save logic
  const handleSave = useCallback(async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await supabase.from('sections').update({ meta: editSection.meta }).eq('id', section.id);
      await supabase.from('elements').delete().eq('section_id', section.id);
      for (let i = 0; i < editElements.length; i++) {
        await supabase.from('elements').insert({
          section_id: section.id,
          type: selectedSection === 'team' ? ((editElements[i] as { role?: string }).role ? 'team_member' : 'team_stat') : selectedSection === 'testimonials' ? 'testimonial' : selectedSection === 'process' ? 'process_step' : selectedSection === 'features' ? 'feature' : selectedSection === 'services' ? 'service' : selectedSection === 'cta' ? 'cta_trust_indicator' : selectedSection === 'hero' ? 'hero_stat' : selectedSection,
          content: editElements[i],
          order: i
        });
      }
      setSuccess('Section saved!');
    } catch (e: unknown) {
      setError((e as Error).message || 'Failed to save section');
    } finally {
      setSaving(false);
    }
  }, [editSection, editElements, section.id, selectedSection]);

  // --- FINAL STRUCTURE ---
  return (
    <div className="min-h-screen bg-black text-foreground flex">
      {/* Sidebar */}
      <aside className="border-r border-border/50 p-4 w-[280px] min-w-[220px] max-w-[320px] bg-card/40 flex flex-col">
        <div className="mb-8 text-2xl font-bold luxury-h4 gradient-text flex items-center gap-2"><PanelLeft className="w-6 h-6" /> Editor</div>
        <div className="space-y-2 flex-1">
          {/* Homepage dropdown */}
          <button
            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 luxury-body text-base font-semibold ${selectedPage === 'home' ? 'bg-primary/20 text-primary border border-primary/30' : 'text-muted-foreground hover:text-foreground hover:bg-card/40 border border-transparent'}`}
            onClick={() => setHomepageOpen((v) => !v)}
          >
            <Home className="w-5 h-5" />
            <span>Homepage</span>
            <span className={`ml-auto transition-transform ${homepageOpen ? 'rotate-90' : ''}`}>▶</span>
          </button>
          {homepageOpen && (
            <div className="pl-6 space-y-1">
              {HOMEPAGE_SECTIONS.map((s) => (
                <button
                  key={s.type}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 luxury-body text-base font-medium ${selectedSection === s.type ? 'bg-primary/10 text-primary border border-primary/30' : 'text-muted-foreground hover:text-foreground hover:bg-card/40 border border-transparent'}`}
                  onClick={() => { setSelectedPage('home'); setSelectedSection(s.type); }}
                >
                  {s.type === 'hero' && <Rocket className="w-5 h-5" />}
                  {s.type === 'services' && <Star className="w-5 h-5" />}
                  {s.type === 'features' && <Zap className="w-5 h-5" />}
                  {s.type === 'process' && <Activity className="w-5 h-5" />}
                  {s.type === 'team' && <Users className="w-5 h-5" />}
                  {s.type === 'testimonials' && <MessageCircle className="w-5 h-5" />}
                  {s.type === 'cta' && <Home className="w-5 h-5" />}
                  {s.type === 'velocityScroll' && <Layers className="w-5 h-5" />}
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          )}
          {/* Other pages (flat) */}
          {PAGES.filter((p) => p.slug !== 'home').map((p) => (
            <button
              key={p.slug}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 luxury-body text-base font-semibold ${selectedPage === p.slug ? 'bg-primary/20 text-primary border border-primary/30' : 'text-muted-foreground hover:text-foreground hover:bg-card/40 border border-transparent'} ${p.comingSoon ? 'opacity-60 cursor-not-allowed' : ''}`}
              onClick={() => !p.comingSoon && setSelectedPage(p.slug)}
              disabled={p.comingSoon}
            >
              {p.slug === 'about' && <Users className="w-5 h-5" />}
              {p.slug === 'services' && <Star className="w-5 h-5" />}
              {p.slug === 'case-studies' && <Layers className="w-5 h-5" />}
              {p.slug === 'resources' && <Zap className="w-5 h-5" />}
              {p.slug === 'contact' && <MessageCircle className="w-5 h-5" />}
              <span>{p.label}</span>
              {p.comingSoon && <span className="text-xs ml-2">(Coming Soon)</span>}
            </button>
          ))}
        </div>
        <div className="pt-8 text-xs text-muted-foreground luxury-body opacity-70">EEGNITE &copy; {new Date().getFullYear()}</div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="luxury-h2 text-3xl md:text-4xl font-bold mb-8 gradient-text">Homepage Editor</h2>
          {loading && <div className="luxury-body text-lg text-muted-foreground">Loading...</div>}
          {error && <div className="text-red-500 mb-4 luxury-body">{error}</div>}
          {success && <div className="text-green-500 mb-4 luxury-body">{success}</div>}
          {!loading && !error && section && (
            <>
              <div className="relative rounded-[1.25rem] border border-border/50 p-2 mb-16 w-full">
                <div className="relative overflow-hidden rounded-xl border border-border/30 bg-card/40 p-6 backdrop-blur-sm shadow-elegant w-full flex-1">
                  <SectionEditor
                    section={editSection}
                    elementContents={editElements}
                    onSectionChange={setEditSection}
                    onElementsChange={setEditElements}
                  />
                </div>
              </div>
              {/* Sticky Save Button: always visible, never overlaps, always clickable */}
              <div className="sticky bottom-0 left-0 w-full flex justify-end z-40 mt-4">
                <button className="btn-premium px-8 py-4 text-lg font-bold shadow-elegant hover-glow transition-all duration-200" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
              </div>
            </>
          )}
          {selectedPage !== 'home' && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-lg mt-24 luxury-body">
              <span>Coming Soon</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 