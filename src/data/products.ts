import type { Product } from '../types/Product';

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1199,
    originalPrice: 1299,
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
    category: "Smartphones",
    brand: "Apple",
    rating: 4.8,
    reviews: 2847,
    description: "The most advanced iPhone ever with titanium design and A17 Pro chip.",
    features: [
      "6.7-inch Super Retina XDR display",
      "A17 Pro chip with 6-core GPU",
      "Pro camera system with 48MP main",
      "Up to 29 hours video playback",
      "Titanium design"
    ],
    specifications: {
      "Display": "6.7-inch OLED",
      "Processor": "A17 Pro",
      "Storage": "256GB",
      "Camera": "48MP Triple Camera",
      "Battery": "4441 mAh",
      "OS": "iOS 17"
    },
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: 2,
    name: "MacBook Pro 16-inch",
    price: 2499,
    image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg",
    category: "Laptops",
    brand: "Apple",
    rating: 4.9,
    reviews: 1523,
    description: "Supercharged by M3 Pro and M3 Max chips for demanding workflows.",
    features: [
      "16.2-inch Liquid Retina XDR display",
      "M3 Pro chip with 12-core CPU",
      "18GB unified memory",
      "22-hour battery life",
      "Six-speaker sound system"
    ],
    specifications: {
      "Display": "16.2-inch Liquid Retina XDR",
      "Processor": "Apple M3 Pro",
      "Memory": "18GB",
      "Storage": "512GB SSD",
      "Graphics": "18-core GPU",
      "Weight": "4.7 pounds"
    },
    inStock: true,
    isFeatured: true
  },
  {
    id: 3,
    name: "AirPods Pro (2nd Gen)",
    price: 249,
    originalPrice: 279,
    image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg",
    category: "Audio",
    brand: "Apple",
    rating: 4.7,
    reviews: 8934,
    description: "Next-level Active Noise Cancellation and Adaptive Transparency.",
    features: [
      "Active Noise Cancellation",
      "Adaptive Transparency",
      "Spatial Audio with head tracking",
      "Up to 6 hours listening time",
      "MagSafe charging case"
    ],
    specifications: {
      "Driver": "Custom high-excursion driver",
      "Chip": "H2 chip",
      "Battery": "6 hours + 24 hours with case",
      "Connectivity": "Bluetooth 5.3",
      "Water Resistance": "IPX4",
      "Weight": "5.3g each"
    },
    inStock: true,
    isNew: true
  },
  {
    id: 4,
    name: "Samsung Galaxy S24 Ultra",
    price: 1299,
    image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg",
    category: "Smartphones",
    brand: "Samsung",
    rating: 4.6,
    reviews: 3421,
    description: "The ultimate Android flagship with S Pen and AI features.",
    features: [
      "6.8-inch Dynamic AMOLED 2X",
      "Snapdragon 8 Gen 3",
      "200MP quad camera system",
      "Built-in S Pen",
      "Galaxy AI features"
    ],
    specifications: {
      "Display": "6.8-inch AMOLED",
      "Processor": "Snapdragon 8 Gen 3",
      "Storage": "256GB",
      "Camera": "200MP Quad Camera",
      "Battery": "5000 mAh",
      "OS": "Android 14"
    },
    inStock: true
  },
  {
    id: 5,
    name: "Sony WH-1000XM5",
    price: 399,
    originalPrice: 449,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
    category: "Audio",
    brand: "Sony",
    rating: 4.8,
    reviews: 5672,
    description: "Industry-leading noise canceling headphones with premium sound.",
    features: [
      "Industry-leading noise canceling",
      "30-hour battery life",
      "Quick Charge (3 min = 3 hours)",
      "Multipoint connection",
      "Speak-to-Chat technology"
    ],
    specifications: {
      "Driver": "30mm driver unit",
      "Frequency Response": "4Hz-40kHz",
      "Battery": "30 hours",
      "Connectivity": "Bluetooth 5.2",
      "Weight": "250g",
      "Charging": "USB-C"
    },
    inStock: true,
    isFeatured: true
  },
  {
    id: 6,
    name: "iPad Pro 12.9-inch",
    price: 1099,
    image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg",
    category: "Tablets",
    brand: "Apple",
    rating: 4.7,
    reviews: 2156,
    description: "The ultimate iPad experience with M2 chip and Liquid Retina XDR display.",
    features: [
      "12.9-inch Liquid Retina XDR display",
      "M2 chip with 8-core CPU",
      "12MP Ultra Wide front camera",
      "Apple Pencil (2nd gen) support",
      "Magic Keyboard compatible"
    ],
    specifications: {
      "Display": "12.9-inch Liquid Retina XDR",
      "Processor": "Apple M2",
      "Storage": "128GB",
      "Camera": "12MP Wide + 10MP Ultra Wide",
      "Battery": "Up to 10 hours",
      "Connectivity": "Wi-Fi 6E"
    },
    inStock: false
  },
  // Additional Smartphones
  {
    id: 7,
    name: "Google Pixel 8 Pro",
    price: 999,
    image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg",
    category: "Smartphones",
    brand: "Google",
    rating: 4.5,
    reviews: 1832,
    description: "AI-powered photography and pure Android experience.",
    features: [
      "6.7-inch LTPO OLED display",
      "Google Tensor G3 chip",
      "50MP triple camera system",
      "Magic Eraser and Best Take",
      "7 years of OS updates"
    ],
    specifications: {
      "Display": "6.7-inch OLED 120Hz",
      "Processor": "Google Tensor G3",
      "Storage": "128GB",
      "Camera": "50MP Triple Camera",
      "Battery": "5050 mAh",
      "OS": "Android 14"
    },
    inStock: true,
    isNew: true
  },
  {
    id: 8,
    name: "OnePlus 12",
    price: 799,
    originalPrice: 899,
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
    category: "Smartphones",
    brand: "OnePlus",
    rating: 4.4,
    reviews: 987,
    description: "Flagship performance with OxygenOS and fast charging.",
    features: [
      "6.82-inch AMOLED display",
      "Snapdragon 8 Gen 3",
      "100W SuperVOOC charging",
      "Hasselblad camera system",
      "Alert Slider"
    ],
    specifications: {
      "Display": "6.82-inch AMOLED 120Hz",
      "Processor": "Snapdragon 8 Gen 3",
      "Storage": "256GB",
      "Camera": "50MP Triple Camera",
      "Battery": "5400 mAh",
      "OS": "OxygenOS 14"
    },
    inStock: true
  },
  // Additional Laptops
  {
    id: 9,
    name: "Dell XPS 13 Plus",
    price: 1299,
    image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg",
    category: "Laptops",
    brand: "Dell",
    rating: 4.3,
    reviews: 743,
    description: "Ultrabook with InfinityEdge display and premium build quality.",
    features: [
      "13.4-inch InfinityEdge display",
      "12th Gen Intel Core i7",
      "16GB LPDDR5 RAM",
      "Capacitive function row",
      "Carbon fiber palm rest"
    ],
    specifications: {
      "Display": "13.4-inch FHD+",
      "Processor": "Intel Core i7-1260P",
      "Memory": "16GB",
      "Storage": "512GB SSD",
      "Graphics": "Intel Iris Xe",
      "Weight": "2.73 pounds"
    },
    inStock: true
  },
  {
    id: 10,
    name: "Microsoft Surface Laptop 5",
    price: 1599,
    image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg",
    category: "Laptops",
    brand: "Microsoft",
    rating: 4.2,
    reviews: 456,
    description: "Premium laptop with touchscreen and all-day battery life.",
    features: [
      "13.5-inch PixelSense touchscreen",
      "12th Gen Intel Core i7",
      "Alcantara fabric keyboard",
      "18.5-hour battery life",
      "Windows 11 Pro"
    ],
    specifications: {
      "Display": "13.5-inch PixelSense",
      "Processor": "Intel Core i7-1255U",
      "Memory": "16GB",
      "Storage": "512GB SSD",
      "Graphics": "Intel Iris Xe",
      "Weight": "2.86 pounds"
    },
    inStock: true,
    isFeatured: true
  },
  // Additional Audio Products
  {
    id: 11,
    name: "Bose QuietComfort Ultra",
    price: 429,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
    category: "Audio",
    brand: "Bose",
    rating: 4.6,
    reviews: 2341,
    description: "Premium noise-canceling headphones with spatial audio.",
    features: [
      "World-class noise cancellation",
      "Immersive spatial audio",
      "24-hour battery life",
      "CustomTune technology",
      "Multipoint Bluetooth"
    ],
    specifications: {
      "Driver": "40mm TriPort acoustic architecture",
      "Frequency Response": "20Hz-20kHz",
      "Battery": "24 hours",
      "Connectivity": "Bluetooth 5.3",
      "Weight": "254g",
      "Charging": "USB-C"
    },
    inStock: true,
    isNew: true
  },
  {
    id: 12,
    name: "Sennheiser Momentum 4",
    price: 349,
    originalPrice: 399,
    image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg",
    category: "Audio",
    brand: "Sennheiser",
    rating: 4.5,
    reviews: 1876,
    description: "Audiophile-grade sound with adaptive noise cancellation.",
    features: [
      "Adaptive Noise Cancellation",
      "60-hour battery life",
      "Audiophile-inspired sound",
      "Smart Control App",
      "Foldable design"
    ],
    specifications: {
      "Driver": "42mm dynamic drivers",
      "Frequency Response": "6Hz-22kHz",
      "Battery": "60 hours",
      "Connectivity": "Bluetooth 5.2",
      "Weight": "293g",
      "Charging": "USB-C"
    },
    inStock: true
  },
  // Additional Tablets
  {
    id: 13,
    name: "Samsung Galaxy Tab S9+",
    price: 999,
    image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg",
    category: "Tablets",
    brand: "Samsung",
    rating: 4.4,
    reviews: 1234,
    description: "Premium Android tablet with S Pen and DeX mode.",
    features: [
      "12.4-inch Super AMOLED display",
      "Snapdragon 8 Gen 2",
      "S Pen included",
      "Samsung DeX mode",
      "IP68 water resistance"
    ],
    specifications: {
      "Display": "12.4-inch Super AMOLED",
      "Processor": "Snapdragon 8 Gen 2",
      "Storage": "256GB",
      "Camera": "13MP + 6MP Ultra Wide",
      "Battery": "10090 mAh",
      "OS": "Android 13"
    },
    inStock: true
  },
  {
    id: 14,
    name: "Microsoft Surface Pro 9",
    price: 1299,
    image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg",
    category: "Tablets",
    brand: "Microsoft",
    rating: 4.3,
    reviews: 876,
    description: "2-in-1 tablet with laptop performance and versatility.",
    features: [
      "13-inch PixelSense Flow display",
      "12th Gen Intel Core processors",
      "All-day battery life",
      "Surface Pen compatible",
      "Laptop and tablet modes"
    ],
    specifications: {
      "Display": "13-inch PixelSense Flow",
      "Processor": "Intel Core i7-1255U",
      "Memory": "16GB",
      "Storage": "256GB SSD",
      "Camera": "10MP rear, 5MP front",
      "Battery": "Up to 15.5 hours"
    },
    inStock: true,
    isFeatured: true
  },
  // Accessories
  {
    id: 15,
    name: "Apple Magic Keyboard",
    price: 299,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
    category: "Accessories",
    brand: "Apple",
    rating: 4.6,
    reviews: 2134,
    description: "Floating cantilever design with backlit keys and trackpad.",
    features: [
      "Floating cantilever design",
      "Backlit keys",
      "Built-in trackpad",
      "USB-C port for charging",
      "Full-size keyboard"
    ],
    specifications: {
      "Compatibility": "iPad Pro 12.9-inch",
      "Connection": "Smart Connector",
      "Backlight": "Yes",
      "Trackpad": "Multi-Touch",
      "Weight": "1.57 pounds",
      "Material": "Polyurethane"
    },
    inStock: true
  },
  {
    id: 16,
    name: "Logitech MX Master 3S",
    price: 99,
    originalPrice: 119,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
    category: "Accessories",
    brand: "Logitech",
    rating: 4.7,
    reviews: 3456,
    description: "Advanced wireless mouse for power users and creators.",
    features: [
      "8K DPI Darkfield sensor",
      "MagSpeed scroll wheel",
      "70-day battery life",
      "Multi-device workflow",
      "Customizable buttons"
    ],
    specifications: {
      "DPI": "8000 DPI",
      "Connectivity": "Bluetooth, USB-C",
      "Battery": "70 days",
      "Buttons": "7 customizable",
      "Weight": "141g",
      "Compatibility": "Windows, Mac, Linux"
    },
    inStock: true,
    isFeatured: true
  }
];

export const categories = [
  "All",
  "Smartphones",
  "Laptops", 
  "Audio",
  "Tablets",
  "Accessories"
];

export const brands = [
  "All",
  "Apple",
  "Samsung",
  "Sony",
  "Google",
  "Microsoft",
  "OnePlus",
  "Dell",
  "Bose",
  "Sennheiser",
  "Logitech"
];
