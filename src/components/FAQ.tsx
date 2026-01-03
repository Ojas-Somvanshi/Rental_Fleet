import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What documents do I need to rent a vehicle?',
    answer: 'You\'ll need a valid driver\'s license (held for at least 1 year), a credit card in your name for the security deposit, and a form of ID (passport or government ID). International renters may need an International Driving Permit depending on their country of origin.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We offer free cancellation up to 48 hours before your scheduled pickup time. Cancellations made within 48 hours may be subject to a fee equivalent to one day\'s rental. No-shows will be charged the full reservation amount.',
  },
  {
    question: 'Is insurance included in the rental price?',
    answer: 'Basic liability insurance is included in all rentals. We also offer additional coverage options including Collision Damage Waiver (CDW), Personal Accident Insurance, and Theft Protection at competitive rates during the booking process.',
  },
  {
    question: 'Can I add an additional driver?',
    answer: 'Yes! Additional drivers can be added for $10/day. All additional drivers must meet our age requirements, hold a valid driver\'s license, and be present at pickup to sign the rental agreement.',
  },
  {
    question: 'What happens if I return the vehicle late?',
    answer: 'Late returns are charged on a per-hour basis (up to 4 hours). Returns more than 4 hours late are charged an additional full day. We recommend extending your reservation through our app or customer service if you need more time.',
  },
  {
    question: 'Do you accept debit cards?',
    answer: 'We accept debit cards for payment, but a credit card is required at pickup for the security deposit. The deposit amount varies by vehicle category and is typically between $200-$500.',
  },
  {
    question: 'What is the minimum age requirement?',
    answer: 'The minimum age is 21 for most vehicles. Drivers under 25 may be subject to a Young Driver Surcharge ($20-30/day) and are restricted from renting luxury and sports vehicles.',
  },
  {
    question: 'Are there mileage limits?',
    answer: 'Most rentals include unlimited mileage. Specialty and luxury vehicles may have daily mileage caps (typically 200-300 miles/day). Excess mileage is charged at $0.25-$0.50 per mile depending on the vehicle.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-32 relative">
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
            FAQ
          </span>
          <h2 className="section-heading mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="section-subheading mx-auto">
            Everything you need to know about renting with Just My Ride.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full glass-card rounded-xl p-5 text-left transition-all duration-300 ${
                  openIndex === index ? 'border-primary/30' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display font-semibold text-lg pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted-foreground mt-4 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 glass-card rounded-full px-6 py-4">
            <HelpCircle className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">Still have questions?</span>
            <a href="#" className="text-primary font-medium hover:underline">
              Contact our support team
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
