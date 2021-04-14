import { NestCordParser } from "../nestcord.parser";
import { Message, GuildMember } from 'discord.js';
export declare class MemberParser implements NestCordParser<GuildMember> {
    private matcher;
    parse(message: Message, input: string): Promise<GuildMember>;
}
