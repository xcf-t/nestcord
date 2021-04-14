import { Client, ClientEvents } from "discord.js";
export interface NestCordEvent<K extends keyof ClientEvents> {
    handle(client: Client, ...args: ClientEvents[K]): any;
}
