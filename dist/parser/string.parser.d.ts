import { Message } from "discord.js";
import { NestCordParser } from "../nestcord.parser";
export declare class StringParser implements NestCordParser<string> {
    parse(message: Message, input: string): string;
}
