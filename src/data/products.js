// Product data for COCKTAIL CUSTOM PRINTS (instagram.com/cocktail_custom_)
//
// ⚠️  PRICES BELOW ARE PLACEHOLDERS — edit `price` / `mrp` for each product.
// 📷  PRODUCT PHOTOS: drop files into /public/products/ named  <slug>-1.jpg, <slug>-2.jpg ...
//     (until a photo exists, a branded placeholder tile is shown automatically)

export const BRAND = {
  name: 'COCKTAIL CUSTOM PRINTS',
  short: 'COCKTAIL',
  handle: 'cocktail_custom_',
  instagram: 'https://www.instagram.com/cocktail_custom_/',
  whatsapp: 'https://wa.me/message/ULSJXJDDOUOVL1',
  city: 'Trivandrum, Kerala',
  tagline: 'Print whatever you imagine',
};

export const ADULT_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
export const KIDS_SIZES = ['20', '22', '24', '26', '28', '30', '32', '34', '36', '38'];

// WHO IT'S FOR: the main way to shop (Men's, Ladies', Boys, Kids).
// ⚠️  Size charts and age ranges per section are still to come from the client.
export const SECTIONS = [
  { id: 'men', name: "Men's", desc: 'Shirts, combos, tees and hoodies for men' },
  { id: 'ladies', name: "Ladies'", desc: 'Custom prints for women' },
  { id: 'boys', name: 'Boys', desc: 'For teens and older boys' },
  {
    id: 'kids',
    name: 'Kids',
    desc: 'For little ones',
    children: [
      { id: 'kids-boys', name: 'Kids Boys', desc: 'For little boys' },
      { id: 'kids-girls', name: 'Kids Girls', desc: 'For little girls' },
    ],
  },
];

// Flat list including the Kids sub-sections, for lookups by id
export const ALL_SECTIONS = SECTIONS.flatMap((s) => [s, ...(s.children || [])]);
// Leaf sections (Men's, Ladies', Boys, Kids Boys, Kids Girls) for menus and chips
export const SECTION_LINKS = ALL_SECTIONS.filter((s) => !s.children);
export const sectionName = (id) => ALL_SECTIONS.find((s) => s.id === id)?.name;

// Does a product belong in a section? ('kids' matches both Kids Boys and Kids Girls)
export const inSection = (product, id) => {
  const section = ALL_SECTIONS.find((s) => s.id === id);
  const ids = section?.children ? [id, ...section.children.map((c) => c.id)] : [id];
  return product.for.some((f) => ids.includes(f));
};

// PRODUCT TYPE: second filter inside each section
export const CATEGORIES = [
  { id: 'shirts', name: 'Printed Shirts', desc: 'Custom themed shirts, front & back prints' },
  { id: 'combos', name: 'Shirt & Mund Combos', desc: 'Matching shirt and mund sets' },
  { id: 'tshirts', name: 'T-Shirts', desc: 'Your design on a soft tee' },
  { id: 'hoodies', name: 'Hoodies', desc: 'Custom printed hoodies' },
  { id: 'caps', name: 'Caps', desc: 'Custom printed caps' },
];

const img = (slug) => [`/products/${slug}-1.jpg`, `/products/${slug}-2.jpg`];

// Photo files that exist in /public/products (second image is optional)
const PHOTOS = {
  'temple-themed-shirt': ['/products/temple-themed-shirt-1.jpg', '/products/temple-themed-shirt-2.jpg'],
  'sabarimala-back-print-shirt': ['/products/sabarimala-back-print-shirt-1.jpg'],
  'dad-son-ayyappan-combo': ['/products/dad-son-combo-ayyappan-1.jpg'],
  'kids-ayyappa-shirt': ['/products/kids-ayyappa-darshanam-1.jpg'],
  'kids-printed-shirt': ['/products/kids-printed-shirt-1.jpg'],
};
const photos = (slug) => PHOTOS[slug] || img(slug);

