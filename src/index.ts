import { Adapter, CommandGroup } from "@enitoni/gears-discordjs"
import { Bot, matchPrefixes } from "@enitoni/gears"
import * as config from "../config.json"

/** Middleware */
import { handleError } from "./modules/core/middleware"

/** Services */
import { ResponseService } from "./modules/response/services"

/** Groups */
import { responseGroup } from "./modules/response/groups"

const adapter = new Adapter({
  token: config.discord.token
})

const group = new CommandGroup({
  matcher: matchPrefixes("!"),
  middleware: [handleError],
  commands: [responseGroup]
})

const bot = new Bot({
  services: [ResponseService],
  adapter,
  group
})

bot.on("error", err => {
  console.log("Error", err)
})

bot.start()
