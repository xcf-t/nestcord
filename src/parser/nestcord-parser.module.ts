import {Module} from "@nestjs/common";
import {ChannelParser} from "./channel.parser";
import {MemberParser} from "./member.parser";
import {NumberParser} from "./number.parser";
import {StringParser} from "./string.parser";
import {UserParser} from "./user.parser";

@Module({
    providers: [
        ChannelParser,
        MemberParser,
        NumberParser,
        StringParser,
        UserParser,
    ],
    exports: [
        ChannelParser,
        MemberParser,
        NumberParser,
        StringParser,
        UserParser,
    ],
})
export class NestCordParserModule {}
