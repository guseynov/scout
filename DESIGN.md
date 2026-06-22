---
name: Common Good
description: A community-curated collection of useful, delightful finds.
colors:
  canvas: "#f5f2ea"
  surface: "#ebe8df"
  ink: "#20251f"
  muted: "#696d65"
  primary: "#de5b38"
  primary-deep: "#a4412b"
  highlight: "#e9b95f"
  white: "#ffffff"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Avenir Next', Avenir, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 7vw, 5.75rem)"
    fontWeight: 650
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Iowan Old Style', 'Palatino Linotype', Georgia, serif"
    fontSize: "clamp(2rem, 4vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Avenir Next', Avenir, 'Segoe UI', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Avenir Next', Avenir, 'Segoe UI', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  label:
    fontFamily: "ui-monospace, 'SFMono-Regular', Consolas, 'Liberation Mono', monospace"
    fontSize: "0.68rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0.12em"
rounded:
  sm: "12px"
  md: "16px"
  lg: "28px"
  xl: "40px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  "2xl": "32px"
  "3xl": "48px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "16px 22px"
  button-secondary:
    backgroundColor: "rgba(255,255,255,0.3)"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "16px 22px"
  filter-pill:
    backgroundColor: "rgba(255,255,255,0.3)"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  search-field:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
    padding: "8px 0"
  brand-lockup:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0"
  deal-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
  preview-panel:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "16px"
  empty-state:
    backgroundColor: "rgba(255,255,255,0.35)"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "24px"
---

# Design System: Common Good

## Overview

**Creative North Star: "The Editorial Shortlist"**

Common Good should feel like a trusted neighborhood editor's shortlist: warm, selective, and practical. The interface is not there to entertain; it is there to help people get from browsing to confidence with the least friction possible.

The visual rhythm is quiet paper, deep ink, and one rust accent. Serif headlines are reserved for moments that need editorial weight; the rest of the surface stays in a disciplined sans system. This rejects coupon-wall clutter, affiliate-spam behavior, dark-pattern commerce, and gimmicky motion.

**Key Characteristics:**
- Quiet by default, not inert.
- One accent, used sparingly.
- Familiar controls with clear state.
- Dense enough to browse, calm enough to trust.

## Colors

The palette is a warm paper stage with a rust primary, a sunlit highlight, and deep green-black ink.

