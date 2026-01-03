import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrolled = window.scrollY;
      const orbs = containerRef.current.querySelectorAll('.gradient-orb');
      
      orbs.forEach((orb, i) => {
        const speed = 0.15 * (i + 1);
        const element = orb as HTMLElement;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-50 overflow-hidden bg-background transition-colors duration-500"
      aria-hidden="true"
    >
      {/* Base gradient - adapts to theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background transition-colors duration-500" />
      
      {/* Gradient Orb 1 - Top Left - Indigo */}
      <div 
        className="gradient-orb absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-30 dark:opacity-30 animate-orb-float-1"
        style={{ 
          background: 'radial-gradient(circle, hsl(234 89% 74% / 0.6) 0%, transparent 70%)',
          filter: 'blur(80px)',
          willChange: 'transform'
        }} 
      />
      
      {/* Gradient Orb 2 - Top Right - Purple */}
      <div 
        className="gradient-orb absolute top-[5%] -right-24 w-[500px] h-[500px] rounded-full opacity-25 dark:opacity-25 animate-orb-float-2"
        style={{ 
          background: 'radial-gradient(circle, hsl(280 87% 65% / 0.5) 0%, transparent 70%)',
          filter: 'blur(100px)',
          willChange: 'transform'
        }} 
      />
      
      {/* Gradient Orb 3 - Middle - Amber/Gold (Brand Color) */}
      <div 
        className="gradient-orb absolute top-[40%] left-[20%] w-[400px] h-[400px] rounded-full opacity-25 dark:opacity-20 animate-orb-float-3"
        style={{ 
          background: 'radial-gradient(circle, hsl(38 92% 50% / 0.5) 0%, transparent 70%)',
          filter: 'blur(90px)',
          willChange: 'transform'
        }} 
      />
      
      {/* Gradient Orb 4 - Bottom Left - Pink */}
      <div 
        className="gradient-orb absolute bottom-[20%] -left-24 w-[550px] h-[550px] rounded-full opacity-20 dark:opacity-20 animate-orb-float-2"
        style={{ 
          background: 'radial-gradient(circle, hsl(330 81% 60% / 0.4) 0%, transparent 70%)',
          filter: 'blur(110px)',
          willChange: 'transform'
        }} 
      />
      
      {/* Gradient Orb 5 - Bottom Right - Blue */}
      <div 
        className="gradient-orb absolute -bottom-32 right-[10%] w-[600px] h-[600px] rounded-full opacity-25 dark:opacity-25 animate-orb-float-1"
        style={{ 
          background: 'radial-gradient(circle, hsl(217 91% 60% / 0.4) 0%, transparent 70%)',
          filter: 'blur(100px)',
          willChange: 'transform'
        }} 
      />

      {/* Mesh Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-30 animate-mesh-gradient"
        style={{
          backgroundImage: `
            radial-gradient(at 20% 30%, hsl(280 70% 50% / 0.15) 0px, transparent 50%),
            radial-gradient(at 80% 70%, hsl(200 80% 50% / 0.15) 0px, transparent 50%),
            radial-gradient(at 50% 50%, hsl(38 90% 50% / 0.1) 0px, transparent 50%)
          `,
          backgroundSize: '100% 100%',
        }}
      />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Noise texture for depth */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
