import { prepInput, rounding } from '../core/calcfunctions.js';

const inputElement1 = document.querySelector("#input1");
const inputElement2 = document.querySelector("#input2");
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

function errorCheck() {
    outputTextElement.textContent = outputTextPrefix;
    errorDiv.classList.add("hidden");
    errorTxt.textContent="";

    const inputArray = [inputElement1, inputElement2]
    const numberArray = prepInput(inputArray);
    
    if (numberArray === "invalidInput") {
        errorDiv.classList.remove("hidden");
        errorTxt.textContent="Kun tall, komma og punktum er tillatt.";

    } else if (numberArray === "tooManyPeriods") {
        errorDiv.classList.remove("hidden");
        errorTxt.textContent="Kun ett komma eller punktum er tillatt.";

    } else if (numberArray) {
        const [input1, input2] = numberArray;

        if (noZero === "true" && (input1 === 0 || input2 === 0)) {
            errorDiv.classList.remove("hidden");
            errorTxt.textContent="Ingen av verdiene kan være lik 0.";
            
        } else {
            calculate(numberArray);
        };
    };
};

function calculate(numberArray) {
    const [input1, input2] = numberArray;
    const calculated = Function("input1", "input2", `return ${formula};`)(input1, input2);
    const finalString = `${outputTextPrefix} ${rounding(calculated, outputDecimals)} ${outputUnit}`
    outputTextElement.textContent = finalString;
};