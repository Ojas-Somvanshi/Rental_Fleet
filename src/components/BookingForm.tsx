import { useState } from 'react';
import { MapPin, Calendar, Car, Users, ChevronDown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const locations = [
  'Lucknow',
  'Varanasi',
];

const vehicleTypes = [
  { value: 'all', label: 'All Vehicles' },
  { value: 'economy', label: 'Economy' },
  { value: 'comfort', label: 'Comfort' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'suv', label: 'SUV' },
  { value: 'sports', label: 'Sports' },
];

const BookingForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    dropoffTime: '',
    vehicleType: 'all',
    age: '25-64',
  });
  const [sameLocation, setSameLocation] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.pickupLocation || !formData.pickupDate || !formData.dropoffDate) {
      toast({
        title: 'Please fill in all required fields',
        description: 'Pick-up location and dates are required.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Searching available vehicles...',
      description: 'Finding the best options for your trip.',
    });
  };

  return (
    <section id="booking" className="py-12 md:py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-6 md:p-10 max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">Find Your Perfect Ride</h2>
              <p className="text-muted-foreground">Search from 100+ premium vehicles</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-primary" />
                  Pick-up Location
                </label>
                <div className="relative">
                  <select
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                    className="input-field appearance-none pr-10"
                  >
                    <option value="">Select location</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="w-4 h-4 text-primary" />
                    Drop-off Location
                  </label>
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sameLocation}
                      onChange={(e) => setSameLocation(e.target.checked)}
                      className="rounded border-border"
                    />
                    Same as pick-up
                  </label>
                </div>
                <div className="relative">
                  <select
                    value={sameLocation ? formData.pickupLocation : formData.dropoffLocation}
                    onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
                    disabled={sameLocation}
                    className="input-field appearance-none pr-10 disabled:opacity-50"
                  >
                    <option value="">Select location</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Date & Time Fields */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="w-4 h-4 text-primary" />
                  Pick-up Date
                </label>
                <input
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="input-field"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Pick-up Time</label>
                <input
                  type="time"
                  value={formData.pickupTime}
                  onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="w-4 h-4 text-primary" />
                  Drop-off Date
                </label>
                <input
                  type="date"
                  value={formData.dropoffDate}
                  onChange={(e) => setFormData({ ...formData, dropoffDate: e.target.value })}
                  min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                  className="input-field"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Drop-off Time</label>
                <input
                  type="time"
                  value={formData.dropoffTime}
                  onChange={(e) => setFormData({ ...formData, dropoffTime: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            {/* Vehicle Type & Age */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Car className="w-4 h-4 text-primary" />
                  Vehicle Type
                </label>
                <div className="relative">
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                    className="input-field appearance-none pr-10"
                  >
                    {vehicleTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Users className="w-4 h-4 text-primary" />
                  Driver Age
                </label>
                <div className="relative">
                  <select
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="input-field appearance-none pr-10"
                  >
                    <option value="18-24">18-24 years</option>
                    <option value="25-64">25-64 years</option>
                    <option value="65+">65+ years</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div className="flex items-end">
                <button type="submit" className="btn-primary w-full py-3.5 text-lg">
                  Search Vehicles
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingForm;
