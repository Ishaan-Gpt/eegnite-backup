// Simplified floating elements without 3D canvas to avoid React Three Fiber errors
export function Floating3D() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Simple animated floating shapes */}
      <div className="absolute top-20 left-10 w-8 h-8 bg-primary/20 rounded-full animate-float-gentle" 
           style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-6 h-6 bg-accent/20 rounded-full animate-float-gentle" 
           style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-10 h-10 bg-secondary/20 rounded-full animate-float-gentle" 
           style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-20 right-10 w-7 h-7 bg-primary/30 rounded-full animate-float-gentle" 
           style={{ animationDelay: '1s' }} />
    </div>
  )
}