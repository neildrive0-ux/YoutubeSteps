/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    // Shared with the Ai Landscaping & SnowRemoval web experience.
    text: '#141c24',
    tint: '#68d0ed',

    // Core surfaces
    background: '#f0f7f9',
    foreground: '#141c24',

    // Cards / elevated surfaces
    card: '#ffffff',
    cardForeground: '#141c24',

    // Primary action color (buttons, links, active states)
    primary: '#141c24',
    primaryForeground: '#f0f7f9',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#cce8f0',
    secondaryForeground: '#141c24',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#e3eef1',
    mutedForeground: '#5c737e',

    // Accent highlights (badges, selected items, focus rings)
    accent: '#68d0ed',
    accentForeground: '#141c24',

    // Destructive actions (delete, error states)
    destructive: '#b83c3c',
    destructiveForeground: '#ffffff',

    // Borders and input outlines
    border: '#cbd7db',
    input: '#b9cdd3',
  },

  dark: {
    text: '#f0f7f9',
    tint: '#68d0ed',
    background: '#141c24',
    foreground: '#f0f7f9',
    card: '#1e2d37',
    cardForeground: '#f0f7f9',
    primary: '#68d0ed',
    primaryForeground: '#141c24',
    secondary: '#263b47',
    secondaryForeground: '#f0f7f9',
    muted: '#263b47',
    mutedForeground: '#a5bac2',
    accent: '#68d0ed',
    accentForeground: '#141c24',
    destructive: '#d45b5b',
    destructiveForeground: '#ffffff',
    border: '#3a4f5a',
    input: '#4a626d',
  },

  // Border radius (in px). Sync from the sibling web artifact's --radius
  // CSS variable. This value applies to cards, buttons, inputs, and modals.
  radius: 12,
};

export default colors;
