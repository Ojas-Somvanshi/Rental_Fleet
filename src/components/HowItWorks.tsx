import { useEffect, useRef } from 'react';
import { Search, CalendarCheck, Car } from 'lucide-react';
import { motion } from 'framer-motion';
import anime from 'animejs';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Choose Your Vehicle',
    description: 'Browse our extensive Rides and find the perfect car that matches your needs, style, and budget.',
  },
  {
    number: '02',
    icon: CalendarCheck,
    title: 'Book Online',
    description: 'Reserve your vehicle in just a few clicks with our secure and simple booking system.',
  },
  {
    number: '03',
    icon: Car,
    title: 'Hit the Road',
    description: 'Pick up your vehicle from your chosen location and enjoy the freedom of the open road.',
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate numbers
            anime({
              targets: '.step-number',
              scale: [0, 1],
              opacity: [0, 1],
              rotate: [90, 0],
              duration: 800,
              delay: anime.stagger(200),
              easing: 'easeOutElastic(1, 0.5)',
            });

            // Animate connector lines
            anime({
              targets: '.connector-line',
              scaleX: [0, 1],
              duration: 600,
              delay: anime.stagger(200, { start: 400 }),
              easing: 'easeOutQuad',
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="section-heading mb-4">
            Easy as <span className="text-gradient">1-2-3</span>
          </h2>
          <p className="section-subheading mx-auto">
            Renting a Ride has never been simpler. Follow these three easy steps and you'll be on your way.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Desktop Connector Lines */}
          <div className="hidden lg:block absolute top-24 left-[calc(16.67%+60px)] right-[calc(16.67%+60px)] h-0.5">
            <div className="connector-line absolute left-0 w-[calc(50%-30px)] h-full bg-gradient-to-r from-primary to-primary/50 origin-left" />
            <div className="connector-line absolute right-0 w-[calc(50%-30px)] h-full bg-gradient-to-r from-primary/50 to-primary origin-left" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative text-center group"
              >
                {/* Number Badge */}
                <div className="step-number relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 rotate-6 transition-transform group-hover:rotate-12" />
                  <div className="absolute inset-0 rounded-2xl bg-card border border-border/50 flex items-center justify-center">
                    <span className="font-display text-3xl font-bold text-primary">{step.number}</span>
                  </div>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
