/* ------------------------------------------------------------------
   closet.js — the demo data: models and the starter closet.
   Photos are free-to-use Unsplash images, resized and stored in
   assets/. A closet item knows:
     cat     top | bottom | shoes | extra   (which slot it fills)
     warmth  1 light · 2 mid · 3 warm       (used by the weather rule)
     rain    true if it is fine to wear in the rain
     full    true for a dress (it hides the bottom slot)
   ------------------------------------------------------------------ */

const MODELS = [
  { id: 'm1', name: 'White suit',    img: 'assets/models/model-white.jpg' },
  { id: 'm2', name: 'All black',     img: 'assets/models/model-black.jpg' },
  { id: 'm3', name: 'Black blazer',  img: 'assets/models/model-blazer.jpg' },
  { id: 'm4', name: 'Studio dark',   img: 'assets/models/model-dark.jpg' },
  { id: 'm5', name: 'Burgundy suit', img: 'assets/models/model-burgundy.jpg' },
];

const DEMO_CLOSET = [
  // tops
  { id: 'd01', name: 'white tee',          cat: 'top',    img: 'assets/clothes/tee-white.jpg',      warmth: 1, rain: true },
  { id: 'd02', name: 'black tee',          cat: 'top',    img: 'assets/clothes/tee-black.jpg',      warmth: 1, rain: true },
  { id: 'd03', name: 'ruffled blouse',     cat: 'top',    img: 'assets/clothes/blouse-white.jpg',   warmth: 1, rain: false },
  { id: 'd04', name: 'denim shirt',        cat: 'top',    img: 'assets/clothes/shirt-denim.jpg',    warmth: 2, rain: true },
  { id: 'd05', name: 'brown knit sweater', cat: 'top',    img: 'assets/clothes/sweater-brown.jpg',  warmth: 3, rain: true },
  { id: 'd06', name: 'cream knit sweater', cat: 'top',    img: 'assets/clothes/sweater-white.jpg',  warmth: 3, rain: false },
  { id: 'd07', name: 'leather jacket',     cat: 'top',    img: 'assets/clothes/jacket-leather.jpg', warmth: 3, rain: true },
  { id: 'd08', name: 'lace dress',         cat: 'top',    img: 'assets/clothes/dress-floral.jpg',   warmth: 1, rain: false, full: true },
  { id: 'd09', name: 'green playsuit',     cat: 'top',    img: 'assets/clothes/dress-green.jpg',    warmth: 1, rain: false, full: true },
  // bottoms
  { id: 'd10', name: 'black jeans',        cat: 'bottom', img: 'assets/clothes/jeans-black.jpg',    warmth: 3, rain: true },
  { id: 'd11', name: 'blue jeans',         cat: 'bottom', img: 'assets/clothes/jeans-blue.jpg',     warmth: 2, rain: true },
  { id: 'd12', name: 'brown skirt',        cat: 'bottom', img: 'assets/clothes/skirt-brown.jpg',    warmth: 2, rain: false },
  { id: 'd13', name: 'denim shorts',       cat: 'bottom', img: 'assets/clothes/shorts-denim.jpg',   warmth: 1, rain: false },
  // shoes
  { id: 'd14', name: 'white sneakers',     cat: 'shoes',  img: 'assets/clothes/sneakers-white.jpg', warmth: 2, rain: false },
  { id: 'd15', name: 'black boots',        cat: 'shoes',  img: 'assets/clothes/boots-black.jpg',    warmth: 3, rain: true },
  { id: 'd16', name: 'red heels',          cat: 'shoes',  img: 'assets/clothes/heels-red.jpg',      warmth: 1, rain: false },
  // extras
  { id: 'd17', name: 'pink bag',           cat: 'extra',  img: 'assets/clothes/bag-pink.jpg',       warmth: 2, rain: true },
  { id: 'd18', name: 'brown leather bag',  cat: 'extra',  img: 'assets/clothes/bag-brown.jpg',      warmth: 2, rain: true },
  { id: 'd19', name: 'sunglasses',         cat: 'extra',  img: 'assets/clothes/sunglasses.jpg',     warmth: 1, rain: false },
  { id: 'd20', name: 'red beret',          cat: 'extra',  img: 'assets/clothes/beret-red.jpg',      warmth: 3, rain: true },
  { id: 'd21', name: 'striped scarf',      cat: 'extra',  img: 'assets/clothes/scarf-striped.jpg',  warmth: 3, rain: true },
];
