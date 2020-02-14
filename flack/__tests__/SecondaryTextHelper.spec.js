import SecondaryTextHelper from "../src/ChannelListPanel/SecondaryTextHelper"
import moment, { Moment } from "moment"


// NOTE: getSecondaryChannelText() cannot be UNIT tested because of 
// dependencies on the backend

// Comment copied from SecondaryTextHelper.tsx:
// IMPORTANT!!! The functions that check the dates only (e.g. they do not check
// for exact times) should use the moment().startOf('day') function. This sets
// the hours, minutes, seconds and milliseconds to zero. This way, for example,
// two "timestamps", being one day apart, show that the difference between them
// is exactly 1 day, which is correct if you only want to check that something 
// was yesterday or not.


//for validating the results which should have the name of weekdays in them
const dayNamesArray = ["Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday", "Sunday"]


describe("creationWasWithinAWeek", () => {
    it("should return true when the current date and the creation date are from the same day",
        () => {
            const currentDate = moment().startOf('day')
            const result = SecondaryTextHelper.creationWasWithinAWeek(
                currentDate)

            expect(result).toEqual(true)
        }
    )

    it("should return true when the current date and the creation date are 6 days apart",
        () => {
            let creationDate = moment().startOf('day').subtract(6, 'days')
            const result = SecondaryTextHelper.creationWasWithinAWeek(
                creationDate)

            expect(result).toEqual(true)
        }
    )

    it("should return false when the current date and the creation date are 7 days apart",
        () => {
            // unless this test is run promptly at 23:59, this should result in 
            // a DATE 7 days before the current one.
            const creationDate =
                moment().subtract(167, 'hours').subtract(59, 'minutes')
            const result = SecondaryTextHelper.creationWasWithinAWeek(
                creationDate.startOf('day'))

            expect(result).toEqual(false)
        }
    )

    it("should return false when the current date and the creation date are 7 days apart",
        () => {
            let creationDate = moment().startOf('day').subtract(7, 'days')
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
                    moment().startOf('day').add(1, 'days'))
            }).toThrow(RangeError("the time of creation can not be later " +
                "than the current time"));
        }
    )
}) 

describe("creationWasYesterday", () => {
    it("should return false when the current date and the creation date are on the same day",
        () => {
            const result = SecondaryTextHelper.creationWasYesterday(
                moment().startOf('day'))

            expect(result).toEqual(false)
        }
    )

    it("should return true when the creation date was a day before the current date",
        () => {
            const result = SecondaryTextHelper.creationWasYesterday(
                moment().subtract(1, 'days').startOf('day'))

            expect(result).toEqual(true)
        }
    )

    it("should return false when the creation date was a day after the current date (this case should never happen in the app anyway)",
        () => {
            const result = SecondaryTextHelper.creationWasYesterday(
                moment().add(1, 'days').startOf('day'))

            expect(result).toEqual(false)
        }
    )
}) 

describe("creationWasToday", () => {
    it("should return true when the current date and the creation date are on the same day",
        () => {
            const result = SecondaryTextHelper.creationWasToday(
                moment().startOf('day'))

            expect(result).toEqual(true)
        }
    )

    it("should return false when the current date and the creation date are one day apart",
        () => {
            const result = SecondaryTextHelper.creationWasToday(
                moment().subtract(1, 'days').startOf('day'))

            expect(result).toEqual(false)
        }
    )

    it("should return false when the two dates are one year apart",
        () => {
            const result = SecondaryTextHelper.creationWasToday(
                moment().subtract(1, 'years').startOf('day'))

            expect(result).toEqual(false)
        }
    )
}) 

describe("getFormattedDate", () => {
    it("should return the shorter format when the current date and the creation date are in the same year",
        () => {
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
            const creationTime = moment("2017-12-22 9:07:00.000")
            const result = SecondaryTextHelper.getTimeOfCreation(creationTime)

            expect(result).toEqual("9:07")
        }
    )

    it("should return the creation time in the '24H' format",
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
            const creationDate = moment().startOf('day')
            const result = SecondaryTextHelper.getDayOfCreation(creationDate)

            expect(result).toEqual("today")
        }
    )

    it("should return 'Yesterday' if the creation date was a day before the current date",
        () => {
            const creationDate = moment().subtract(1, 'days').startOf('day')
            const result = SecondaryTextHelper.getDayOfCreation(creationDate)

            expect(result).toEqual("yesterday")
        }
    )

    it("should return the current format without year if the creation date was within a week of the current date",
        () => {
            const creationDate = moment().subtract(6, 'days')
            const result = SecondaryTextHelper.getDayOfCreation(creationDate)
            const expectedResult = creationDate.format("dddd")

            expect(result).toEqual(expectedResult)
            expect(dayNamesArray).toContain(result)
        }
    )

    // WARNING: in the first week of the year this won't test every edge case
    it("should return the current format without year if the creation date was at least a week before the current date",
        () => {
            const creationDate = moment().subtract(7, 'days').startOf('day')
            const result = SecondaryTextHelper.getDayOfCreation(creationDate)

            let expectedResult
            if (creationDate.year() === moment().year())
                expectedResult = creationDate.format("dddd, MMM Do")
            else
                expectedResult = creationDate.format("dddd, MMM Do YYYY")

            expect(result).toEqual(expectedResult)
        }
    )

    it("should return the current format without year if the creation date was a year before the current date",
        () => {
            const creationDate = moment(`2017-12-22`)
            const result = SecondaryTextHelper.getDayOfCreation(creationDate)

            expect(result).toEqual("Friday, Dec 22nd 2017")
        }
    )

})

describe("displayCreationTime", () => {
    it("should return the correct formatted creation time",
        () => {
            const creationMoment = moment().hour(0).minute(2)
            const result =
                SecondaryTextHelper.displayCreationTime(creationMoment)

            expect(result).toEqual("today at 0:02")
        }
    )

    it("should return the correct formatted creation time",
        () => {
            const creationMoment =
                moment().hour(9).minute(35).subtract(1, 'days')
            const result =
                SecondaryTextHelper.displayCreationTime(creationMoment)

            expect(result).toEqual("yesterday at 9:35")
        }
    )

    it("should return the correct formatted creation time",
        () => {
            const creationMoment =
                moment().hour(14).minute(30).subtract(6, 'days')
            const result =
                SecondaryTextHelper.displayCreationTime(creationMoment)
            const [dayPartOfResult, timePartOfResult] = result.split(/ (.+)/)

            expect(dayNamesArray).toContain(dayPartOfResult)
            expect(timePartOfResult).toEqual("at 14:30")
        }
    )

    it("should return the current format without year if the creation date was at least a week before the current date",
        () => {
            const creationTime = moment("2017-12-22 10:02:00.000")
            const result = SecondaryTextHelper.displayCreationTime(creationTime)

            expect(result).toEqual("Friday, Dec 22nd 2017 at 10:02")
        }
    )
})

