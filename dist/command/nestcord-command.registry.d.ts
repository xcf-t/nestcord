import { Type } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { NestCordCommand, NestCordCommandMeta } from "./nestcord-command.type";
export declare class NestCordCommandRegistry {
    private ref;
    constructor(ref: ModuleRef);
    static registry: Map<string, NestCordCommandMeta>;
    private separator;
    getRegistry(): Map<string, NestCordCommandMeta>;
    register(path: string, executor: Type<NestCordCommand>): void;
    getCommand(path: string | string[]): NestCordCommandMeta | null;
    registerCommand(executor: Type<NestCordCommand>, paths?: string[]): void;
}
