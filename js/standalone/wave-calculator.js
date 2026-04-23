import { prepInput, prepExpOutput } from '../core/calcfunctions.js';

const frequency = document.querySelector("#frequencyInputElement");
const period = document.querySelector("#periodInputElement");
const wavelength = document.querySelector("#wavelengthInputElement");
const wavespeed = document.querySelector("#wavespeedInputElement");
const emOption = document.querySelector("#wavetypeRadioElement1");
const mechOption = document.querySelector("#wavetypeRadioElement2");
const resultsList = document.querySelector("#resultsList");

const plancksconstant = 6.62607e-34;
const outputDecimals = 5;
const expDecimals = 6;

frequency.addEventListener("input", handleInput);
period.addEventListener("input", handleInput);
wavelength.addEventListener("input", handleInput);
wavespeed.addEventListener("input", handleInput);
emOption.addEventListener("input", handleInput);
mechOption.addEventListener("input", handleInput);

function handleInput() {
    errorMessageContainer.classList.add("hidden");
    resultsList.innerHTML = "";

    const elementArray = [frequency, period, wavelength, wavespeed];
    const filteredArray = elementArray.filter(element => isFilled(element));
    const numberArray = prepInput(filteredArray);

    errorCheck(numberArray);
};

function errorCheck(numberArray) {
    const f = isFilled(frequency);
    const p = isFilled(period);
    const ws = isFilled(wavespeed);
    const wl = isFilled(wavelength);
    
    if (numberArray === "invalidInput") {
        displayError("Only numbers and one period is allowed");
        return false;

    } else if (numberArray === "tooManyPeriods") {
        displayError("Only one period is allowed");
        return false;
    };
    
    if (frequency.value === "0" || period.value === "0" || wavelength.value === "0" || wavespeed.value === "0") {
        displayError("The values can't be zero");
        return;
    };

    if (f && p) {
        displayError("Fill either frequency, or period");
        return;
    };

    if (wl && ws && (f || p)) {
        displayError("Fill no more than two fields");
        return;
    };

    if (!f && !p && !(ws && wl)) {
        return;
    };

    const calcType = findCalcType(f, p, ws, wl);
    calculate(calcType, numberArray);
};

function findCalcType(f, p, ws, wl) {
    if (f && !ws && !wl) { return "p-from-f" };
    if (p && !wl && !ws) { return "f-from-p" };

    if (f && ws && !wl) { return "wl-from-f-and-ws" };
    if (f && wl && !ws) { return "ws-from-f-and-wl" };

    if (p && ws && !wl) { return "wl-from-p-and-ws" };
    if (p && wl && !ws) { return "ws-from-p-and-wl" };

    if (ws && wl) { return "f-and-p-from-wl-and-ws" };

};

function isFilled(element) {
    return element.value !== "";
};

function calculate(calcType, numberArray) {
    let f, p, wl, ws = undefined;

    switch (calcType) {
        case "p-from-f":
            [f] = numberArray;
            p = 1 / f;
            break;
        case "f-from-p":
            [p] = numberArray;
            f = 1 / p;
            break;
        case "wl-from-f-and-ws":
            [f, ws] = numberArray;
            p = 1 / f;
            wl = ws / f;
            break;
        case "ws-from-f-and-wl":
            [f, wl] = numberArray;
            p = 1 / f;
            ws = f * wl;
            break;
        case "wl-from-p-and-ws":
            [p, ws] = numberArray;
            f = 1 / p;
            wl = ws / f;
            break;
        case "ws-from-p-and-wl":
            [p, wl] = numberArray;
            f = 1 / p;
            ws = f * wl;
            break;
        case "f-and-p-from-wl-and-ws":
            [wl, ws] = numberArray;
            f = ws / wl;
            p = 1 / f;
            break;
    };
    
    prepareOutput(f, p, wl, ws);
};

function prepareOutput(f, p, wl, ws) {
    let outputItems = [];

    outputItems.push(`Frequency: ${prepExpOutput(f, outputDecimals, expDecimals)} Hz`);
    outputItems.push(`Period: ${prepExpOutput(p, outputDecimals, expDecimals)} s`);

    if (wl !== undefined && ws !== undefined) {
        outputItems.push(`Wavelength: ${prepExpOutput(wl, outputDecimals, expDecimals)} m`);
        outputItems.push(`Wave speed: ${prepExpOutput(ws, outputDecimals, expDecimals)} m/s`);
    };

    if (emOption.checked) {
        let radiationtype;
        const photonenergy = plancksconstant * f;

        if (f >= 3e19) {
            radiationtype = "Gamma radiation";
        } else if (f >= 3e16) {
            radiationtype = "X-rays";
        } else if (f >= 7.5e14) {
            radiationtype = "Ultraviolet radiation";
        } else if (f >= 4e14) {
            radiationtype = "Visible light";
        } else if (f >= 3e11) {
            radiationtype = "Infrared radiation";
        } else if (f >= 3e8) {
            radiationtype = "Microwaves";
        } else {
            radiationtype = "Radio waves";
        };

        outputItems.push(`Photon energy: ${prepExpOutput(photonenergy, outputDecimals, expDecimals)} J`);
        outputItems.push(`Radiation type: ${radiationtype}`);
    };

    renderOutput(outputItems);
};


function renderOutput(outputItems) {
    resultsList.innerHTML = "";
    outputItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        resultsList.appendChild(li);
    });
};

function displayError(message) {
    errorMessageContainer.classList.remove("hidden");
    errorMessageText.textContent = message;
};