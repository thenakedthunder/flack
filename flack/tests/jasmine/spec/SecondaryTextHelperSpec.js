describe("creationWasWithinAWeek", function () {
    it("should return true when the two dates are from the same day",
        function () {
            result = SecondaryTextHelper.creationWasWithinAWeek(
                new Date(1999, 3, 20), new Date(1999, 3, 20))

            expect(result).toEqual(true)
        }
    );
})