import { Users, Fuel, Settings, Briefcase, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Vehicle } from '@/data/vehicles';

const formatINR = (amount: number) =>
  `₹${amount.toLocaleString('en-IN')}`;

interface ListingVehicleCardProps {
  vehicle: Vehicle;
  index: number;
  onBook?: (vehicle: Vehicle) => void;
  onQuickView?: (vehicle: Vehicle) => void;
}

const ListingVehicleCard = ({
  vehicle,
  index,
  onBook,
  onQuickView,
}: ListingVehicleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="vehicle-card group hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-secondary">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-background/80 backdrop-blur-md rounded-full border border-border/50">
          <Star className="w-4 h-4 fill-primary text-primary" />
          <span className="text-sm font-bold text-foreground">
            {vehicle.rating}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3">

        {/* Title */}
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">
            {vehicle.name}
          </h3>
          <p className="text-xs text-muted-foreground">
            {vehicle.year} •{' '}
            {vehicle.category.charAt(0).toUpperCase() +
              vehicle.category.slice(1)}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-4 gap-2 py-3 border-t border-b border-border/30">
          <div className="flex flex-col items-center gap-1">
            <Users className="w-4 h-4 text-primary/70" />
            <span className="text-xs font-medium text-muted-foreground">
              {vehicle.specs.passengers}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Settings className="w-4 h-4 text-primary/70" />
            <span className="text-xs font-medium text-muted-foreground">
              {vehicle.specs.transmission === 'Automatic' ? 'Auto' : 'Man'}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Fuel className="w-4 h-4 text-primary/70" />
            <span className="text-xs font-medium text-muted-foreground">
              {vehicle.specs.fuel.slice(0, 3)}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Briefcase className="w-4 h-4 text-primary/70" />
            <span className="text-xs font-medium text-muted-foreground">
              {vehicle.specs.luggage}
            </span>
          </div>
        </div>

        {/* Pricing */}
        <div>
          <div className="text-2xl font-bold text-primary mb-0.5">
            {formatINR(vehicle.price.daily)}
          </div>
          <div className="text-xs text-muted-foreground">per day</div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onQuickView?.(vehicle)}
            className="flex-1 px-3 py-2.5 rounded-lg border border-border/50 text-foreground font-medium text-sm hover:bg-secondary/40 hover:border-primary/50 transition-all duration-300 group-hover:border-primary/50"
          >
            Quick View
          </button>

          <button
            onClick={() => onBook?.(vehicle)}
            className="flex-1 px-3 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300"
          >
            Book
          </button>
        </div>

      </div>
    </motion.div>
  );
};

export default ListingVehicleCard;