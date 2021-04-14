import {NestCordParser} from "../nestcord.parser";
import {Message} from "discord.js";
import {NestCord} from "../nestcord.decorator";

@NestCord.Parser("Number")
export class NumberParser implements NestCordParser<number> {

    parse(message: Message, input: string): number | null {
        const parsed = parseInt(input, 10);

        return isNaN(parsed) ? null : parsed;
    }

}