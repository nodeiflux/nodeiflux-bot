import { Service } from "@enitoni/gears-discordjs"
import { JSONStorage } from "../../../common/storage/classes"

export interface Response {
  title: string
  body: string
}

const storage = new JSONStorage<Record<string, Response>>("responses.json", {})

export class ResponseService extends Service {
  public async serviceDidInitialize() {
    await storage.restore()
  }

  public async addResponse(key: string, response: Response) {
    const newResponses = { ...storage.data, [key]: response }
    await storage.save(newResponses)
  }

  public async removeResponse(key: string) {
    const newResponses = { ...storage.data }
    delete newResponses[key]

    await storage.save(newResponses)
  }

  public get responses() {
    return storage.data
  }
}
