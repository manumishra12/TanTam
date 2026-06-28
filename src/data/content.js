// Central content for the TanTam site (Crimson & Gold). Asset helper:
export const A = (n) => `/assets/${n}`

// ---- routes / nav ----
// Order: About up front (who we are) → how we help → browse/buy, Shop last.
export const routes = [
  { label: 'About', to: '/about' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Categories', to: '/categories' },
  { label: 'Occasions', to: '/occasions' },
  { label: 'Experiential', to: '/experiential' },
  { label: 'Diwali', to: '/diwali' },
  { label: 'Shop', to: '/products' },
]

// ---- featured collections (editorial blends, no card grid) ----
export const featured = [
  {
    img: 'present.jpg',
    eyebrow: 'Welcome Kits',
    title: 'Day-one belonging',
    body: 'Branded onboarding kits that make a new hire feel they’ve joined somewhere that pays attention to detail — unboxed on day one, remembered long after.',
    extra: 'From a single remote starter to a thousand desks across cities, we curate, brand and ship each kit so the welcome lands the same everywhere.',
    points: ['Custom notebook, bottle & tote', 'Handwritten welcome card', 'Kitted, packed & shipped to every desk'],
    cta: 'Explore welcome kits',
    to: '/categories',
  },
  {
    img: 'festive-flatlay.jpg',
    eyebrow: 'Festive & Diwali',
    title: 'Celebrations, delivered',
    body: 'Hampers that travel beautifully and arrive feeling like a moment — sweets, brass and considered packaging, ready for every name on your list.',
    extra: 'We handle sourcing, custom sleeves, personalised notes and bulk fulfilment, so festive gifting stays effortless even at scale.',
    points: ['Artisanal sweets & dry-fruit selections', 'Brass diyas and festive décor', 'Custom sleeves & nationwide delivery'],
    cta: 'Explore festive gifting',
    to: '/diwali',
  },
  {
    img: 'luxury.jpg',
    eyebrow: 'Luxury Leadership',
    title: 'Quietly premium',
    body: 'Considered, understated gifts for the people who set the tone — leather, engraving and linen-wrapped boxes that speak without shouting.',
    extra: 'Each piece is made to order and finished by hand, so leadership and client gifting always feels personal, never mass-produced.',
    points: ['Full-grain leather & engraved keepsakes', 'Single-origin coffee & fine accessories', 'White-glove, made-to-order packaging'],
    cta: 'Explore luxury gifting',
    to: '/categories',
  },
]

export const categories = [
  { title: 'Welcome Kits', img: 'gift-boxes.jpg', slug: 'welcome-kits', note: 'Day-one kits that say “you belong here.”' },
  { title: 'Tech Gifting', img: 'gold-gifts.jpg', slug: 'tech', note: 'Smart, on-brand gadgets and organisers.' },
  { title: 'Trophies & Awards', img: 'premium-gifts.jpg', slug: 'awards', note: 'Recognition that feels genuinely premium.' },
  { title: 'Luxury Gifting', img: 'luxury.jpg', slug: 'luxury', note: 'Quietly premium leather, linen and engraving.' },
  { title: 'Drinkware', img: 'red-gifts.jpg', slug: 'drinkware', note: 'Bottles, mugs and flasks, laser-engraved.' },
  { title: 'Eco-friendly', img: 'teddy.jpg', slug: 'eco', note: 'Recycled, reusable and genuinely loved.' },
  { title: 'Desk Essentials', img: 'stationery.jpg', slug: 'desk', note: 'Considered desk companions that get used.' },
  { title: 'Festive Hampers', img: 'festive-flatlay.jpg', slug: 'festive', note: 'Sweets, brass and considered packaging.' },
  { title: 'Stationery', img: 'stationery.jpg', slug: 'stationery', note: 'Notebooks, pens and signature sets.' },
  { title: 'Same-day Gifts', img: 'present.jpg', slug: 'express', note: 'Last-minute gestures, delivered today.' },
]

export const why = [
  { ic: '✦', h: 'New & Innovative', p: 'A constantly refreshed catalog of unique, on-trend gifting ideas.' },
  { ic: '◈', h: 'Branding & Packaging', p: 'Custom branding and premium packaging that reflects your identity.' },
  { ic: '❖', h: 'Customised Products', p: 'Personalised products built around your team, brand and budget.' },
  { ic: '◉', h: 'Global Fulfilment', p: 'Seamless delivery to 35+ countries worldwide.' },
  { ic: '✺', h: 'Exceptional Quality', p: 'Rigorous quality checks on every product we ship.' },
  { ic: '♦', h: 'Premium Partnerships', p: 'Access to leading premium and lifestyle brands.' },
  { ic: '♥', h: 'Top-notch Experience', p: 'A dedicated team that makes gifting effortless.' },
  { ic: '♲', h: 'Sustainable Innovation', p: 'Eco-friendly options that create impact, not waste.' },
]

export const stats = [
  { num: 12, suffix: '+', lbl: 'Years of expertise' },
  { num: 500, suffix: '+', lbl: 'Corporate clients' },
  { num: 2, suffix: 'M+', lbl: 'Gifts delivered' },
  { num: 35, suffix: '+', lbl: 'Countries fulfilled' },
]

export const brands = ['ACME', 'NOVA', 'ORBIT', 'VERTEX', 'PULSE', 'ZENITH', 'MERIDIAN', 'ASTRA']

export const work = [
  { img: 'present.jpg', label: 'Onboarding kits · 1,200 units', p: 0.1 },
  { img: 'festive-flatlay.jpg', label: 'Diwali hampers · 3,400 units', p: 0.16 },
  { img: 'luxury.jpg', label: 'Leadership gifting · bespoke', p: 0.08 },
]

export const testimonials = [
  { q: 'TanTam handled our entire onboarding gifting across 4 cities flawlessly. Beautiful kits, on time, on budget.', name: 'Priya Nair', role: 'Head of People, NovaTech', avatar: 'teddy.jpg' },
  { q: 'The customisation and packaging were genuinely premium. Our leadership gifts got so many compliments.', name: 'Rahul Menon', role: 'CMO, Orbit Industries', avatar: 'stationery.jpg' },
  { q: 'From idea to doorstep in 35+ countries. A true gifting partner, not just a vendor.', name: 'Anjali Rao', role: 'Procurement Lead, Zenith', avatar: 'hamper.jpg' },
]

// ---- flipbook diary ----
export const diary = [
  { kind: 'cover', title: 'The TanTam\nGifting Diary', sub: 'Vol. XII · curated collections' },
  { kind: 'spread', img: 'gift-ribbon.jpg', chapter: 'No. 01', title: 'Welcome to the Team', note: 'Day-one delightbranded kits that make new hires feel they’ve joined somewhere special.', items: ['Branded notebook & pen', 'Insulated bottle', 'Tote & lanyard', 'Handwritten welcome card'] },
  { kind: 'spread', img: 'festive-flatlay.jpg', chapter: 'No. 02', title: 'Festive & Diwali', note: 'Hampers that travel beautifully and arrive feeling like a celebration.', items: ['Artisanal sweets', 'Brass diya set', 'Dry-fruit selection', 'Custom festive sleeve'] },
  { kind: 'spread', img: 'luxury.jpg', chapter: 'No. 03', title: 'Luxury Leadership', note: 'Considered, quietly premium gifts for the people who set the tone.', items: ['Leather portfolio', 'Single-origin coffee', 'Engraved keepsake', 'Linen-wrapped box'] },
  { kind: 'spread', img: 'teddy.jpg', chapter: 'No. 04', title: 'Sustainable Picks', note: 'Impact, not wasterecycled, reusable, and genuinely loved.', items: ['Plantable seed kit', 'Cork desk set', 'Recycled-fibre apparel', 'Refill-first drinkware'] },
  { kind: 'back', title: 'Turn the page on\nordinary gifting.', sub: 'hello@tantam.in · +91 98000 00000' },
]

// ---- occasions (Shop by Event) ----
export const occasions = [
  { title: 'Employee Onboarding', img: 'gift-boxes.jpg', note: 'First-day kits that say “you belong here.”' },
  { title: 'Brand / Product Launches', img: 'gold-gifts.jpg', note: 'Merch and press kits that make a launch land.' },
  { title: 'Annual Employee Day', img: 'present.jpg', note: 'Recognition at scale, delivered everywhere.' },
  { title: 'Partners / Suppliers Meet', img: 'hamper.jpg', note: 'Relationship gifting for your wider network.' },
  { title: 'Conferences & Tradeshows', img: 'stationery.jpg', note: 'Booth giveaways and speaker gifts.' },
  { title: 'Quarterly Gifting', img: 'red-gifts.jpg', note: 'Stay top-of-mind, every quarter.' },
  { title: 'Festive Occasions', img: 'festive-flatlay.jpg', note: 'Diwali, New Year and seasonal joy.' },
  { title: 'Milestones & R&R', img: 'premium-gifts.jpg', note: 'Awards, anniversaries and big wins.' },
]

// ---- solutions (Our Solutions) ----
export const solutions = [
  { n: '01', title: 'Curate', body: 'We shortlist on-brand, on-budget gifting ideas from a constantly refreshed catalogno guesswork.' },
  { n: '02', title: 'Brand & Customise', body: 'Logos, colours, bespoke products and packaging that look and feel unmistakably yours.' },
  { n: '03', title: 'Pack', body: 'Premium, considered packagingassembled, kitted and quality-checked by hand.' },
  { n: '04', title: 'Fulfil', body: 'Warehousing, redemption portals and doorstep delivery across 35+ countries.' },
]

// ---- experiential ----
export const experiential = [
  {
    img: 'teddy.jpg',
    eyebrow: 'Curated Experiences',
    title: 'Curated Experiences',
    body: 'Tastings, workshops and getaways that turn a gift into a memory — designed around your team and run end to end by us.',
    extra: 'Tell us the occasion and the headcount; we design the format, handle the logistics and host the day so you can simply show up.',
    points: ['Curated tastings & hands-on workshops', 'Weekend getaways & team event days', 'Hosted and managed end to end'],
    cta: 'Design an experience',
  },
  {
    img: 'hamper.jpg',
    eyebrow: 'Gourmet & Hampers',
    title: 'Gourmet & Hampers',
    body: 'Artisanal food and drink, beautifully assembled and delivered — the kind of hamper people photograph before they open it.',
    extra: 'Small-batch sourcing, premium presentation and chilled logistics mean every hamper arrives looking and tasting exactly as intended.',
    points: ['Small-batch gourmet selections', 'Premium tea, coffee & confectionery', 'Chilled, tracked nationwide delivery'],
    cta: 'Build a hamper',
  },
  {
    img: 'present.jpg',
    eyebrow: 'Moments at Scale',
    title: 'Moments at Scale',
    body: 'Surprise-and-delight programmes orchestrated across cities — the same delight at every doorstep, however long the list.',
    extra: 'From a few hundred to tens of thousands, we personalise, pack and deliver in sync, with live tracking the whole way through.',
    points: ['Multi-city, same-day coordination', 'Personalised notes at volume', 'Live tracking & delivery reporting'],
    cta: 'Plan a programme',
  },
]

// ---- product listing (Shop / Product Detail) ----
export const products = [
  { id: 'welcome-essentials', name: 'Welcome Essentials Kit', cat: 'Welcome Kits', price: '₹1,450', img: 'gift-boxes.jpg', tagline: 'Notebook · bottle · tote · card' },
  { id: 'leather-portfolio', name: 'Leather Portfolio', cat: 'Luxury', price: '₹3,200', img: 'luxury.jpg', tagline: 'Full-grain leather, debossed logo' },
  { id: 'festive-hamper', name: 'Festive Grand Hamper', cat: 'Festive', price: '₹2,650', img: 'festive-flatlay.jpg', tagline: 'Sweets · brass diya · dry fruit' },
  { id: 'copper-bottle', name: 'Insulated Copper Bottle', cat: 'Drinkware', price: '₹890', img: 'red-gifts.jpg', tagline: '24h cold · laser engraving' },
  { id: 'desk-set', name: 'Cork Desk Set', cat: 'Desk', price: '₹1,180', img: 'stationery.jpg', tagline: 'Sustainable cork, modular' },
  { id: 'seed-kit', name: 'Plantable Seed Kit', cat: 'Eco', price: '₹540', img: 'teddy.jpg', tagline: 'Grow-your-own, zero waste' },
  { id: 'crystal-award', name: 'Crystal Recognition Award', cat: 'Awards', price: '₹2,100', img: 'premium-gifts.jpg', tagline: 'Etched, gift-boxed' },
  { id: 'tech-organizer', name: 'Tech Travel Organizer', cat: 'Tech', price: '₹1,320', img: 'gold-gifts.jpg', tagline: 'Cable-tidy, vegan leather' },
  { id: 'stationery-set', name: 'Signature Stationery Set', cat: 'Stationery', price: '₹760', img: 'stationery.jpg', tagline: 'Notebook · pen · sticky set' },
]

// ---- about ----
export const about = {
  story: [
    'TanTam began with a simple belief: the best relationships aren’t built in boardroomsthey’re built in moments of appreciation.',
    'For over twelve years we’ve helped 500+ companies say thank you, welcome and well-donecurating, branding, packing and delivering thoughtful corporate gifts across 35+ countries.',
    'We’re a gifting partner, not a vendor. From a single leadership gift to ten thousand onboarding kits, we obsess over the details so your brand always arrives feeling personal.',
  ],
  timeline: [
    { y: '2013', t: 'Founded', d: 'Started with festive corporate hampers for a handful of Bengaluru firms.' },
    { y: '2016', t: 'Branding studio', d: 'Added in-house customisation, packaging and quality control.' },
    { y: '2020', t: 'Global fulfilment', d: 'Built cross-border logisticsgifting to 35+ countries.' },
    { y: '2024', t: 'Agency of the Year', d: 'Best Corporate Gifting Agencythree years running, KTCC.' },
  ],
}

// ---- diwali ----
export const diwali = {
  hero: 'The festival of lights, thoughtfully gifted.',
  picks: [
    { title: 'Artisanal Sweet Boxes', img: 'hamper.jpg' },
    { title: 'Brass Diya & Decor', img: 'festive-flatlay.jpg' },
    { title: 'Premium Dry-fruit Hampers', img: 'hamper.jpg' },
    { title: 'Eco Festive Kits', img: 'teddy.jpg' },
  ],
}
