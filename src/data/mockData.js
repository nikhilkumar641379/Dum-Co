// Master Data Catalog for Dum & Co.
// Matching all Stitch designs and asset inventory

export const RESTAURANT_INFO = {
  name: "Dum & Co.",
  tagline: "Royal Dum Cooking & Artisanal Indian Dining",
  address: "74 Heritage Enclave, Golf Course Road, Sector 54, Gurugram, Haryana 122002",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
  email: "concierge@dumandco.com",
  timings: "12:00 PM – 11:30 PM (Daily)",
  deliveryRadiusKm: 12,
  minOrder: 250,
  taxRate: 5, // 5% GST
  packagingFee: 30,
  freeDeliveryThreshold: 500,
  deliveryFee: 45,
  isOpen: true,
  rating: 4.9,
  totalReviews: 2450
};

export const CATEGORIES = [
  {
    id: "cat-biryani",
    name: "Dum Biryanis",
    description: "Slow-cooked in clay handis sealed with dough over low charcoal flame",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    itemCount: 6,
    sortOrder: 1,
    status: "active"
  },
  {
    id: "cat-starters",
    name: "Clay Oven Starters",
    description: "Tandoor charred kebabs, delicate tikkas, and melt-in-mouth delicacies",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    itemCount: 6,
    sortOrder: 2,
    status: "active"
  },
  {
    id: "cat-curries",
    name: "Royal Gravies",
    description: "Simmered for 8+ hours with whole crushed heritage spices and saffron",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    itemCount: 5,
    sortOrder: 3,
    status: "active"
  },
  {
    id: "cat-breads",
    name: "Artisanal Breads",
    description: "Khamiri roti, warqi parathas, and zafrani sheermaal fresh from the tandoor",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80",
    itemCount: 4,
    sortOrder: 4,
    status: "active"
  },
  {
    id: "cat-desserts",
    name: "Royal Mithai",
    description: "Centuries-old sweet delicacies crafted with pistachios, chashni, and gold vark",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    itemCount: 4,
    sortOrder: 5,
    status: "active"
  },
  {
    id: "cat-beverages",
    name: "Crafted Refreshers",
    description: "Botanical sherbets, smoked spices, and cardamom-infused coolers",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    itemCount: 5,
    sortOrder: 6,
    status: "active"
  }
];

