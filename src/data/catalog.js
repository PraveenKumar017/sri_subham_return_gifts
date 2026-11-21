export const WHATSAPP_NUMBER = '919999999999';

export const categories = [
  { id: 1, name: 'Jar Set – Everyday Use', slug: 'jar-set-everyday-use', description: 'Practical jar sets suited for daily kitchen use.', image: '/images/categories/jar-set.svg' },
  { id: 2, name: 'Printed Pichwai Tin Box – 11 Inch', slug: 'printed-pichwai-tin-box-11-inch', description: 'Decorative tin boxes featuring Pichwai-inspired prints.', image: '/images/categories/pichwai-tin.svg' },
  { id: 3, name: 'German Silver Plate – Small Size (8 Inch)', slug: 'german-silver-plate-small-8-inch', description: 'Compact German silver plates for elegant gifting.', image: '/images/categories/silver-plate-small.svg' },
  { id: 4, name: 'German Silver Plate – Big Size (10 Inch)', slug: 'german-silver-plate-big-10-inch', description: 'Larger German silver plates for special occasions.', image: '/images/categories/silver-plate-big.svg' },
  { id: 5, name: 'Silver Set', slug: 'silver-set', description: 'Coordinated silver-tone sets for memorable gifting.', image: '/images/categories/silver-set.svg' },
  { id: 6, name: 'Stylish & Useful Hot Box', slug: 'stylish-useful-hot-box', description: 'Useful hot boxes with a refined, gift-ready look.', image: '/images/categories/hot-box.svg' },
  { id: 7, name: 'Hot & Cold Flask Set', slug: 'hot-cold-flask-set', description: 'Flask sets designed for both hot and cold beverages.', image: '/images/categories/flask-set.svg' },
  { id: 8, name: 'Undiyal (Piggy Box)', slug: 'undiyal-piggy-box', description: 'Traditional undiyal boxes for auspicious gifting.', image: '/images/categories/undiyal.svg' },
  { id: 9, name: 'Cute Bottle Set', slug: 'cute-bottle-set', description: 'Charming bottle sets for everyday convenience.', image: '/images/categories/bottle-set.svg' },
  { id: 10, name: 'Jewels Box', slug: 'jewels-box', description: 'Elegant boxes for storing jewellery and keepsakes.', image: '/images/categories/jewels-box.svg' },
  { id: 11, name: 'Meenakari Plate', slug: 'meenakari-plate', description: 'Plates with traditional Meenakari-style detailing.', image: '/images/categories/meenakari-plate.svg' },
  { id: 12, name: 'Designing Heart Box', slug: 'designing-heart-box', description: 'Heart-shaped gift boxes with decorative designs.', image: '/images/categories/heart-box.svg' },
  { id: 13, name: 'All Functions Haldi Kumkum', slug: 'all-functions-haldi-kumkum', description: 'Haldi kumkum sets suitable for many celebrations.', image: '/images/categories/haldi-kumkum.svg' },
  { id: 14, name: 'Silver Plate', slug: 'silver-plate', description: 'Classic silver-tone plates for return gifting.', image: '/images/categories/silver-plate.svg' },
  { id: 15, name: 'Normal & Designing Bags', slug: 'normal-designing-bags', description: 'Gift bags in simple and decorative styles.', image: '/images/categories/bags.svg' }
];

export const occasions = [
  { id: 1, name: 'Weddings', slug: 'weddings', image: '/images/occasions/weddings.svg' },
  { id: 2, name: 'Engagements', slug: 'engagements', image: '/images/occasions/engagements.svg' },
  { id: 3, name: 'Baby Showers', slug: 'baby-showers', image: '/images/occasions/baby-showers.svg' },
  { id: 4, name: 'Birthdays', slug: 'birthdays', image: '/images/occasions/birthdays.svg' },
  { id: 5, name: 'Housewarming', slug: 'housewarming', image: '/images/occasions/housewarming.svg' },
  { id: 6, name: 'Seemantham', slug: 'seemantham', image: '/images/occasions/seemantham.svg' },
  { id: 7, name: 'Festivals', slug: 'festivals', image: '/images/occasions/festivals.svg' },
  { id: 8, name: 'Corporate Events', slug: 'corporate-events', image: '/images/occasions/corporate.svg' }
];

const img = (name) => `/images/products/${name}.svg`;
const cat = (slug) => categories.find((c) => c.slug === slug);
const occ = (...slugs) => slugs;

const makeProduct = (id, categorySlug, name, overrides = {}) => ({
  id,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  name,
  category: cat(categorySlug).name,
  categorySlug,
  description: `A thoughtfully selected ${cat(categorySlug).name.toLowerCase()} option for return gifting.`,
  price: null,
  size: '',
  material: '',
  designs: 'Classic, Festive',
  image: img(categorySlug),
  gallery: [img(categorySlug), img(`${categorySlug}-2`)],
  isFeatured: false,
  availability: 'made_to_order',
  occasions: [],
  ...overrides
});

