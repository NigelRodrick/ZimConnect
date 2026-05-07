---
name: Heritage Modernism
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#404944'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
  secondary: '#795900'
  on-secondary: '#ffffff'
  secondary-container: '#ffc329'
  on-secondary-container: '#6f5100'
  tertiary: '#665f3d'
  on-tertiary: '#ffffff'
  tertiary-container: '#b4ab84'
  on-tertiary-container: '#453f20'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#ffdf9f'
  secondary-fixed-dim: '#f9bd22'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5c4300'
  tertiary-fixed: '#ede3b8'
  tertiary-fixed-dim: '#d1c79d'
  on-tertiary-fixed: '#201c02'
  on-tertiary-fixed-variant: '#4d4727'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  h1:
    fontFamily: Newsreader
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.01em
  h3:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 20px
---

## Brand & Style

The design system is anchored in the concept of "National Trust and Future Vitality." It balances the gravitas of a government-adjacent super-app with the energy of a growing digital economy. The brand personality is authoritative yet accessible, using a **Corporate Modern** style infused with high-quality editorial flourishes.

The visual narrative avoids the cold sterility of pure tech by introducing warmth through cream-based surfaces and heritage-inspired typography. The aesthetic goal is to feel "built to last"—evoking the stability of a physical institution while maintaining the speed and fluidity of a modern mobile experience. It prioritizes clarity, reliability, and high legibility for a diverse national audience.

## Colors

The palette is a sophisticated interpretation of national identity. 
- **Primary (Deep Forest Green):** Used for core branding, primary actions, and top-level navigation to establish authority.
- **Secondary (Bright Golden Yellow):** Used sparingly as a high-visibility accent for notifications, active states, and call-to-action highlights.
- **Background (Light Cream):** A departure from pure white, this soft surface color (#fdfcf7) reduces eye strain and provides a premium, "paper-like" feel that complements the serif typography.
- **Neutral:** A deep charcoal is used for body text to ensure maximum contrast against the cream background.

## Typography

The design system employs a dual-font strategy to bridge the gap between tradition and utility. 
- **Headlines (Newsreader):** This serif font brings a literary and authoritative tone. It should be used for all major page titles and section headers. Use tighter letter spacing for larger sizes to maintain a modern, editorial look.
- **Body & UI (Work Sans):** A professional and grounded sans-serif that ensures high legibility in dense data environments. Its neutral character prevents it from competing with the expressive headlines.
- **Hierarchy:** Maintain a clear distinction between the "Storytelling" (Serif) and the "Functional" (Sans-serif) layers of the interface.

## Layout & Spacing

This design system utilizes a **Fixed Grid** model for desktop (12 columns) and a **Fluid Grid** for mobile (4 columns). 

- **Rhythm:** An 8px baseline grid governs all vertical rhythm.
- **Margins:** Generous page margins (24px on mobile, 80px+ on desktop) are essential to maintain the "clean" and "heritage" feel. 
- **Density:** High-density layouts are permitted for utility dashboards, but primary landing pages must use "lg" and "xl" spacing tokens to evoke a sense of premium space and calm.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** rather than heavy shadows. 
- **Surface Tiers:** Use subtle shifts in cream/beige tones to separate the background from foreground containers.
- **Shadows:** When necessary (e.g., floating action buttons or primary modals), use ambient, low-opacity shadows with a slight green tint (#064e3b at 8% opacity) to keep the depth feeling organic to the color palette.
- **Dividers:** Use thin (1px) borders in a muted version of the primary green (10% opacity) instead of harsh grey lines to maintain the color story.

## Shapes

The shape language is **Rounded**, reflecting a modern and approachable super-app. 
- **Standard Radius:** 0.5rem (8px) for buttons and input fields.
- **Container Radius:** 1rem (16px) for cards and modals to create a friendly, soft-edged container for complex information.
- **Exceptions:** Use full "pill" rounds for status chips and tags to distinguish them from interactive buttons.

## Components

- **Buttons:** Primary buttons use the Deep Forest Green with white text. Secondary buttons use the Light Cream background with a 1px Forest Green border. Call-to-action buttons for high-priority conversions may use the Golden Yellow with dark text.
- **Cards:** Cards should have a white background (#ffffff) to pop against the cream surface (#fdfcf7). Use a subtle 1px border instead of heavy shadows.
- **Input Fields:** Use a solid background (slightly darker cream) with a bottom-only 2px border that turns Forest Green on focus.
- **Chips:** Small, pill-shaped indicators. Use the Secondary Golden Yellow for "Pending" or "Alert" states and a soft mint green for "Success" states.
- **Lists:** High-contrast list items with Work Sans for data. Icons within lists should be monochromatic Forest Green to maintain a professional look.
- **Navigation:** A clean top-bar or side-rail using the Primary Forest Green as the background, ensuring the national super-app feels like a unified, secure environment.