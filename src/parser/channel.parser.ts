import { GuildChannel, Message } from "discord.js";
import {NestCordParser} from "../nestcord.parser";
import {NestCord} from "../nestcord.decorator";

@NestCord.Parser("Channel")
export class ChannelParser implements NestCordParser<GuildChannel> {

    private matcher = /<#(\d{18})>/;

    parse(message: Message, input: string): GuildChannel {
        const match = this.matcher.exec(input);

        if (!match) return null;

        const id = match[1];

        return message.guild.channels.resolve(id);
    }

}