import { NestCordCommandMeta } from "./nestcord-command.type";
import { ModuleRef } from "@nestjs/core";
import { Message } from "discord.js";
export declare class NestCordCommandParser {
    private ref;
    constructor(ref: ModuleRef);
    parse(message: Message, meta: NestCordCommandMeta, params: string[]): any[];
}