export const FOOD_ITEMS = [
  {
    id: "food-1",
    name: "Awadhi Gosht Dum Biryani",
    category: "cat-biryani",
    categoryName: "Dum Biryanis",
    price: 645,
    dietary: "non-veg",
    spiceLevel: 2, // 1 to 3
    isBestseller: true,
    isChefSpecial: true,
    prepTime: "35 mins",
    rating: 4.9,
    reviewCount: 840,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80",
    description: "Prime baby goat marinated for 12 hours in hand-ground Awadhi spices, layered with aged Basmati rice, saffron-infused milk, and slow-dum cooked in an earthen handi.",
    portions: [
      { name: "Regular Handi (Serves 1-2)", price: 645 },
      { name: "Royal Handi (Serves 3-4)", price: 1195 }
    ],
    accompaniments: [
      { id: "acc-1", name: "Burani Garlic Raita", price: 65 },
      { id: "acc-2", name: "Mirchi Ka Salan", price: 75 },
      { id: "acc-3", name: "Sirka Pyaz & Mint Chutney", price: 40 }
    ],
    ingredients: ["Aged Basmati", "Tender Goat", "Kashmiri Saffron", "Shahi Zeera", "Mace & Javitri", "Pure Ghee", "Crispy Barista"]
  },
  {
    id: "food-2",
    name: "Subz-e-Gulzar Dum Biryani",
    category: "cat-biryani",
    categoryName: "Dum Biryanis",
    price: 495,
    dietary: "veg",
    spiceLevel: 1,
    isBestseller: true,
    isChefSpecial: false,
    prepTime: "25 mins",
    rating: 4.8,
    reviewCount: 620,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=1000&q=80",
    description: "Garden-fresh florets, carrots, french beans, and organic cottage cheese simmered in aromatic saffron broth and sealed under dum with aged dehradun rice.",
    portions: [
      { name: "Regular Handi (Serves 1-2)", price: 495 },
      { name: "Royal Handi (Serves 3-4)", price: 920 }
    ],
    accompaniments: [
      { id: "acc-1", name: "Burani Garlic Raita", price: 65 },
      { id: "acc-2", name: "Mirchi Ka Salan", price: 75 }
    ],
    ingredients: ["Malai Paneer", "Baby Florets", "French Beans", "Aged Rice", "Desi Ghee", "Saffron Milk"]
  },
  {
    id: "food-3",
    name: "Dum Murgh Kacchi Biryani",
    category: "cat-biryani",
    categoryName: "Dum Biryanis",
    price: 545,
    dietary: "non-veg",
    spiceLevel: 2,
    isBestseller: true,
    isChefSpecial: false,
    prepTime: "30 mins",
    rating: 4.9,
    reviewCount: 1120,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80",
    description: "Tender chicken pieces marinated raw in whole spices, fresh yogurt, and brown onions, then cooked along with par-boiled basmati under sealed steam.",
    portions: [
      { name: "Regular Handi (Serves 1-2)", price: 545 },
      { name: "Royal Handi (Serves 3-4)", price: 995 }
    ],
    accompaniments: [
      { id: "acc-1", name: "Burani Garlic Raita", price: 65 },
      { id: "acc-2", name: "Mirchi Ka Salan", price: 75 }
    ],
    ingredients: ["Farm Fresh Chicken", "Basmati Rice", "Yogurt", "Kewra Water", "Brown Onions", "Cardamom"]
  },
  {
    id: "food-4",
    name: "Tandoori Malai Paneer Tikka",
    category: "cat-starters",
    categoryName: "Clay Oven Starters",
    price: 425,
    dietary: "veg",
    spiceLevel: 1,
    isBestseller: true,
    isChefSpecial: true,
    prepTime: "20 mins",
    rating: 4.8,
    reviewCount: 540,
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80",
    description: "Cubes of hand-churned fresh paneer steeped in clotted cream, crushed green cardamom, and toasted cashew paste, gently smoked in our clay tandoor.",
    portions: [
      { name: "Standard (6 Pieces)", price: 425 },
      { name: "Platter (10 Pieces)", price: 685 }
    ],
    accompaniments: [
      { id: "acc-3", name: "Sirka Pyaz & Mint Chutney", price: 40 }
    ],
    ingredients: ["Fresh Cottage Cheese", "Malai Cream", "Cashew Paste", "Cardamom", "White Pepper"]
  },
  {
    id: "food-5",
    name: "Melt-in-Mouth Galouti Kebab",
    category: "cat-starters",
    categoryName: "Clay Oven Starters",
    price: 595,
    dietary: "non-veg",
    spiceLevel: 2,
    isBestseller: false,
    isChefSpecial: true,
    prepTime: "25 mins",
    rating: 4.9,
    reviewCount: 410,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
    description: "Finely minced mutton infused with 32 rare royal spices and raw papaya, pan-seared in pure ghee on a flat mahi tawa. Served over mini Mughlai parathas.",
    portions: [
      { name: "4 Kebabs with 4 Mini Parathas", price: 595 },
      { name: "8 Kebabs with 8 Mini Parathas", price: 1095 }
    ],
    accompaniments: [
      { id: "acc-3", name: "Sirka Pyaz & Mint Chutney", price: 40 }
    ],
    ingredients: ["Finely Minced Goat", "Potli Spices", "Kewra", "Desi Ghee", "Raw Papaya", "Brown Onion Paste"]
  },
  {
    id: "food-6",
    name: "Amritsari Ajwaini Fish Tikka",
    category: "cat-starters",
    categoryName: "Clay Oven Starters",
    price: 575,
    dietary: "non-veg",
    spiceLevel: 2,
    isBestseller: false,
    isChefSpecial: false,
    prepTime: "20 mins",
    rating: 4.7,
    reviewCount: 320,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80",
    description: "Succulent cubes of fresh river sole marinated in roasted carom seeds, ground mustard, gram flour, and lemon juice, blistered over charcoal.",
    portions: [
      { name: "Standard (6 Pieces)", price: 575 },
      { name: "Platter (10 Pieces)", price: 895 }
    ],
    accompaniments: [
      { id: "acc-3", name: "Sirka Pyaz & Mint Chutney", price: 40 }
    ],
    ingredients: ["River Sole Fillet", "Ajwain Seeds", "Yellow Mustard", "Hung Curd", "Lemon"]
  },
  {
    id: "food-7",
    name: "Dal Dum Pukht (36-Hour Simmer)",
    category: "cat-curries",
    categoryName: "Royal Gravies",
    price: 445,
    dietary: "veg",
    spiceLevel: 1,
    isBestseller: true,
    isChefSpecial: true,
    prepTime: "15 mins",
    rating: 5.0,
    reviewCount: 1450,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80",
    description: "Black lentils slow-cooked overnight over dying embers with San Marzano style Indian tomatoes, white unsalted farm butter, and Kashmiri chili.",
    portions: [
      { name: "Single Bowl (Serves 1-2)", price: 445 },
      { name: "Handi Bowl (Serves 3-4)", price: 795 }
    ],
    accompaniments: [
      { id: "acc-3", name: "Sirka Pyaz & Mint Chutney", price: 40 }
    ],
    ingredients: ["Urad Dal", "White Farm Butter", "Fresh Tomato Reduction", "Kasuri Methi", "Cream"]
  },
  {
    id: "food-8",
    name: "Murgh Shahi Korma Zafrani",
    category: "cat-curries",
    categoryName: "Royal Gravies",
    price: 565,
    dietary: "non-veg",
    spiceLevel: 1,
    isBestseller: true,
    isChefSpecial: false,
    prepTime: "25 mins",
    rating: 4.8,
    reviewCount: 780,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1000&q=80",
    description: "Classic courtly preparation of chicken steeped in a velvet sauce of caramelized onions, sweet almond flour, green cardamom, and strands of saffron.",
    portions: [
      { name: "Regular (Serves 2)", price: 565 },
      { name: "Large (Serves 4)", price: 995 }
    ],
    accompaniments: [
      { id: "acc-3", name: "Sirka Pyaz & Mint Chutney", price: 40 }
    ],
    ingredients: ["Chicken Thighs", "Almond Paste", "Saffron Threads", "Browned Onions", "Khoya"]
  },
  {
    id: "food-9",
    name: "Kashmiri Rogan Josh Nalli",
    category: "cat-curries",
    categoryName: "Royal Gravies",
    price: 685,
    dietary: "non-veg",
    spiceLevel: 3,
    isBestseller: false,
    isChefSpecial: true,
    prepTime: "30 mins",
    rating: 4.9,
    reviewCount: 590,
    image: "https://images.unsplash.com/photo-1545247181-516773ca838b?auto=format&fit=crop&w=1000&q=80",
    description: "Tender lamb shanks gently braised in a rich gravy tinged red with Ratan Jot bark, dried Kashmiri cockscomb flowers, and sun-dried ginger.",
    portions: [
      { name: "Shank Portion (Serves 2)", price: 685 },
      { name: "Family Handi (Serves 4)", price: 1250 }
    ],
    accompaniments: [
      { id: "acc-3", name: "Sirka Pyaz & Mint Chutney", price: 40 }
    ],
    ingredients: ["Lamb Shanks (Nalli)", "Ratan Jot", "Fennel Powder", "Dry Ginger (Sonth)", "Mustard Oil"]
  },
  {
    id: "food-10",
    name: "Zafrani Sheermaal & Warqi Paratha",
    category: "cat-breads",
    categoryName: "Artisanal Breads",
    price: 145,
    dietary: "veg",
    spiceLevel: 0,
    isBestseller: true,
    isChefSpecial: false,
    prepTime: "12 mins",
    rating: 4.9,
    reviewCount: 390,
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=1000&q=80",
    description: "Sweet milk-bread flavored with saffron and cardamom, baked on a tandoor cushion, alongside multilayered flaky ghee parathas.",
    portions: [
      { name: "1 Sheermaal + 1 Warqi Paratha", price: 145 },
      { name: "Bread Basket (Assorted 4)", price: 295 }
    ],
    accompaniments: [],
    ingredients: ["Fine Flour", "Full Cream Milk", "Pure Ghee", "Saffron Essence"]
  },
  {
    id: "food-11",
    name: "Kesar Shahi Tukda with Rabri",
    category: "cat-desserts",
    categoryName: "Royal Mithai",
    price: 295,
    dietary: "veg",
    spiceLevel: 0,
    isBestseller: true,
    isChefSpecial: true,
    prepTime: "10 mins",
    rating: 4.9,
    reviewCount: 680,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80",
    description: "Crispy ghee-fried brioche soaked in saffron cardamom sugar syrup, smothered in 6-hour thickened laccha rabri, silver vark, and crushed pistachios.",
    portions: [
      { name: "Double Slice Platter", price: 295 },
      { name: "Grand Feast Platter (4 Slices)", price: 540 }
    ],
    accompaniments: [],
    ingredients: ["Artisanal Brioche", "Buffalo Milk Rabri", "Kashmiri Kesar", "Pistachio Slivers", "Silver Vark"]
  },
  {
    id: "food-12",
    name: "Warm Angoori Gulab Jamun",
    category: "cat-desserts",
    categoryName: "Royal Mithai",
    price: 245,
    dietary: "veg",
    spiceLevel: 0,
    isBestseller: false,
    isChefSpecial: false,
    prepTime: "10 mins",
    rating: 4.8,
    reviewCount: 510,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80",
    description: "Miniature dumplings of fresh khoya and chenna fried to deep mahogany, steeped in rose-petaled warm sugar syrup.",
    portions: [
      { name: "Portion of 6", price: 245 },
      { name: "Handi of 12", price: 440 }
    ],
    accompaniments: [],
    ingredients: ["Fresh Khoya", "Cow Milk Chenna", "Damask Rose Chashni", "Green Cardamom"]
  },
  {
    id: "food-13",
    name: "Saffron Pomegranate Sparkler",
    category: "cat-beverages",
    categoryName: "Crafted Refreshers",
    price: 225,
    dietary: "veg",
    spiceLevel: 0,
    isBestseller: true,
    isChefSpecial: false,
    prepTime: "8 mins",
    rating: 4.9,
    reviewCount: 340,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80",
    description: "Cold-pressed fresh ruby pomegranate pearls muddled with crushed fresh mint, lime juice, saffron syrup, and sparkling soda.",
    portions: [
      { name: "350ml Glass", price: 225 }
    ],
    accompaniments: [],
    ingredients: ["Fresh Pomegranate", "Mint Leaves", "Saffron Syrup", "Rock Salt", "Sparkling Water"]
  },
  {
    id: "food-14",
    name: "Smoked Cardamom Cold Brew",
    category: "cat-beverages",
    categoryName: "Crafted Refreshers",
    price: 245,
    dietary: "veg",
    spiceLevel: 0,
    isBestseller: false,
    isChefSpecial: true,
    prepTime: "5 mins",
    rating: 4.8,
    reviewCount: 220,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1000&q=80",
    description: "Single-origin Arabica steeped cold for 18 hours, shaken with sweetened condensed milk and freshly ground green cardamom over crystal ice.",
    portions: [
      { name: "350ml Tall Glass", price: 245 }
    ],
    accompaniments: [],
    ingredients: ["Chikmagalur Arabica", "Cardamom Essence", "Condensed Milk", "Ice"]
  }
];

