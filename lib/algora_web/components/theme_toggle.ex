defmodule AlgoraWeb.Components.ThemeToggle do
  @moduledoc """
  Light / dark / system theme switcher.

  The chosen preference is stored in `localStorage` and applied by
  `assets/js/theme.ts`. The rendered markup is static: the active option is
  highlighted through the `data-theme` attribute on `<html>`, so the control
  needs no server state and cannot get out of sync with the page.
  """
  use AlgoraWeb.Component

  import AlgoraWeb.CoreComponents

  @themes [
    %{value: "light", icon: "tabler-sun", label: "light"},
    %{value: "dark", icon: "tabler-moon", label: "dark"},
    %{value: "system", icon: "tabler-sun-moon", label: "system"}
  ]

  attr :id, :string, required: true, doc: "unique DOM id, required by the phx-hook"
  attr :class, :string, default: nil

  def theme_toggle(assigns) do
    assigns = assign(assigns, :themes, @themes)

    ~H"""
    <div
      id={@id}
      class={classes(["inline-flex items-center gap-0.5 rounded-lg border border-border p-0.5", @class])}
      role="group"
      aria-label="Theme"
      phx-hook="ThemeToggle"
    >
      <%= for theme <- @themes do %>
        <.button
          type="button"
          variant="ghost"
          size="icon"
          class="text-muted-foreground hover:text-foreground"
          data-theme-set={theme.value}
          title={"#{theme.label} theme"}
          aria-label={"Use #{theme.label} theme"}
        >
          <.icon name={theme.icon} class="size-4" />
        </.button>
      <% end %>
    </div>
    """
  end
end
