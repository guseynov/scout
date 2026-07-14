---
name: Scout
description: Useful finds, checked by people.
colors:
  canvas: "#f7f8fa"
  surface: "#edf0f5"
  surface-strong: "#dfe5ef"
  ink: "#101a2e"
  muted: "#536078"
  line: "#cbd3df"
  blue: "#2356d6"
  blue-deep: "#173fa8"
  signal: "#c9401d"
  signal-soft: "#fee5dc"
typography:
  family: "-apple-system, BlinkMacSystemFont, 'Avenir Next', Avenir, 'Segoe UI', system-ui, sans-serif"
  page-title: "clamp(2.5rem, 5vw, 4.75rem) / 0.98 / 760"
  section-title: "clamp(1.9rem, 3vw, 3rem) / 1.02 / 720"
  body: "1rem / 1.6 / 400"
  utility-label: "0.72rem / 1.2 / 750"
rounded:
  control: "6px"
  card: "12px"
  badge: "4px"
---

# Design System: Scout

## North star

Scout is a utility field guide for community recommendations. It should feel like a well-used, sharply edited reference board: practical, direct, and ready to use. Product images and decision-relevant facts carry the page; decoration does not.

## Rules

- Use Scout blue for primary actions and selected controls. Use signal orange only for a discount or high-attention status.
- Use white and cool neutral surfaces, navy ink, visible dividers, and shallow corners. Avoid warm paper, glass panels, oversized rounded cards, and decorative shadows.
- Use one system sans family. Labels are compact utility text, never a substitute for a heading or a repeated page-scaffolding device.
- The Scout lockup is the wordmark plus optional `community finds` descriptor. Do not replace it with a letter badge or generic icon.
- Product UI remains familiar: standard buttons, fields, filters, keyboard focus, concise transitions, and no decorative entrance motion.
- The home hero may use a full-width, decorative Scout video. It sits behind a navy tint, has no audio or controls, and must disappear for reduced-motion users while the cobalt fallback remains visible.
- Highlighted finds are the one editorial color moment: use a cool-blue section surface and rotate a limited set of blue, orange, teal, and violet accent pairs on the active card only. The accent must identify the active item, timer, and category label together.

## Components

- **Primary button:** Scout blue, white text, 8px radius; hover deepens blue and moves 1px upward.
- **Secondary button and inputs:** White, cool-gray outline, 8px radius; focus uses a 2px Scout-blue outline.
- **Filter and layout controls:** Rectangular controls; the selected state is Scout blue with white text.
- **Cards and galleries:** White image surfaces, 12px corners, one cool-gray border, no elevation by default.
- **Status badge:** Small 4px-radius signal-orange block with white text; reserve for percentage-off state.

## Content voice

Use clear field-guide language: *find, board, check, price, source, share*. Scout does not use coupon-wall urgency or editorial affectation. The core promise is: **Useful finds, checked by people.**
