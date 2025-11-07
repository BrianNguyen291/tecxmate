# Apple Theme Usage Guide

This guide explains how to use the Apple-inspired theme throughout your application.

## Colors

### Primary Colors (Purple)
- `primary` - Main purple (#8c52ff)
- `primary-light` - Light purple (#a978ff)
- `primary-dark` - Dark purple (#6b3fcc)

### Semantic Colors
- `success` - Apple green (#30d158)
- `warning` - Apple orange (#bf4800)
- `destructive` - Apple red (#d70015)
- `info` - Same as primary

### Text Colors
- `text-primary` - Main text color (#1d1d1f)
- `text-secondary` - Secondary text color (#6e6e73)
- `text-tertiary` - Tertiary text color (#86868b)

### Background Colors
- `background` - Page background (#fafafa)
- `card` - Card background (#ffffff)

### Border Colors
- `border` - Light border (#e5e5e7)
- `border-medium` - Medium border (#d2d2d7)
- `border-dark` - Dark border (#86868b)

## Usage Examples

### Using Tailwind Classes

```tsx
// Primary button
<button className="apple-button-primary">
  Click me
</button>

// Outlined button
<button className="apple-button-outlined">
  Cancel
</button>

// Text button
<button className="apple-button-text">
  Learn more
</button>

// Card with hover effect
<div className="apple-card apple-card-hover">
  <h3>Card Title</h3>
  <p className="text-apple-secondary">Card content</p>
</div>

// Using Apple colors directly
<div className="bg-primary text-primary-foreground">
  Purple background
</div>

<div className="text-success">
  Success message
</div>

<div className="border border-border-medium rounded-lg">
  Bordered container
</div>
```

### Using the Apple Styles Utility

```tsx
import { appleStyles, cn } from '@/lib/apple-styles';

// Using predefined styles
<div className={appleStyles.card}>
  Card content
</div>

// Combining styles
<button className={cn(appleStyles.buttonPrimary, 'mt-4')}>
  Submit
</button>
```

### Typography

The typography is automatically applied to all headings and paragraphs. You can also use utility classes:

```tsx
<h1>Heading 1 (32px, semibold)</h1>
<h2>Heading 2 (28px, semibold)</h2>
<h3>Heading 3 (24px, semibold)</h3>
<p className="text-small">Small text (13px)</p>
<p className="text-caption">Caption text (12px)</p>
```

### Spacing

Use Apple spacing scale:

```tsx
<div className="p-apple-lg m-apple-xl">
  Content with Apple spacing
</div>
```

### Border Radius

```tsx
<div className="rounded-sm">Small (6px)</div>
<div className="rounded-md">Medium (8px)</div>
<div className="rounded-lg">Large (12px)</div>
<div className="rounded-xl">Extra Large (16px)</div>
```

## Font

The app now uses Apple's system fonts:
- `-apple-system`
- `BlinkMacSystemFont`
- `SF Pro Display`
- `SF Pro Text`
- Fallback to `Segoe UI`, `Helvetica Neue`, etc.

## CSS Variables

All colors are available as CSS variables in `globals.css`:

```css
--primary: 207 90% 39%;
--primary-light: 207 99% 63%;
--success: 142 71% 45%;
--text-primary: 0 0% 11%;
/* etc. */
```

## Component Examples

### Alert/Notification
```tsx
<div className="bg-success/10 border border-success/30 text-success-dark rounded-md p-4">
  Success message
</div>
```

### Badge/Chip
```tsx
<span className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-primary/10 text-primary">
  New
</span>
```

### Input Field
```tsx
<input 
  className="w-full px-4 py-2 border border-border-medium rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
  type="text"
/>
```

## Primary Color

The primary color is purple (`#8c52ff`) with Apple-inspired styling throughout. All Tailwind classes work seamlessly with the Apple theme structure.

