import {Injectable, Type} from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import {NestCordCommand, NestCordCommandMeta} from "./nestcord-command.type";
import {
    NESTCORD_ALIAS,
    NESTCORD_CHILDREN,
    NESTCORD_COMMAND,
    NESTCORD_DESCRIPTION,
    NESTCORD_INJECT,
    NESTCORD_PARAM
} from "../constants";
import {inspect} from "util";

@Injectable()
export class NestCordCommandRegistry {

    constructor(
        private ref: ModuleRef,
    ) {}

    public static registry: Map<string, NestCordCommandMeta> = new Map();
    private separator = '\u0000';

    public getRegistry() {
        return NestCordCommandRegistry.registry;
    }

    public register(path: string, executor: Type<NestCordCommand>) {
        const handler: NestCordCommand = this.ref.get(executor, { strict: false });

        const meta: NestCordCommandMeta = {
            name: path,
            instance: handler,
            description: Reflect.getMetadata(NESTCORD_DESCRIPTION, executor),
            injector: Reflect.getMetadata(NESTCORD_INJECT, handler, 'execute'),
            parameters: Reflect.getMetadata(NESTCORD_PARAM, executor),
        };

        NestCordCommandRegistry.registry.set(path.toLowerCase(), meta);
    }

    public getCommand(path: string | string[]): NestCordCommandMeta | null {
        if (Array.isArray(path))
            path = path.join(this.separator);

        if (NestCordCommandRegistry.registry.has(path.toLowerCase()))
            return NestCordCommandRegistry.registry.get(path.toLowerCase());

        return null;
    }

    public registerCommand(executor: Type<NestCordCommand>, paths: string[] = ['']) {
        const name: string = Reflect.getMetadata(NESTCORD_COMMAND, executor);
        const aliases: string[] = Reflect.getMetadata(NESTCORD_ALIAS, executor);
        const children: Array<Type<NestCordCommand>> = Reflect.getMetadata(NESTCORD_CHILDREN, executor);

        for (const path of paths) {
            const appended: string[] = [path + this.separator + name.toLowerCase()];

            if (aliases)
                for (const alias of aliases)
                    appended.push(path + this.separator + alias.toLowerCase());

            for (const path of appended)
                this.register(path.substring(1), executor);

            if (children)
                for (const child of children)
                    this.registerCommand(child, appended);

        }
    }

}