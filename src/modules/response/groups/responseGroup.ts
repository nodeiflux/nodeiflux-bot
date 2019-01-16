import { CommandGroup } from "@enitoni/gears-discordjs"
import { matchPrefixes } from "@enitoni/gears"
import { responseCommand, addCommand, removeCommand } from "../commands"

export const responseGroup = new CommandGroup({
  matcher: matchPrefixes("r ", "response "),
  commands: [addCommand, removeCommand, responseCommand]
})
