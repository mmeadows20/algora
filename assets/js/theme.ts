// Theme handling.
//
// The active theme is expressed as the `dark` class on <html> (Tailwind's
// `darkMode: "class"` strategy) plus a `data-theme` attribute holding the
// user's *preference* ("light", "dark" or "system"). Keeping the preference
// on <html> lets the toggle highlight the active option with plain CSS, so it
// survives LiveView re-renders without extra client state.
//
// The initial theme is applied by an inline script in the root layout before
// the first paint (to avoid a flash of the wrong theme). Keep the resolution
// logic below in sync with that script.

const STORAGE_KEY = "theme";

export type ThemePreference = "light" | "dark" | "system";

export type ResolvedTheme = "light" | "dark";

const PREFERENCES: ThemePreference[] = ["light", "dark", "system"];

const DARK_QUERY = "(prefers-color-scheme: dark)";

function isPreference(value: unknown): value is ThemePreference {
  return (
    typeof value === "string" && PREFERENCES.includes(value as ThemePreference)
  );
}

function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isPreference(stored)) return stored;
  } catch (_error) {
    // localStorage is unavailable in private mode / sandboxed iframes.
  }
  return "system";
}

function systemTheme(): ResolvedTheme {
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  return preference === "system" ? systemTheme() : preference;
}

function syncControls(preference: ThemePreference) {
  document.querySelectorAll<HTMLElement>("[data-theme-set]").forEach((option) => {
    option.setAttribute(
      "aria-pressed",
      option.dataset.themeSet === preference ? "true" : "false",
    );
  });
}

/**
 * Applies a theme preference to the document and refreshes the toggle UI.
 */
export function applyTheme(preference: ThemePreference) {
  const resolved = resolveTheme(preference);
  const root = document.documentElement;

  root.classList.toggle("dark", resolved === "dark");
  root.dataset.theme = preference;
  root.dataset.resolvedTheme = resolved;
  root.style.colorScheme = resolved;

  syncControls(preference);
}

/**
 * Persists a theme preference (when possible) and applies it immediately.
 */
export function setTheme(preference: ThemePreference) {
  try {
    localStorage.setItem(STORAGE_KEY, preference);
  } catch (_error) {
    // Ignore storage failures; the theme still applies to this page.
  }
  applyTheme(preference);
}

/**
 * Re-applies the current preference, e.g. after LiveView patched the toggle.
 */
export function refreshTheme() {
  applyTheme(readPreference());
}

/**
 * Wires up the toggle buttons and system-preference changes. Idempotent.
 */
export function initTheme() {
  if ((window as any).__themeInitialized) return;
  (window as any).__themeInitialized = true;

  applyTheme(readPreference());

  // Delegated so it works for toggles rendered after this script ran and on
  // pages that are not LiveViews.
  document.addEventListener("click", (event) => {
    const target = event.target as Element | null;
    const button = target?.closest<HTMLElement>("[data-theme-set]");
    const preference = button?.dataset.themeSet;

    if (!button || !isPreference(preference)) return;

    event.preventDefault();
    setTheme(preference);
  });

  const media = window.matchMedia(DARK_QUERY);
  const onSystemThemeChange = () => {
    if (document.documentElement.dataset.theme === "system") {
      applyTheme("system");
    }
  };

  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", onSystemThemeChange);
  } else {
    // Safari < 14
    media.addListener(onSystemThemeChange);
  }
}
