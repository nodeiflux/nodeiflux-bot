import { Service } from "@enitoni/gears-discordjs"
import { Message } from "discord.js"
import { getJobHelpEmbed } from "../helpers"

const regex = "\\[(HIRING|FOR HIRE)\\]"
const channelId = "426384543818448896"

export class JobAutomodService extends Service {
  public async serviceDidInitialize() {
    this.bot.client.on("message", m => this.handleMessage(m))
  }

  private async handleMessage(message: Message) {
    const { content, channel } = message

    if (channel.id !== channelId) return
    if (!RegExp(regex).test(content)) {
      await message.delete()
      await message.member.user.send({ embed: getJobHelpEmbed(content) })
    }
  }
}
