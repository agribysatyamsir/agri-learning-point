# Learning Point — Design System & Tokens

**Product Brand:** Learning Point  
**Visual Style:** Premium, modern dark navy/slate foundation with controlled emerald-green and gold accents. Subtle 3D hover/depth effects, high-readability typography, and WCAG 2.2 AA accessibility.

---

## 1. Color Palette & Tokens

```css
:root {
  /* Surface & Background (Deep Navy / Slate) */
  --bg-primary: #070B19;        /* Deepest canvas */
  --bg-surface: #0E172A;        /* Cards, panels, modals */
  --bg-surface-elevated: #1E293B;/* Hover elevation, tooltips */
  --bg-surface-glass: rgba(15, 23, 42, 0.75);

  /* Borders & Dividers */
  --border-subtle: #1E293B;
  --border-muted: #334155;
  --border-accent: rgba(16, 185, 129, 0.25);
  --border-gold: rgba(245, 158, 11, 0.3);

  /* Primary Brand Accent (Emerald Green) */
  --emerald-500: #10B981;       /* Primary buttons, key stats, pass state */
  --emerald-600: #059669;       /* Button hover, active indicators */
  --emerald-700: #047857;
  --emerald-glow: rgba(16, 185, 129, 0.2);

  /* Secondary Accent (Restrained Gold) */
  --gold-400: #FBBF24;          /* Badges, rank highlights, premium banners */
  --gold-500: #F59E0B;          /* Rating stars, featured indicators */
  --gold-600: #D97706;
  --gold-glow: rgba(245, 158, 11, 0.18);

  /* Text & Content */
  --text-primary: #F8FAFC;      /* Primary headings, titles, active labels */
  --text-secondary: #CBD5E1;    /* Body text, descriptions */
  --text-muted: #94A3B8;        /* Captions, metadata, placeholders */
  --text-disabled: #475569;

  /* Status Colors */
  --status-success: #10B981;    /* Correct answer, payment confirmed */
  --status-error: #EF4444;      /* Incorrect answer, payment failed, critical error */
  --status-warning: #F59E0B;    /* Expiry alert, review required */
  --status-info: #3B82F6;       /* Notice, test instructions */
}
```

---

## 2. Typography

- **Primary Font Family:** Inter, system-ui, -apple-system, sans-serif.
- **Display Weights:** Bold (700) for Display Headings, SemiBold (600) for Section Headings and Buttons, Medium (500) for Subheadings and Navigation, Regular (400) for Body Copy.
- **Readability Rules:** Line-height at least 1.5 for paragraph text; maximum line-length 65-75 characters on desktop viewports.

---

## 3. 3D Depth & Micro-Interaction Rules

- **Card Tilt:** Maximum 6 degrees perspective tilt on mouse hover (`transform: perspective(1000px) rotateX(...) rotateY(...) scale3d(1.02, 1.02, 1.02)`).
- **Smooth Reset:** 300ms cubic-bezier transition on pointer leave.
- **Touch Devices:** Hover tilt is deactivated via `@media (hover: hover) and (pointer: fine)`. Touch interactions provide instant press depth (`transform: scale(0.98)`).
- **Reduced Motion:** If `@media (prefers-reduced-motion: reduce)` is active, all 3D tilts, transforms, and continuous animations are replaced with instant or simple opacity transitions.
- **Accessible Focus:** High-contrast focus rings (`outline: 2px solid #10B981; outline-offset: 2px`) on all interactive controls.

---

## 4. Reusable Component Primitives

1. **Header & Navigation:** Sticky blur header with authentic logo, navigation links, mobile drawer, and CTA.
2. **Card3D:** Reusable container for courses, test series, and exam categories with controlled tilt.
3. **ExamBadge:** Distinctive pill badge for exam categories (UPSC/PCS, IBPS AFO, NABARD, ICAR/JRF, State Agri).
4. **Button:** Primary (Emerald solid), Secondary (Slate with subtle border), Gold (Special action), and Ghost.
5. **TestPalette:** Visual matrix of question states (Answered, Unanswered, Marked for Review, Visited).
6. **Modal / Drawer:** Accessible overlay with focus trap and escape-to-close behavior.
