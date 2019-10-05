defmodule MemoryWeb.GamesChannel do
  use MemoryWeb, :channel

  alias Memory.Game

  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      game = Game.new()
      socket = socket
              |> assign(:game, game)
              |> assign(:name, name)
      {:ok, %{"join" => name, "game" => Game.client_view(game)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # def handle_in("showTile", _payload, socket) do
  #   game = Game.showTile(socket.assigns[:game])
  #   socket = assign(socket, :game, game)
  #   {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  # end

  def handle_in("showTile", %{"key" => k}, socket) do
    IO.inspect(socket)
    game = Game.showTile(socket.assigns[:game], k)
    IO.inspect(game)
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  defp authorized?(_payload) do
    true
  end
end