const ALL_PRODUCTS = [
  {
    id: 'temple-themed-shirt',
    slug: 'temple-themed-shirt',
    name: 'TEMPLE THEMED SHIRT',
    category: 'shirts',
    for: ['men'],
    tagline: 'Your temple, printed your way',
    badge: 'Bestseller',
    inStock: true,
    price: 799,
    mrp: 999,
    sizes: ADULT_SIZES,
    images: photos('temple-themed-shirt'),
    reel: 'DejnJE5h_hw',
    description:
      'A custom printed shirt themed on your temple or festival. Send us the design or the idea and we print it, as seen on our Instagram reels.',
    details: ['Fully customised print', 'Front and back print options', 'DM / WhatsApp us with your design'],
  },
  {
    id: 'sabarimala-back-print-shirt',
    slug: 'sabarimala-back-print-shirt',
    name: 'SABARIMALA BACK PRINT SHIRT',
    category: 'shirts',
    for: ['men'],
    tagline: 'Swami Ayyappan themed back print',
    badge: 'Season Special',
    inStock: true,
    price: 799,
    mrp: 999,
    sizes: ADULT_SIZES,
    images: photos('sabarimala-back-print-shirt'),
    reel: 'Dee4LAHh1_G',
    description:
      'Sabarimala themed shirt with a bold back print. Customise the artwork, names and text for your group or family.',
    details: ['Back print design', 'Group and bulk orders welcome', 'DM for customisation'],
  },
  {
    id: 'murugan-shirt-mund-combo',
    slug: 'murugan-shirt-mund-combo',
    name: 'LORD MURUGAN SHIRT & MUND COMBO',
    category: 'combos',
    for: ['men'],
    tagline: 'Themed shirt with matching mund',
    badge: 'Combo',
    inStock: true,
    price: 1499,
    mrp: 1799,
    sizes: ADULT_SIZES,
    images: img('murugan-shirt-mund-combo'),
    reel: 'DeqRZN4B2zE',
    description:
      'A Lord Murugan themed printed shirt paired with a matching mund. Ideal for festivals, poojas and family functions.',
    details: ['Shirt + mund set', 'Customisable theme', 'DM for customisation'],
  },
  {
    id: 'shiva-parvathi-shirt',
    slug: 'shiva-parvathi-shirt',
    name: 'SHIVA PARVATHI PRINTED SHIRT',
    category: 'shirts',
    for: ['men'],
    tagline: 'Devotional print, made to order',
    inStock: true,
    price: 799,
    mrp: 999,
    sizes: ADULT_SIZES,
    images: img('shiva-parvathi-shirt'),
    reel: 'DeT-q49Bjs4',
    description: 'A Shiva Parvathi themed printed shirt, customised for you.',
    details: ['Custom print', 'Made to order'],
  },
  {
    id: 'dad-son-ayyappan-combo',
    slug: 'dad-son-ayyappan-combo',
    name: 'DAD & SON AYYAPPAN COMBO',
    category: 'combos',
    for: ['men', 'kids-boys'],
    tagline: 'Matching shirts for father and son',
    badge: 'Combo',
    inStock: true,
    price: 1399,
    mrp: 1699,
    sizes: ADULT_SIZES,
    images: photos('dad-son-ayyappan-combo'),
    reel: 'DdgEJAahQad',
    description: 'Swami Ayyappan themed matching shirts for dad and son.',
    details: ['Set of two shirts', 'Adult and kids sizes', 'DM for customisation'],
  },
  {
    id: 'kids-ayyappa-shirt',
    slug: 'kids-ayyappa-shirt',
    name: 'KIDS AYYAPPA DARSHANAM SHIRT',
    category: 'shirts',
    for: ['kids-boys'],
    tagline: 'Printed shirts for little devotees',
    badge: 'Kids',
    inStock: true,
    price: 549,
    mrp: 699,
    sizes: KIDS_SIZES,
    images: photos('kids-ayyappa-shirt'),
    reel: 'DeZJ1w1hvVo',
    description: 'Ayyappa darshanam printed shirt for kids, available in sizes 20 to 38.',
    details: ['Sizes 20 to 38', 'Customisable print', 'DM for orders'],
  },
  {
    id: 'kids-printed-shirt',
    slug: 'kids-printed-shirt',
    name: 'KIDS PRINTED SHIRT & MUND',
    category: 'combos',
    for: ['kids-boys'],
    tagline: 'Festive kids shirt with gold motif print',
    inStock: true,
    price: 599,
    mrp: 749,
    sizes: KIDS_SIZES,
    images: photos('kids-printed-shirt'),
    description: 'A printed kids shirt styled with a kasavu mund for festivals and functions. Available in sizes 20 to 38.',
    details: ['Sizes 20 to 38', 'Customisable print', 'DM for orders'],
  },
  {
    id: 'black-mund-combo',
    slug: 'black-mund-combo',
    name: 'CUSTOM PRINT BLACK MUND COMBO',
    category: 'combos',
    for: ['men'],
    tagline: 'Black mund, ready to dispatch',
    inStock: true,
    price: 1499,
    mrp: 1799,
    sizes: ADULT_SIZES,
    images: img('black-mund-combo'),
    reel: 'DdiXyX0hDiG',
    description: 'Customised printed shirt with a black mund, ready to dispatch.',
    details: ['Shirt + black mund', 'Custom print', 'All India shipping'],
  },
  {
    id: 'custom-tshirt',
    slug: 'custom-tshirt',
    name: 'CUSTOM PRINTED T-SHIRT',
    category: 'tshirts',
    for: ['men', 'ladies', 'boys'],
    tagline: 'Print whatever you imagine',
    inStock: true,
    price: 499,
    mrp: 649,
    sizes: ADULT_SIZES,
    images: img('custom-tshirt'),
    description: 'Send us your idea, photo or logo and we print it on a T-shirt.',
    details: ['Any design, any theme', 'Single pieces or bulk', 'DM / WhatsApp to order'],
  },
  {
    id: 'custom-hoodie',
    slug: 'custom-hoodie',
    name: 'CUSTOM PRINTED HOODIE',
    category: 'hoodies',
    for: ['men', 'ladies', 'boys'],
    tagline: 'Your design, front and back',
    inStock: true,
    price: 1199,
    mrp: 1499,
    sizes: ADULT_SIZES,
    images: img('custom-hoodie'),
    description: 'Custom printed hoodies for teams, events and everyday wear.',
    details: ['Custom print', 'Bulk orders welcome'],
  },
  {
    id: 'custom-cap',
    slug: 'custom-cap',
    name: 'CUSTOM PRINTED CAP',
    category: 'caps',
    for: ['men', 'ladies', 'boys'],
    tagline: 'Logos, names, artwork',
    inStock: true,
    price: 299,
    mrp: 399,
    sizes: ['Free Size'],
    images: img('custom-cap'),
    description: 'Custom printed caps with your logo, name or artwork.',
    details: ['Free size', 'Bulk orders welcome'],
  },
];

