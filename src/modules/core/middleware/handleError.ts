import { Middleware } from "@enitoni/gears-discordjs"
import { MessageEmbed } from "discord.js"
import { ERROR_COLOR } from "../../../constants"
import { PermissionError } from "../classes/PermissionError"
import { UsageError } from "../classes"

export const handleError: Middleware = async (context, next) => {
  const { message } = context

  try {
    await next()
  } catch (error) {
    const embed = new MessageEmbed({
      color: ERROR_COLOR,
      title: "Oops, an unknown error occured",
      description: error.message || error,
    })

    if (error instanceof PermissionError) {
      embed.setTitle("Permission error")
      embed.setDescription(error.reason)
    }

    if (error instanceof UsageError) {
      embed.setTitle("Usage error")
      embed.setDescription(error.reason)
    }

    return message.channel.send({ embed })
  }
}
