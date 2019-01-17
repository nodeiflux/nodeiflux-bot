import { GuildMember } from "discord.js"
import { ADMIN_ROLES } from "../constants"

export const isAdmin = (member: GuildMember) =>
  member.roles.some(role => ADMIN_ROLES.includes(role.name))
