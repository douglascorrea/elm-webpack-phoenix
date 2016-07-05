defmodule Decora.PageController do
  use Decora.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