export const COUPONS = [
  {
    id: "coup-1",
    code: "ROYALDUM20",
    discountPercent: 20,
    maxDiscount: 200,
    minOrder: 499,
    validUntil: "2026-12-31",
    description: "20% off up to ₹200 on all Handi Dum Biryanis & Gravies",
    terms: "Valid once per user. Minimum cart value ₹499.",
    usageCount: 1420,
    status: "active"
  },
  {
    id: "coup-2",
    code: "FIRSTFEAST",
    discountPercent: 25,
    maxDiscount: 250,
    minOrder: 399,
    validUntil: "2026-12-31",
    description: "Welcome feast! 25% off up to ₹250 on your inaugural order",
    terms: "Valid on first-time orders only.",
    usageCount: 890,
    status: "active"
  },
  {
    id: "coup-3",
    code: "ROYALFLAT100",
    discountFlat: 100,
    minOrder: 699,
    validUntil: "2026-11-30",
    description: "Flat ₹100 instant cash discount on orders above ₹699",
    terms: "Applicable on all items including desserts & starters.",
    usageCount: 2150,
    status: "active"
  }
];

export const INITIAL_ORDERS = [
  {
    id: "DUM-9841",
    customer: {
      name: "Aaditya Singhania",
      email: "aaditya.singhania@gmail.com",
      phone: "+91 98201 12345",
      address: "Villa 14, Magnolias, Golf Course Road, Gurugram"
    },
    items: [
      { id: "food-1", name: "Awadhi Gosht Dum Biryani", quantity: 2, price: 645, portion: "Regular Handi (Serves 1-2)" },
      { id: "food-4", name: "Tandoori Malai Paneer Tikka", quantity: 1, price: 425, portion: "Standard (6 Pieces)" }
    ],
    subtotal: 1715,
    tax: 85.75,
    deliveryFee: 0,
    discount: 200,
    total: 1600.75,
    status: "In Kitchen", // "Received", "In Kitchen", "Ready", "Out for Delivery", "Delivered"
    paymentMethod: "Online (Razorpay / UPI)",
    paymentStatus: "Paid",
    createdAt: "2026-11-01T19:45:00Z",
    estimatedDelivery: "45 mins",
    rider: {
      name: "Vikram Chauhan",
      phone: "+91 99887 66554",
      vehicle: "HR-26-ED-4412"
    }
  },
  {
    id: "DUM-9840",
    customer: {
      name: "Meera Kapoor",
      email: "meera.kapoor@outlook.com",
      phone: "+91 98112 55443",
      address: "Apt 902, Tower B, Camellias, Sector 42, Gurugram"
    },
    items: [
      { id: "food-7", name: "Dal Dum Pukht (36-Hour Simmer)", quantity: 1, price: 445, portion: "Single Bowl" },
      { id: "food-10", name: "Zafrani Sheermaal & Warqi Paratha", quantity: 2, price: 145, portion: "1 Sheermaal + 1 Warqi" },
      { id: "food-11", name: "Kesar Shahi Tukda with Rabri", quantity: 1, price: 295, portion: "Double Slice Platter" }
    ],
    subtotal: 1030,
    tax: 51.5,
    deliveryFee: 0,
    discount: 100,
    total: 981.5,
    status: "Out for Delivery",
    paymentMethod: "Online (UPI)",
    paymentStatus: "Paid",
    createdAt: "2026-11-01T19:15:00Z",
    estimatedDelivery: "15 mins",
    rider: {
      name: "Sunil Yadav",
      phone: "+91 97112 33441",
      vehicle: "HR-26-DF-1092"
    }
  },
  {
    id: "DUM-9839",
    customer: {
      name: "Rohan Malhotra",
      email: "rohan.m@rediffmail.com",
      phone: "+91 98711 00998",
      address: "B-44, Nirvana Country, Sector 50, Gurugram"
    },
    items: [
      { id: "food-3", name: "Dum Murgh Kacchi Biryani", quantity: 1, price: 545, portion: "Regular Handi" },
      { id: "food-13", name: "Saffron Pomegranate Sparkler", quantity: 2, price: 225, portion: "350ml Glass" }
    ],
    subtotal: 995,
    tax: 49.75,
    deliveryFee: 0,
    discount: 199,
    total: 845.75,
    status: "Delivered",
    paymentMethod: "Credit Card (Visa)",
    paymentStatus: "Paid",
    createdAt: "2026-11-01T18:20:00Z",
    estimatedDelivery: "Delivered",
    rider: {
      name: "Deepak Rawat",
      phone: "+91 99110 88221",
      vehicle: "HR-26-AB-3421"
    }
  }
];

