# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :decora,
  ecto_repos: [Decora.Repo]

# Configures the endpoint
config :decora, Decora.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "iHK2M+MnxPh9XznIpg2gKH3Zr/YDc2cZYuebtA3FJeE9KMxyXSSc3nEGRWXIj8OD",
  render_errors: [view: Decora.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Decora.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
