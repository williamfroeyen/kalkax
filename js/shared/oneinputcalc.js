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
        errorTxt.textContent="Kun tall, komma og punktum er tillatt.";

    } else if (preppedArray === "tooManyPeriods") {
        errorDiv.classList.remove("hidden");
        errorTxt.textContent="Kun ett komma eller punktum er tillatt.";

    } else if (preppedArray) {
        if (noZero === "true" && preppedArray[0] === 0) {
            errorDiv.classList.remove("hidden");
            errorTxt.textContent="Verdien kan ikke være lik 0.";
            
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