import { MessageEmbed } from "discord.js"
import { PRIMARY_COLOR } from "../../../constants"

export const getResponseListEmbed = (responses: string[]) =>
  new MessageEmbed({
    color: PRIMARY_COLOR,
    title: "Available responses",
    description: responses.join(", "),
  })
