import { CommandGroup } from "@enitoni/gears-discordjs"
import { matchPrefixes } from "@enitoni/gears"
import { requireAdmin } from "../../admin/middleware"
import { addCommand, removeCommand } from "../commands"

export const autobanGroup = new CommandGroup({
  matcher: matchPrefixes("at", "autoban"),
  middleware: [requireAdmin()],
  commands: [addCommand, removeCommand]
})
