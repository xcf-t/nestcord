import { Message } from "discord.js";

export interface NestCordParser<T> {

    parse(message: Message, input: string): T | null | Promise<T | null>;

}