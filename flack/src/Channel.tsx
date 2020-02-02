export class Channel {
    channelName: string
    timeOfCreation: Date
    messages: string[]
    participants: string[]

    constructor(channelName: string, messages: string[],
        participants: string[])
    {
        this.channelName = channelName;
        this.timeOfCreation = new Date()
        this.messages = messages;
        this.participants = participants;
    }
}
