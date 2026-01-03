export interface Vehicle {
  id: string;
  name: string;
  category: 'scooty' | 'bike' | 'car' | 'suv';
  year: number;
  image: string;
  price: {
    daily: number;
    weekly: number;
  };
  specs: {
    passengers: number;
    transmission: 'Automatic' | 'Manual';
    fuel: 'Petrol' | 'Electric' | 'Hybrid' | 'Diesel';
    luggage: number;
  };
  features: string[];
  rating: number;
  reviewCount: number;
  available: boolean;
}

export const vehicles: Vehicle[] = [
  {
    id: 'IND001',
    name: ' Maruti Swift',
    category: 'car',
    year: 2024,
    image: "/swift.jpg",
    price: { daily: 1500, weekly: 280 },
    specs: { passengers: 5, transmission: 'Manual', fuel: 'Petrol', luggage: 2 },
    features: ['Wireless Charging', 'Sunroof', 'Ventilated Seats', 'Fast Charging'],
    rating: 4.8,
    reviewCount: 412,
    available: true,
  },
  {
    id: 'IND002',
    name: 'Honda Activa',
    category: 'scooty',
    year: 2024,
    image: "/activa.jpg",
    price: { daily: 400, weekly: 400 },
    specs: { passengers: 2, transmission: 'Automatic', fuel: 'Petrol', luggage: 0 },
    features: ['4x4 Low Range', 'Convertible Top', 'Off-road Tires', 'Water Resistant'],
    rating: 4.9,
    reviewCount: 560,
    available: true,
  },
  {
    id: 'IND003',
    name: 'TVS Ntorq',
    category: 'scooty',
    year: 2024,
    image: '/ntorq.jpg',
    price: { daily: 400, weekly: 800 },
    specs: { passengers: 2, transmission: 'Automatic', fuel: 'Petrol', luggage: 0 },
    features: ['JBL Audio', '360 Camera', 'Leather Upholstery', 'Powered Tailgate'],
    rating: 4.7,
    reviewCount: 325,
    available: true,
  },
  {
    id: 'IND004',
    name: 'Hyndai Creta',
    category: 'suv',
    year: 2024,
    image: '/creta.jpg',
    price: { daily: 2500, weekly: 150 },
    specs: { passengers: 5, transmission: 'Manual', fuel: 'Diesel', luggage: 4 },
    features: ['Apple CarPlay', 'Fuel Efficient', 'Compact', 'SmartPlay Studio'],
    rating: 4.5,
    reviewCount: 890,
    available: true,
  },
  {
    id: 'IND005',
    name: 'Tata Altroz',
    category: 'car',
    year: 2024,
    image: '/altroz.jpg',
    price: { daily: 1500, weekly: 450 },
    specs: { passengers: 5, transmission: 'Automatic', fuel: 'Petrol', luggage: 2 },
    features: ['Alexa Built-in', 'Sunroof', 'Adrenox Connect', 'Driver Drowsiness Alert'],
    rating: 4.8,
    reviewCount: 234,
    available: true,
  },
  {
    id: 'IND006',
    name: 'Hyndai i20',
    category: 'car',
    year: 2024,
    image: '/i20.jpg',
    price: { daily: 1500, weekly: 550 },
    specs: { passengers: 5, transmission: 'Automatic', fuel: 'Petrol', luggage: 3 },
    features: ['ADAS Level 2', 'Skyroof', 'Dual HD Screens', 'Sony 3D Audio'],
    rating: 4.9,
    reviewCount: 445,
    available: false,
  },
  {
    id: 'IND007',
    name: 'TVS Raider',
    category: 'bike',
    year: 2024,
    image: '/raider.jpg',
    price: { daily: 500, weekly: 350 },
    specs: { passengers: 2, transmission: 'Manual', fuel: 'Petrol', luggage: 0 },
    features: ['Panoramic Sunroof', 'Bose Audio', 'Air Purifier', 'BlueLink'],
    rating: 4.6,
    reviewCount: 678,
    available: true,
  },
  {
    id: 'IND008',
    name: 'Royal Enfield Classic 350',
    category: 'bike',
    year: 2024,
    image: '/re.jpg',
    price: { daily: 800, weekly: 490 },
    specs: { passengers: 2, transmission: 'Manual', fuel: 'Petrol', luggage: 0 },
    features: ['Captain Seats', 'Terrain Response', 'Mood Lighting', 'Connected Car Tech'],
    rating: 4.7,
    reviewCount: 156,
    available: true,
  },
];

export const categories = [
  { id: 'all', name: 'All', icon: '🚗' },

  {
    id: 'scooty',
    name: 'Scooty',
    icon: '🛵',
    description: 'Light, fuel-efficient city rides',
  },

  {
    id: 'bike',
    name: 'Bikes',
    icon: '🏍️',
    description: 'Stylish & powerful two-wheelers',
  },

  {
    id: 'car',
    name: 'Cars',
    icon: '🚘',
    description: 'Comfortable & premium cars',
  },

  {
    id: 'suv',
    name: 'SUVs',
    icon: '🚙',
    description: 'Spacious & adventure-ready',
  },
];
