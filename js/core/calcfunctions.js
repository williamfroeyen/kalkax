export function prepInput(inputArray, negAllowed) {
    let regexAllowedChars = "";

    if (negAllowed === true) {
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

export function prepDatasetInput(dataset) {
    const datasetNoSpace = dataset.replace(/\s+/g, "");
    const allowedChars = /^[0-9.,]+$/;
    const isCharsAllowed = allowedChars.test(datasetNoSpace);

    if (dataset === "") {
        return false;
    } else if (isCharsAllowed === false) {
        return "invalidInput";
    };

    const datasetArray = datasetNoSpace.split(",");
    const datasetNoEmptyStrings = datasetArray.filter(Boolean);
    const datasetNumbers = datasetNoEmptyStrings.map(Number);

    if (datasetNumbers.length === 0) {
        return "noNumbers";
    };

    if (datasetNumbers.some(n => Number.isNaN(n))) {
        return "invalidFormat"
    };

    return datasetNumbers;
};

function cleanString(input) {
    const noSpaces = input.replace(/\s+/g, "");
    const toPeriod = noSpaces.replace(/,/g, '.');
    return toPeriod;
};

export function validateExponential(inputString) {
    const regexAllowedFormat = /^[0-9]+(\.[0-9]+)?([eE][-+]?[0-9]+)?$/;

    if (inputString === "") {
        return false;

    } else if (regexAllowedFormat.test(inputString)) {
        const preppedNum = Number(inputString);
        return preppedNum;

    } else {
       return "invalidFormat";
    };
};

export function round(value, decimals) {
    const numAbs = Math.abs(value);

    if (numAbs === 0) {
        return "0";
    };
    
    if ((numAbs > 10**12 || numAbs < 10**(-decimals) || numAbs < 10**(-4))) {
        return String(value.toExponential(6));
    };

    return prepOut(value, decimals);
};

export function prepExpOutput(value, decimals, expDecimals) {
    const numAbs = Math.abs(value);

    if (numAbs === 0) {
        return "0";
    };
    
    if ((numAbs > 10**9 || numAbs < 10**(-decimals) || numAbs < 10**(-3))) {
        return String(value.toExponential(expDecimals));
    };

    return prepOut(value, decimals);
};

export function prepOut(value, decimals) {
    let correctedValue;
    if (value >= 0) {
        correctedValue = value + Number.EPSILON;
    } else {
        correctedValue = value - Number.EPSILON;
    };

    const formatter = new Intl.NumberFormat('en', { 
        minimumFractionDigits: 0, 
        maximumFractionDigits: decimals
    });

    const formattedNum = formatter.format(correctedValue);
    return String(formattedNum);
};