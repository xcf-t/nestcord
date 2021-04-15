import { NestCordParser } from "../nestcord.parser";
import { Message } from "discord.js";
export declare class NumberParser implements NestCordParser<boolean> {
    private trueMatcher;
    private falseMatcher;
    parse(message: Message, input: string): boolean | null;
}
