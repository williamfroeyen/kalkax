import { validateExponential, prepExpOutput } from '../core/calcfunctions.js';

const tempinput = document.querySelector("#tempinput");
const exitinput = document.querySelector("#exitinput");
const tempoutput = document.querySelector("#tempoutput");
const exitoutput = document.querySelector("#exitoutput");

const errorDiv = document.querySelector("#errorMessageContainer");
const errorTxt = document.querySelector("#errorMessageText");

const STEFAN = 5.670374419e-8;
const outputDecimals = 5;
const expDecimals = 6;

tempinput.addEventListener("input", (e) => handleInput(e, "tempinput"));
exitinput.addEventListener("input", (e) => handleInput(e, "exitinput"));

function handleInput(e, inputType) {
    errorDiv.classList.add("hidden");
    errorTxt.textContent="";

    const inputString = e.target.value;
    const preppedResult = validateExponential(inputString);

    if (inputType === "tempinput") {
        exitoutput.value = "";
        
    } else if (inputType === "exitinput") {
        tempoutput.value = "";
    };

    if (preppedResult === false) return;
    
    if (preppedResult === "invalidFormat") {
        errorDiv.classList.remove("hidden");
        errorTxt.textContent="Only numbers and scientific e-notation is allowed";
        return;
    };

    calculate(preppedResult, inputType);
};

function calculate(preppedNum, inputType) {
    let calculated;

    if (inputType === "tempinput") {
        calculated = preppedNum**4 * STEFAN;
    } else if (inputType === "exitinput") {
        calculated = (preppedNum / STEFAN)**0.25;  
    };
    output(calculated, inputType);

};

function output(calculated, inputType) {
    const finalresult = prepExpOutput(calculated, outputDecimals, expDecimals);

    if (inputType === "tempinput") {
        exitoutput.value = finalresult;
        
    } else if (inputType === "exitinput") {
        tempoutput.value = finalresult;
    };
};