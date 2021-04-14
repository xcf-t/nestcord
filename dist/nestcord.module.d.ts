import { DynamicModule, Provider } from "@nestjs/common";
import { NestCordOptions } from "./nestcord.options";
export declare class NestCordModule {
    static forRoot(options: NestCordOptions): DynamicModule;
    static createConfig(options: NestCordOptions): Provider;
    static createClient(): Provider;
    static createClientLogin(): Provider;
}
