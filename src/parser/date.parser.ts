import {NestCord} from "../nestcord.decorator";
import {NestCordParser} from "../nestcord.parser";
import {Message} from "discord.js";
import * as moment from 'moment';
import 'moment-parseplus';

@NestCord.Parser('Date')
export class DateParser implements NestCordParser<Date> {

    parse(message: Message, input: string): Date | null {
        moment.locale(message.author.locale || 'en');
        const date = moment(input, false);

        if (!date.isValid()) return null;

        return date.toDate();
    }

}