### Primary
- **Brick Ember** (#de5b38): Primary actions, selected states, and the few moments that need to feel alive.
- **Deep Ember** (#a4412b): Hover and pressed state only; never a second accent.

### Secondary
- **Sunlit Gold** (#e9b95f): Badges, ratings, and light emphasis that should read as helpful rather than urgent.

### Neutral
- **Paper Canvas** (#f5f2ea): Main page background and the quiet field beneath the collection.
- **Soft Surface** (#ebe8df): Cards, panels, and lifted content.
- **Ink Moss** (#20251f): Body text, primary buttons, and dark overlays.
- **Slate Mist** (#696d65): Meta text, helper copy, and inactive labels.
- **Crisp White** (#ffffff): Text on dark surfaces and small marks that need maximum contrast.

### Named Rules
**The Accent Is Scarce Rule.** The primary orange is not decoration. Use it only for calls to action, selection, and important state.

**The Warmth Lives in the Surface Rule.** Keep the canvas warm and quiet. Do not push the whole interface into beige noise just to signal softness.

## Typography

**Display Font:** -apple-system, BlinkMacSystemFont, 'Avenir Next', Avenir, 'Segoe UI', system-ui, sans-serif
**Headline Font:** 'Iowan Old Style', 'Palatino Linotype', Georgia, serif
**Body Font:** -apple-system, BlinkMacSystemFont, 'Avenir Next', Avenir, 'Segoe UI', system-ui, sans-serif
**Label/Mono Font:** ui-monospace, 'SFMono-Regular', Consolas, 'Liberation Mono', monospace

**Character:** The sans stack keeps the task fast and legible. Georgia appears when the page needs a slower editorial opening. That gives the system weight without turning the product into a magazine mockup.

### Hierarchy
- **Display** (650, `clamp(3.25rem, 7vw, 5.75rem)`, `0.92`): Home hero and other brand-scale moments.
- **Headline** (400, `clamp(2rem, 4vw, 3.5rem)`, `0.98`): Route headers and collection openings.
- **Title** (600, `1rem`, `1.2`): Card titles, panel headings, and short labels that need to stay crisp.
- **Body** (400, `1rem`, `1.6`): Supporting copy and longer explanations. Keep prose readable and close to 65–75ch when possible.
- **Label** (650, `0.68rem`, `0.12em`): Filters, prices, counts, and small state text.

### Named Rules
**The Serif Is a Counterpoint Rule.** Serif type is for pacing and emphasis, not for every label or control.

**The Label Stays Small Rule.** Microcopy should stay compact, legible, and calm. Never let it swell into a second headline system.

## Elevation

The system stays mostly flat, then lifts specific moments: the hero card, image tiles, and preview panels float with soft ambient shadows. Depth is tonal first and shadow second. Backdrop blur appears only where it supports legibility, not as decorative glass.

### Shadow Vocabulary
- **Ambient Lift** (`0 32px 80px rgba(41,49,37,0.16)`): Used for featured cards and the hero presentation block.
- **Preview Halo** (`0 25px 50px rgba(0,0,0,0.25)`): Used for dark preview and status panels.
- **Badge Lift** (`0 10px 15px rgba(0,0,0,0.18)`): Used for small floating chips and emphasis tags.

### Named Rules
**The Flat-by-Default Rule.** Most surfaces rest without drama. Shadows appear only when a surface needs to separate, focus, or hover.

**The No-Glass Default Rule.** Blur is a functional support tool here, not a visual theme.

## Components

### Buttons
Confident, full-width tap targets that read as actions, not decoration.
- **Shape:** Pill radius (`999px`).
- **Primary:** Ink fill, white text, `16px 22px` padding, subtle upward hover shift.
- **Hover / Focus:** Hover deepens to `primary-deep`; focus gets a 2px accent outline.
- **Secondary:** Translucent white surface with a fine ink border; it should never compete with the primary action.

### Chips
Tight, readable filters that behave like controls.
- **Style:** Translucent white surface, pill radius, 1px neutral border, muted text.
- **State:** Selected chips invert to ink background and white text.

### Cards / Containers
Softly rounded editorial panels with enough space for imagery and labels.
- **Corner Style:** `28px` on deal cards, `16px` on overlays, `40px` on the hero card.
- **Background:** `surface` for content, `ink` for feature panels.
- **Border:** Fine neutral strokes only when needed; never pair a heavy border with a deep shadow on the same surface.
- **Internal Padding:** `24px` or more on content cards; `16px` on compact overlays.

### Inputs / Fields
Underline-first, not boxy.
- **Style:** Transparent fill with a single bottom stroke.
- **Focus:** Stroke shifts to primary; placeholder text stays legible.
- **Error / Disabled:** No extra ornament. Reduce contrast, keep the layout stable, and do not add visual noise.

### Navigation
Quiet brand lockup on the left, browse action on the right, no crowded masthead.
- **Brand Mark:** Circular `C` badge in ink.
- **Hover / Active:** Text-link underline on hover; no oversized nav chrome.
- **Mobile:** Preserve the same hierarchy and let secondary actions collapse rather than stack into a dense bar.

### Preview Panels
Dark, compact, and information-dense, but not claustrophobic.
- **Shape:** `16px` radius.
- **Background:** Near-black ink with high-opacity fill and blur.
- **Behavior:** Anchored to the card, with clear status and shipping metadata.

### Empty States
Helpful and restrained.
- **Background:** Soft dashed frame or pale filled panel.
- **Copy:** Explain what to do next instead of saying nothing is here.

## Do's and Don'ts

### Do:
- Do keep the canvas warm and quiet; let `#f5f2ea` and `#ebe8df` carry most of the screen.
- Do use `#de5b38` sparingly for primary actions, selected states, and important emphasis.
- Do keep browsing fast, reversible, and easy to scan.
- Do make loading, empty, and error states helpful.

### Don't:
- Don't become a coupon-wall or affiliate-spam marketplace.
- Don't bury relevance under ads, badges, or repetitive listings.
- Don't use dark-pattern commerce flows that make filtering, previewing, or returning to the collection feel sticky.
- Don't add overdecorated UI chrome or gimmicky motion that competes with the products.
