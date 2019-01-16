import { Middleware } from "@enitoni/gears-discordjs"
import { PermissionError } from "../../core/classes"

const PERMITTED_ROLES = ["Admin", "Moderator", "MVP"]

export const requireAdmin = (): Middleware => async (context, next) => {
  const { message } = context
  const { member } = message

  if (member) {
    const hasPermission = member.roles.some(role => PERMITTED_ROLES.includes(role.name))
    if (!hasPermission) {
      throw new PermissionError(
        `You need one of the following roles to run this command:\n${PERMITTED_ROLES.join(
          ", "
        )}`
      )
    }

    return next()
  }

  throw new PermissionError("This is a server only command")
}
