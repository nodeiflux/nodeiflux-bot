import { Command } from "@enitoni/gears-discordjs"
import { matchPrefixes } from "@enitoni/gears"
import { RichEmbed } from "discord.js"
import { PRIMARY_COLOR } from "../../../constants"

const embed = new RichEmbed({
  color: PRIMARY_COLOR,
  title: "Nodeiflux Bot",
  description: "Tools to assist with moderation and assistance in Nodeiflux",
  fields: [
    {
      name: "Author",
      value:
        "Made by Enitoni (<@185820463220391937>) with the [gears](https://www.npmjs.com/package/@enitoni/gears) library"
    },
    {
      name: "Repository",
      value: "https://gitlab.com/enitoni/nodeiflux-bot"
    }
  ]
})

export const aboutCommand = new Command({
  matcher: matchPrefixes("about"),
  action: context => context.message.channel.send({ embed })
})
