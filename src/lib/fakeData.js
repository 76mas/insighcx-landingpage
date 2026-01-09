// Mock Admin Data
export const fakeAdmin = {
  id: "admin_001",
  name: "Admin User",
  username: "admin",
  password: "admin123", // In real app, never store plain passwords!
};

// Mock Messages Data
export const fakeMessages = [
  {
    id: "ck_msg_001",
    name: "Ali Hassan",
    email: "ali@gmail.com",
    phone: "07701234567",
    message: "I would like to ask about apartments for sale in Mansour.",
    read: false,
    createdAt: "2025-01-06T08:20:00Z",
  },
  {
    id: "ck_msg_002",
    name: "Mohammed Kareem",
    email: "mohammed@gmail.com",
    phone: null,
    message: "Do you have investment lands outside Baghdad?",
    read: true,
    createdAt: "2025-01-05T18:45:00Z",
  },
  {
    id: "ck_msg_003",
    name: "Sara Ahmed",
    email: "sara.ahmed@gmail.com",
    phone: "07709876543",
    message:
      "I am interested in commercial properties in Karrada. Can you provide more details?",
    read: false,
    createdAt: "2025-01-05T14:30:00Z",
  },
  {
    id: "ck_msg_004",
    name: "Omar Khalil",
    email: "omar.k@gmail.com",
    phone: "07701122334",
    message: "What are the payment plans available for residential units?",
    read: true,
    createdAt: "2025-01-04T10:15:00Z",
  },
  {
    id: "ck_msg_005",
    name: "Fatima Noor",
    email: "fatima.noor@gmail.com",
    phone: null,
    message: "I would like to schedule a property viewing for next week.",
    read: false,
    createdAt: "2025-01-03T16:45:00Z",
  },
];

// Mock Blogs Data
export const fakeBlogs = [
  {
    id: "ck_blog_001",
    mainTitle: "Baghdad Real Estate Market",
    category: "Real Estate",
    imageUrl: "/images/blog1.jpg",
    secondaryTitle: ["Market Growth", "High Demand Areas", "Investment Tips"],
    paragraphs: [
      "Property prices have increased in several key areas.",
      "Locations close to services are more attractive.",
      "Investors should study the market carefully before buying.",
    ],
    createdAt: "2025-01-02T09:00:00Z",
    updatedAt: "2025-01-04T15:00:00Z",
  },
  {
    id: "ck_blog_002",
    mainTitle: "How to Choose the Right Home",
    category: "Guides",
    imageUrl: "/images/blog2.jpg",
    secondaryTitle: ["Location", "Space", "Nearby Services"],
    paragraphs: [
      "Location is essential for family comfort.",
      "The house size should match family needs.",
      "Nearby schools and hospitals add value.",
    ],
    createdAt: "2025-01-03T11:30:00Z",
    updatedAt: "2025-01-03T11:30:00Z",
  },
  {
    id: "ck_blog_003",
    mainTitle: "Investment Opportunities in Iraq",
    category: "Investment",
    imageUrl: "/images/blog3.jpg",
    secondaryTitle: [
      "Growing Economy",
      "Government Support",
      "Strategic Locations",
    ],
    paragraphs: [
      "The Iraqi economy is showing positive growth trends.",
      "Government initiatives are supporting foreign investments.",
      "Key cities offer strategic advantages for investors.",
    ],
    createdAt: "2025-01-01T08:00:00Z",
    updatedAt: "2025-01-02T12:00:00Z",
  },
  {
    id: "ck_blog_004",
    mainTitle: "Modern Apartment Living",
    category: "Lifestyle",
    imageUrl: "/images/blog4.jpg",
    secondaryTitle: ["Amenities", "Security", "Community"],
    paragraphs: [
      "New developments include state-of-the-art amenities.",
      "24/7 security ensures peace of mind for residents.",
      "Community spaces foster social connections.",
    ],
    createdAt: "2024-12-28T14:20:00Z",
    updatedAt: "2024-12-30T10:00:00Z",
  },
];
