defmodule Memory.Game do

  def new do
    %{
      tiles: initial_tiles(),
    }
  end

  def client_view(game) do
    ts = game.tiles
    %{
      tiles: skeleton(ts),
    }
  end

  def skeleton(tiles) do
    get_in(tiles, [Access.all()])
    # IO.inspect(get_in(tiles, [Access.all(), :tile]), label: "This is a test")
    # Enum.map tiles, fn tile ->
    #  tile
    # end
  end

  def showTile(game, key) do
   newTiles = get_and_update_in(game.tiles, [Access.at(key), :show], fn show ->
      {show, !show}
    end)

    IO.inspect(newTiles, label: "Testing")
  end

  def initial_tiles do
    tiles = [
      %{tile: "A", show: false},
      %{tile: "B", show: false},
      %{tile: "C", show: false},
      %{tile: "D", show: false},
      %{tile: "E", show: false},
      %{tile: "F", show: false},
      %{tile: "G", show: false},
      %{tile: "H", show: false},
      %{tile: "A", show: false},
      %{tile: "B", show: false},
      %{tile: "C", show: false},
      %{tile: "D", show: false},
      %{tile: "E", show: false},
      %{tile: "F", show: false},
      %{tile: "G", show: false},
      %{tile: "H", show: false},
    ]
    # tiles = Enum.shuffle(tiles)
    tiles
  end
end
