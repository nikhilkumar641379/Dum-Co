# 🎨 Dum & Co. — Design System Specification

> **Project**: Dum & Co. — Premium Indian Restaurant Website & Management System  
> **Source**: Google Stitch Design System `Dum & Co. System` (`assets/2ac4ff030806425f9364958f3346016e`)  
> **Version**: 1.0.0

---

## 1. Brand & Style Philosophy

The Dum & Co. brand personality embodies regal Indian culinary heritage translated through modern, understated luxury. It balances artisanal authenticity—evoking slow-cooked dum traditions, hand-pounded spices, and heirloom brassware—with high-end contemporary hospitality.

The aesthetic sits at the intersection of editorial minimalism and tactile richness. It avoids ornate kitsch, Maharaja clichés, or cartoonish ethnic motifs, relying instead on expansive warm whitespace, meticulous editorial typography, fine-drawn hairlines, and authentic food photography. The interface must evoke warmth, appetite, craftsmanship, and unhurried exclusivity.

---

## 2. Color Palette & Tokens

### Canvas & Surfaces
| Token Name | Hex Code | Purpose |
|------------|----------|---------|
| `--surface-canvas` | `#FAF7F2` | Base canvas parchment warm cream, eliminates digital glare |
| `--surface-subdued` | `#F4EFE6` | Sectional separation, banners, recessed card backings |
| `--surface-raised` | `#FFFFFF` | Elevated cards, dialog overlays, floating action surfaces |
| `--surface-border` | `#E7E2D8` | Delicate neutral border tone to demarcate elements |
| `--surface-dim` | `#E0D8D5` | Muted background states |
| `--surface-high` | `#EEE7E3` | Elevated modal backdrops / highlights |

### Brand & Semantic Accents
| Token Name | Hex Code | Purpose |
|------------|----------|---------|
| `--primary` | `#C2410C` | Terracotta / Burnt Saffron (Primary action, key highlights) |
| `--primary-hover` | `#9A3412` | Darker terracotta hover state |
| `--primary-active` | `#7C2D12` | Active button press state |
| `--primary-subtle` | `#FFDBCA` | Light terracotta badge / pill background |
| `--secondary` | `#B45309` | Royal Muted Brass (Accolades, chef's notes, pairings) |
| `--secondary-glow`| `#FEF3C7` | Brass outline hover fill glow |
| `--dietary-veg` | `#15803D` | Pure Vegetarian (Deep spiced emerald indicator) |
| `--dietary-nonveg`| `#B91C1C` | Non-Vegetarian / Spiced Selection (Deep crimson garnet) |
| `--error` | `#BA1A1A` | Destructive actions, validation errors |

### Typography & Neutrals
| Token Name | Hex Code | Purpose |
|------------|----------|---------|
| `--text-high-contrast` | `#1C1917` | Deep charcoal for titles, prominent headlines, key pricing |
| `--text-body` | `#292524` | Readable warm dark neutral for descriptions and body copy |
| `--text-muted` | `#78716C` | Stone gray for metadata, prep times, secondary tags |
| `--text-subtle` | `#A8A29E` | Placeholders, inactive icons |

---

## 3. Typography Scale

- **Headlines & Editorial Marks**: `Playfair Display` (Serif)
  - `display`: `56px` / `line-height: 64px`, `weight: 600`, `letter-spacing: -0.02em`
  - `headline-lg`: `40px` / `line-height: 48px`, `weight: 600`, `letter-spacing: -0.015em`
  - `headline-md`: `28px` / `line-height: 34px`, `weight: 500`
  - `headline-sm`: `22px` / `line-height: 28px`, `weight: 500`
- **Body & Data Layer**: `Plus Jakarta Sans` (Sans-Serif)
  - `title-lg`: `20px` / `line-height: 26px`, `weight: 600`
  - `title-md`: `17px` / `line-height: 22px`, `weight: 600`
  - `body-lg`: `16px` / `line-height: 24px`, `weight: 400`
  - `body-md`: `14px` / `line-height: 20px`, `weight: 400`
  - `label-md`: `12px` / `line-height: 16px`, `weight: 600`, `letter-spacing: 0.04em`
  - `label-sm`: `10px` / `line-height: 12px`, `weight: 700`, `letter-spacing: 0.06em`

---

## 4. Spacing, Shapes & Elevation

### Spacing & Grid
- **Desktop (min 1024px)**: 12 columns, max-width `1280px`, gutters `24px` (`1.5rem`), outer margins `48px` (`3rem`).
- **Tablet (768px - 1023px)**: 8 columns, gutters `20px`, margins `32px`.
- **Mobile (< 768px)**: 4 columns, gutters `16px` (`1rem`), margins `20px` (`1.25rem`).

### Shapes & Corner Radii
- **`--radius-sm` (4px)**: Square dietary indicators, miniature badges.
- **`--radius-md` (8px)**: Food cards, inputs, modular panels.
- **`--radius-lg` (12px)**: Dialogs, dropdown containers, cards.
- **`--radius-full` (9999px)**: Category pills, CTA buttons, quantity steppers.

### Elevation & Shadows
- **Card Rest**: `0 4px 20px -2px rgba(41, 37, 36, 0.04)`
- **Card Hover**: `0 12px 28px -4px rgba(41, 37, 36, 0.08)` (transform: `translateY(-2px)`)
- **Modals / Sheets**: `0 20px 40px -8px rgba(28, 25, 23, 0.16)` with background scrim `rgba(28, 25, 23, 0.45)`
- **Overlays / Header / Sticky Bar**: `backdrop-filter: blur(12px)` with 85% opacity `#FAF7F2` or `#FFFFFF`
