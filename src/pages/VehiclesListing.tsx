import { useState, useMemo } from 'react';
import { ChevronRight, ArrowUpDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { VehiclesFilter } from '@/components/VehiclesFilter';
import { PaginationComponent } from '@/components/PaginationComponent';
import ListingVehicleCard from '@/components/ListingVehicleCard';
import { vehicles } from '@/data/vehicles';
import type { Vehicle } from '@/data/vehicles';

const ITEMS_PER_PAGE = 9;

interface FilterState {
  priceRange: [number, number];
  vehicleType: string[];
  transmission: string[];
  fuelType: string[];
  seats: string[];
  features: string[];
}

const VehiclesListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 5000],
    vehicleType: [],
    transmission: [],
    fuelType: [],
    seats: [],
    features: [],
  });

  // Filter logic
  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];

    // Price filter - check if price is within range
    result = result.filter((v) => {
      const price = v.price.daily;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Vehicle type filter
    if (filters.vehicleType.length > 0) {
      result = result.filter((v) => filters.vehicleType.includes(v.category));
    }

    // Transmission filter
    if (filters.transmission.length > 0) {
      result = result.filter((v) =>
        filters.transmission.includes(v.specs.transmission.toLowerCase())
      );
    }

    // Fuel type filter
    if (filters.fuelType.length > 0) {
      result = result.filter((v) =>
        filters.fuelType.includes(v.specs.fuel.toLowerCase())
      );
    }

    // Seats filter
    if (filters.seats.length > 0) {
      result = result.filter((v) => {
        const seatFilters = filters.seats.map((s) => parseInt(s));
        return seatFilters.some((s) =>
          s === 7 ? v.specs.passengers >= 7 : v.specs.passengers === s
        );
      });
    }

    // Sort
    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price.daily - b.price.daily);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price.daily - a.price.daily);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [filters, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* HEADER SECTION */}
      <section className="border-b border-border/30 pb-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
          >
            <a href="/" className="hover:text-foreground transition-colors">
              Home
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Vehicles</span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-between items-end"
          >
            <div className="flex-1">
              <h1 className="section-heading mb-2">
                Find Your Perfect <span className="text-gradient">Ride</span>
              </h1>
              <p className="section-subheading">
                {filteredVehicles.length} vehicles available
              </p>
            </div>
            {/* Sort */}
            <div className="relative md:min-w-max group hidden md:block">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-muted-foreground pointer-events-none">
                <ArrowUpDown className="w-4 h-4" />
              </div>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 rounded-lg bg-secondary/50 border border-border/50 text-foreground appearance-none cursor-pointer focus:outline-none focus:border-primary/50 text-sm font-medium"
              >
                <option value="name">Sort: Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* SIDEBAR FILTERS */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <VehiclesFilter
              onFilterChange={handleFilterChange}
              vehicleCount={filteredVehicles.length}
            />
          </motion.aside>

          {/* VEHICLE GRID */}
          <div className="lg:col-span-3">
            {paginatedVehicles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginatedVehicles.map((vehicle, index) => (
                    <motion.div
                      key={vehicle.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <ListingVehicleCard
                        vehicle={vehicle}
                        index={index}
                        onBook={(v) => console.log('Book:', v)}
                        onQuickView={(v) => console.log('Quick View:', v)}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <PaginationComponent
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  No vehicles found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      priceRange: [0, 5000],
                      vehicleType: [],
                      transmission: [],
                      fuelType: [],
                      seats: [],
                      features: [],
                    });
                    setSortBy('name');
                    setCurrentPage(1);
                  }}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VehiclesListing;
