import { Channel } from "../Channel";
import { Data } from "popper.js";


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
        if (SecondaryTextHelper.creationWasToday(dateOfCreation, currentDate))
            return "today"

        if (SecondaryTextHelper.creationWasWithinAWeek(dateOfCreation, currentDate))
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

    static creationWasWithinAWeek(creationDate: Date, currentDate: Date) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24
        const utcCurrent = currentDate.getUTCMilliseconds()
        const utcCreation = creationDate.getUTCMilliseconds()

        return Math.floor((utcCurrent - utcCreation) / _MS_PER_DAY) < 7
    }

    static creationWasToday(dateOfCreation: Date, currentDate: Date) {
        return dateOfCreation.getFullYear === currentDate.getFullYear &&
            dateOfCreation.getMonth === currentDate.getMonth &&
            dateOfCreation.getDate === currentDate.getDate
    }

    static getFormattedDate(dateOfCreation: Date, currentYear: number) {
        let result = dateOfCreation.toLocaleString("en-US",
            { month: "short", day: "long" })

        if (dateOfCreation.getFullYear() !== currentYear)
            result += ` ${dateOfCreation.getFullYear()}`
    }
}





