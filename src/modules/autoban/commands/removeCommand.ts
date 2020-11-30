import { Command } from "@enitoni/gears-discordjs"
import { matchPrefixes } from "@enitoni/gears"
import { AutobanService } from "../services"
import { MessageEmbed } from "discord.js"
import { ERROR_COLOR, PRIMARY_COLOR } from "../../../constants"

export const removeCommand = new Command()
  .match(matchPrefixes("remove"))
  .use(async (context) => {
    const { manager, message, content } = context

    const service = manager.getService(AutobanService)
    const exists = service.autobans.find((x) => x === content)

    if (!exists) {
      const embed = new MessageEmbed({
        color: ERROR_COLOR,
        title: "Phrase does not exist",
      })

      return message.channel.send({ embed })
    }

    await service.remove(content)

    const embed = new MessageEmbed({
      color: PRIMARY_COLOR,
      title: "Phrase removed",
      description: `"${content}" was removed from the list of autoban phrases.`,
    })

    return message.channel.send({ embed })
  })
