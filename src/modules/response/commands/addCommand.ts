import { matchPrefixes } from "@enitoni/gears"
import { Command } from "@enitoni/gears-discordjs"
import { MessageEmbed } from "discord.js"

import { requireAdmin } from "../../admin/middleware"
import { ResponseService } from "../services"
import { UsageError } from "../../core/classes"
import { PRIMARY_COLOR } from "../../../constants"

export const addCommand = new Command()
  .match(matchPrefixes("add"))
  .use(requireAdmin())
  .use(async (context) => {
    const { message, manager, content } = context
    const service = manager.getService(ResponseService)

    const [name, title, body] = content.split("|")

    if (!name || !title || !body) {
      throw new UsageError("Specify name, title and body separating them with |")
    }

    await service.addResponse(name.trim(), { title, body })

    const embed = new MessageEmbed({
      color: PRIMARY_COLOR,
      title: "Response has been added",
      description: `Test it with !r ${name}`,
    })

    return message.channel.send({ embed })
  })
