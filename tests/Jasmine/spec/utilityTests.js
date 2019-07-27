/// FILE: utilityTests.js

/// Unit tests to test the functions of utility.js

describe("the _getErrorMessage function", () => {
    it("must return the string 'Please provide a display name' when an " +
        "element with the 'displayname-required' id is passed)",
        () => {
            let element = document.createElement("DIV");
            element.id = "displayname-required";

            let result = _getErrorMessageFrom(element);
            expect(result).toBe("Please provide a display name.");
        });

    it("must return the string 'Please provide a channel name' when an " +
        "element with the 'channelname-required' id is passed)",
        () => {
            let element = document.createElement("DIV");
            element.id = "channelname-required";

            let result = _getErrorMessageFrom(element);
            expect(result).toBe("Please provide a channel name.");
        });
});


describe("the _isErrorMessageAlreadyThere function", () => {
    it("must return true when an element with a child with the class " +
        "'error-message' is passed",
        () => {
            let element = document.createElement("DIV");
            let child = document.createElement("DIV");
            child.classList.add("error-message");
            element.appendChild(child);

            let result = _isErrorMessageAlreadyThere(element);
            expect(result).toBe(true);
        });

    it("must return false when an element withOUT a child with the class " +
        "'error-message' is passed",
        () => {
            let element = document.createElement("DIV");

            let result = _isErrorMessageAlreadyThere(element);
            expect(result).toBe(false);
        });
});


describe("The _addErrorMessage function", () => {
    it("should create a div with an error message and append it to the page",
        () => {
            let element = document.createElement("DIV");
            _addErrorMessage("Error", element);

            let errorMessageDiv = element.querySelector(".error-message");
            expect(!!errorMessageDiv).toBe(true);
        });

    it("was not called, so no error message should appear.",
        () => {
            let element = document.createElement("DIV");

            let errorMessageDiv = element.querySelector(".error-message");
            expect(!!errorMessageDiv).toBe(false);
        });
});