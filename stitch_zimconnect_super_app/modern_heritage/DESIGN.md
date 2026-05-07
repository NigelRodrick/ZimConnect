---
name: Modern Heritage
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#404944'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#252f3e'
  on-tertiary: '#ffffff'
  tertiary-container: '#3b4555'
  on-tertiary-container: '#a8b2c6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#d9e3f7'
  tertiary-fixed-dim: '#bdc7db'
  on-tertiary-fixed: '#121c2a'
  on-tertiary-fixed-variant: '#3d4757'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display:
    fontFamily: Newsreader
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  gutter: 16px
  margin: 20px
---

## Brand & Style

This design system establishes a "Modern Heritage" identity for a Zimbabwean super-app, balancing deep-rooted cultural authority with forward-thinking digital utility. The brand personality is professional, institutional, and inherently trustworthy, designed to serve as a reliable companion for daily financial and social transactions.

The visual style is **Corporate / Modern** with a focus on high-utility minimalism. It prioritizes clarity and speed, specifically optimized for high-performance on low-bandwidth connections. The aesthetic rejects decorative bloat in favor of purposeful structural elements, utilizing a "less is more" approach that ensures the UI feels premium yet accessible to all demographics.

## Colors

The palette is rooted in the Zimbabwean landscape. The **Deep Emerald Green** serves as the primary brand anchor, used for headers, primary actions, and success states to evoke stability and growth. **Warm Gold** is used sparingly as an accent for high-priority notifications, active states, and specific call-to-actions, providing a sense of premium value without compromising professional restraint.

The neutral palette relies on **Charcoal Gray** for high-contrast typography and **Off-White/Slate** backgrounds. This ensures maximum legibility in outdoor, high-glare environments. To support low-data usage, the system avoids complex gradients, relying instead on flat color blocks and crisp dividers to define interface boundaries.

## Typography

This design system employs a sophisticated typographic pairing to achieve its "Modern Heritage" goal. **Newsreader** is used for headlines and display text, lending an authoritative, literary feel that echoes traditional broadsheets and historic documents. 

**Public Sans** is used for all functional UI elements, body text, and labels. Its institutional, neutral character ensures that complex data—such as financial figures and transaction logs—remains legible and accessible. High contrast ratios are maintained across all levels, with body text never dropping below 16px to accommodate various screen qualities and vision requirements.

## Layout & Spacing

The layout follows a **fluid grid** model optimized for mobile devices. It utilizes a 4-column system for handheld devices, expanding to an 8-column layout for tablets. To ensure a comfortable touch-first experience, the system implements a minimum touch target size of 48px.

A rhythmic 8px spacing scale governs all relationships between elements. Gutters are fixed at 16px to maximize horizontal space for content, while outer margins are set to 20px to prevent visual crowding at the edge of the screen. This structured approach ensures a predictable and intuitive navigation experience as users move through different services within the super-app.

## Elevation & Depth

To accommodate low-data patterns and low-power hardware, this design system avoids heavy drop shadows and complex blur effects. Depth is instead communicated through **Tonal Layers** and **Low-contrast outlines**.

Surface elevation is achieved by stacking lighter gray containers on the primary background. For critical floating elements like Bottom Sheets or Modals, a 1px solid border in a subtle neutral-tinted gray is used to define boundaries. Where elevation is absolutely necessary to indicate interactivity, a single, crisp "Hard Shadow" (no blur, 2px offset) is used to maintain a clean, vector-based aesthetic that renders quickly.

## Shapes

The shape language is **Soft (0.25rem)**, prioritizing a structured and professional appearance. Sharp corners are avoided to ensure the app feels modern, but high roundedness is rejected to maintain an "Institutional" and "Trustworthy" tone suitable for a financial and utility platform.

Buttons and input fields utilize the standard base radius, while larger containers like cards and modals may use the `rounded-lg` (0.5rem) variant to provide a gentle visual distinction for grouped content.

## Components

### Buttons
Primary buttons use the Deep Emerald Green with White text. Secondary buttons use a Charcoal outline. Text links are always underlined or accompanied by an icon to ensure accessibility.

### Cards
Cards are designed for low-data loading. They utilize solid color backgrounds and high-contrast typography. Icons should be SVG-based and monochromatic to minimize asset weight.

### Form Fields
Inputs use a high-contrast charcoal border (1px) that thickens to 2px in the Emerald Green when focused. Labels are always visible above the field to ensure context is never lost during data entry.

### Navigation
The primary mobile navigation is a bottom bar with four to five core destinations. Active states are indicated by the Gold accent color. This design system also utilizes a "Service Grid" on the home screen—a series of clear, icon-led tiles for quick access to the super-app’s various functions.

### Low-Data Patterns
For image-heavy content (like news or marketplace items), use a colored placeholder block using the neutral palette until the user explicitly requests to "Load Image," helping to save data costs for the end user.