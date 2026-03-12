# Engineered Depth: Comprehensive Design Reference
## Portfolio Landing Page — Design Theory & Specifications

> Compiled from expert sources across colour theory, typography, web design principles,
> and motion design. All values are production-ready specifications.

---

## Table of Contents

1. [Layering & Depth in Web Design](#1-layering--depth-in-web-design)
2. [Colour Theory for Monochrome + Single Accent](#2-colour-theory-for-monochrome--single-accent)
3. [Typography as Structural Element](#3-typography-as-structural-element)
4. [Whitespace & Rhythm](#4-whitespace--rhythm)
5. [Micro-Details That Elevate Design](#5-micro-details-that-elevate-design)
6. [Dark Mode Design](#6-dark-mode-design)
7. [Balance & Composition](#7-balance--composition)
8. [Quick Reference Cheat Sheet](#8-quick-reference-cheat-sheet)

---

## 1. Layering & Depth in Web Design

### 1.1 Creating Visual Depth Without 3D Libraries

The core technique is **CSS perspective-based parallax**: applying a `perspective` value to a scrolling
container, then using `translateZ()` on child elements to place them at different depth planes.

- Elements moved **back** with negative `translateZ` values scroll **slower** (appear distant)
- Elements moved **forward** with positive values scroll **faster** (appear close)
- The browser's GPU compositor handles this natively at 60fps
- Always use `will-change: transform` to promote parallax elements to their own compositor layer
- Respect `prefers-reduced-motion` — flatten all parallax for users who request it

**CSS Implementation Pattern:**

```css
.parallax-container {
  perspective: 1px;           /* Establishes 3D space */
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
}

.layer-back {
  transform: translateZ(-2px) scale(3);   /* Moves slowly, scaled up to compensate */
}

.layer-mid {
  transform: translateZ(-1px) scale(2);   /* Medium speed */
}

.layer-front {
  transform: translateZ(0);               /* Normal scroll speed */
}
```

**Important**: When using `translateZ()` with `perspective`, elements shrink as they move away.
Apply a compensating `scale()` using the formula: `scale = 1 + (translateZ * -1) / perspective`.

### 1.2 Opacity Layering Techniques

**Recommended opacity ranges by depth plane:**

| Depth Plane       | Opacity Range  | Purpose                                      |
|-------------------|----------------|----------------------------------------------|
| **Background**    | 0.03 – 0.08   | Atmospheric texture, grain, watermarks        |
| **Deep mid**      | 0.08 – 0.15   | Structural lines, grid marks, ghost type      |
| **Mid-layer**     | 0.15 – 0.40   | Supporting elements, secondary UI, dividers   |
| **Foreground**    | 0.60 – 1.00   | Primary content, headings, interactive elements|

**Key principles:**
- Use pseudo-elements (`::before`, `::after`) to control background opacity independently of foreground content
- Never apply `opacity` to a container with children you want fully opaque — use `rgba()` or `color-mix()` instead
- Glassmorphism-style depth uses `backdrop-filter: blur()` combined with semi-transparent backgrounds
- Lower-opacity foreground elements create a sense of **translucent hovering** — useful for cards and panels

### 1.3 Optimal Number of Depth Planes

**The sweet spot is 3–5 depth planes:**

1. **Background plane** (deepest) — static or very slow parallax, atmospheric texture
2. **Deep structural plane** — grid lines, oversized ghost typography, coordinate marks
3. **Content plane** (primary) — where the main content lives, normal scroll
4. **Accent/overlay plane** — floating labels, cursor effects, film grain overlay
5. **Fixed UI plane** — navigation, persistent elements

Beyond 5 planes, the effect becomes noise rather than depth. Each additional plane
has diminishing returns and increasing performance cost.

**The critical rule**: each plane must serve a distinct visual purpose. If two planes
could be merged without losing meaning, merge them.

### 1.4 Parallax Speed Ratios and Perceived Depth

**Recommended speed multipliers (relative to normal scroll at 1.0x):**

| Layer              | Speed Ratio | translateZ (with 1px perspective) | Perceived Effect           |
|--------------------|-------------|-----------------------------------|----------------------------|
| Far background     | 0.1x – 0.2x| -4px to -8px                      | Distant, atmospheric       |
| Background         | 0.3x – 0.5x| -1px to -2px                      | Slow drift, grounding      |
| Content (base)     | 1.0x        | 0px                               | Normal scroll              |
| Foreground accent  | 1.05x–1.15x| +0.05px to +0.15px                | Subtle forward float       |

**Important considerations:**
- Speed differences between adjacent planes should not exceed 0.5x — larger gaps create jarring disconnection
- Background elements below 0.2x speed feel nearly static (which can be effective for atmosphere)
- Foreground elements above 1.2x speed feel disconnected from the page
- The most elegant parallax uses **subtle** ratios: 0.85x background, 1.0x content, 1.05x accent
- Film grain and texture overlays should be **fixed** (`position: fixed`) so they don't scroll at all

---

## 2. Colour Theory for Monochrome + Single Accent

### 2.1 The 60-30-10 Rule for Monochrome + Accent

The 60-30-10 rule adapted for the "Engineered Depth" palette:

| Proportion | Role            | Application                                              |
|------------|-----------------|----------------------------------------------------------|
| **60%**    | Primary neutral | Near-black surfaces (#0A0A0A – #121212)                  |
| **30%**    | Secondary neutral| Near-white text, light grey UI elements (#E0E0E0 – #F5F5F5)|
| **10%**    | Accent (#D4552A)| CTAs, highlights, hover states, key focal points          |

**In practice for dark mode portfolio:**
- 60% = the dark background void — it IS the canvas
- 30% = all text and structural lines (in varying opacities of white)
- 10% = burnt orange accent — every instance should be intentional and meaningful

**Critical principle**: The accent colour is most powerful when it's the **brightest, most saturated
element** on the page. In a desaturated monochromatic palette, the accent becomes the
automatic focal point. Use this strategically — it should guide the eye to what matters most.

### 2.2 Accent Colour (#D4552A) at Different Depths

**Opacity values for burnt orange at different depth planes:**

| Usage                        | Opacity  | Hex with Alpha            | Visual Effect                |
|------------------------------|----------|---------------------------|------------------------------|
| Background glow/ambient      | 0.03–0.05| #D4552A08 – #D4552A0D     | Barely visible warm tint     |
| Structural underline/rule    | 0.08–0.12| #D4552A14 – #D4552A1F     | Subtle warm presence         |
| Ghost/watermark element      | 0.15–0.20| #D4552A26 – #D4552A33     | Acknowledged but recessive   |
| Secondary highlight          | 0.40–0.60| #D4552A66 – #D4552A99     | Noticeable, secondary        |
| Primary accent (full)        | 0.85–1.00| #D4552AD9 – #D4552A       | Full impact, focal point     |

### 2.3 Warm Accent Against Cool Neutrals

**Why burnt orange works on near-black:**
- Orange is a **warm** colour; near-black with blue/grey undertones reads as **cool**
- This creates natural **temperature contrast** beyond just value contrast
- Blue is orange's complementary colour — even slight blue undertones in the dark grey create maximum visual tension
- The warmth of orange feels **human and approachable** against the cold precision of the monochrome palette

**Best practices:**
- Keep the dark background truly neutral (no warm undertones) to maximize accent contrast
- Use the accent at full saturation only for the most important elements (1-3 per viewport)
- At low opacities (0.05–0.15), the accent adds warmth without competing for attention
- Never use the accent for body text — it fails WCAG contrast on dark backgrounds at body-text size
- For text using the accent colour, ensure minimum 4.5:1 contrast ratio (use on large/bold text only)
- #D4552A on #0A0A0A achieves approximately 4.2:1 — acceptable for large text (24px+/18.5px bold), but not for normal body text

### 2.4 Light vs Dark Mode Accent Considerations

**On dark backgrounds:**
- Saturated colours appear **more vivid** against dark surrounds
- Consider slightly **desaturating** the accent for dark mode to prevent it looking garish: #D4552A → #C4603A
- The accent colour may need to be **lightened** slightly for accessibility on dark backgrounds
- In dark mode, the accent does double duty: colour hierarchy AND luminance hierarchy

**On light backgrounds (if ever needed):**
- The same accent will appear **less vivid**
- A slightly **darker** variant may be needed: #D4552A → #B8441F
- Ensure 4.5:1 contrast against white backgrounds for any text use

---

## 3. Typography as Structural Element

### 3.1 The Type System: Outfit / DM Sans / JetBrains Mono

**Role assignment:**

| Font            | Role                    | Weight Range | Character                          |
|-----------------|-------------------------|------------- |------------------------------------|
| **Outfit**      | Headings, display, hero | 300–900      | Geometric, architectural, modern    |
| **DM Sans**     | Body text, descriptions | 400–500      | Humanist, readable, warm            |
| **JetBrains Mono** | Metadata, labels, code | 400–500   | Monospace, technical, precise       |

**Why this combination works:**
- Outfit's geometric forms give headings an **architectural** quality — like blueprint text
- DM Sans provides warmth and readability for longer text — the human counterpoint
- JetBrains Mono signals **technical precision** — perfect for metadata, indices, coordinates
- The contrast between geometric (Outfit) and humanist (DM Sans) creates clear visual hierarchy
- Monospace type at small sizes reads as **engineering notation** — reinforces the "developer craft" aesthetic

### 3.2 Modular Type Scale

**Recommended scale: Perfect Fourth (1.333) for body-to-heading, with custom display sizes**

Using 16px base (DM Sans body):

| Step | Scale   | Size   | Use Case                             | Font        |
|------|---------|--------|--------------------------------------|-------------|
| -2   | 0.563   | 9px    | (Not used — too small)               | —           |
| -1   | 0.750   | 12px   | Micro labels, metadata               | JetBrains   |
| 0    | 1.000   | 16px   | Body text                            | DM Sans     |
| 1    | 1.333   | 21px   | Large body / lead paragraph          | DM Sans     |
| 2    | 1.777   | 28px   | H4 — subsection heading              | Outfit 500  |
| 3    | 2.369   | 38px   | H3 — section heading                 | Outfit 600  |
| 4    | 3.157   | 50px   | H2 — major section title             | Outfit 700  |
| 5    | 4.209   | 67px   | H1 — page title                      | Outfit 800  |
| 6    | 5.610   | 90px   | Display — hero heading               | Outfit 300  |
| 7+   | Custom  | 120–200px| Display XL — architectural bg type  | Outfit 900  |

**Fluid typography with CSS clamp():**

```css
/* Example: H1 scales from 42px (mobile) to 67px (desktop) */
--h1-size: clamp(2.625rem, 2rem + 2.5vw, 4.1875rem);

/* Display hero: scales from 56px to 90px */
--display-size: clamp(3.5rem, 2.5rem + 4vw, 5.625rem);

/* Body: scales from 16px to 18px */
--body-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
```

**Viewport breakpoints for fluid scaling:**
- Minimum: 320px viewport → minimum font sizes
- Maximum: 1500px viewport → maximum font sizes (cap scaling here)

### 3.3 Line Height Recommendations

| Text Type             | Line Height | Notes                                    |
|-----------------------|-------------|------------------------------------------|
| Body (16–18px)        | 1.5 – 1.6  | Standard readable spacing                |
| Large body (20px+)    | 1.4 – 1.5  | Slightly tighter for visual cohesion     |
| Small text (≤14px)    | 1.6 – 1.8  | More space needed for legibility         |
| Section headings      | 1.1 – 1.3  | Tight, architectural feel                |
| Display/hero text     | 1.0 – 1.1  | Very tight — type as shape               |
| Oversized bg type     | 0.85 – 1.0 | Overlapping allowed at background opacity|

**Dark mode adjustment**: Light text on dark background appears to "bleed" and looks heavier.
Reduce font weight by one step: 400 → 300, 700 → 600. Or add +0.02em letter spacing to compensate.

### 3.4 Letter Spacing at Different Sizes

| Size Range      | Letter Spacing     | Rationale                                 |
|-----------------|--------------------|-------------------------------------------|
| ≤11px           | +0.02em to +0.05em | Opens up for legibility                   |
| 12–16px body    | 0 (normal)         | Fonts designed for this range             |
| 18–32px headings| -0.01em to -0.02em | Slight tightening for cohesion            |
| 32–64px display | -0.02em to -0.03em | Tighter = more architectural              |
| 64px+ oversized | -0.03em to -0.05em | Tight tracking is essential at this scale  |
| ALL CAPS text   | +0.05em to +0.15em | Always add spacing to uppercase           |
| Small caps      | +0.05em to +0.10em | Opens up for readability                  |

**Key insight**: At extreme sizes (100px+), negative tracking is not optional — it is **required**.
Without it, letters look disconnected and amateurish. Tailwind's "tracking-tight" uses -0.025em
as a sensible default.

### 3.5 Oversized Type as Architectural Background Element

**The technique**: Place massive type (120–300px) at very low opacity behind content to create
depth, texture, and visual landmarks.

**Specifications for background typography:**

| Property        | Value                    | Reasoning                                |
|-----------------|--------------------------|------------------------------------------|
| Font size       | 120px – 300px (8vw–20vw) | Must be large enough to read as texture  |
| Font weight     | 800 – 900                | Heavy weight is legible at low opacity   |
| Opacity         | 0.02 – 0.06             | Visible but does not compete with content |
| Colour          | White or accent           | White = structural; Accent = warm atmosphere|
| Letter spacing  | -0.04em to -0.06em       | Extreme tightening for mass/density      |
| Line height     | 0.85 – 0.95              | Allow overlap, treat as shapes           |
| Position        | `position: absolute`     | Removed from document flow               |
| Z-index         | Behind content (z: 0)    | Part of the background plane             |
| Blend mode      | `mix-blend-mode: overlay` or `soft-light`| Integrates with background |
| Parallax        | 0.3x – 0.5x speed       | Moves slower than content for depth      |
| Text transform  | `uppercase`              | Reads as graphic element, not word       |

**When using accent colour for bg type:**
- Keep opacity at 0.03–0.05 to avoid orange overwhelming the composition
- The subtle warm tint adds atmosphere without creating a focal point

### 3.6 Stroke/Outline Typography for Depth

**CSS text-stroke creates hollow letterforms that read as structural rather than content:**

```css
.outline-type {
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);
  -webkit-text-fill-color: transparent;
  font-size: clamp(4rem, 10vw, 10rem);
  font-weight: 900;
}
```

**Best practices:**
- Stroke width should be 1–2px regardless of font size (thin strokes = more elegant)
- Use for section numbers, background labels, or decorative landmarks
- Stroke type at 0.10–0.20 opacity creates a subtle depth plane between solid background type and content
- Combine with a subtle `text-shadow` for a faint glow: `text-shadow: 0 0 40px rgba(212, 85, 42, 0.05)`

### 3.7 Weight Contrast as Hierarchy

With Outfit spanning 300–900 weight, use weight as an active hierarchy tool:

| Weight | Visual Effect          | Use For                                      |
|--------|------------------------|----------------------------------------------|
| 300    | Light, elegant, airy   | Hero display text, large quotations           |
| 400    | Clean, neutral         | Sub-headings at large size, navigation        |
| 500    | Slightly assertive     | H4, section labels                            |
| 600    | Strong, confident      | H3, emphasis headings                         |
| 700    | Bold, commanding       | H2, major statements                          |
| 800    | Heavy, architectural   | H1, page titles                               |
| 900    | Massive, structural    | Background ghost type, oversized display       |

**The key contrast**: Using **300 weight at hero display size** creates an elegant, refined feel.
Using **900 weight** for the same text creates a completely different personality — dense, powerful,
structural. This range gives you enormous expressive range within a single typeface.

---

## 4. Whitespace & Rhythm

### 4.1 The 8px Grid Foundation

All spacing should be multiples of 8px. This ensures:
- Alignment across all elements on a subpixel-perfect grid
- Divisibility: 8 / 2 = 4, 8 / 4 = 2 (works at all scales)
- Consistency that the eye perceives as "polished" even subconsciously

**The spacing scale:**

| Token    | Value  | Use                                             |
|----------|--------|--------------------------------------------------|
| space-1  | 4px    | Tight internal gaps (icon-to-label)              |
| space-2  | 8px    | Minimum element padding                          |
| space-3  | 16px   | Standard internal padding                        |
| space-4  | 24px   | Component padding, card internals                |
| space-5  | 32px   | Between related elements                         |
| space-6  | 48px   | Between distinct groups                          |
| space-7  | 64px   | Between subsections                              |
| space-8  | 96px   | Between major sections (mobile)                  |
| space-9  | 128px  | Between major sections (tablet)                  |
| space-10 | 160px  | Between major sections (desktop small)           |
| space-11 | 200px  | Between major sections (desktop large)           |
| space-12 | 240px+ | Hero section vertical padding                   |

### 4.2 Vertical Rhythm in Long-Scroll Single-Page Layouts

**The fundamental rule**: Set a base line-height unit (e.g., 24px for 16px body at 1.5 line-height)
and make ALL vertical spacing a multiple of this unit.

**Section spacing ratios:**

| Relationship               | Spacing          | Multiple of base (24px) |
|----------------------------|------------------|-------------------------|
| Lines within a paragraph   | 24px (1.5 lh)   | 1x                      |
| Between paragraphs         | 24–32px          | 1–1.33x                 |
| Between heading and body   | 16–24px          | 0.67–1x                 |
| Between content blocks     | 48–64px          | 2–2.67x                 |
| Between subsections        | 64–96px          | 2.67–4x                 |
| **Between major sections** | **120–240px**    | **5–10x**               |
| Hero section padding       | 200–300px (top)  | 8–12x                   |

**Premium spacing principle**: For a portfolio, err on the side of **more space** between sections.
The difference between 80px and 160px of section spacing is the difference between "functional"
and "luxurious." Apple, luxury brands, and top agencies consistently use more whitespace than
expected.

### 4.3 Content Density and Perceived Quality

**The inverse relationship**: Less content per viewport = higher perceived quality.

| Content Density | Perception           | Appropriate For                     |
|-----------------|----------------------|--------------------------------------|
| Very low        | Luxury, exclusive    | Hero sections, statements            |
| Low             | Premium, confident   | Project showcases, about sections    |
| Medium          | Professional         | Skills, experience, technical detail  |
| High            | Informational        | Contact info, footer, legal text      |

**Practical implications:**
- Hero section: one heading, one subline, one CTA — nothing more
- Project cards: title, brief description, tags — resist the urge to add more
- Each section should have ONE primary focal point per viewport height
- Whitespace communicates "we can afford to give this content room" — the design equivalent of confidence

### 4.4 How Whitespace Communicates Expertise

- **Generous padding** around elements signals that every pixel was considered
- **Asymmetric whitespace** (more space above a heading than below) creates visual hierarchy
- **Whitespace as grouping**: items close together feel related; items far apart feel distinct (Gestalt proximity)
- **Active whitespace** (deliberate) vs **passive whitespace** (leftover) — the difference is intention
- Spacious layouts feel **calm, composed, and premium**; dense layouts feel **urgent, transactional, chaotic**
- Internal spacing ≤ External spacing: padding inside elements should never exceed the margin around them

---

## 5. Micro-Details That Elevate Design

### 5.1 The "Earned Element" Principle

**Every single element on the page must justify its existence.** If you cannot articulate why
an element is there — what it communicates, how it guides the eye, what it contributes to the
experience — it should be removed.

This is the single most important principle separating amateur from expert design. Amateurs add
elements because they look cool. Experts add elements because they serve a purpose.

**The test for each element:**
1. Does it communicate information? (content)
2. Does it guide the eye? (hierarchy/flow)
3. Does it reinforce the visual system? (consistency)
4. Does it add meaningful texture/atmosphere? (craft)
5. If removed, would anything be lost?

If the answer to all five is "no" — remove it.

### 5.2 Coordinate Marks, Section Indices & Corner Marks

**When they enhance:**
- They reinforce the "engineering/blueprint" aesthetic
- They provide wayfinding in a long-scroll layout
- They create visual anchors at section boundaries
- They add rhythm when placed consistently

**When they clutter:**
- When there are too many (more than 3-4 types of decorative marks)
- When they compete with content for attention
- When they're inconsistent in style or placement
- When they feel forced or decorative rather than functional

**Recommended specifications:**

| Element          | Font          | Size    | Opacity | Position                        |
|------------------|---------------|---------|---------|----------------------------------|
| Section index    | JetBrains Mono| 11–13px | 0.30–0.40| Fixed position, left margin     |
| Coordinate marks | JetBrains Mono| 10–11px | 0.15–0.25| Corner positions, absolute      |
| Corner marks     | CSS borders   | 12–16px | 0.10–0.20| Section corners, absolute       |
| Scroll indicator | JetBrains Mono| 10px    | 0.20–0.30| Fixed, right edge               |

**Critical**: These elements should use **JetBrains Mono** exclusively — the monospace font
signals metadata/system information, keeping them visually distinct from content.

### 5.3 Film Grain & Noise Textures

**Optimal implementation:**

| Property             | Value                | Reasoning                            |
|----------------------|----------------------|---------------------------------------|
| Opacity              | **0.03 – 0.08**     | Subtle enough to feel, not see       |
| Animation duration   | 5–8 seconds          | Slow enough to not distract          |
| Animation timing     | `steps(10)`          | Jerky = film-like; smooth = digital  |
| Overlay size         | 300% x 300%          | Prevents pattern edges from showing  |
| Position             | `position: fixed`    | Stays anchored regardless of scroll  |
| Z-index              | Top of stack         | Over all content                     |
| Pointer events       | `pointer-events: none`| Must not block interaction          |
| Blend mode           | Normal or Overlay    | Normal = consistent; Overlay = adaptive|
| Image method         | SVG filter `feTurbulence` or tiny PNG | SVG = no HTTP request, PNG = more control |
| Base frequency (SVG) | 0.65 – 0.80         | Controls grain coarseness            |

**The golden rule of grain**: If someone notices the grain on first viewing, it's too strong.
It should be a texture you **feel** rather than **see**. At 0.04–0.06 opacity on a dark background,
grain adds tactile warmth without visual noise.

**Performance note**: Canvas-based grain renders once (better for static). CSS filter grain runs every
frame (worse for performance but responds to DOM changes). For a mostly-static portfolio, an SVG
filter or animated PNG is ideal.

### 5.4 Reveal Animations — Timing, Easing, Sequencing

**Duration guidelines:**

| Animation Type         | Duration     | Notes                                    |
|------------------------|-------------|-------------------------------------------|
| Micro-interaction      | 100–200ms   | Button hover, focus state                 |
| Element reveal (fade)  | 300–500ms   | Single element appearing                  |
| Element reveal (slide) | 400–700ms   | Slide + fade combination                  |
| Section reveal         | 600–1000ms  | Larger content block                      |
| Hero entrance          | 800–1200ms  | First load, dramatic entrance             |
| Page transition        | 300–500ms   | Between states                            |

**Easing functions for "Engineered Depth":**

| Use Case           | Easing                            | Cubic-Bezier                     | Character          |
|--------------------|-----------------------------------|-----------------------------------|--------------------|
| **Standard exit**  | easeOutCubic                      | `cubic-bezier(0.33, 1, 0.68, 1)` | Smooth deceleration|
| **Elegant reveal** | easeOutQuart                      | `cubic-bezier(0.25, 1, 0.5, 1)`  | Quick start, gentle land|
| **Content slide**  | easeInOutCubic                    | `cubic-bezier(0.65, 0, 0.35, 1)` | Balanced both ends |
| **Premium feel**   | Custom smoothstep                 | `cubic-bezier(0.4, 0, 0.2, 1)`   | Material-inspired  |
| **Dramatic hero**  | Custom heavy ease                 | `cubic-bezier(0.16, 1, 0.3, 1)`  | Fast attack, slow settle|
| **Subtle float**   | easeInOutSine                     | `cubic-bezier(0.37, 0, 0.63, 1)` | Gentle, organic    |

**The "smoothstep" easing** — `cubic-bezier(0.4, 0, 0.2, 1)` — is the recommended default for
this design system. It mirrors the mathematical smoothstep function and was used by Material Design.
It feels precise yet natural, matching the "engineered" aesthetic.

**Stagger/sequencing pattern:**
- Stagger delay between related elements: **75–150ms**
- Never exceed 5 staggered elements (total sequence < 750ms)
- Stagger from the direction of reading: top-to-bottom, left-to-right
- All staggered elements should use the **same duration and easing** — only delay differs
- Hero sequence: title (0ms) → subtitle (150ms) → CTA (300ms) → decorative elements (450ms)

**Reveal trigger point**: Elements should begin animating when they are **20–30% visible**
in the viewport (i.e., trigger at `threshold: 0.2` with IntersectionObserver). This means the
animation is complete before the element reaches center-screen.

### 5.5 What Separates Amateur from Expert Design

| Amateur                                  | Expert                                       |
|------------------------------------------|----------------------------------------------|
| Inconsistent spacing                     | Everything on an 8px grid                    |
| Random animations                        | Every animation has consistent easing/duration|
| Decoration for its own sake              | Every element earns its place                 |
| Using all available space                | Strategic use of emptiness                    |
| Default font sizes                       | Modular scale with clear hierarchy            |
| Pure black on white                      | Considered colour values (#0A0A0A, #F5F5F5)  |
| No hover/focus states                    | Thoughtful state changes on all interactables |
| Mismatched font pairings                 | Intentional typographic system                |
| Generic cursor                           | Custom cursor that reinforces brand           |
| No loading consideration                 | Graceful loading states and transitions       |
| Content jammed together                  | Breathing room and clear grouping             |
| Arbitrary accent colour usage            | Accent colour used only for focal points      |

---

## 6. Dark Mode Design

### 6.1 Optimal Background Colours

**Never use pure black (#000000).** Here's why:

1. **Halation**: White text on pure black creates a "halation" effect where letters appear to bleed/glow, especially for users with astigmatism (~50% of the population)
2. **Depth impossibility**: With pure black, you cannot create darker shadows — you've used up your entire dark range at the base level
3. **Harshness**: The 21:1 contrast ratio of white-on-black is actually too high for comfortable reading
4. **No elevation room**: You need lighter shades above your base to communicate layers and depth

**Recommended surface colours (from deepest to highest elevation):**

| Surface Level      | Hex       | RGB              | Use                          |
|--------------------|-----------|------------------|-------------------------------|
| Base background    | #0A0A0A   | rgb(10, 10, 10)  | Page background, deepest layer|
| Surface 0          | #121212   | rgb(18, 18, 18)  | Card backgrounds, panels      |
| Surface 1 (1dp)    | #1E1E1E   | rgb(30, 30, 30)  | Elevated cards, modal bg      |
| Surface 2 (3dp)    | #252525   | rgb(37, 37, 37)  | Active states, hover bg       |
| Surface 3 (6dp)    | #2C2C2C   | rgb(44, 44, 44)  | Top bar, navigation           |
| Surface 4 (8dp)    | #333333   | rgb(51, 51, 51)  | Dropdown menus, popovers      |
| Surface 5 (12dp)   | #383838   | rgb(56, 56, 56)  | Highest elevation elements    |

### 6.2 Material Design Elevation Overlay System

The principle: Higher elevation = lighter surface. Achieved by overlaying white at increasing opacity
on the base dark surface (#121212):

| Elevation | White Overlay Opacity | Resulting Approximate Hex | Component Example      |
|-----------|-----------------------|--------------------------|------------------------|
| 0dp       | 0%                    | #121212                  | Background             |
| 1dp       | 5%                    | #1E1E1E                  | Cards, switches        |
| 2dp       | 7%                    | #232323                  | Buttons, raised cards  |
| 3dp       | 8%                    | #252525                  | FABs, snackbars        |
| 4dp       | 9%                    | #272727                  | App bars, top bars     |
| 6dp       | 11%                   | #2C2C2C                  | Navigation, bottom bars|
| 8dp       | 12%                   | #2E2E2E                  | Side sheets, menus     |
| 12dp      | 14%                   | #333333                  | Picker dialogs         |
| 16dp      | 15%                   | #353535                  | Nav drawers, modals    |
| 24dp      | 16%                   | #383838                  | Full-screen dialogs    |

### 6.3 How Accent Colours Behave on Dark Backgrounds

- Saturated colours appear **more vivid and brighter** on dark backgrounds (simultaneous contrast)
- This means #D4552A on dark will feel more intense than on light — which is generally desirable
- **Desaturated** variants are recommended for large areas to prevent eye fatigue
- Keep full saturation for small elements: icons, underlines, dots, small buttons
- For larger accent areas (highlighted cards, backgrounds), reduce saturation or use at 40–60% opacity
- Material Design recommends using primary colour at **12% overlay** for button/input state indicators

### 6.4 Contrast Ratios and Readability

**WCAG Requirements:**

| Text Type            | Minimum Ratio (AA) | Minimum Ratio (AAA) |
|----------------------|---------------------|----------------------|
| Normal text (<18px)  | 4.5:1               | 7:1                  |
| Large text (≥18px bold or ≥24px)| 3:1      | 4.5:1                |
| UI components        | 3:1                 | —                    |

**Practical text colour values on #0A0A0A background:**

| Colour              | Hex       | Contrast Ratio | Use                            |
|----------------------|-----------|----------------|--------------------------------|
| Primary text         | #F5F5F5   | ~18:1          | Headings, key content          |
| Secondary text       | #B0B0B0   | ~10:1          | Body text, descriptions        |
| Tertiary text        | #808080   | ~5.5:1         | Metadata, captions             |
| Disabled/ghost       | #4A4A4A   | ~2.5:1         | Placeholder, ghost elements    |
| Accent text          | #D4552A   | ~4.2:1         | Large headings only (≥24px)    |

**Dark mode typography adjustment**: Reduce font weight by one step (400→300 or 700→600) because
light text on dark backgrounds optically appears heavier due to irradiation/halation.

### 6.5 Depth Perception in Dark Mode

Dark mode fundamentally changes how depth is perceived:
- **Shadows are nearly invisible** on dark backgrounds — they cannot be the primary depth cue
- **Elevation must be communicated through surface lightness** (lighter = higher/closer)
- **Borders** at subtle opacity (0.05–0.10 white) become more important for defining edges
- **Glow effects** (box-shadow with colour, not black) become viable — `box-shadow: 0 0 30px rgba(212, 85, 42, 0.08)` adds a warm accent glow
- **Blur/glassmorphism** works beautifully in dark mode — `backdrop-filter: blur(20px)` on semi-transparent dark panels

---

## 7. Balance & Composition

### 7.1 Asymmetric Balance in Web Layouts

**Why asymmetric over symmetric for this style:**
- Symmetric = expected, corporate, safe
- Asymmetric = dynamic, editorial, intentional
- Swiss typography tradition favours **asymmetric layouts with grid discipline**
- Asymmetry creates visual tension and energy — the composition feels alive

**How to achieve asymmetric balance:**
- Balance a **large, light element** with a **small, heavy (dark/coloured) element**
- Balance a **text block** with **negative space** on the opposite side
- Use the **rule of thirds** grid to place focal points off-center
- Balance **visual weight**: large image on left → text + accent colour on right
- A single accent-coloured element can balance a large block of neutral content

**Visual weight factors (heaviest → lightest):**
1. Saturated accent colour (#D4552A)
2. High-contrast text (white on black)
3. Large elements / images
4. Dense text blocks
5. Light grey text
6. Ghost/outlined elements
7. Empty space

### 7.2 The Rule of Thirds for Web Sections

**Applying the photography rule to web viewport:**
- Divide each viewport into a 3x3 grid
- Place **primary content** at intersection points (not dead center)
- The **upper-left intersection** is the strongest position (matches F-pattern reading)
- The **lower-right intersection** is second strongest

**For a hero section:**
- Place the headline at the **left-third, upper-third** intersection
- Place the CTA or secondary element at the **right-third, lower-third**
- Leave the remaining space as active whitespace
- This creates a diagonal reading flow that feels natural and dynamic

**For project showcases:**
- Image: occupying 2/3 of width
- Text content: occupying 1/3 of width
- Alternate sides (image-left/text-right, then image-right/text-left) for rhythm

### 7.3 Visual Anchors

**Every section needs a visual anchor** — one element that the eye finds first when scrolling
into that section. Without an anchor, the eye wanders and the section feels unfocused.

**Effective anchor types:**
- An oversized heading (weight + scale = immediate attention)
- A project screenshot with clear contrast
- A single accent-coloured element
- A large section number (outlined, low opacity, positioned dramatically)
- A concentrated cluster of information against surrounding whitespace

**Anchor positioning**: The anchor should be visible **immediately** when the section scrolls into
view — typically in the upper 60% of the section. If the user has to scroll further to find the
focal point, the section feels directionless.

### 7.4 Swiss Typography Principles Applied

The International Typographic Style directly informs the "Engineered Depth" aesthetic:

| Swiss Principle                 | Application                                          |
|---------------------------------|------------------------------------------------------|
| **Grid-based layout**           | Strict column grid, 8px spacing system              |
| **Sans-serif typography**       | Outfit, DM Sans, JetBrains Mono — all sans-serif    |
| **Flush-left, ragged-right**    | All body text left-aligned, never justified          |
| **Asymmetric layout**           | Content placed off-center with intentional whitespace|
| **Content over decoration**     | Every element serves information, not decoration     |
| **Mathematical proportion**     | Modular type scale, golden ratio spacing             |
| **Objective presentation**      | Clean, factual, engineering-minded presentation      |
| **High contrast**               | Near-black/near-white with deliberate accent         |

**The editorial extension**: Where Swiss design is purely objective, the "Engineered Depth" style
adds a layer of editorial personality through:
- Film grain texture (warmth, tactility)
- Custom cursor (craft, attention to detail)
- Parallax depth (dimensionality, sophistication)
- Accent colour use (personality, humanity)

This is the tension that makes the design compelling: Swiss precision + human warmth.

---

## 8. Quick Reference Cheat Sheet

### Colour Tokens

```
--color-bg:          #0A0A0A    /* Base background */
--color-surface-1:   #121212    /* Elevated surface */
--color-surface-2:   #1E1E1E    /* Higher elevation */
--color-surface-3:   #252525    /* Active states */
--color-text-primary:#F5F5F5    /* Primary text */
--color-text-secondary:#B0B0B0  /* Secondary text */
--color-text-tertiary:#808080   /* Metadata/captions */
--color-text-ghost:  #4A4A4A    /* Decorative/disabled */
--color-accent:      #D4552A    /* Burnt orange accent */
--color-accent-muted:#C4603A    /* Desaturated variant */
--color-border:      rgba(255,255,255,0.06)  /* Subtle borders */
```

### Typography Tokens

```
--font-heading:    'Outfit', sans-serif
--font-body:       'DM Sans', sans-serif
--font-mono:       'JetBrains Mono', monospace

--text-xs:   clamp(0.625rem, 0.6rem + 0.15vw, 0.75rem)    /* 10-12px */
--text-sm:   clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem)      /* 12-14px */
--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem)        /* 16-18px */
--text-lg:   clamp(1.125rem, 1rem + 0.5vw, 1.333rem)        /* 18-21px */
--text-xl:   clamp(1.5rem, 1.2rem + 1vw, 1.875rem)          /* 24-30px */
--text-2xl:  clamp(1.875rem, 1.5rem + 1.5vw, 2.5rem)        /* 30-40px */
--text-3xl:  clamp(2.25rem, 1.75rem + 2vw, 3.25rem)         /* 36-52px */
--text-4xl:  clamp(2.75rem, 2rem + 3vw, 4.25rem)            /* 44-68px */
--text-5xl:  clamp(3.5rem, 2.5rem + 4vw, 5.75rem)           /* 56-92px */
--text-hero: clamp(4rem, 2.5rem + 6vw, 9rem)                /* 64-144px */
```

### Spacing Tokens

```
--space-1:   4px
--space-2:   8px
--space-3:   16px
--space-4:   24px
--space-5:   32px
--space-6:   48px
--space-7:   64px
--space-8:   96px
--space-9:   128px
--space-10:  160px
--space-11:  200px
--space-12:  240px

--section-gap: clamp(80px, 10vh, 200px)    /* Between major sections */
--hero-pad:    clamp(120px, 20vh, 300px)    /* Hero vertical padding */
```

### Animation Tokens

```
--duration-micro:   150ms      /* Hover, focus */
--duration-fast:    300ms      /* Quick transitions */
--duration-normal:  500ms      /* Standard reveals */
--duration-slow:    700ms      /* Dramatic reveals */
--duration-hero:    1000ms     /* Hero entrance */

--ease-default:     cubic-bezier(0.4, 0, 0.2, 1)     /* Smoothstep */
--ease-out:         cubic-bezier(0.25, 1, 0.5, 1)     /* easeOutQuart */
--ease-in-out:      cubic-bezier(0.65, 0, 0.35, 1)    /* easeInOutCubic */
--ease-dramatic:    cubic-bezier(0.16, 1, 0.3, 1)     /* Fast attack */
--ease-gentle:      cubic-bezier(0.37, 0, 0.63, 1)    /* easeInOutSine */

--stagger-delay:    100ms      /* Between sequenced elements */
--reveal-threshold: 0.2        /* IntersectionObserver threshold */
```

### Grain Overlay

```
--grain-opacity:    0.04       /* Barely perceptible */
--grain-size:       300%       /* Oversized to hide edges */
--grain-speed:      6s         /* Animation cycle */
--grain-steps:      steps(10)  /* Film-like stutter */
```

### Depth Planes (z-index)

```
--z-grain:       100    /* Film grain overlay (top) */
--z-cursor:       90    /* Custom cursor */
--z-nav:          80    /* Fixed navigation */
--z-modal:        70    /* Modals, overlays */
--z-content:      10    /* Main content */
--z-structure:     5    /* Grid lines, coordinate marks */
--z-ghost-type:    2    /* Background oversized type */
--z-background:    0    /* Deepest layer */
```

---

## Sources

### Layering & Depth
- [Parallax Scrolling Guide — Clay](https://clay.global/blog/web-design-guide/parallax-scrolling)
- [The Parallax Effect — GarageFarm](https://garagefarm.net/blog/parallax-effect-best-practices-and-examples)
- [CSS Parallax Effects — Slider Revolution](https://www.sliderrevolution.com/resources/css-parallax/)
- [Parallax Scrolling Still Cool in 2026 — Digital Kulture](https://www.webbb.ai/blog/parallax-scrolling-still-cool-in-2026)
- [Parallax Effect — Justinmind](https://www.justinmind.com/web-design/parallax-effect-website-examples)
- [Designing with Parallax — UXPin](https://www.uxpin.com/studio/blog/parallax-scrolling/)

### Colour Theory
- [60-30-10 Rule — UX Planet](https://uxplanet.org/the-60-30-10-rule-a-foolproof-way-to-choose-colors-for-your-ui-design-d15625e56d25)
- [60-30-10 Rule — Wix](https://www.wix.com/wixel/resources/60-30-10-color-rule)
- [Color to Enhance Design — NN/g](https://www.nngroup.com/articles/color-enhance-design/)
- [60-30-10 Rule — freeCodeCamp](https://www.freecodecamp.org/news/the-60-30-10-rule-in-design/)
- [Burnt Orange — Figma Colors](https://www.figma.com/colors/burnt-orange/)
- [Colors That Go With Orange — Color Meanings](https://www.color-meanings.com/colors-that-go-with-orange/)

### Typography
- [Typography Web Design Complete Guide — design.dev](https://design.dev/guides/typography-web-design/)
- [Typographic Hierarchy — Toptal](https://www.toptal.com/designers/typography/typographic-hierarchy)
- [CSS Modular Scales — Utopia](https://utopia.fyi/blog/css-modular-scales/)
- [Typescale Calculator — Typescale.com](https://typescale.com/)
- [Fluid Typescale — Clamp Generator](https://clampgenerator.com/blog/fluid-typescale-modern-css-without-media-queries/)
- [Letter Spacing — Not a Designer](https://notadesigner.io/p/tighter-better-art-letter-spacing)
- [Adding Stroke to Web Text — CSS-Tricks](https://css-tricks.com/adding-stroke-to-web-text/)
- [Typography in Design — Figma](https://www.figma.com/resource-library/typography-in-design/)
- [Typographic Hierarchy — Smashing Magazine](https://www.smashingmagazine.com/2013/02/creating-visual-hierarchies-typography/)

### Whitespace & Spacing
- [Vertical Rhythm — Zell Liew](https://zellwk.com/blog/why-vertical-rhythms/)
- [Whitespace in Web Design — Typza](https://www.typza.com/insigths/the-importance-of-whitespace-in-web-design)
- [Spacing Best Practices — Cieden](https://cieden.com/book/sub-atomic/spacing/spacing-best-practices)
- [Spacing, Grids, and Layouts — Design Systems](https://www.designsystems.com/space-grids-and-layouts/)
- [8px Grid — Not a Designer](https://notadesigner.io/p/8px-grid)
- [Spacing and Sizing — Concept Fusion](https://www.conceptfusion.co.uk/post/web-design-spacing-and-sizing-best-practices)

### Animation & Micro-details
- [Film Grain Effect — Viget](https://www.viget.co/articles/film-grain-effect)
- [Animated Grainy Texture — CSS-Tricks](https://css-tricks.com/snippets/css/animated-grainy-texture/)
- [Grainy Gradients — CSS-Tricks](https://css-tricks.com/grainy-gradients/)
- [Easing Functions Cheat Sheet — easings.net](https://easings.net/)
- [Easing and Cubic-Bezier — Josh Collinsworth](https://joshcollinsworth.com/blog/easing-curves)
- [Staggered Animations — Handoff Design](https://handoff.design/css-animation/staggered-animations.html)
- [Springs and Bounces in CSS — Josh Comeau](https://www.joshwcomeau.com/animation/linear-timing-function/)

### Dark Mode
- [Inclusive Dark Mode — Smashing Magazine](https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/)
- [12 Principles of Dark Mode — Uxcel](https://uxcel.com/blog/12-principles-of-dark-mode-design-627)
- [Dark Mode Best Practices 2026 — Tech-RZ](https://www.tech-rz.com/blog/dark-mode-design-best-practices-in-2026/)
- [Dark Mode UI Design — LogRocket](https://blog.logrocket.com/ux-design/dark-mode-ui-design-best-practices-and-examples/)
- [Dark Mode UI Best Practices — Atmos](https://atmos.style/blog/dark-mode-ui-best-practices)
- [Material Design Dark Theme — GitHub](https://github.com/material-components/material-components-android/blob/master/docs/theming/Dark.md)

### Balance & Composition
- [Symmetry vs Asymmetry — UXPin](https://www.uxpin.com/studio/blog/symmetry-vs-asymmetry-in-design/)
- [Balance in Web Design — Inkbot Design](https://inkbotdesign.com/balance-in-web-design/)
- [Rule of Thirds — IxDF](https://ixdf.org/literature/topics/rule-of-thirds)
- [Balance in Design — SitePoint](https://www.sitepoint.com/balance-in-design/)

### Swiss Design
- [Swiss Style Principles — PRINT Magazine](https://www.printmag.com/featured/swiss-style-principles-typefaces-designers/)
- [Swiss Design History — Big Human](https://www.bighuman.com/blog/guide-to-swiss-design-style)
- [Lessons from Swiss Style — Smashing Magazine](https://www.smashingmagazine.com/2009/07/lessons-from-swiss-style-graphic-design/)
- [Swiss Design Deep Dive — Studio FLACH](https://www.studioflach.com/journal/swiss-design-a-deep-dive-into-its-history-principles-and-lasting-influence)
