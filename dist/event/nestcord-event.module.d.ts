import { OnApplicationBootstrap } from "@nestjs/common";
import { DiscoveryService } from "@nestjs-plus/discovery";
import { Client } from "discord.js";
export declare class NestCordEventModule implements OnApplicationBootstrap {
    private discover;
    private client;
    constructor(discover: DiscoveryService, client: Client);
    private logger;
    onApplicationBootstrap(): Promise<void>;
}
