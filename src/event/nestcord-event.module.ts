import {Logger, Module, OnApplicationBootstrap} from "@nestjs/common";
import {DiscoveryModule, DiscoveryService} from "@nestjs-plus/discovery";
import {NESTCORD_EVENT} from "../constants";
import {NestCordEvent} from "./nestcord-event.type";
import {Client, ClientEvents} from "discord.js";

@Module({
    imports: [DiscoveryModule]
})
export class NestCordEventModule implements OnApplicationBootstrap {

    constructor(
        private discover: DiscoveryService,
        private client: Client,
    ) {}

    private logger = new Logger('NestCordEvent');

    async onApplicationBootstrap(): Promise<void> {
        const eventHandlers = await this.discover.providersWithMetaAtKey<keyof ClientEvents>(NESTCORD_EVENT);

        for (const handlerClass of eventHandlers) {
            const handler = handlerClass.discoveredClass.instance as NestCordEvent<any>;

            this.logger.log(`Mapped ${handlerClass.discoveredClass.name} as ${handlerClass.meta}`);

            this.client.on(handlerClass.meta, (...args) => void handler.handle.call(handler, this.client, ...args));
        }
    }

}