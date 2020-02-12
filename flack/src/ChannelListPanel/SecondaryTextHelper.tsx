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

    static displayCreationTime(creationMoment: Moment) {
        const dayOfCreation = SecondaryTextHelper.getDayOfCreation(
            creationMoment)
        const timeOfCreation = SecondaryTextHelper.getTimeOfCreation(
            creationMoment)

        return "today at xx:xx"
    }

    static getDayOfCreation(timeOfCreation: Moment) {
        const currentDate = moment()
        if (SecondaryTextHelper.creationWasToday(timeOfCreation))
            return "Today"

        if (SecondaryTextHelper.creationWasYesterday(timeOfCreation))
            return "Yesterday"

        if (SecondaryTextHelper.creationWasWithinAWeek(timeOfCreation))
            return timeOfCreation.format("dddd")

        return SecondaryTextHelper.getFormattedDate(timeOfCreation)
    }

    static getTimeOfCreation(creationMoment: Moment): string {
        return creationMoment.format("H:mm")
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

    static creationWasYesterday(timeOfCreation: Moment): boolean {
        const currentTime = moment()
        const yesterday = currentTime.subtract(1, "days")

        return timeOfCreation.get("year") === currentTime.get("year") &&
            timeOfCreation.get("month") === yesterday.get("month") &&
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





