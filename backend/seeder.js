require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const User = require('./models/User');

const products = [
  { name: 'Wireless Headphones Pro', description: 'Premium noise-cancelling wireless headphones with 30hr battery life.', price: 149.99, category: 'Electronics', brand: 'SoundMax', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', stock: 50, rating: 4.5, numReviews: 120, featured: true },
  { name: 'Smart Watch Series X', description: 'Feature-packed smartwatch with health monitoring and GPS.', price: 299.99, category: 'Electronics', brand: 'TechWear', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', stock: 30, rating: 4.8, numReviews: 85, featured: true },
  { name: 'Running Shoes Ultra', description: 'Lightweight, responsive running shoes for peak performance.', price: 89.99, category: 'Sports', brand: 'SpeedFit', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', stock: 100, rating: 4.3, numReviews: 200, featured: true },
  { name: 'Coffee Maker Deluxe', description: 'Programmable 12-cup coffee maker with built-in grinder.', price: 79.99, category: 'Kitchen', brand: 'BrewMaster', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', stock: 40, rating: 4.6, numReviews: 95 },
  { name: 'Laptop Backpack Pro', description: 'Durable 30L backpack with laptop compartment and USB charging port.', price: 59.99, category: 'Accessories', brand: 'CarryAll', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', stock: 75, rating: 4.4, numReviews: 160, featured: true },
  { name: 'Yoga Mat Premium', description: 'Non-slip 6mm thick eco-friendly yoga mat.', price: 35.99, category: 'Sports', brand: 'ZenFit', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', stock: 90, rating: 4.7, numReviews: 140 },
  { name: '4K Action Camera', description: 'Waterproof 4K action camera with image stabilization.', price: 199.99, category: 'Electronics', brand: 'ActionCam', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400', stock: 25, rating: 4.5, numReviews: 78, featured: true },
  { name: 'Stainless Steel Water Bottle', description: 'Double-wall vacuum insulated 32oz bottle. Keeps drinks cold 24hr.', price: 24.99, category: 'Kitchen', brand: 'HydroFlow', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400', stock: 200, rating: 4.9, numReviews: 350 },
  { name: 'Wireless Mechanical Keyboard', description: 'Compact TKL mechanical keyboard with RGB backlight.', price: 129.99, category: 'Electronics', brand: 'KeyMaster', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', stock: 60, rating: 4.6, numReviews: 110 },
  { name: 'Resistance Band Set', description: 'Set of 5 resistance bands for full-body workout training.', price: 19.99, category: 'Sports', brand: 'FitBand', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', stock: 150, rating: 4.4, numReviews: 220 },
  { name: 'Sunglasses Polarized UV400', description: 'Classic aviator sunglasses with polarized UV400 protection.', price: 49.99, category: 'Accessories', brand: 'SunStyle', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400', stock: 80, rating: 4.3, numReviews: 65 },
  { name: 'Portable Bluetooth Speaker', description: '360° sound waterproof speaker, 12hr playtime.', price: 69.99, category: 'Electronics', brand: 'SoundWave', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', stock: 55, rating: 4.7, numReviews: 175 }
];

const seedData = async () => {
  await connectDB();
  try {
    await Product.deleteMany();
    await User.deleteMany();

    await User.create({
      name: 'Admin User', email: 'admin@shop.com',
      password: 'admin123', isAdmin: true
    });
    await User.create({
      name: 'John Doe', email: 'john@example.com', password: 'john123'
    });

    await Product.insertMany(products);
    console.log('✅ Data seeded successfully!');
    console.log('📧 Admin: admin@shop.com / admin123');
    console.log('📧 User:  john@example.com / john123');
    process.exit();
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
};

seedData();