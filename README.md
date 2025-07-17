# Animation Infographics

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 📄 Docs

These animations are **data-driven + content-driven**.

The base of the system is a group of composable, self-contained animation components designed to live together in a **frame**, and be sequenced to create a **carousel-like animation experience**.

---

### 🎞️ Animations

Animations support customisation through props like:

- Timing
- Color
- Content
- Size

Each animation completes a full cycle: **delay → fade in → wait → fade out or stay**.

Animations use the **Framer Motion** library (`motion` components + hooks) for transform management.

#### 🔧 Future Improvements

- Error handling for minimum animation durations (e.g. fade-in/out).
- Extract reusable transform patterns (e.g. arcs).
- Add **Storybook** to test and document animation limits (e.g. max text in `TextWordMotion`).
- Improve **reduced motion** handling in `SolarArc`.
- Add **unit tests**.
- Standardize animation defaults (remove magic numbers, define named constants for transitions).

---

## 🧠 Data + State Management

- Data is read from a **config object**.
- In the future, it may come from a CMS or `/infographics` endpoint.
- A **SequencePlayer** renders frames based on type and duration.
- It also manages when to display the reusable **CTA animation** after the sequence ends.

#### 🔮 Future Improvements

- Integrate **MSW** to mock data fetching and simulate realistic user flow.
- Allow visual config (e.g. colors, sizes) to come from CMS.

---

## 🧱 Layout

- There are **7 unique animation components** (e.g. `SolarArc` with rotation, color, opacity).
- They are composed in **two layout types** ("frames").
- Layout uses **flexbox + absolute positioning**, driven by config.
- The demo restricts page width to `max-w-sm` for better fit — remove that to test full responsiveness.

#### 🧩 Layout Philosophy

The current 2-frame system is a minimal viable structure. It supports basic content changes (e.g. number of albums, solar arc size), but does **not yet support dynamic layout composition**.

In the future, the layout could be **fully configurable**, with mix-and-match animations and layers via config.

---

## ♿ Accessibility (A11y)

- **Reduced Motion**: When `prefers-reduced-motion` is enabled, no animation plays — only the final user frame is shown. This is handled in the SequencePlayer.
- **Zoom**: Layout is preserved when zoomed.
- **Screen Readers**:

  - An `aria-live="polite"` **sr-only element** announces frame changes.
  - `aria-label` and `aria-hidden` are used to help screen readers deal with animated text.
  - Non-text visual elements are marked `aria-hidden`.

---

## 🧪 Testing

Due to time constraints, only **light unit tests** were added to the `SequencePlayer`.

> In a full project, there would be:
>
> - Jest + RTL tests
> - Storybook component specs
> - Possibly auto-generated tests using AI tools (e.g. Cline), but in this context that would create review overhead.

---

## 📦 Other Assets / Packages

- Album data: Generated using ChatGPT.
- Font: [Archivo Narrow](https://fonts.google.com/specimen/Archivo+Narrow) (SIL Open Font License 1.1).
- Icons: [react-icons](https://react-icons.github.io/react-icons/) used for swipe chevrons (for simplicity).

---
