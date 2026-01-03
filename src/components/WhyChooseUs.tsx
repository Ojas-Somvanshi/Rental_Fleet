import { Shield, Clock, IndianRupee, Car, Sparkles, MapPin, HeadphonesIcon, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  {
    icon: IndianRupee,
    title: 'Best Price Guarantee',
    description: 'Competitive rates with price match. Find a better deal? We\'ll beat it.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer service to assist you anytime, anywhere.',
  },
  {
    icon: Shield,
    title: 'Free Cancellation',
    description: 'Change of plans? Cancel up to 48 hours before pickup at no cost.',
  },
  {
    icon: Car,
    title: 'Wide Selection',
    description: '150+ premium vehicles from economy to luxury, all well-maintained.',
  },
  {
    icon: Sparkles,
    title: 'Clean & Maintained',
    description: 'Every vehicle is thoroughly sanitized and inspected before each rental.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Flexible Rental',
    description: 'Hourly, daily, weekly, or monthly—rent on your terms.',
  },
  {
    icon: CreditCard,
    title: 'No Hidden Fees',
    description: 'Transparent pricing with all costs shown upfront. No surprises.',
  },
  {
    icon: MapPin,
    title: 'Easy Pick-up',
    description: '20+ convenient locations nationwide with airport delivery options.',
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-20 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why Just My Ride
          </span>
          <h2 className="section-heading mb-4">
            Why Choose <span className="text-gradient">Us</span>
          </h2>
          <p className="section-subheading mx-auto">
            We're committed to providing the best rental experience with unmatched service and value.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 group hover:border-primary/30 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display text-lg font-bold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 glass-card rounded-3xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '50K+', label: 'Happy Customers' },
              { value: '150+', label: 'Vehicles Available' },
              { value: '20+', label: 'Locations' },
              { value: '4.8', label: 'Average Rating' },
            ].map((stat, index) => (
              <div key={stat.label}>
                <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
