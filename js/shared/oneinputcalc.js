import { prepInput, rounding } from '../core/calcfunctions.js';

const inputElement = document.querySelector("#input1");
const outputElement = document.querySelector("#output1");
const errorDiv = document.querySelector("#errorMessageContainer");
const errorTxt = document.querySelector("#errorMessageText");
const formula = inputElement.dataset.formula;
const outputDecimals = inputElement.dataset.decimals;
const noZero = inputElement.dataset.nozero;
const negAllowed = inputElement.dataset.neg;

inputElement.addEventListener("input", (e) => {
    outputElement.value = "";
    errorDiv.classList.add("hidden");
    errorTxt.textContent="";

    const inputArray = [e.target];
    const preppedArray = prepInput(inputArray, negAllowed);

    if (preppedArray === "invalidInput") {
        errorDiv.classList.remove("hidden");
        errorTxt.textContent="Only numbers are allowed.";

    } else if (preppedArray === "tooManyPeriods") {
        errorDiv.classList.remove("hidden");
        errorTxt.textContent="Only one period is allowed.";

    } else if (preppedArray) {
        if (noZero === "true" && preppedArray[0] === 0) {
            errorDiv.classList.remove("hidden");
            errorTxt.textContent="The value can not be 0.";
            
        } else {
            calculate(preppedArray[0]);
        };
    };
});

function calculate(preppedNum) {
    const calculated = Function("x", `return ${formula}`)(preppedNum);
    const finalString = rounding(calculated, outputDecimals);
    outputElement.value = finalString;
};