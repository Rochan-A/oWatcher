# oWatcher

NOTE: Development of this bot is still in progress. We are open to any help and suggesions. We are open to pull requests.

oWatcher is the only Overwatch statistics retrival Discord bot that your server would need. oWatcher provides you the ability to review much more that other Overwatch Discord bots available today. It is based off <a href="https://github.com/hydrabolt/discord.js/">discord.js</a> and <a href="https://github.com/SunDwarf/OWAPI/">OWAPI</a>. Some special stats that can be accessed are:

  - General player stats for quickplay and competitive independently
  - General player stats region specific
  - Hero stats for quickplay and competitive independently
  - Hero specific stats

# Features:
- ow@stat battletag number region => returns stats on the user in that specific region
- ow@hero_name battletag number region => returns stats on the specific hero provided

And much more! Try ow@help to get a full list of available commands

# ToDo:
 - General account stats for competitive - Done
 - Hero stats for competitive - Done
 - Hero specific stats

# Installation

This bot is written to run on top of node.js. Please see https://nodejs.org/en/download/

Once you have node installed running `npm install` from the bot directory should install all the needed packages. If this command prints errors the bot won't work!

# Running
Before first run you will need to create an `auth.json` file. A bot token or the email and password for a discord account are required. The other credentials are not required for the bot to run, but highly recommended as commands that depend on them will malfunction. See `auth.json.example`.

To start the bot just run
`node bot.js`.

License
----

MIT
