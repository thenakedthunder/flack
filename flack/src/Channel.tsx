export class Channel {
    channelName: string;
    messages: string[];
    participants: string[];

    constructor(channelName: string, messages: string[],
        participants: string[])
    {
        this.channelName = channelName;
        this.messages = messages;
        this.participants = participants;
    }
}
