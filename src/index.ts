import { Adapter, CommandGroup } from "@enitoni/gears-discordjs"
import { Bot, matchPrefixes } from "@enitoni/gears"
import * as config from "../config.json"

const adapter = new Adapter({
  token: config.discord.token
})

const group = new CommandGroup({
  matcher: matchPrefixes("!"),
  commands: []
})

const bot = new Bot({
  adapter, group
})

bot.on("error", (err) => {
  console.log("Error", err)
})

bot.start()