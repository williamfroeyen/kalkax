import { prepInput, rounding } from '../core/calcfunctions.js';

const inputElement1 = document.querySelector("#input1");
const inputElement2 = document.querySelector("#input2");
const inputElement3 = document.querySelector("#input3");
const outputTextElement = document.querySelector("#oneResultText");
const errorDiv = document.querySelector("#errorMessageContainer");
const errorTxt = document.querySelector("#errorMessageText");
const formula = outputTextElement.dataset.formula;
const outputDecimals = outputTextElement.dataset.decimals;
const outputTextPrefix = outputTextElement.dataset.text;
const noZero = outputTextElement.dataset.nozero;
const outputUnit = outputTextElement.dataset.unit;

inputElement1.addEventListener("input", errorCheck);
inputElement2.addEventListener("input", errorCheck);
inputElement3.addEventListener("input", errorCheck);

function errorCheck() {
    outputTextElement.textContent = outputTextPrefix;
    errorDiv.classList.add("hidden");
    errorTxt.textContent="";

    const inputArray = [inputElement1, inputElement2, inputElement3]
    const numberArray = prepInput(inputArray);
    
    if (numberArray === "invalidInput") {
        errorDiv.classList.remove("hidden");
        errorTxt.textContent="Only numbers are allowed.";

    } else if (numberArray === "tooManyPeriods") {
        errorDiv.classList.remove("hidden");
        errorTxt.textContent="Only one period is allowed.";

    } else if (numberArray) {
        const [input1, input2, input3] = numberArray;

        if (noZero === "true" && (input1 === 0 || input2 === 0 || input3 === 0)) {
            errorDiv.classList.remove("hidden");
            errorTxt.textContent="None of the values can be 0.";
            
        } else {
            calculate(numberArray);
        };
    };
};

function calculate(numberArray) {
    const [input1, input2, input3] = numberArray;
    const calculated = Function("input1", "input2", "input3", `return ${formula};`)(input1, input2, input3);
    const finalString = `${outputTextPrefix} ${rounding(calculated, outputDecimals)} ${outputUnit}`
    outputTextElement.textContent = finalString;
};