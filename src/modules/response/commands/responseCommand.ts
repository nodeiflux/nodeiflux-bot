import { Command } from "@enitoni/gears-discordjs"
import { matchAlways } from "@enitoni/gears"
import { ResponseService } from "../services"
import { MessageEmbed } from "discord.js"
import { PRIMARY_COLOR } from "../../../constants"
import { getResponseListEmbed } from "../helpers"

export const responseCommand = new Command().match(matchAlways()).use(async (context) => {
  const { message, manager, content } = context

  const service = manager.getService(ResponseService)
  const response = service.responses[content]

  if (!response)
    return message.channel.send({
      embed: getResponseListEmbed(Object.keys(service.responses)),
    })

  const embed = new MessageEmbed({
    title: response.title,
    description: response.body,
    color: PRIMARY_COLOR,
  })

  await message.delete()
  return message.channel.send({ embed })
})
