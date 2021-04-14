import {NestCordParser} from "../nestcord.parser";
import {Message, GuildMember} from 'discord.js';
import {NestCord} from "../nestcord.decorator";

@NestCord.Parser("User")
export class MemberParser implements NestCordParser<GuildMember> {

    private matcher = /<@!?(\d{18})>/;

    async parse(message: Message, input: string): Promise<GuildMember> {
        const match = this.matcher.exec(input);

        if (!match) return null;

        const id = match[1];

        return await message.guild.members.fetch(id);
    }

}