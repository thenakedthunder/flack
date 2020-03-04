import { Channel } from "../Channel"
import moment, { Moment } from "moment"



// IMPORTANT!!! The functions that check the dates only (e.g. they do not check
// for exact times) should use the moment().startOf('day') function. This sets
// the hours, minutes, seconds and milliseconds to zero. This way, for example,
// two "timestamps", being one day apart, show that the difference between them
// is exactly 1 day, which is correct if you only want to check that something
// was yesterday or not.


export default class SecondaryTextHelper {
    static getSecondaryChannelText(channel: Channel) {
        const { messages, creatorDisplayName } = channel
        const timeOfCreation = moment(channel.timeOfCreation)

        if (messages.length === 0) {
            return `Created` +
                ` ${SecondaryTextHelper.displayCreationTime(timeOfCreation)}` +
                ` by ${creatorDisplayName}`
        }
        
        // for when messages can be transmitted
        throw Error("not implemented")
    }

    static displayCreationTime(creationMoment: Moment) {
        const dayOfCreation = SecondaryTextHelper.getDayOfCreation(
            creationMoment)         
        const timeOfCreation = SecondaryTextHelper.getTimeOfCreation(
            creationMoment)

        return `${dayOfCreation} at ${timeOfCreation}`
    }

    static getDayOfCreation(timeOfCreation: Moment) {
        // for date calculations, we are only interested in the date (having 
        // the time part would throw off calculations) WARNING: mutability!!!
        const creationDay = moment(timeOfCreation).startOf('day')

        if (SecondaryTextHelper.creationWasToday(creationDay))
            return "today"

        if (SecondaryTextHelper.creationWasYesterday(creationDay))
            return "yesterday"

        if (SecondaryTextHelper.creationWasWithinAWeek(creationDay))
            return "on " + creationDay.format("dddd")

        return SecondaryTextHelper.getFormattedDate(creationDay)
    }

    static getTimeOfCreation(creationMoment: Moment): string {
        return creationMoment.format("H:mm")
    }

    static creationWasToday(creationDate: Moment): boolean {
        const currentTime = moment().startOf('day')

        return currentTime.diff(creationDate) === 0
    }

    static creationWasYesterday(creationDate: Moment): boolean {
        const currentTime = moment().startOf('day')

        return currentTime.diff(creationDate, 'days') === 1
    }

    static creationWasWithinAWeek(creationDate: Moment): boolean {
        const currentTime = moment()
        if (currentTime.diff(creationDate) < 0) {
            throw RangeError("the time of creation can not be later than " +
                "the current time")
        }

        const durationInWeeks = currentTime.diff(creationDate, "weeks")
        return durationInWeeks < 1
    }

    static getFormattedDate(creationDate: Moment): string {
        const currentTime = moment()

        if (currentTime.year() === creationDate.year())
            return "on " + creationDate.format("dddd, MMM Do")
        else
            return "on " + creationDate.format("dddd, MMM Do YYYY")
    }
}





