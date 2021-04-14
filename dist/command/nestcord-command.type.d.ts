import { InjectDescriptor, ParamDescriptor } from "../nestcord.decorator";
export interface NestCordCommand {
    execute(...args: any[]): any;
}
export interface NestCordCommandMeta {
    name: string;
    description?: string;
    instance: NestCordCommand;
    injector: InjectDescriptor[];
    parameters: ParamDescriptor[];
}
