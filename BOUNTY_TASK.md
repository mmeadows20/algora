# Bounty Objective: Enhancement: Add support for system dark mode via prefers-color-scheme or manual theme toggle
Target: algora-io/algora Issue #222
URL: https://github.com/algora-io/algora/issues/222

## Issue Description
### Is your feature request related to a problem? Please describe.
Many users (including myself) prefer or require dark mode for reduced eye strain, especially during late-night coding/browsing. Modern browsers support the `prefers-color-scheme` media query, and popular sites (GitHub, Stack Overflow, Twitter/X, etc.) automatically adapt to the user's system preference (light/dark).

Currently, Algora.io appears to use a fixed light theme:
- No visible dark mode toggle in the UI (header, footer, profile pages, bounty boards, etc.).
- The site does not seem to respect `prefers-color-scheme: dark` — elements stay in light mode even when the OS/browser is set to dark.

This leads to inconsistent experience when users switch system themes.
### Describe the solution you'd like
Implement automatic dark mode support by:
1. Using Tailwind CSS `dark:` variants (if already using Tailwind) or CSS custom properties/variables with `@media (prefers-color-scheme: dark)` queries.
2. Adding a manual theme toggle (sun/moon icon) in the header or settings for users who want to override system preference.
3. Ensuring all elements adapt properly: backgrounds, text colors, cards, borders, syntax highlighting (if any), charts (e.g., punchcard), buttons, modals, etc.

Happy to help test or submit a PR if it sounds good? @zcesur 

Thanks for building a great OSS bounty platform!

## Instructions for Kuro (Autonomous Solver):
1. Use skills: `systematic-debugging` and `code-review-and-quality`.
2. Inspect the repository structure, locate relevant files, and understand the bug/feature.
3. Apply the minimal, robust fix or implementation.
4. Run any existing test suites or linters in the workspace.
5. Ensure the fix adheres to the project's existing code style.
6. When done, output a summary of files modified and verification results.
