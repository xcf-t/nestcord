import {SetMetadata, Type} from "@nestjs/common";
import {
    NESTCORD_ALIAS, NESTCORD_CHILDREN,
    NESTCORD_COMMAND, NESTCORD_COMMAND_REGISTER,
    NESTCORD_EVENT,
    NESTCORD_INJECT,
    NESTCORD_PARAM, NESTCORD_PARSER_NAME, NESTCORD_PERMISSION,
} from "./constants";
import {NestCordParser} from "./nestcord.parser";
import {NestCordCommand} from "./command/nestcord-command.type";
import {Permissions} from "discord.js";

export interface InjectDescriptor {
    descriptor: string;
    index: number;
}

export interface ParamDescriptor {
    name: string;
    parser: Type<NestCordParser<any>>;
    optional: boolean;
    descriptor: string;
}

export const NestCord = {
    Event: (name: string) => SetMetadata(NESTCORD_EVENT, name),
    Command: () => SetMetadata(NESTCORD_COMMAND_REGISTER, true),
    CommandName: (name: string) => SetMetadata(NESTCORD_COMMAND, name),
    Inject: (descriptor: string): ParameterDecorator => (target, propertyKey, parameterIndex) => {
        let meta: InjectDescriptor[] = [];
        if (Reflect.hasMetadata(NESTCORD_INJECT, target, propertyKey))
            meta = Reflect.getMetadata(NESTCORD_INJECT, target, propertyKey);

        meta.push({
            index: parameterIndex,
            descriptor,
        });

        Reflect.defineMetadata(NESTCORD_INJECT, meta, target, propertyKey);
    },
    Alias: (...alias: string[]) => SetMetadata(NESTCORD_ALIAS, alias),
    Children: (...children: Array<Type<NestCordCommand>>) => SetMetadata(NESTCORD_CHILDREN, children),
    Param: (index: number, descriptor: string, parser: Type<NestCordParser<any>>, name?: string, optional: boolean = false): ClassDecorator => target => {
        let meta: ParamDescriptor[] = [];
        if (Reflect.hasMetadata(NESTCORD_PARAM, target))
            meta = Reflect.getMetadata(NESTCORD_PARAM, target);

        meta[index] = {
            descriptor,
            parser,
            optional,
            name: name || descriptor,
        };

        Reflect.defineMetadata(NESTCORD_PARAM, meta, target);
    },
    Parser: (name: string) => SetMetadata(NESTCORD_PARSER_NAME, name),
    Permissions: (permissions: number) => SetMetadata(NESTCORD_PERMISSION, permissions),
};