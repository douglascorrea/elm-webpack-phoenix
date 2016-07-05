defmodule Mix.Tasks.Decora.Digest do
  use Mix.Task

  def run(args) do
    Mix.Shell.IO.cmd "NODE_ENV=prod npm run build"
    :ok = Mix.Tasks.Phoenix.Digest.run(args)
  end
end
