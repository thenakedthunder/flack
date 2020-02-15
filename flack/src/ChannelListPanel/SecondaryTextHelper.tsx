import { Channel } from "../Channel"
import moment, { Moment } from "moment"

// TODO: CHECK FOR "PURENESS" AND MUTABILITY!!!


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

        if (messages.length === 0)
            return `Created ` + 
                `${SecondaryTextHelper.displayCreationTime(timeOfCreation)} ` +
                `by ${creatorDisplayName}`
        

        return "TO BE IMPLEMENTED"
    }

    static displayCreationTime(creationMoment: Moment) {
        const dayOfCreation = SecondaryTextHelper.getDayOfCreation(
            moment(creationMoment))         // damn you, mutability!!! :)
        const timeOfCreation = SecondaryTextHelper.getTimeOfCreation(
            creationMoment)

        return `${dayOfCreation} at ${timeOfCreation}`
    }

    static getDayOfCreation(timeOfCreation: Moment) {
        // for date calculations, we are only interested in the date (having 
        // the time part would throw off calculations) WARNING: mutability!!!
        timeOfCreation.startOf('day')

        if (SecondaryTextHelper.creationWasToday(timeOfCreation))
            return "today"

        if (SecondaryTextHelper.creationWasYesterday(timeOfCreation))
            return "yesterday"

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
            throw RangeError("the time of creation can not be later than " +
                "the current time")
        }

        const durationInWeeks = currentTime.diff(timeOfCreation, "weeks")
        return durationInWeeks < 1
    }

    static creationWasToday(timeOfCreation: Moment): boolean {
        const currentTime = moment().startOf('day')

        return currentTime.diff(timeOfCreation) === 0
    }

    static creationWasYesterday(timeOfCreation: Moment): boolean {
        const currentTime = moment().startOf('day')

        return currentTime.diff(timeOfCreation, 'days') === 1
    }

    static getFormattedDate(dateOfCreation: Moment): string {
        const currentTime = moment()

        if(currentTime.year() === dateOfCreation.year())
            return dateOfCreation.format("dddd, MMM Do")
        else
            return dateOfCreation.format("dddd, MMM Do YYYY")
    }
}





