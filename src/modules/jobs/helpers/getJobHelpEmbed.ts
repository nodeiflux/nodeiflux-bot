import { RichEmbed } from "discord.js"
import { PRIMARY_COLOR } from "../../../constants"

const message = `
It appears you've posted a message without [FOR HIRE] or [HIRING], please add either to the beginning of your message.

[FOR HIRE] - you are looking for a job
[HIRING] - you are looking to hire someone
[INTERN] - this is an intern position, no experience required
[REMOTE] - only remote work is possible
[LOCAL] - only local work is possible (please remember to provide the country / city!)
[VISA] - Your company will help with the visa process in case of successful hire

If you have any questions, feel free to contact a mod. Thank you.
`

export const getJobHelpEmbed = (content: string) =>
  new RichEmbed({
    color: PRIMARY_COLOR,
    title: "Hi there!",
    description: message,
    fields: [
      {
        name: "Your message",
        value: content
      }
    ]
  })
