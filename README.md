This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docs:

These animations are data driven + content driven,
The base of the system is a group of composable self-contained animation groups which are designed to live together in a frame and can be sequenced together to make a carousel-like animation.

### Animations

Animations have some customisation in terms of props (timing, colour, content, size etc.) and can complete an entire cycle of animating (eg. delay, fade in, wait, fade out). Animations use the framer-motion library to manage transforms, using both the motion components and the hooks.

Future improvements: Error handling - some animations have minimum times to fully execute as their fade-ins and outs take a certain amount of time. This is not currently handled in the components. Extracting common patterns for calculating transforms (eg. an arc). Storybook - Would be great to test the limits of the animations and produce documentation about their content limits (eg. max chars for a TextWordMotion component inside an InfoFrame). Reduce motion handling for the solar arc component (possible refactor to use tranform rather than rotate so it can share code with other 'arcing components'). Unit testing. Standardisation of defaults (remove magic numbers, named defaults for transition times in animations).

## Data + state management

Data is read from a config object (perhaps in the future coming from CMS +/ infographics endpoint as it is custom user data) and passed into a sequence player which will render frames based on config data - the duration and the frame type. The sequence player also maintains the state for when to display the reusable CTA animation after the animation frames are finished.

Future improvements: As the data is personalised, it needs to be fetched from external services, it would be great to add MSW to simulate this call and make a more realistic flow. Visual animation info could come from a CMS (colors, sizes etc.)

## Layout

In our design we have 7 unique animation components (for example the solar arc component which rotates and colour changes over a duration and also changes opacity) and two layout types where the animations are composed together in a frame. For now, the layouts are fairly content tolerant, using a combination of flex boxes and absolute positioning with sizes from the data config. I have restricted the page width to be sm for the demo as it fits the design better but the layout is fully responsive (remove max-w-sm in page to test responsive layout).

This layout choice (the two frames) is the simplest solution for now and allows no customisation beyond modifying the content (eg. changing size of SolarArc ball, using 5 albums etc.), in the future, it could be possible to compose the layout, mix and match the animations and layers via the config also.

## A11y

Reduced motion : The animation does not run at all in this flow if a user prefers reduced motion, and only the final frame is statically rendered with the user data, this is currently also handled by the player. The animated text div’s are replaced by normal text and in the animated branch.
Zoom: Layout is preserved on zoom.
Screen reader: As the animation is not controlled by the user, a sr-only aria live element is used to tell the user whats going on and then after they've reached the end they can continue through the page. Aria-labels and aria-hidden attributes are used to account for the broken up html caused by the animations. All of the non-text only elements are aria hidden for now.

## Testing

Short on time, I've gone light on tests, only some very light unit tests on the Sequence player, in a real context there would be more testing, in both jest and storybook, I could speed up dev time by generating them with integrated AI like Cline but in this context it would just create a review burden.

### Other assets/packages

Test album data generated with chat GPT, font is Archivo Narrow and I SIL Open Font License, Version 1.1, using react-icons for the chevrons in the swipe animations for simplicity.
