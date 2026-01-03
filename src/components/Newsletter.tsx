import { useState } from 'react';
import { Mail, Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const Newsletter = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitted(true);
    toast({
      title: 'Successfully subscribed!',
      description: 'Check your inbox for exclusive deals and updates.',
    });
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />

      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Get Exclusive <span className="text-gradient">Deals & Tips</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter and receive 10% off your first rental, 
              plus travel tips and exclusive promotions.
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="input-field pl-12 py-4"
                  />
                </div>
                <button type="submit" className="btn-primary px-8 py-4">
                  Subscribe
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-emerald-500/10 text-emerald-400"
              >
                <Check className="w-6 h-6" />
                <span className="font-medium">You're subscribed! Check your inbox.</span>
              </motion.div>
            )}

            <p className="text-xs text-muted-foreground mt-4">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
