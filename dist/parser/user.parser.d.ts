import { Message, User } from "discord.js";
import { NestCordParser } from "../nestcord.parser";
export declare class UserParser implements NestCordParser<User> {
    private matcher;
    parse(message: Message, input: string): Promise<User>;
}
