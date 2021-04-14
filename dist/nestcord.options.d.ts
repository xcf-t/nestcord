import { ClientOptions } from "discord.js";
export interface NestCordOptions extends ClientOptions {
    token?: string;
}
