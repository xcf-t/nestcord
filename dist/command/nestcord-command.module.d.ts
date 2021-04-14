import { OnApplicationBootstrap } from "@nestjs/common";
import { DiscoveryService } from "@nestjs-plus/discovery";
import { NestCordCommandRegistry } from "./nestcord-command.registry";
export declare class NestCordCommandModule implements OnApplicationBootstrap {
    private discover;
    private registry;
    constructor(discover: DiscoveryService, registry: NestCordCommandRegistry);
    private logger;
    onApplicationBootstrap(): Promise<void>;
}
