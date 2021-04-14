import { Type } from "@nestjs/common";
import { NestCordParser } from "./nestcord.parser";
import { NestCordCommand } from "./command/nestcord-command.type";
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
export declare const NestCord: {
    Event: (name: string) => import("@nestjs/common").CustomDecorator<string>;
    Command: () => import("@nestjs/common").CustomDecorator<string>;
    CommandName: (name: string) => import("@nestjs/common").CustomDecorator<string>;
    Inject: (descriptor: string) => ParameterDecorator;
    Alias: (...alias: string[]) => import("@nestjs/common").CustomDecorator<string>;
    Children: (...children: Array<Type<NestCordCommand>>) => import("@nestjs/common").CustomDecorator<string>;
    Param: (index: number, descriptor: string, parser: Type<NestCordParser<any>>, name?: string, optional?: boolean) => ClassDecorator;
    Parser: (name: string) => import("@nestjs/common").CustomDecorator<string>;
};
