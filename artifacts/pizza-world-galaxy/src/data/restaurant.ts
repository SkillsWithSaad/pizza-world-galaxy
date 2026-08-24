export const restaurant = {
  name: 'Pizza World Galaxy',
  type: 'Fast Food Restaurant',
  address: '5CR4+QMR, near Rewaj Marquee, Qasim Bela, Bhutta Colony, Multan, Pakistan',
  phoneDisplay: '+92 308 4859955',
  phoneHref: 'tel:+923084859955',
  rating: '4.0',
  reviewCount: 9,
  priceRange: 'Rs 1–2,000 per person',
  services: ['Dine-in', 'Takeout', 'Delivery'],
  status: 'Open',
  closesAt: '3 AM',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pizza+World+Galaxy+Qasim+Bela+Multan',
  googleReviewUrl: '#reviews',
  whatsappEnabled: true,
  whatsappUrl: 'https://wa.me/923084859955',
} as const;

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  image: string;
  note: string;
};

export const menuItems: MenuItem[] = [
  { id: 'pizza', name: 'Pizza', category: 'Pizzas', image: '/images/pizza-pub-hero.jpg', note: 'Menu details coming soon' },
  { id: 'chicken-paratha-roll', name: 'Chicken Paratha Roll', category: 'Rolls', image: '/images/pizza-pub-hero.jpg', note: 'Menu details coming soon' },
  { id: 'loaded-fries', name: 'Loaded Fries', category: 'Fries', image: '/images/pizza-pub-hero.jpg', note: 'Menu details coming soon' },
  { id: 'cheese-burger', name: 'Cheese Burger', category: 'Burgers', image: '/images/pizza-pub-hero.jpg', note: 'Menu details coming soon' },
];

export const categoryList = ['Pizzas', 'Burgers', 'Rolls', 'Fries', 'Drinks', 'Deals'];