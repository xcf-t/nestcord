import {Module} from "@nestjs/common";
import {ChannelParser} from "./channel.parser";
import {MemberParser} from "./member.parser";
import {NumberParser} from "./number.parser";
import {StringParser} from "./string.parser";
import {UserParser} from "./user.parser";
import {DateParser} from "./date.parser";

@Module({
    providers: [
        ChannelParser,
        MemberParser,
        NumberParser,
        StringParser,
        UserParser,
        DateParser,
    ],
    exports: [
        ChannelParser,
        MemberParser,
        NumberParser,
        StringParser,
        UserParser,
        DateParser,
    ],
})
export class NestCordParserModule {}
