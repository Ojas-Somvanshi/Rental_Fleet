import { AnimatePresence, motion } from "framer-motion";
import { X, Star, Settings, Fuel, Users, Briefcase, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Vehicle } from "@/data/vehicles";
import { useEffect } from "react";

interface QuickViewModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal = ({ vehicle, isOpen, onClose }: QuickViewModalProps) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!vehicle) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {/* Backdrop */}
          <motion.button
            aria-label="Close modal"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar glass-card-solid rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-card/90 backdrop-blur-xl border-b border-border p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {vehicle.name}
                </h2>
                <p className="text-muted-foreground">
                  {vehicle.year} • {vehicle.category}
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 bg-secondary/60 hover:bg-secondary rounded-xl flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="md:col-span-2 overflow-hidden rounded-xl bg-secondary">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div className="h-[152px] bg-secondary rounded-xl flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">More images</span>
                  </div>
                  <div className="h-[152px] bg-secondary rounded-xl flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Coming soon</span>
                  </div>
                </div>
              </div>

              {/* Specs + Features */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="glass-card p-5 rounded-xl">
                  <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                    Specifications
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Settings size={18} />
                        <span>Transmission</span>
                      </div>
                      <span className="font-medium text-foreground">
                        {vehicle.specs.transmission}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Fuel size={18} />
                        <span>Fuel</span>
                      </div>
                      <span className="font-medium text-foreground">
                        {vehicle.specs.fuel}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Users size={18} />
                        <span>Seats</span>
                      </div>
                      <span className="font-medium text-foreground">
                        {vehicle.specs.passengers}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Briefcase size={18} />
                        <span>Luggage</span>
                      </div>
                      <span className="font-medium text-foreground">
                        {vehicle.specs.luggage}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-5 rounded-xl">
                  <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                    Features
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    {vehicle.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm">
                        <Check size={16} className="text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="glass-card p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={18} className="fill-warning text-warning" />
                    <span className="font-medium text-foreground">{vehicle.rating}</span>
                    <span className="text-muted-foreground">({vehicle.reviewCount} reviews)</span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-display font-bold text-foreground">
                      ₹{vehicle.price.daily}
                    </span>
                    <span className="text-muted-foreground">/day</span>
                  </div>
                </div>

                <Button className="btn-primary px-8 py-6 text-lg">
                  Book This Vehicle <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
