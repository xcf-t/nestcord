import {Injectable} from "@nestjs/common";
import {NestCordCommandMeta} from "./nestcord-command.type";
import {ModuleRef} from "@nestjs/core";
import {Message} from "discord.js";

@Injectable()
export class NestCordCommandParser {

    constructor(
        private ref: ModuleRef,
    ) {}

    parse(message: Message, meta: NestCordCommandMeta, params: string[]) {
        let i = 0;

        const mapped = new Map<string, any>();

        mapped.set('message', message);
        mapped.set('client', message.client);
        mapped.set('author', message.author);

        for (const param of (meta.parameters || [])) {
            const parser = this.ref.get(param.parser, { strict: false });
            const text = params[i];

            if (!text)
                if (param.optional)
                    continue;
                else
                    return null;

            const parsed = parser.parse(message, text);

            if (!parsed)
                if (param.optional)
                    continue;
                else
                    return null;

            mapped.set(param.descriptor, parsed);

            i++;
        }

        const result: any[] = [];

        for (const inject of (meta.injector || []))
            result[inject.index] = mapped.get(inject.descriptor);

        return result;
    }

}