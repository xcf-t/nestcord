import { GuildChannel, Message } from "discord.js";
import { NestCordParser } from "../nestcord.parser";
export declare class ChannelParser implements NestCordParser<GuildChannel> {
    private matcher;
    parse(message: Message, input: string): GuildChannel;
}
