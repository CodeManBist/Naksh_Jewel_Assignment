const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Product = require("./modules/product/product.model");

const seedProducts = async () => {
  await connectDB();

  await Product.deleteMany();

  await Product.insertMany([
    {
      name: "Classic Gold Ring",
      price: 12000,
      description: "Timeless classic gold ring with elegant design, perfect for daily wear or special occasions.",
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
      stock: 5
    },
    {
      name: "Elegant Silver Necklace",
      price: 8000,
      description: "Beautiful silver necklace with sophisticated charm, ideal for adding a touch of elegance to any outfit.",
      image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d",
      stock: 8
    },
    {
      name: "Diamond Stud Earrings",
      price: 25000,
      description: "Luxurious diamond stud earrings that sparkle with brilliance and timeless beauty.",
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0",
      stock: 3
    },
    {
      name: "Rose Gold Bracelet",
      price: 15000,
      description: "Delicate rose gold bracelet with modern design, perfect for contemporary style.",
      image: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d",
      stock: 6
    },
    {
      name: "Pearl Drop Earrings",
      price: 9000,
      description: "Elegant pearl drop earrings bringing sophistication and grace to your look.",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
      stock: 7
    },
    {
      name: "Minimal Gold Chain",
      price: 11000,
      description: "Simple yet elegant gold chain perfect for minimalist fashion lovers.",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a",
      stock: 10
    },
    {
      name: "Luxury Diamond Ring",
      price: 45000,
      description: "Premium quality diamond ring, crafted with precision for those who appreciate luxury.",
      image: "https://images.unsplash.com/photo-1610223515982-9c2e40b19b2a",
      stock: 2
    },
    {
      name: "Traditional Gold Bangles",
      price: 30000,
      description: "Authentic traditional gold bangles with intricate design, perfect for festive occasions.",
      image: "https://images.unsplash.com/photo-1588444650700-6be4b78f9b0e",
      stock: 4
    },
    {
      name: "Heart Pendant Necklace",
      price: 7000,
      description: "Romantic heart-shaped pendant necklace expressing love and affection.",
      image: "https://images.unsplash.com/photo-1603974372039-adc49044b6bd",
      stock: 9
    },
    {
      name: "Statement Choker",
      price: 18000,
      description: "Bold statement choker that makes a powerful fashion statement.",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
      stock: 5
    },
    {
      name: "Emerald Stone Ring",
      price: 22000,
      description: "Stunning emerald stone ring with rich green color and timeless elegance.",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
      stock: 3
    },
    {
      name: "Gold Hoop Earrings",
      price: 9500,
      description: "Classic gold hoop earrings, versatile and perfect for any occasion.",
      image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed",
      stock: 8
    },
    {
      name: "Vintage Silver Bracelet",
      price: 6500,
      description: "Vintage-inspired silver bracelet with antique charm and character.",
      image: "https://images.unsplash.com/photo-1600721391689-2564bb8055de",
      stock: 6
    },
    {
      name: "Bridal Diamond Necklace",
      price: 65000,
      description: "Exquisite bridal diamond necklace, the perfect centerpiece for your wedding day.",
      image: "https://images.unsplash.com/photo-1617038260892-2d7f98c4c1e1",
      stock: 1
    }
  ]);

  console.log("✅ 14 Products Seeded Successfully");
  process.exit();
};

seedProducts();
