import {Global, Logger, Module, OnApplicationBootstrap, Type} from "@nestjs/common";
import {DiscoveryModule, DiscoveryService} from "@nestjs-plus/discovery";
import {NESTCORD_COMMAND, NESTCORD_PARAM} from "../constants";
import {NestCordCommand} from "./nestcord-command.type";
import {NestCordCommandRegistry} from "./nestcord-command.registry";
import {NestCordCommandParser} from "./nestcord-command.parser";

@Global()
@Module({
    imports: [DiscoveryModule],
    providers: [NestCordCommandRegistry, NestCordCommandParser],
    exports: [NestCordCommandRegistry, NestCordCommandParser],
})
export class NestCordCommandModule implements OnApplicationBootstrap {

    constructor(
        private discover: DiscoveryService,
        private registry: NestCordCommandRegistry,
    ) {}

    private logger = new Logger('NestCordCommand');

    async onApplicationBootstrap(): Promise<void> {
        const eventHandlers = await this.discover.providersWithMetaAtKey<string>(NESTCORD_COMMAND);

        for (const handlerClass of eventHandlers) {
            this.logger.log(`Mapped Command ${handlerClass.discoveredClass.name} as ${handlerClass.meta}`);

            this.registry.registerCommand(handlerClass.discoveredClass.injectType as Type<NestCordCommand>);
        }
    }

}