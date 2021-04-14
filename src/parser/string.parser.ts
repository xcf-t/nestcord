import { Message } from "discord.js";
import {NestCordParser} from "../nestcord.parser";
import {NestCord} from "../nestcord.decorator";

@NestCord.Parser("Text")
export class StringParser implements NestCordParser<string> {

    parse(message: Message, input: string): string {
        return input;
    }

}