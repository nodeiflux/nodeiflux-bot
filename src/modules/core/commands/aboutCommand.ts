import { Command } from "@enitoni/gears-discordjs"
import { matchPrefixes } from "@enitoni/gears"
import { MessageEmbed } from "discord.js"
import { PRIMARY_COLOR } from "../../../constants"

const embed = new MessageEmbed({
  color: PRIMARY_COLOR,
  title: "Nodeiflux Bot",
  description: "Tools to assist with moderation and assistance in Nodeiflux",
  fields: [
    {
      name: "Author",
      value:
        "Made by Enitoni (<@185820463220391937>) with the [gears](https://gears.enitoni.dev) library",
    },
    {
      name: "Repository",
      value: "https://gitlab.com/enitoni/nodeiflux-bot",
    },
  ],
})

export const aboutCommand = new Command()
  .match(matchPrefixes("about"))
  .use((context) => context.message.channel.send({ embed }))
