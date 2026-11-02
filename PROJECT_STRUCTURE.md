# 🗺️ Dum & Co. — Project Architecture & Screen Catalog

> **Google Stitch Project ID**: `7448923662054743618`  
> **Total Screens**: 28 screens (11 Customer-facing + 17 Admin Dashboard)  
> **High-Res Assets**: 16 Curated Indian culinary & beverage photographs

---

## Screen Inventory

### Customer Website (11 Screens)
1. **Customer Homepage** (`062a2198e6e14e63903cc6fd8bd3137b`): Hero banner, brand storytelling, signature dum categories, popular dishes carousel, chef specials, customer testimonials, and reservation/order CTA.
2. **Menu Page** (`f4b59eac93ea4a1a94626bacaa22193f`): Category filter pills (Biryani, Starters, Curries, Breads, Desserts, Beverages), dietary toggles (Veg/Non-Veg), search, sorting, dish cards with spice levels.
3. **Food Details** (`1b33f53fcf5f46e594acfe3ac57fe9ad`): High-res food imagery, Dum spice meter, portion selection (Regular / Royal Feast), quantity stepper, accompaniment cross-sell (Raita, Salan), ingredients, add-to-cart.
4. **Cart & Checkout** (`a52c427177f74afd9373ea4f635eb99f`): Order summary list, portion adjustments, coupon code applicator with instant discount preview, delivery address selector, tax breakdown, payment method selection.
5. **Order Tracking** (`c3f15fc0511e432e9f968e6244a8592f`): Real-time Dum handi cooking timeline (Received -> Dum Simmering -> Packed -> Out for Delivery -> Delivered), live rider tracker card, call restaurant/rider action.
6. **Customer Profile & Orders** (`234feb9dcca24f8383850c3322338134`): Personal details, past orders list with re-order trigger, downloadable invoice, saved addresses manager.
7. **Wishlist & Favourites** (`d2da80e6b289461c89d3a489de6ffafb`): Saved dishes with one-click "Add to Cart" and dietary indicators.
8. **Offers & Coupons** (`37985dffc4c04ca4acb33679476e7d9e`): Active promotional banners, one-tap coupon copying (`ROYALDUM20`, `FIRSTFEAST`, etc.), terms & expiry dates.
9. **About Us** (`768122276da74cb0af788e91b1173fd0`): Heritage of slow-cooking over coal handis, Master Chef profiles, heirloom spice sourcing, photo gallery.
10. **Contact Us** (`8d46b77b0a8d44d78e76369adc9a25ef`): Table booking & inquiry form, interactive location map, timings, direct WhatsApp link, phone numbers.
11. **Login & Sign Up** (`e1d424139fa245459f07e5e4d30f286d`): Royal themed modal/page with email/password authentication, phone OTP option, and seamless session restore.

### Admin Dashboard (17 Screens)
1. **Admin Login** (`2f555557263a409596ab7f92f2ce44a3`): Secure admin credential gate.
2. **Dashboard Overview** (`bd0bc38b29eb45d182723e0f1b74ab34`): Live KPI cards (Revenue, Active Orders, Average Prep Time, Customers), daily revenue chart, recent incoming orders stream.
3. **Order Management** (`839dff29e39741c489dc0f0548184864`): Full order queue with status chips (Pending, In Kitchen, Ready, Out for Delivery, Delivered, Cancelled), filter tabs, search, quick status change actions.
4. **Order Details** (`7f876f3670bf441da81ba9616f350b61`): Comprehensive order inspection, itemized bill, customer contact details, delivery address, cooking instructions notes, print kitchen KOT / receipt.
5. **Menu Management** (`4ecb5d57d3794e279c9a3ef0329766d2`): Food catalog table, category badges, price, veg/non-veg status, stock availability toggle, edit/delete actions.
6. **Add New Food** (`182434dac0d949fd99164268d079581a`): Create dish form: title, description, category, price, dietary type, spice rating, prep time, image upload, portion options.
7. **Edit Food** (`c008164250264ef5aabd5a16b5c45ae8`): Modify existing dish metadata, pricing, image replacement, availability.
8. **Category Management** (`2c7cede8ca9b48d48358855bc0e29af2`): Category list with active dish counts, display sequence order, banner thumbnail.
9. **Add/Edit Category** (`a93beac907924997aefbc5df92f98179`): Form to create or modify category details, sorting order, and banner.
10. **Coupons Management** (`21d2ff3e41514003bb4ca6a9f8a22f42`): Table of promotional discount codes, validity windows, redemptions count, status toggles.
11. **Create/Edit Coupon** (`a0262b5a31f1489baca255c7972e89af`): Coupon code generator, discount type (% or flat ₹), min cart value, cap, expiry date.
12. **Customer Management** (`5faaf03754eb40ca880f1575d3940314`): User directory, total lifetime spend, orders placed, joined date, loyalty level.
13. **Customer Details** (`06b869e1f26b4f028bcde7c2a8733744`): Deep profile view with specific customer order history, favorite dishes, contact info.
14. **Restaurant Settings** (`0d6743f1bff949c7b8247c87b5b9e4a5`): Operating hours, delivery radius (km), GST / tax percentage, packaging fee, minimum order value, store open/close switch.
15. **Analytics & Reports (Revenue & Trends)** (`652ed5e908ad497da275f06358878e62`): Gross sales, hourly peak ordering graphs, top-selling biryanis vs starters.
16. **Analytics & Reports (Performance & Cohorts)** (`c29403c750074cb2a0830c84dd1d3de6`): Customer retention, category performance breakdowns, delivery time benchmarks.
17. **Admin Profile & Settings** (`65321dc11c104de4a88ebcfc146a719b`): Profile configuration, admin account security, notification alerts (sound on new order).

---

## High-Resolution Food Image Assets
- `chicken-biryani.jpg` — Signature Dum Biryani
- `paneer tikka.jpg` — Clay-oven Paneer Tikka
- `dumplings.jpg` — Royal Momos / Potstickers
- `red meat.jpg` — Slow-cooked Rogan Josh / Lamb Shank
- `seafood.jpg` — Malabar Prawn Masala
- `fish.jpg` — Amritsari Spiced Fish Tikka
- `indian-thali.jpg` — Royal Dum Feast Thali
- `savory pancakes.jpg` — Stuffed Chilla / Parathas
- `green soup.jpg` — Spiced Shorba
- `asian noodle.jpg` — Hakka wok-tossed noodles
- `cake.jpg` — Shahi Tukda / Gulab Jamun Cheesecake
- `gulab jamun.jpg` — Warm Kesar Gulab Jamun
- `red mojito.jpg` — Pomegranate Mint Sparkler
- `cold coffee.jpg` — Cardamom Iced Latte
- `beer.jpg` — Craft Brews / Refreshers
- `whiskey.jpg` — Smoked Heritage Cocktails
