import type * as discord from "discord.js";
import { guildId as defaultGuildId } from "../helpers/env.js";
// import { CHANNELS } from "../constants/channels.js";
import { logger } from "./log.js";
import {
  // FREQUENCY,
  scheduleTask,
  SPECIFIED_TIMES,
} from "../helpers/schedule.js";
import { ChannelType } from "discord.js";

type MessageConfig = {
  postTo: {
    guildId?: discord.Snowflake;
    interval: number | SPECIFIED_TIMES;
    channelId: discord.Snowflake;
  }[];
  message:
    | discord.MessageCreateOptions
    | ((channel: discord.TextBasedChannel) => void);
};
const MESSAGE_SCHEDULE: MessageConfig[] = [
  /*  Example:
  {
    // Find Discord channel IDs: https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-
    postTo: [
      {
        id: defaultGuildId, // Node.js Discord's server ID, optional
        interval: FREQUENCY.weekly, // Frequency the bot should post by
        channelIds: [ CHANNELS.helpReact ]  // Add channel IDs to constants first!
      }
    ],
    message: {
      content: "A message to post, any type of message discord.js understands"
    }
  }
  */
];

export const messages: MessageConfig[] = [];

export const scheduleMessages = (bot: discord.Client) => {
  bot.on("ready", () => {
    MESSAGE_SCHEDULE.forEach((messageConfig) =>
      sendMessage(bot, messageConfig),
    );
  });
};

const sendMessage = async (
  bot: discord.Client,
  messageConfig: MessageConfig,
) => {
  const { message, postTo } = messageConfig;
  postTo.forEach(async ({ guildId = defaultGuildId, channelId, interval }) => {
    const channel = await bot.channels.fetch(channelId);

    if (channel === null) {
      logger.log(
        "scheduled",
        `Failed to send a scheduled message: channel ${channelId} does not exist in guild ${guildId}.`,
      );
      return;
    }
    if (channel.type !== ChannelType.GuildText) {
      logger.log(
        "scheduled",
        `Failed to send a scheduled message: channel ${channelId} in guild ${guildId} is not a text channel.`,
      );
      return;
    }

    scheduleTask("scheduled message", interval, () => {
      if (typeof message === "function") {
        message(channel);
        return;
      }
      channel.send({
        ...message,
        allowedMentions: { users: [], roles: [] },
      });
    });
  });
};
