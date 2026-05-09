export interface MenuItem {
  id: string;
  name: string;
  category: "BURGER" | "CHICKEN" | "SIDES" | "DRINKS" | "DESSERTS";
  description: string;
  price: number;
  emoji: string;
  tags?: string[];
  calories: number;
  bestseller?: boolean;
  isNew?: boolean;
}

export const menuData: MenuItem[] = [
  {
    id: "big-mac",
    name: "Big Mac",
    category: "BURGER",
    description: "Made with 100% beef patties, Secret Sauce, Onions, Pickles",
    price: 4.99,
    emoji: "🍔",
    tags: ["beef", "high protein", "classic"],
    calories: 508,
    bestseller: true
  },
  {
    id: "cheeseburger",
    name: "Cheeseburger",
    category: "BURGER",
    description: "A classic 100% beef patty with cheese, onions, and pickles.",
    price: 1.19,
    emoji: "🍔",
    tags: ["beef", "classic", "low calorie"],
    calories: 300
  },
  {
    id: "mcchicken",
    name: "McChicken",
    category: "CHICKEN",
    description: "Crispy chicken patty with lettuce and mayo.",
    price: 3.49,
    emoji: "🥪",
    tags: ["chicken", "classic"],
    calories: 400
  },
  {
    id: "mcnuggets-6",
    name: "Chicken McNuggets (6pc)",
    category: "CHICKEN",
    description: "Golden, delicious, 100% white meat chicken nuggets",
    price: 3.99,
    emoji: "🍗",
    tags: ["chicken", "high protein", "bestseller"],
    calories: 250,
    bestseller: true
  },
  {
    id: "fries-med",
    name: "French Fries (Medium)",
    category: "SIDES",
    description: "World-famous, salty, golden & crispy.",
    price: 2.49,
    emoji: "🍟",
    tags: ["vegan", "classic", "bestseller"],
    calories: 337,
    bestseller: true
  },
  {
    id: "side-salad",
    name: "Side Salad",
    category: "SIDES",
    description: "Fresh mixed greens with cherry tomatoes.",
    price: 1.99,
    emoji: "🥗",
    tags: ["vegan", "low calorie", "healthy"],
    calories: 15
  },
  {
    id: "coca-cola-med",
    name: "Coca-Cola (Medium)",
    category: "DRINKS",
    description: "Ice-cold refreshing classic cola.",
    price: 2.19,
    emoji: "🥤",
    tags: ["soda", "cold"],
    calories: 210
  },
  {
    id: "diet-coke-med",
    name: "Diet Coke (Medium)",
    category: "DRINKS",
    description: "Ice-cold refreshing zero-calorie cola.",
    price: 2.19,
    emoji: "🥤",
    tags: ["soda", "cold", "low calorie", "sugar free", "zero calorie"],
    calories: 0
  },
  {
    id: "mcflurry-oreo",
    name: "McFlurry Oreo",
    category: "DESSERTS",
    description: "Soft serve with cookie crunch.",
    price: 3.99,
    emoji: "🍦",
    tags: ["ice cream", "sweet", "oreo"],
    calories: 510,
    isNew: true
  },
  {
    id: "apple-pie",
    name: "Baked Apple Pie",
    category: "DESSERTS",
    description: "Hot, crispy pie filled with American apples.",
    price: 1.49,
    emoji: "🥧",
    tags: ["sweet", "hot", "classic"],
    calories: 240
  }
];
