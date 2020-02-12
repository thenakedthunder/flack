import SecondaryTextHelper from "../src/ChannelListPanel/SecondaryTextHelper"
import moment, { Moment } from "moment"



describe("creationWasWithinAWeek", () => {
    it("should return true when the current date and the creation date are from the same day",
        () => {
            const currentDate = moment()
            const result = SecondaryTextHelper.creationWasWithinAWeek(
                currentDate)

            expect(result).toEqual(true)
        }
    )

    it("should return true when the current date and the creation date are 6 days apart",
        () => {
            let creationDate = moment().subtract(6, 'days');
            const result = SecondaryTextHelper.creationWasWithinAWeek(
                creationDate)

            expect(result).toEqual(true)
        }
    )

    it("should return false when the current date and the creation date are 7 days apart",
        () => {
            let creationDate = moment().subtract(7, 'days');
            const result = SecondaryTextHelper.creationWasWithinAWeek(
                creationDate)

            expect(result).toEqual(false)
        }
    )

    it("should not accept a creation time later than the current time",
        () => {
            expect(() =>
            {
                SecondaryTextHelper.creationWasWithinAWeek(
                    moment().add(1, 'days'))
            }).toThrow(RangeError("the time of creation can not be later " +
                "than the current time"));
        }
    )
}) 

describe("creationWasToday", () => {
    it("should return true when the current date and the creation date are on the same day",
        () => {
            const result = SecondaryTextHelper.creationWasToday(moment())

            expect(result).toEqual(true)
        }
    )

    it("should return false when the current date and the creation date are one day apart",
        () => {
            const result = SecondaryTextHelper.creationWasToday(
                moment().subtract(1, 'days'))

            expect(result).toEqual(false)
        }
    )

    it("should return false when the two dates are one year apart",
        () => {
            const result = SecondaryTextHelper.creationWasToday(
                moment().subtract(1, 'years'))

            expect(result).toEqual(false)
        }
    )
}) 

describe("getFormattedDate", () => {
    fit("should return the shorter format when the current date and the creation date are in the same year",
        () => {
            const currentYear = moment().get('year')
            const creationDate = moment(`${currentYear}-02-10`)

            const result = SecondaryTextHelper.getFormattedDate(creationDate)
            const regex = RegExp('D+, Feb 10th');
            expect(result).toEqual(regex)
        }
    )

    it("should return the longer format when the current date and the creation date are not in the same year",
        () => {
            let creationDate = moment().subtract(1, 'year');
            let creationDateFormatted = creationDate.format("dddd, MMM Do")

            const result = SecondaryTextHelper.getFormattedDate(creationDate)
            expect(result).toEqual(creationDateFormatted)
        }
    )
})