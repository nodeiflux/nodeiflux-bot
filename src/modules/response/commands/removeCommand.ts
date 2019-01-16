import { Command } from "@enitoni/gears-discordjs"
import { matchPrefixes } from "@enitoni/gears"
import { requireAdmin } from "../../admin/middleware"
import { ResponseService } from "../services"
import { UsageError } from "../../core/classes"
import { RichEmbed } from "discord.js"
import { PRIMARY_COLOR } from "../../../constants"

export const removeCommand = new Command({
  matcher: matchPrefixes("remove"),
  middleware: [
    requireAdmin(),
    async context => {
      const { message, manager, content } = context
      const service = manager.getService(ResponseService)

      if (!content)
        throw new UsageError("Specify the name of the response you want to remove")

      await service.removeResponse(content.trim())

      const embed = new RichEmbed({
        color: PRIMARY_COLOR,
        title: `Response "${content}" removed`
      })

      return message.channel.send({ embed })
    }
  ]
})