// Products that have real photos come first (homepage shows the first few)
export const PRODUCTS = [...ALL_PRODUCTS].sort((a, b) => (b.slug in PHOTOS) - (a.slug in PHOTOS));

export const FAQS = [
  {
    id: 1,
    category: 'Orders',
    question: 'How do I place an order?',
    answer:
      'Add items to your bag and check out, or message us directly on WhatsApp or Instagram DM with your design and we will confirm everything with you.',
  },
  {
    id: 2,
    category: 'Product',
    question: 'Can I get my own design printed?',
    answer:
      'Yes. We print whatever you imagine: names, temple and festival themes, logos, photos and more on T-shirts, shirts, hoodies and caps. Share your idea and we will guide you.',
  },
  {
    id: 3,
    category: 'Orders',
    question: 'Do you take bulk or group orders?',
    answer: 'Yes, group, temple, family and team orders are welcome. Message us with the quantity and sizes.',
  },
  {
    id: 4,
    category: 'Product',
    question: 'Do you have kids sizes?',
    answer: 'Yes, our kids printed shirts are available in sizes 20 to 38.',
  },
  {
    id: 5,
    category: 'Delivery',
    question: 'Do you ship across India?',
    answer: 'Yes. We are based in Trivandrum, Kerala and ship all over India.',
  },
];

export const USPS = [
  { title: 'FULLY CUSTOM', text: 'Your idea, your design, printed exactly the way you imagine it.' },
  { title: 'ALL INDIA SHIPPING', text: 'Based in Trivandrum, delivering across India.' },
  { title: 'FOR EVERYONE', text: 'Adults, kids (sizes 20 to 38), couples, dad & son combos and groups.' },
  { title: 'T-SHIRTS • SHIRTS • HOODIES • CAPS', text: 'One studio for everything you want to wear.' },
];
