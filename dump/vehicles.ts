export interface Vehicle {
  id: string;
  name: string;
  category: 'economy' | 'comfort' | 'luxury' | 'suv' | 'sports' | 'van';
  year: number;
  image: string;
  price: {
    daily: number;
    weekly: number;
  };
  specs: {
    passengers: number;
    transmission: 'Automatic' | 'Manual';
    fuel: 'Gasoline' | 'Electric' | 'Hybrid' | 'Diesel';
    luggage: number;
  };
  features: string[];
  rating: number;
  reviewCount: number;
  available: boolean;
}

export const vehicles: Vehicle[] = [
  {
    id: 'VEH001',
    name: 'Tesla Model 3',
    category: 'luxury',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop',
    price: { daily: 89, weekly: 550 },
    specs: { passengers: 5, transmission: 'Automatic', fuel: 'Electric', luggage: 2 },
    features: ['Autopilot', 'Premium Audio', 'Glass Roof', 'Supercharging'],
    rating: 4.9,
    reviewCount: 342,
    available: true,
  },
  {
    id: 'VEH002',
    name: 'BMW M4 Competition',
    category: 'sports',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop',
    price: { daily: 199, weekly: 1250 },
    specs: { passengers: 4, transmission: 'Automatic', fuel: 'Gasoline', luggage: 2 },
    features: ['M Sport Package', 'Carbon Fiber Trim', 'Adaptive Suspension', 'Head-Up Display'],
    rating: 4.8,
    reviewCount: 189,
    available: true,
  },
  {
    id: 'VEH003',
    name: 'Range Rover Sport',
    category: 'suv',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop',
    price: { daily: 175, weekly: 1100 },
    specs: { passengers: 5, transmission: 'Automatic', fuel: 'Hybrid', luggage: 4 },
    features: ['Air Suspension', 'Meridian Audio', 'Terrain Response', 'Panoramic Roof'],
    rating: 4.7,
    reviewCount: 256,
    available: true,
  },
  {
    id: 'VEH004',
    name: 'Toyota Camry',
    category: 'comfort',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2070&auto=format&fit=crop',
    price: { daily: 55, weekly: 340 },
    specs: { passengers: 5, transmission: 'Automatic', fuel: 'Hybrid', luggage: 3 },
    features: ['Apple CarPlay', 'Safety Sense', 'Wireless Charging', 'JBL Audio'],
    rating: 4.6,
    reviewCount: 478,
    available: true,
  },
  {
    id: 'VEH005',
    name: 'Volkswagen Golf',
    category: 'economy',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?q=80&w=2032&auto=format&fit=crop',
    price: { daily: 35, weekly: 210 },
    specs: { passengers: 5, transmission: 'Automatic', fuel: 'Gasoline', luggage: 2 },
    features: ['Touchscreen Display', 'Backup Camera', 'Bluetooth', 'Cruise Control'],
    rating: 4.5,
    reviewCount: 612,
    available: true,
  },
  {
    id: 'VEH006',
    name: 'Mercedes-Benz S-Class',
    category: 'luxury',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
    price: { daily: 249, weekly: 1550 },
    specs: { passengers: 5, transmission: 'Automatic', fuel: 'Hybrid', luggage: 3 },
    features: ['Executive Rear Seats', 'Burmester Audio', 'MBUX', 'Massage Seats'],
    rating: 4.9,
    reviewCount: 167,
    available: true,
  },
  {
    id: 'VEH007',
    name: 'Porsche 911 Carrera',
    category: 'sports',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop',
    price: { daily: 349, weekly: 2100 },
    specs: { passengers: 2, transmission: 'Automatic', fuel: 'Gasoline', luggage: 1 },
    features: ['Sport Chrono', 'PASM', 'Bose Audio', 'Sport Exhaust'],
    rating: 4.9,
    reviewCount: 98,
    available: true,
  },
  {
    id: 'VEH008',
    name: 'Jeep Grand Cherokee',
    category: 'suv',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop',
    price: { daily: 95, weekly: 590 },
    specs: { passengers: 5, transmission: 'Automatic', fuel: 'Gasoline', luggage: 4 },
    features: ['4x4 System', 'Uconnect', 'Panoramic Sunroof', 'McIntosh Audio'],
    rating: 4.6,
    reviewCount: 324,
    available: true,
  },
];

export const categories = [
  { id: 'all', name: 'All', icon: '🚗' },
  { id: 'economy', name: 'Economy', icon: '💰', description: 'Fuel-efficient, budget-friendly' },
  { id: 'comfort', name: 'Comfort', icon: '✨', description: 'Balanced features, mid-range' },
  { id: 'luxury', name: 'Luxury', icon: '💎', description: 'Premium experience' },
  { id: 'suv', name: 'SUV', icon: '🏔️', description: 'Spacious, adventure-ready' },
  { id: 'sports', name: 'Sports', icon: '🏎️', description: 'Performance, thrilling' },
];
