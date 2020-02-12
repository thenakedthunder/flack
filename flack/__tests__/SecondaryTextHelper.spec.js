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

describe("creationWasYesterday", () => {
    it("should return false when the current date and the creation date are on the same day",
        () => {
            const result = SecondaryTextHelper.creationWasYesterday(moment())

            expect(result).toEqual(false)
        }
    )

    it("should return true when the creation date was a day before the current date",
        () => {
            const result = SecondaryTextHelper.creationWasYesterday(
                moment().subtract(1, 'days'))

            expect(result).toEqual(true)
        }
    )

    it("should return false when the creation date was a day after the current date (this case should never happen in the app anyway)",
        () => {
            const result = SecondaryTextHelper.creationWasYesterday(
                moment().add(1, 'days'))

            expect(result).toEqual(false)
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
    it("should return the shorter format when the current date and the creation date are in the same year",
        () => {
            //for validating the first part of the result
            const dayNamesArray = ["Monday", "Tuesday", "Wednesday",
                "Thursday", "Friday", "Saturday", "Sunday"]

            const currentYear = moment().get('year')
            const creationDate = moment(`${currentYear}-02-10`)
            const result = SecondaryTextHelper.getFormattedDate(creationDate)
            const [dayNamePart, datePart] = result.split(/, /)

            expect(dayNamesArray).toContain(dayNamePart)
            expect(datePart).toEqual("Feb 10th")
        }
    )

    it("should return the longer format when the current date and the creation date are not in the same year",
        () => {
            const creationDate = moment(`2017-12-22`)
            const result = SecondaryTextHelper.getFormattedDate(creationDate)
            expect(result).toEqual("Friday, Dec 22nd 2017")
        }
    )
})

describe("getTimeOfCreation", () => {
    it("should return the creation time with the 'zero format' when it was at midnight",
        () => {
            const creationTime = moment("2013-02-08 24:00:00.000")
            const result = SecondaryTextHelper.getTimeOfCreation(creationTime)

            expect(result).toEqual("0:00")
        }
    )

    it("should return the creation time in the correct format (no leading zeroes for hours)",
        () => {
            const creationTime = moment("2017-12-22 9:47:00.000")
            const result = SecondaryTextHelper.getTimeOfCreation(creationTime)

            expect(result).toEqual("9:47")
        }
    )

    it("should return the creation time in the '24H' format when creation was afternoon",
        () => {
            const creationTime = moment("2020-02-10 14:30:00.000")
            const result = SecondaryTextHelper.getTimeOfCreation(creationTime)

            expect(result).toEqual("14:30")
        }
    )
})

describe("getDayOfCreation", () => {
    it("should return 'Today' if the creation date is the same as the current date",
        () => {
            const creationDate = moment()
            const result = SecondaryTextHelper.getDayOfCreation(creationDate)

            expect(result).toEqual("Today")
        }
    )

    it("should return 'Yesterday' if the creation date was a day before the current date",
        () => {
            const creationDate = moment().subtract(1, 'days')
            const result = SecondaryTextHelper.getDayOfCreation(creationDate)

            expect(result).toEqual("Yesterday")
        }
    )

    fit("should return the current format without year if the creation date was within a week of the current date",
        () => {
            const creationDate = moment().subtract(6, 'days')
            const result = SecondaryTextHelper.getDayOfCreation(creationDate)
            const expectedResult = creationDate.format("dddd")

            expect(result).toEqual(expectedResult)
        }
    )

    it("should return the current format without year if the creation date was at least a week before the current date",
        () => {
            const creationDate = moment().subtract(7, 'days')
            const result = SecondaryTextHelper.getDayOfCreation(creationDate)
            const expectedResult = creationDate.format("MMM Do YYYY")

            expect(result).toEqual(expectedResult)
        }
    )

})