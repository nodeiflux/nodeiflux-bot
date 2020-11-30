import { Service } from "@enitoni/gears-discordjs"
import { JSONStorage } from "../../../common/storage/classes"
import { Message } from "discord.js"
import { isAdmin } from "../../admin/helper"
import { getBanNotifyEmbed } from "../helpers"

const storage = new JSONStorage<string[]>("autobans.json", [])

export class AutobanService extends Service {
  public async serviceDidInitialize() {
    await storage.restore()
    this.bot.client.on("message", (m) => this.handleMessage(m))
  }

  public get autobans() {
    return storage.data
  }

  public async add(str: string) {
    const newData = [...storage.data, str]
    await storage.save(newData)
  }

  public async remove(str: string) {
    const newData = [...storage.data].filter((x) => x !== str)
    await storage.save(newData)
  }

  private async handleMessage(message: Message) {
    const { member, channel } = message
    if (!member) return

    const phrase = this.autobans.find((x) => message.content.includes(x))
    if (!phrase) return

    if (isAdmin(member)) {
      return channel.send("Poof! You're banned. ✨")
    }

    await message.delete()
    await member.user.send({ embed: getBanNotifyEmbed() })
    await member.ban({
      reason: `Banned phrase: ${phrase}`,
    })
  }
}
