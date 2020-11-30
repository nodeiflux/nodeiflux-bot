import { Bot, Adapter, CommandGroup } from "@enitoni/gears-discordjs"
import { matchPrefixes } from "@enitoni/gears"
import * as config from "../config.json"

/** Middleware */
import { handleError } from "./modules/core/middleware"

/** Services */
import { ResponseService } from "./modules/response/services"
import { AutobanService } from "./modules/autoban/services"
import { JobAutomodService } from "./modules/jobs/services"

/** Groups and Commands */
import { responseGroup } from "./modules/response/groups"
import { autobanGroup } from "./modules/autoban/groups"
import { aboutCommand } from "./modules/core/commands"

const adapter = new Adapter({
  token: config.discord.token,
})

const group = new CommandGroup()
  .match(matchPrefixes("!"))
  .use(handleError)
  .setCommands(responseGroup, autobanGroup, aboutCommand)

const bot = new Bot({
  services: [ResponseService, AutobanService, JobAutomodService],
  commands: [group],
  adapter,
})

bot.on("error", (err) => {
  console.log("Error", err)
})

async function init() {
  await bot.start()
  await bot.client.user?.setActivity("use !about or !r help")

  console.info("Bot running.")
}

init()