export const products = [
  makeProduct(101, 'jar-set-everyday-use', '[Sample] Everyday Glass Jar Pair', { price: 349, size: 'Set of 2', material: 'Glass', isFeatured: true, occasions: occ('housewarming', 'weddings') }),
  makeProduct(102, 'jar-set-everyday-use', '[Sample] Airtight Kitchen Jar Set', { price: 499, size: 'Set of 3', material: 'Glass and metal lid' }),
  makeProduct(201, 'printed-pichwai-tin-box-11-inch', '[Sample] Pichwai Lotus Tin Box', { price: 289, size: '11 Inch', material: 'Tin', isFeatured: true, occasions: occ('festivals', 'weddings') }),
  makeProduct(202, 'printed-pichwai-tin-box-11-inch', '[Sample] Pichwai Peacock Tin Box', { price: null, size: '11 Inch', material: 'Tin' }),
  makeProduct(301, 'german-silver-plate-small-8-inch', '[Sample] Small German Silver Gift Plate', { price: 399, size: '8 Inch', material: 'German silver', occasions: occ('weddings', 'seemantham') }),
  makeProduct(302, 'german-silver-plate-small-8-inch', '[Sample] Etched Small Silver Plate', { price: null, size: '8 Inch', material: 'German silver' }),
  makeProduct(401, 'german-silver-plate-big-10-inch', '[Sample] Grand German Silver Plate', { price: 549, size: '10 Inch', material: 'German silver', isFeatured: true, occasions: occ('weddings', 'engagements') }),
  makeProduct(402, 'german-silver-plate-big-10-inch', '[Sample] Floral Border Silver Plate', { price: null, size: '10 Inch', material: 'German silver' }),
  makeProduct(501, 'silver-set', '[Sample] Classic Silver Gift Set', { price: 899, size: 'Gift set', material: 'Silver-tone', isFeatured: true, occasions: occ('weddings', 'baby-showers') }),
  makeProduct(502, 'silver-set', '[Sample] Traditional Silver Pooja Set', { price: null, size: 'Gift set', material: 'Silver-tone' }),
  makeProduct(601, 'stylish-useful-hot-box', '[Sample] Insulated Hot Box', { price: 699, size: 'Medium', material: 'Insulated steel', occasions: occ('housewarming', 'corporate-events') }),
  makeProduct(602, 'stylish-useful-hot-box', '[Sample] Compact Serving Hot Box', { price: 599, size: 'Small', material: 'Insulated steel' }),
  makeProduct(701, 'hot-cold-flask-set', '[Sample] Hot & Cold Flask Duo', { price: 749, size: 'Set of 2', material: 'Stainless steel', isFeatured: true, occasions: occ('corporate-events', 'birthdays') }),
  makeProduct(702, 'hot-cold-flask-set', '[Sample] Travel Flask Gift Set', { price: null, size: 'Set of 2', material: 'Stainless steel' }),
  makeProduct(801, 'undiyal-piggy-box', '[Sample] Traditional Undiyal Box', { price: 259, size: 'Standard', material: 'Metal', occasions: occ('festivals', 'housewarming') }),
  makeProduct(802, 'undiyal-piggy-box', '[Sample] Decorative Piggy Gift Box', { price: 299, size: 'Standard', material: 'Metal' }),
  makeProduct(901, 'cute-bottle-set', '[Sample] Cute Everyday Bottle Set', { price: 449, size: 'Set of 2', material: 'Steel/plastic', occasions: occ('birthdays', 'baby-showers') }),
  makeProduct(902, 'cute-bottle-set', '[Sample] Pastel Bottle Gift Pair', { price: null, size: 'Set of 2', material: 'Steel/plastic' }),
  makeProduct(1001, 'jewels-box', '[Sample] Velvet Jewels Box', { price: 329, size: 'Small', material: 'Velvet finish', isFeatured: true, occasions: occ('weddings', 'engagements') }),
  makeProduct(1002, 'jewels-box', '[Sample] Ornate Keepsake Box', { price: 399, size: 'Medium', material: 'Decorative board' }),
  makeProduct(1101, 'meenakari-plate', '[Sample] Meenakari Decorative Plate', { price: 459, size: '9 Inch', material: 'Metal with enamel work', occasions: occ('festivals', 'weddings') }),
  makeProduct(1102, 'meenakari-plate', '[Sample] Traditional Meenakari Gift Plate', { price: null, size: '9 Inch', material: 'Metal with enamel work' }),
  makeProduct(1201, 'designing-heart-box', '[Sample] Heart Gift Box - Rose', { price: 279, size: 'Medium', material: 'Decorative box', occasions: occ('engagements', 'birthdays') }),
  makeProduct(1202, 'designing-heart-box', '[Sample] Heart Gift Box - Gold Accent', { price: 319, size: 'Medium', material: 'Decorative box' }),
  makeProduct(1301, 'all-functions-haldi-kumkum', '[Sample] Haldi Kumkum Gift Pair', { price: 199, size: 'Compact', material: 'Decorative metal', isFeatured: true, occasions: occ('festivals', 'seemantham', 'weddings') }),
  makeProduct(1302, 'all-functions-haldi-kumkum', '[Sample] Festive Haldi Kumkum Set', { price: 249, size: 'Compact', material: 'Decorative metal' }),
  makeProduct(1401, 'silver-plate', '[Sample] Classic Round Silver Plate', { price: 429, size: '9 Inch', material: 'Silver-tone', occasions: occ('weddings', 'housewarming') }),
  makeProduct(1402, 'silver-plate', '[Sample] Border Design Silver Plate', { price: null, size: '9 Inch', material: 'Silver-tone' }),
  makeProduct(1501, 'normal-designing-bags', '[Sample] Festive Gift Bag Set', { price: 149, size: 'Assorted', material: 'Fabric/paper', occasions: occ('birthdays', 'corporate-events', 'festivals') }),
  makeProduct(1502, 'normal-designing-bags', '[Sample] Designer Return Gift Bags', { price: 199, size: 'Assorted', material: 'Fabric' })
];
