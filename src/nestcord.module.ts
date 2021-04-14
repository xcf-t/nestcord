import {DynamicModule, Module, Provider} from "@nestjs/common";
import {NestCordOptions} from "./nestcord.options";
import {NESTCORD_LOGIN, NESTCORD_CONFIG} from "./constants";
import {Client} from 'discord.js';
import {NestCordEventModule} from "./event/nestcord-event.module";
import {NestCordCommandModule} from "./command/nestcord-command.module";
import {NestCordParserModule} from "./parser/nestcord-parser.module";

@Module({})
export class NestCordModule {

    public static forRoot(options: NestCordOptions): DynamicModule {
        const providers = [
            NestCordModule.createClient(),
            NestCordModule.createClientLogin(),
            NestCordModule.createConfig(options),
        ];

        return {
            imports: [NestCordEventModule, NestCordCommandModule, NestCordParserModule],
            module: NestCordModule,
            providers,
            exports: providers,
            global: true,
        }
    }

    public static createConfig(options: NestCordOptions): Provider {
        return {
            provide: NESTCORD_CONFIG,
            useValue: options,
        }
    }

    public static createClient(): Provider {
        return {
            provide: Client,
            inject: [NESTCORD_CONFIG],
            useFactory: (config: NestCordOptions) => new Client(config),
        }
    }

    public static createClientLogin(): Provider {
        return {
            provide: NESTCORD_LOGIN,
            inject: [NESTCORD_CONFIG, Client],
            useFactory: (config: NestCordOptions, client: Client) => client.login(config.token),
        }
    }

}