import { NestCordParser } from "../nestcord.parser";
import { Message } from "discord.js";
import 'moment-parseplus';
export declare class DataParser implements NestCordParser<Date> {
    parse(message: Message, input: string): Date | null;
}
