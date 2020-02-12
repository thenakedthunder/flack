import { Channel } from "../Channel"
import moment, { Moment, duration } from "moment"


export default class SecondaryTextHelper {
    static getSecondaryChannelText(channel: Channel) {
        const { messages, timeOfCreation, creatorDisplayName } = channel
        if (messages.length === 0)
            return `Created 
                ${SecondaryTextHelper.displayCreationTime(timeOfCreation)} 
                by ${creatorDisplayName}`
        

        return "TO BE IMPLEMENTED"
    }

    static displayCreationTime(dateOfCreation: Date) {
        const dayOfCreation = SecondaryTextHelper.getDayOfCreation(
            dateOfCreation)
        const timeOfCreation = SecondaryTextHelper.getTimeOfCreation(
            dateOfCreation)

        return "today at xx:xx"
    }

    static getDayOfCreation(dateOfCreation: Date) {
        const currentDate = new Date()
        if (SecondaryTextHelper.creationWasToday(dateOfCreation))
            return "today"

        if (SecondaryTextHelper.creationWasWithinAWeek(dateOfCreation))
            return dateOfCreation.toLocaleString("en-US", { weekday: "long" })

        return SecondaryTextHelper.getFormattedDate(dateOfCreation,
            currentDate.getFullYear())
    }

    static getTimeOfCreation(arg0: any): any {
        throw new Error("Method not implemented.");

        //The following does not work in Typescript, because of this bug with
        //the "hourCycle" prop: https://github.com/microsoft/TypeScript/issues/34399
        //return dateOfCreation.toLocaleString("en-US",
        //    { hour: "2-digit", minute: "2-digit" hourCycle: "h24" })
    }

    static creationWasWithinAWeek(timeOfCreation: Moment): boolean {
        const currentTime = moment()
        if (currentTime.diff(timeOfCreation) < 0) {
            console.log("error thrown")
            throw RangeError("the time of creation can not be later than " +
                "the current time")
        }

        let durationInWeeks = currentTime.diff(timeOfCreation, "weeks")
        return durationInWeeks < 1
    }

    static creationWasToday(timeOfCreation: Moment): boolean {
        const currentTime = moment()
        
        return timeOfCreation.get("year") === currentTime.get("year") &&
            timeOfCreation.get("month") === currentTime.get("month") &&
            timeOfCreation.get("date") === currentTime.get("date")
    }

    static getFormattedDate(dateOfCreation: Moment): string {
        const currentTime = moment()

        if(currentTime.get('year') === dateOfCreation.get('year'))
            return dateOfCreation.format("dddd, MMM Do")
        else
            return dateOfCreation.format("dddd, MMM Do YYYY")
    }
}





