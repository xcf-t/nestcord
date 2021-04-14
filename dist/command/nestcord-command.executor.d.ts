import { Client, Message } from "discord.js";
import { NestCordEvent } from "../event/nestcord-event.type";
import { NestCordCommandRegistry } from "./nestcord-command.registry";
import { NestCordCommandParser } from "./nestcord-command.parser";
export declare class NestcordCommandExecutor implements NestCordEvent<'message'> {
    private registry;
    private parser;
    constructor(registry: NestCordCommandRegistry, parser: NestCordCommandParser);
    private prefix;
    handle(client: Client, message: Message): void;
}
