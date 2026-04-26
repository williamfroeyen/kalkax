import { validateExponential, prepExpOutput } from '../core/calcfunctions.js';

const tempinput = document.querySelector("#tempinput");
const peakwaveinput = document.querySelector("#peakwaveinput");
const tempoutput = document.querySelector("#tempoutput");
const peakwaveoutput = document.querySelector("#peakwaveoutput");

const errorDiv = document.querySelector("#errorMessageContainer");
const errorTxt = document.querySelector("#errorMessageText");

const WIEN = 2.898e-3;
const outputDecimals = 5;
const expDecimals = 6;
const noZero = true;

tempinput.addEventListener("input", (e) => handleInput(e, "tempinput"));
peakwaveinput.addEventListener("input", (e) => handleInput(e, "peakwaveinput"));

function handleInput(e, inputType) {
    errorDiv.classList.add("hidden");
    errorTxt.textContent="";

    const inputString = e.target.value;
    const preppedResult = validateExponential(inputString, noZero);

    if (inputType === "tempinput") {
        peakwaveoutput.value = "";
        
    } else if (inputType === "peakwaveinput") {
        tempoutput.value = "";
    };

    if (preppedResult === false) return;
    
    if (preppedResult === "invalidFormat") {
        errorDiv.classList.remove("hidden");
        errorTxt.textContent="Only numbers and scientific e-notation is allowed";
        return;
    };

    if (preppedResult === "isZero") {
        errorDiv.classList.remove("hidden");
        errorTxt.textContent="Verdien 0 er ikke tillatt";
        return;
    };

    calculate(preppedResult, inputType);
};

function calculate(preppedNum, inputType) {
    const calculated = WIEN / preppedNum;
    output(calculated, inputType);
};

function output(calculated, inputType) {
    const finalresult = prepExpOutput(calculated, outputDecimals, expDecimals);

    if (inputType === "tempinput") {
        peakwaveoutput.value = finalresult;
        
    } else if (inputType === "peakwaveinput") {
        tempoutput.value = finalresult;
    };
};