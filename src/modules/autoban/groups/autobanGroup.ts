import { CommandGroup } from "@enitoni/gears-discordjs"
import { matchPrefixes } from "@enitoni/gears"
import { requireAdmin } from "../../admin/middleware"
import { addCommand, removeCommand } from "../commands"

export const autobanGroup = new CommandGroup()
  .match(matchPrefixes("at", "autoban"))
  .use(requireAdmin())
  .setCommands(addCommand, removeCommand)
