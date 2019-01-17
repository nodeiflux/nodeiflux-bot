import { Middleware } from "@enitoni/gears-discordjs"
import { PermissionError } from "../../core/classes"
import { isAdmin } from "../helper"
import { ADMIN_ROLES } from "../constants"

export const requireAdmin = (): Middleware => async (context, next) => {
  const { message } = context
  const { member } = message

  if (member) {
    if (!isAdmin(member)) {
      throw new PermissionError(
        `You need one of the following roles to run this command:\n${ADMIN_ROLES.join(
          ", "
        )}`
      )
    }

    return next()
  }

  throw new PermissionError("This is a server only command")
}
