import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, NY',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    text: 'Absolutely incredible experience! The Tesla Model 3 was spotless and the booking process was seamless. Will definitely use DriveElite again for all my future rentals.',
    date: 'December 2024',
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Los Angeles, CA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    text: 'Best car rental service I\'ve ever used. The Range Rover was perfect for our family road trip. Customer support was helpful and responsive 24/7.',
    date: 'November 2024',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    location: 'Miami, FL',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    text: 'Rented a Porsche 911 for my birthday weekend. The car was immaculate and the pickup process took less than 5 minutes. Exceeded all expectations!',
    date: 'October 2024',
  },
  {
    id: 4,
    name: 'David Park',
    location: 'Chicago, IL',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    text: 'Transparent pricing with no hidden fees—exactly as advertised. The BMW M4 was an absolute joy to drive. DriveElite has earned a loyal customer.',
    date: 'September 2024',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-20 md:py-32 relative overflow-hidden">
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
            Testimonials
          </span>
          <h2 className="section-heading mb-4">
            What Our <span className="text-gradient">Customers Say</span>
          </h2>
          <p className="section-subheading mx-auto">
            Don't just take our word for it—hear from thousands of satisfied customers.
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto relative">
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center z-10">
            <Quote className="w-8 h-8 text-primary" />
          </div>

          {/* Card */}
          <div className="glass-card rounded-3xl p-8 md:p-12 pt-16 relative overflow-hidden min-h-[320px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="text-center"
              >
                {/* Rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < current.rating
                          ? 'fill-primary text-primary'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
                  "{current.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div className="text-left">
                    <div className="font-display font-bold">{current.name}</div>
                    <div className="text-sm text-muted-foreground">{current.location}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-secondary/50 hover:bg-secondary flex items-center justify-center transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-secondary/50 hover:bg-secondary flex items-center justify-center transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            <span className="text-primary font-bold text-2xl">4.8</span>
            <span className="mx-2">/</span>
            5 from <span className="text-foreground font-medium">2,450+ reviews</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
