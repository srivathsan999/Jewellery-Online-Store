// Sample Product Data
const productsData = [
    // Necklaces
    {
        id: 1,
        name: "Elegant Gold Chain Necklace",
        category: "necklaces",
        collection: "luxury",
        price: 1299.99,
        oldPrice: 1599.99,
        discount: 19,
        description: "A stunning 18K gold chain necklace featuring intricate craftsmanship and timeless elegance.",
        material: "18K Gold",
        purity: "18 Karat",
        weight: "25g",
        images: [
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 15,
        featured: true,
        trending: true
    },
    {
        id: 2,
        name: "Diamond Pendant Necklace",
        category: "necklaces",
        collection: "luxury",
        price: 2499.99,
        oldPrice: 2999.99,
        discount: 17,
        description: "Exquisite diamond pendant set in premium 18K gold, perfect for special occasions.",
        material: "18K Gold, Diamond",
        purity: "18 Karat",
        weight: "18g",
        images: [
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 8,
        featured: true,
        trending: true
    },
    {
        id: 3,
        name: "Pearl Strand Necklace",
        category: "necklaces",
        collection: "wedding",
        price: 899.99,
        oldPrice: 1099.99,
        discount: 18,
        description: "Classic pearl strand necklace with lustrous South Sea pearls, a timeless treasure.",
        material: "South Sea Pearls, 14K Gold",
        purity: "14 Karat",
        weight: "22g",
        images: [
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 12,
        featured: false,
        trending: false
    },
    {
        id: 4,
        name: "Rose Gold Choker",
        category: "necklaces",
        collection: "luxury",
        price: 699.99,
        oldPrice: null,
        discount: 0,
        description: "Modern rose gold choker with delicate chain design, perfect for contemporary style.",
        material: "18K Rose Gold",
        purity: "18 Karat",
        weight: "15g",
        images: [
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 20,
        featured: false,
        trending: true
    },
    
    // Earrings
    {
        id: 5,
        name: "Diamond Stud Earrings",
        category: "earrings",
        collection: "luxury",
        price: 1899.99,
        oldPrice: 2299.99,
        discount: 17,
        description: "Brilliant round diamond studs in 18K white gold, classic and sophisticated.",
        material: "18K White Gold, Diamond",
        purity: "18 Karat",
        weight: "8g",
        images: [
            "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 10,
        featured: true,
        trending: true
    },
    {
        id: 6,
        name: "Gold Hoop Earrings",
        category: "earrings",
        collection: "luxury",
        price: 599.99,
        oldPrice: null,
        discount: 0,
        description: "Elegant gold hoop earrings with modern twist, versatile for any occasion.",
        material: "18K Gold",
        purity: "18 Karat",
        weight: "12g",
        images: [
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 18,
        featured: false,
        trending: true
    },
    {
        id: 7,
        name: "Pearl Drop Earrings",
        category: "earrings",
        collection: "wedding",
        price: 799.99,
        oldPrice: 999.99,
        discount: 20,
        description: "Graceful pearl drop earrings with gold accents, perfect for weddings.",
        material: "Pearl, 14K Gold",
        purity: "14 Karat",
        weight: "10g",
        images: [
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 14,
        featured: true,
        trending: false
    },
    {
        id: 8,
        name: "Rose Gold Dangle Earrings",
        category: "earrings",
        collection: "luxury",
        price: 649.99,
        oldPrice: null,
        discount: 0,
        description: "Stylish rose gold dangle earrings with geometric design elements.",
        material: "18K Rose Gold",
        purity: "18 Karat",
        weight: "9g",
        images: [
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 16,
        featured: false,
        trending: false
    },
    
    // Rings
    {
        id: 9,
        name: "Solitaire Diamond Ring",
        category: "rings",
        collection: "wedding",
        price: 3299.99,
        oldPrice: 3999.99,
        discount: 18,
        description: "Magnificent solitaire diamond ring in platinum setting, the ultimate symbol of love.",
        material: "Platinum, Diamond",
        purity: "Platinum 950",
        weight: "6g",
        images: [
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 5,
        featured: true,
        trending: true
    },
    {
        id: 10,
        name: "Gold Band Ring",
        category: "rings",
        collection: "luxury",
        price: 499.99,
        oldPrice: null,
        discount: 0,
        description: "Classic gold band ring with engraved pattern, timeless elegance.",
        material: "18K Gold",
        purity: "18 Karat",
        weight: "5g",
        images: [
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 25,
        featured: false,
        trending: false
    },
    {
        id: 11,
        name: "Three-Stone Diamond Ring",
        category: "rings",
        collection: "wedding",
        price: 2799.99,
        oldPrice: 3299.99,
        discount: 15,
        description: "Beautiful three-stone diamond ring representing past, present, and future.",
        material: "18K White Gold, Diamond",
        purity: "18 Karat",
        weight: "7g",
        images: [
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 7,
        featured: true,
        trending: true
    },
    {
        id: 12,
        name: "Vintage Style Ring",
        category: "rings",
        collection: "luxury",
        price: 899.99,
        oldPrice: 1099.99,
        discount: 18,
        description: "Intricate vintage-style ring with filigree details and gemstone accents.",
        material: "18K Gold, Gemstones",
        purity: "18 Karat",
        weight: "6g",
        images: [
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 11,
        featured: false,
        trending: false
    },
    
    // Bracelets
    {
        id: 13,
        name: "Tennis Bracelet",
        category: "bracelets",
        collection: "luxury",
        price: 3499.99,
        oldPrice: 4299.99,
        discount: 19,
        description: "Luxurious tennis bracelet with continuous diamond line, ultimate sophistication.",
        material: "18K White Gold, Diamond",
        purity: "18 Karat",
        weight: "35g",
        images: [
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 4,
        featured: true,
        trending: true
    },
    {
        id: 14,
        name: "Gold Link Bracelet",
        category: "bracelets",
        collection: "luxury",
        price: 1199.99,
        oldPrice: null,
        discount: 0,
        description: "Sturdy gold link bracelet with secure clasp, perfect for everyday wear.",
        material: "18K Gold",
        purity: "18 Karat",
        weight: "28g",
        images: [
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 13,
        featured: false,
        trending: true
    },
    {
        id: 15,
        name: "Pearl Bracelet",
        category: "bracelets",
        collection: "wedding",
        price: 699.99,
        oldPrice: 899.99,
        discount: 22,
        description: "Elegant pearl bracelet with gold clasp, classic and refined.",
        material: "Pearl, 14K Gold",
        purity: "14 Karat",
        weight: "20g",
        images: [
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 15,
        featured: true,
        trending: false
    },
    {
        id: 16,
        name: "Charm Bracelet",
        category: "bracelets",
        collection: "luxury",
        price: 999.99,
        oldPrice: null,
        discount: 0,
        description: "Personalizable charm bracelet with initial charms and decorative elements.",
        material: "18K Gold",
        purity: "18 Karat",
        weight: "22g",
        images: [
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 9,
        featured: false,
        trending: false
    },
    
    // Additional Luxury Collection
    {
        id: 17,
        name: "Emerald & Diamond Necklace",
        category: "necklaces",
        collection: "luxury",
        price: 4599.99,
        oldPrice: 5499.99,
        discount: 16,
        description: "Stunning emerald and diamond necklace, a true statement piece.",
        material: "18K Gold, Emerald, Diamond",
        purity: "18 Karat",
        weight: "32g",
        images: [
            "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 3,
        featured: true,
        trending: true
    },
    {
        id: 18,
        name: "Ruby & Gold Earrings",
        category: "earrings",
        collection: "luxury",
        price: 2199.99,
        oldPrice: 2699.99,
        discount: 19,
        description: "Exquisite ruby earrings set in premium gold, vibrant and luxurious.",
        material: "18K Gold, Ruby",
        purity: "18 Karat",
        weight: "11g",
        images: [
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 6,
        featured: true,
        trending: true
    },
    {
        id: 19,
        name: "Platinum Wedding Band Set",
        category: "rings",
        collection: "wedding",
        price: 1899.99,
        oldPrice: 2299.99,
        discount: 17,
        description: "Matching platinum wedding bands with engraved patterns, perfect for couples.",
        material: "Platinum",
        purity: "Platinum 950",
        weight: "12g",
        images: [
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 8,
        featured: true,
        trending: false
    },
    {
        id: 20,
        name: "Diamond Bangle",
        category: "bracelets",
        collection: "luxury",
        price: 2799.99,
        oldPrice: 3399.99,
        discount: 18,
        description: "Elegant diamond bangle with seamless design, luxury redefined.",
        material: "18K White Gold, Diamond",
        purity: "18 Karat",
        weight: "30g",
        images: [
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 5,
        featured: true,
        trending: true
    },
    {
        id: 21,
        name: "Sapphire Pendant Necklace",
        category: "necklaces",
        collection: "luxury",
        price: 1899.99,
        oldPrice: 2299.99,
        discount: 17,
        description: "Beautiful sapphire pendant on delicate gold chain, timeless beauty.",
        material: "18K Gold, Sapphire",
        purity: "18 Karat",
        weight: "16g",
        images: [
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 10,
        featured: false,
        trending: true
    },
    {
        id: 22,
        name: "Vintage Pearl Necklace",
        category: "necklaces",
        collection: "wedding",
        price: 1299.99,
        oldPrice: 1599.99,
        discount: 19,
        description: "Classic vintage-style pearl necklace with intricate gold details.",
        material: "Pearl, 14K Gold",
        purity: "14 Karat",
        weight: "24g",
        images: [
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 7,
        featured: false,
        trending: false
    },
    {
        id: 23,
        name: "Art Deco Ring",
        category: "rings",
        collection: "luxury",
        price: 1599.99,
        oldPrice: 1999.99,
        discount: 20,
        description: "Stunning Art Deco inspired ring with geometric patterns and gemstones.",
        material: "18K Gold, Diamond, Sapphire",
        purity: "18 Karat",
        weight: "8g",
        images: [
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 4,
        featured: true,
        trending: true
    },
    {
        id: 24,
        name: "Rose Gold Cuff Bracelet",
        category: "bracelets",
        collection: "luxury",
        price: 1499.99,
        oldPrice: null,
        discount: 0,
        description: "Bold rose gold cuff bracelet with modern design, makes a statement.",
        material: "18K Rose Gold",
        purity: "18 Karat",
        weight: "40g",
        images: [
            "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format&q=80",
            "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format&q=80"
        ],
        thumbnail: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop&auto=format&q=80",
        inStock: true,
        stock: 6,
        featured: false,
        trending: true
    }
];

// Categories Data
const categoriesData = [
    {
        id: "necklaces",
        name: "Necklaces",
        description: "Elegant necklaces for every occasion",
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop&auto=format&q=80",
        count: 6
    },
    {
        id: "earrings",
        name: "Earrings",
        description: "Stunning earrings to frame your face",
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=600&fit=crop&auto=format&q=80",
        count: 4
    },
    {
        id: "rings",
        name: "Rings",
        description: "Symbols of love and commitment",
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=600&fit=crop&auto=format&q=80",
        count: 5
    },
    {
        id: "bracelets",
        name: "Bracelets",
        description: "Adorn your wrists with elegance",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop&auto=format&q=80",
        count: 5
    },
];

// Testimonials Data
const testimonialsData = [
    {
        name: "Sarah Johnson",
        role: "Customer",
        rating: 5,
        text: "Absolutely stunning pieces! The quality is exceptional and the craftsmanship is evident in every detail. My necklace arrived beautifully packaged and exceeded all expectations."
    },
    {
        name: "Emily Chen",
        role: "Bride",
        rating: 5,
        text: "I found my perfect wedding ring here. The service was impeccable and the ring is even more beautiful in person. Highly recommend for anyone looking for quality jewellery."
    }
];

// Blog Posts Data
const blogPostsData = [
    {
        id: 1,
        title: "The Art of Handcrafted Jewellery",
        excerpt: "Discover the intricate process behind creating our premium handcrafted pieces.",
        image: "blog-1.jpg",
        date: "2024-03-15",
        author: "Emma Wilson",
        category: "Craftsmanship"
    },
    {
        id: 3,
        title: "Understanding Gold Purity and Karats",
        excerpt: "Learn about different gold purities and what makes 18K gold special.",
        image: "blog-3.jpg",
        date: "2024-03-05",
        author: "Sarah Johnson",
        category: "Education"
    },
    {
        id: 4,
        title: "Caring for Your Precious Jewellery",
        excerpt: "Essential tips to keep your jewellery looking beautiful for generations.",
        image: "blog-4.jpg",
        date: "2024-02-28",
        author: "Emma Wilson",
        category: "Care"
    },
    {
        id: 5,
        title: "Choosing the Perfect Engagement Ring",
        excerpt: "A comprehensive guide to selecting the ideal engagement ring that symbolizes your love story.",
        image: "blog-5.jpg",
        date: "2024-03-20",
        author: "Michael Chen",
        category: "Guide"
    },
    {
        id: 6,
        title: "The History of Diamond Jewellery",
        excerpt: "Explore the fascinating journey of diamonds from ancient times to modern luxury collections.",
        image: "blog-6.jpg",
        date: "2024-03-10",
        author: "Sarah Johnson",
        category: "Education"
    },
    {
        id: 7,
        title: "Trending Jewellery Styles for 2024",
        excerpt: "Discover the latest trends in jewellery design and how to incorporate them into your collection.",
        image: "blog-7.jpg",
        date: "2024-03-01",
        author: "Emma Wilson",
        category: "Guide"
    }
];

// Export data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productsData, categoriesData, testimonialsData, blogPostsData };
}
