import { prepInput, round } from '../core/calcfunctions.js';
import { formulaTable } from '../core/formulas.js';

const inputElement = document.querySelector("#input1");
const outputElement = document.querySelector("#output1");
const errorDiv = document.querySelector("#errorMessageContainer");
const errorTxt = document.querySelector("#errorMessageText");
const calcType = inputElement.dataset.calctype;
const config = formulaTable[calcType];

inputElement.addEventListener("input", (e) => {
    outputElement.value = "";
    errorDiv.classList.add("hidden");
    errorTxt.textContent="";

    const inputArray = [e.target];
    const preppedArray = prepInput(inputArray, config.neg);

    if (preppedArray === "invalidInput") {
        errorDiv.classList.remove("hidden");
        errorTxt.textContent="Only numbers are allowed";

    } else if (preppedArray === "tooManyPeriods") {
        errorDiv.classList.remove("hidden");
        errorTxt.textContent="Only one period is allowed";

    } else if (preppedArray) {
        if (config.noZero === true && preppedArray[0] === 0) {
            errorDiv.classList.remove("hidden");
            errorTxt.textContent="The value can't be zero";
            
        } else {
            calculate(preppedArray[0]);
        };
    };
});

function calculate(preppedNum) {
    const calculated =  config.formula(preppedNum); 
    const finalString = round(calculated, config.decimals);
    outputElement.value = finalString;
};