import {Message, User } from "discord.js";
import {NestCordParser} from "../nestcord.parser";
import {NestCord} from "../nestcord.decorator";

@NestCord.Parser("Text")
export class UserParser implements NestCordParser<User> {

    private matcher = /<@!?(\d{18})>/;

    async parse(message: Message, input: string): Promise<User> {
        const match = this.matcher.exec(input);

        if (!match) return null;

        const id = match[1];

        return await message.client.users.fetch(id);
    }

}