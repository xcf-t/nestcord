import {InjectDescriptor, ParamDescriptor} from "../nestcord.decorator";
import {NestCordParser} from "../nestcord.parser";

export interface NestCordCommand {

    execute(...args: any[]);

}

export interface NestCordCommandMeta {
    name: string;
    description?: string;
    instance: NestCordCommand,
    injector: InjectDescriptor[],
    parameters: ParamDescriptor[],
}