import {Client, Message, MessageEmbed} from "discord.js";
import { NestCordEvent } from "../event/nestcord-event.type";
import {NestCord} from "../nestcord.decorator";
import {Injectable} from "@nestjs/common";
import {NestCordCommandRegistry} from "./nestcord-command.registry";
import {NestCordCommandMeta} from "./nestcord-command.type";
import {NestCordCommandParser} from "./nestcord-command.parser";
import {NESTCORD_PARSER_NAME, NESTCORD_PERMISSION} from "../constants";

@Injectable()
@NestCord.Event('message')
export class NestcordCommandExecutor implements NestCordEvent<'message'> {

    constructor(
        private registry: NestCordCommandRegistry,
        private parser: NestCordCommandParser,
    ) {}

    private prefix = '!';

    async handle(client: Client, message: Message) {
        if (!message.guild) return;
        if (!message.content.startsWith(this.prefix)) return;

        const input = message.content.substring(this.prefix.length);

        const matcher = /[^\s"]+|"([^"]*)"/gi;
        const args: string[] = [];

        let match: RegExpExecArray;
        do {
            match = matcher.exec(input);
            if (match != null)
                args.push(match[1] ? match[1] : match[0]);
        } while (match != null);

        const command = [...args];

        let last: NestCordCommandMeta | undefined;
        for (let i = 0; i < args.length; i++) {
            const data = command.map(x => x.toLowerCase())

            const handler = this.registry.getCommand(data);

            if (handler) {
                last = handler;
                break;
            }

            command.pop();
        }

        if (!last) return;

        const perms = Reflect.getMetadata(NESTCORD_PERMISSION, last.instance.constructor);

        if (perms && !message.member.hasPermission(perms, { checkAdmin: true, checkOwner: true })) return;

        const params = args.slice(command.length);

        const injectionMapper = this.parser.parse(message, last, params);

        if (!injectionMapper)
            return this.sendHelpEmbed(message, command, last);

        const result = await last.instance.execute.call(last.instance, ...injectionMapper);

        if (result === false)
            return this.sendHelpEmbed(message, command, last);
    }


    sendHelpEmbed(message: Message, command: string[], executor: NestCordCommandMeta) {
        const embed = new MessageEmbed();

        let description = '';

        for (const param of executor.parameters) {
            if (param.optional)
                description += `(${Reflect.getMetadata(NESTCORD_PARSER_NAME, param.parser)} ${param.name}) `;
            else
                description += `[${Reflect.getMetadata(NESTCORD_PARSER_NAME, param.parser)} ${param.name}] `;
        }

        embed.setDescription(description);
        embed.setTitle(this.prefix + command.map(x => x.toLowerCase()).join(" "));

        message.channel.send(embed).then(() => null);
    }
}