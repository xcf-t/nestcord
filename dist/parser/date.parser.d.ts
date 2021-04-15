import { NestCordParser } from "../nestcord.parser";
import { Message } from "discord.js";
import 'moment-parseplus';
export declare class DateParser implements NestCordParser<Date> {
    parse(message: Message, input: string): Date | null;
}
