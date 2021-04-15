import {NestCordParser} from "../nestcord.parser";
import {Message} from "discord.js";
import {NestCord} from "../nestcord.decorator";

@NestCord.Parser("Boolean")
export class NumberParser implements NestCordParser<boolean> {

    private trueMatcher = /yes|ok|on|enable|true/i;
    private falseMatcher = /no|off|disable|false/i;

    parse(message: Message, input: string): boolean | null {
        if (this.trueMatcher.test(input)) return true;
        if (this.falseMatcher.test(input)) return false;

        return null;
    }

}