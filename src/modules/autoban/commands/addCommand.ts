import { Command } from "@enitoni/gears-discordjs"
import { matchPrefixes } from "@enitoni/gears"
import { AutobanService } from "../services"
import { RichEmbed } from "discord.js"
import { PRIMARY_COLOR } from "../../../constants"

export const addCommand = new Command({
  matcher: matchPrefixes("add"),
  action: async context => {
    const { manager, message, content } = context
    const service = manager.getService(AutobanService)

    await service.add(content)

    const embed = new RichEmbed({
      color: PRIMARY_COLOR,
      title: "Phrase added",
      description: `"${content}" was added to the list of autoban phrases.`
    })

    return message.channel.send({ embed })
  }
})
