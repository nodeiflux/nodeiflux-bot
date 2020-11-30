import { MessageEmbed } from "discord.js"
import { PRIMARY_COLOR } from "../../../constants"

const vcarl = "103525876892708864"

export const getBanNotifyEmbed = () =>
  new MessageEmbed({
    color: PRIMARY_COLOR,
    title: "You have been banned from Nodeiflux",
    description: `A message you sent was detected as spam. If you believe this is a mistake, contact <@${vcarl}>`,
  })
