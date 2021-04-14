import { NestCordParser } from "../nestcord.parser";
import { Message } from "discord.js";
export declare class NumberParser implements NestCordParser<number> {
    parse(message: Message, input: string): number | null;
}
