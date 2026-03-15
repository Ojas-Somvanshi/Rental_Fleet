import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface FilterState {
  priceRange: [number, number];
  vehicleType: string[];
  transmission: string[];
  fuelType: string[];
  seats: string[];
  features: string[];
}

interface VehiclesFilterProps {
  onFilterChange: (filters: FilterState) => void;
  vehicleCount: number;
}

const vehicleTypes = [
  { id: 'car', label: 'Car', count: 3 },
  { id: 'suv', label: 'SUV', count: 2 },
  { id: 'bike', label: 'Bike', count: 2 },
  { id: 'scooty', label: 'Scooty', count: 1 },
];

const transmissions = [
  { id: 'automatic', label: 'Automatic' },
  { id: 'manual', label: 'Manual' },
];

const fuelTypes = [
  { id: 'petrol', label: 'Petrol' },
  { id: 'diesel', label: 'Diesel' },
  { id: 'electric', label: 'Electric' },
  { id: 'hybrid', label: 'Hybrid' },
];

const seatsOptions = [
  { id: '2', label: '2 seats' },
  { id: '4', label: '4 seats' },
  { id: '5', label: '5 seats' },
  { id: '7', label: '7+ seats' },
];

const featuresOptions = [
  { id: 'gps', label: 'GPS Navigation' },
  { id: 'bluetooth', label: 'Bluetooth' },
  { id: 'backup-cam', label: 'Backup Camera' },
  { id: 'heated-seats', label: 'Heated Seats' },
  { id: 'sunroof', label: 'Sunroof' },
  { id: 'awd', label: 'All-Wheel Drive' },
  { id: 'apple-carplay', label: 'Apple CarPlay' },
  { id: 'premium-audio', label: 'Premium Audio' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export const VehiclesFilter = ({ onFilterChange }: VehiclesFilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 5000],
    vehicleType: [],
    transmission: [],
    fuelType: [],
    seats: [],
    features: [],
  });

const handlePriceChange = (value: number[]) => {
  if (value.length < 2) return;

  const updatedFilters: FilterState = {
    ...filters,
    priceRange: [value[0], value[1]]
  };

  setFilters(updatedFilters);
  onFilterChange(updatedFilters);
};

  const handleCheckboxChange = (
    category: keyof Omit<FilterState, 'priceRange'>,
    id: string,
    checked: boolean
  ) => {
    const updatedArray = checked
      ? [...filters[category], id]
      : filters[category].filter((item) => item !== id);
    const updatedFilters = { ...filters, [category]: updatedArray };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters: FilterState = {
      priceRange: [0, 5000],
      vehicleType: [],
      transmission: [],
      fuelType: [],
      seats: [],
      features: [],
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const filterSections = [
    {
      title: '💰 Price Range',
      id: 'price',
      content: (
        <div>
          <Slider
            value={[filters.priceRange[0], filters.priceRange[1]]}
            onValueChange={handlePriceChange}
            min={0}
            max={5000}
            step={50}
            className="mb-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹{filters.priceRange[0]}</span>
            <span>₹{filters.priceRange[1]}</span>
          </div>
        </div>
      ),
    },
    {
      title: '🚗 Vehicle Type',
      id: 'type',
      content: (
        <div className="space-y-3">
          {vehicleTypes.map(({ id, label, count }) => (
            <motion.label
              key={id}
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ x: 4 }}
            >
              <Checkbox
                checked={filters.vehicleType.includes(id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange('vehicleType', id, checked as boolean)
                }
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {label}
              </span>
              <span className="text-xs text-muted-foreground/60">({count})</span>
            </motion.label>
          ))}
        </div>
      ),
    },
    {
      title: '⚙️ Transmission',
      id: 'transmission',
      content: (
        <div className="space-y-3">
          {transmissions.map(({ id, label }) => (
            <motion.label
              key={id}
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ x: 4 }}
            >
              <Checkbox
                checked={filters.transmission.includes(id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange('transmission', id, checked as boolean)
                }
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {label}
              </span>
            </motion.label>
          ))}
        </div>
      ),
    },
    {
      title: '⛽ Fuel Type',
      id: 'fuel',
      content: (
        <div className="space-y-3">
          {fuelTypes.map(({ id, label }) => (
            <motion.label
              key={id}
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ x: 4 }}
            >
              <Checkbox
                checked={filters.fuelType.includes(id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange('fuelType', id, checked as boolean)
                }
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {label}
              </span>
            </motion.label>
          ))}
        </div>
      ),
    },
    {
      title: '🪑 Seats',
      id: 'seats',
      content: (
        <div className="space-y-3">
          {seatsOptions.map(({ id, label }) => (
            <motion.label
              key={id}
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ x: 4 }}
            >
              <Checkbox
                checked={filters.seats.includes(id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange('seats', id, checked as boolean)
                }
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {label}
              </span>
            </motion.label>
          ))}
        </div>
      ),
    },
    {
      title: '⭐ Features',
      id: 'features',
      content: (
        <div className="space-y-3">
          {featuresOptions.map(({ id, label }) => (
            <motion.label
              key={id}
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ x: 4 }}
            >
              <Checkbox
                checked={filters.features.includes(id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange('features', id, checked as boolean)
                }
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {label}
              </span>
            </motion.label>
          ))}
        </div>
      ),
    },
  ];

  return (
    <motion.div
      className="w-full space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {filterSections.map((section) => (
        <motion.div
          key={section.id}
          variants={itemVariants}
          className="bg-secondary/40 backdrop-blur-md border border-primary/20 hover:border-primary/40 rounded-2xl p-5 transition-all duration-300 hover:bg-secondary/50"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-sm font-bold text-foreground mb-4">
            {section.title}
          </h3>
          {section.content}
        </motion.div>
      ))}

      {/* Clear Filters */}
      <motion.button
        onClick={handleClearFilters}
        variants={itemVariants}
        whileHover={{
          scale: 1.05,
          backgroundColor: 'rgba(38, 92, 255, 0.15)',
        }}
        whileTap={{ scale: 0.95 }}
        className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-primary hover:text-primary bg-primary/10 hover:bg-primary/15 transition-all rounded-xl border-2 border-primary/30 hover:border-primary/60"
      >
        <motion.div
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <X className="w-4 h-4" />
        </motion.div>
        Clear All Filters
      </motion.button>
    </motion.div>
  );
};
