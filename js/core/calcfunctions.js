export function prepOut(num) {
    return new Intl.NumberFormat('en', { 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 2 
    }).format(num);
}

export function prepInput(inputArray, negAllowed) {
    let regexAllowedChars = "";

    if (negAllowed === "true") {
        regexAllowedChars = /^-?[0-9.\s]*$/;
    } else {
        regexAllowedChars = /^[0-9.\s]*$/;
    };

    const allInputsValid = inputArray.every(input => regexAllowedChars.test(input.value));
    if (!allInputsValid) return "invalidInput";

    const cleanedArray = inputArray.map(input => cleanString(input.value));

    const regexMultiplePeriods = /(?:[^.]*\.){2,}/;
    const hasMultiplePeriods = cleanedArray.some(str => regexMultiplePeriods.test(str));
    if (hasMultiplePeriods) return "tooManyPeriods";

    const inputEmpty = inputArray.some(input => input.value.length === 0);
    if (inputEmpty) return false;

    const hasIncompleteInput = cleanedArray.some(str => str === "" || str === ".");
    if (hasIncompleteInput) return false;

    const numberArray = cleanedArray.map(str => Number(str));

    if (numberArray.some(num => isNaN(num))) return false;

    return numberArray;
};

function cleanString(input) {
    const noSpaces = input.replace(/\s+/g, "");
    const toPeriod = noSpaces.replace(/,/g, '.');
    return toPeriod;
};

export function rounding(value, decimals) {
    const factor = 10**decimals;
    const roundedValue = Math.round((value + Number.EPSILON)*factor)/factor;
    const finalString = String(roundedValue);
    return finalString;
};


export function validateExponential(inputString) {
    const regexAllowedFormat = /^[0-9]+(\.[0-9]+)?([eE][-+]?[0-9]+)?$/;

    if (inputString === "") {
        return false;

    } else if (regexAllowedFormat.test(inputString)) {
        const inputNum = Number(inputString);
        return inputNum;

    } else {
       return "invalidFormat";
    };
};

export function prepExpOutput(value, decimals) {
    if (value > 1_000_000 || value < 0.001) {
        return String(value.toExponential(6));
    } else {
        return rounding(value, decimals);
    };
};

