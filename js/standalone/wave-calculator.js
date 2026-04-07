let outputItems = [];
let wavespeedOutput;
let frequencyOutput;
let wavelengthOutput;
let periodOutput;
let photonenergy;
let radiationtype;
let plancksconstant = 6.62607e-34;

const frequencyInputElement = document.querySelector("#frequencyInputElement");
const periodInputElement = document.querySelector("#periodInputElement");
const wavelengthInputElement = document.querySelector("#wavelengthInputElement");
const wavespeedInputElement = document.querySelector("#wavespeedInputElement");
const electromagneticOption = document.querySelector("#wavetypeRadioElement1");
const mechanicalOption = document.querySelector("#wavetypeRadioElement2");

const resultsList = document.querySelector("#resultsList");

frequencyInputElement.addEventListener("input", updateResult);
periodInputElement.addEventListener("input", updateResult);
wavelengthInputElement.addEventListener("input", updateResult);
wavespeedInputElement.addEventListener("input", updateResult);
electromagneticOption.addEventListener("input", updateResult);
mechanicalOption.addEventListener("input", updateResult);

function updateResult() {
    frequencyOutput = periodOutput = wavelengthOutput = wavespeedOutput = photonenergy = undefined;
    outputItems = [];
    
    const normalizedfrequencyInputElement = frequencyInputElement.value.replace(',', '');
    const normalizedperiodInputElement = periodInputElement.value.replace(',', '');
    const normalizedwavelengthInputElement = wavelengthInputElement.value.replace(',', '');
    const normalizedwavespeedInputElement = wavespeedInputElement.value.replace(',', '');

    let frequencyInput = parseFloat(normalizedfrequencyInputElement);
    let periodInput = parseFloat(normalizedperiodInputElement);
    let wavelengthInput = parseFloat(normalizedwavelengthInputElement);
    let wavespeedInput = parseFloat(normalizedwavespeedInputElement);

    if (isConflict(frequencyInput, periodInput, wavelengthInput, wavespeedInput)) {
        return;
    };

    // PERIOD AND FREQUENCY
    if (!isNaN(frequencyInput) && isNaN(periodInput) && isNaN(wavelengthInput) && isNaN(wavespeedInput)) {
            periodOutput = 1 / frequencyInput;
            frequencyOutput = frequencyInput;
            prepareResult("noerrors", "justfrequencyperiod");
    } else if (isNaN(frequencyInput) && !isNaN(periodInput)) {
        if (isNaN(wavelengthInput) && isNaN(wavespeedInput)) {
            frequencyOutput = 1 / periodInput;
            periodOutput = periodInput;
            prepareResult("noerrors", "justfrequencyperiod");
        } else { // CONVERT PERIOD TO FREQUENCY
            frequencyOutput = 1 / periodInput;
            frequencyInput = frequencyOutput;
        } 
    };

    // WAVE SPEED, WAVELENGTH AND FREQUENCY
    if ((!isNaN(frequencyInput) || !isNaN(periodInput)) && !isNaN(wavelengthInput)) {
        wavespeedOutput = frequencyInput * wavelengthInput;
        frequencyOutput = frequencyInput;
        wavelengthOutput = wavelengthInput;
        periodOutput = 1 / frequencyOutput;
            prepareResult("noerrors", "twoinputs");
    } else if (!isNaN(wavespeedInput) && !isNaN(wavelengthInput)) {
        frequencyOutput = wavespeedInput / wavelengthInput;
        wavespeedOutput = wavespeedInput;
        wavelengthOutput = wavelengthInput;
        periodOutput = 1 / frequencyOutput;
            prepareResult("noerrors", "twoinputs");
    } else if (!isNaN(wavespeedInput) && (!isNaN(frequencyInput) || !isNaN(periodInput))) {
        wavelengthOutput = wavespeedInput / frequencyInput;
        wavespeedOutput = wavespeedInput;
        frequencyOutput = frequencyInput;
        periodOutput = 1 / frequencyOutput;
            prepareResult("noerrors", "twoinputs");
    };

    if (isNaN(frequencyInput) && isNaN(periodInput) && isNaN(wavelengthInput) && isNaN(wavespeedInput)) {
        resultsList.innerHTML = "";
    } else if (isNaN(frequencyInput) && isNaN(periodInput) && !isNaN(wavelengthInput) && isNaN(wavespeedInput)) {
        resultsList.innerHTML = "";
    } else if (isNaN(frequencyInput) && isNaN(periodInput) && isNaN(wavelengthInput) && !isNaN(wavespeedInput)) {
        resultsList.innerHTML = "";
    };
};

function isConflict(frequencyInput, periodInput, wavelengthInput, wavespeedInput) {
    if (!isNaN(frequencyInput) && !isNaN(periodInput)) {
        prepareResult("frequencyperiodconflict");
        return true;
    } else if ((!isNaN(frequencyInput) || !isNaN(periodInput))&& !isNaN(wavelengthInput) && !isNaN(wavespeedInput)) {
        prepareResult("threeinputconflict");
        return true;
    } else {
        return false;
    }
}

function prepareResult(error, inputtype) {
    if (electromagneticOption.checked) {
        photonenergy = plancksconstant * frequencyOutput;
            if (frequencyOutput >= 3e19) {
                radiationtype = "Gamma radiation";
            } else if (frequencyOutput >= 3e16) {
                radiationtype = "X-rays";
            } else if (frequencyOutput >= 7.5e14) {
                radiationtype = "Ultraviolet radiation";
            } else if (frequencyOutput >= 4e14) {
                radiationtype = "Visible light";
            } else if (frequencyOutput >= 3e11) {
                radiationtype = "Infrared radiation";
            } else if (frequencyOutput >= 3e8) {
                radiationtype = "Microwaves";
            } else {
                radiationtype = "Radio waves";
        }
    };

    // CHECK FOR ERRORS
    if (error === "frequencyperiodconflict") {
        outputItems = ["Error:", "Fill either period, or frequency"];
    } else if (error === "threeinputconflict") {
        outputItems = ["Error:", "Fill no more than two fields"];
    } else if (error === "noerrors") {
        // CHECK IF TWO INPUTS OR JUST FREQUENCY OR PERIOD
        if (inputtype === "twoinputs") {
            // CHECK IF ELECTROMAGNETIC RADIATION OR NOT
            if (electromagneticOption.checked) {
                outputItems = [`Frequency: ${frequencyOutput} Hz`, `Period: ${periodOutput} s`, `Wavelength: ${wavelengthOutput} m`, `Wave speed: ${wavespeedOutput} m/s`,
                    `Photon energy: ${photonenergy} J` , `Radiation type: ${radiationtype}`
                ];
            } else if (mechanicalOption.checked) {
                outputItems = [`Frequency: ${frequencyOutput} Hz`, `Period: ${periodOutput} s`, `Wavelength: ${wavelengthOutput} m`, `Wave speed: ${wavespeedOutput} m/s`];
            }
        } else if (inputtype === "justfrequencyperiod") {
            // CHECK IF ELECTROMAGNETIC RADIATION OR NOT
            if (electromagneticOption.checked) {
                outputItems = [`Frequency: ${frequencyOutput} Hz`, `Period: ${periodOutput} s`, `Photon energy: ${photonenergy} J`, `Radiation type: ${radiationtype}`];
            } else if (mechanicalOption.checked) {
                outputItems = [`Frequency: ${frequencyOutput} Hz`, `Period: ${periodOutput} s`];
            }
        }
    }
    renderList(outputItems);
};

function renderList(outputItems) {
    resultsList.innerHTML = "";
    outputItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = String(item);
        resultsList.appendChild(li);
    });
};