export const CUSTOMERS = [
  {
    id: "cust-1",
    name: "Aaditya Singhania",
    email: "aaditya.singhania@gmail.com",
    phone: "+91 98201 12345",
    totalOrders: 18,
    totalSpent: 28450,
    loyaltyTier: "Royal Patron",
    joinedDate: "2025-08-12",
    favoriteDish: "Awadhi Gosht Dum Biryani"
  },
  {
    id: "cust-2",
    name: "Meera Kapoor",
    email: "meera.kapoor@outlook.com",
    phone: "+91 98112 55443",
    totalOrders: 12,
    totalSpent: 16900,
    loyaltyTier: "Gold Member",
    joinedDate: "2025-11-04",
    favoriteDish: "Dal Dum Pukht"
  },
  {
    id: "cust-3",
    name: "Rohan Malhotra",
    email: "rohan.m@rediffmail.com",
    phone: "+91 98711 00998",
    totalOrders: 8,
    totalSpent: 9800,
    loyaltyTier: "Silver Member",
    joinedDate: "2026-02-19",
    favoriteDish: "Dum Murgh Kacchi Biryani"
  },
  {
    id: "cust-4",
    name: "Zoya Akhtar",
    email: "zoya.akhtar@yahoo.com",
    phone: "+91 99201 88776",
    totalOrders: 24,
    totalSpent: 39500,
    loyaltyTier: "Royal Patron",
    joinedDate: "2025-04-10",
    favoriteDish: "Tandoori Malai Paneer Tikka"
  }
];

export const ANALYTICS_DATA = {
  summary: {
    todayRevenue: 48920,
    todayOrders: 36,
    avgOrderValue: 1358,
    activeKitchenQueue: 7,
    monthRevenue: 1245000,
    totalCustomers: 1420
  },
  hourlyOrders: [
    { hour: "12 PM", orders: 12, revenue: 14200 },
    { hour: "1 PM", orders: 28, revenue: 38400 },
    { hour: "2 PM", orders: 22, revenue: 29500 },
    { hour: "3 PM", orders: 8, revenue: 9800 },
    { hour: "7 PM", orders: 18, revenue: 24600 },
    { hour: "8 PM", orders: 42, revenue: 58900 },
    { hour: "9 PM", orders: 38, revenue: 51200 },
    { hour: "10 PM", orders: 24, revenue: 31000 }
  ],
  categoryPerformance: [
    { category: "Dum Biryanis", share: 48, revenue: 597600 },
    { category: "Royal Gravies", share: 22, revenue: 273900 },
    { category: "Clay Oven Starters", share: 18, revenue: 224100 },
    { category: "Desserts & Beverages", share: 12, revenue: 149400 }
  ]
};
