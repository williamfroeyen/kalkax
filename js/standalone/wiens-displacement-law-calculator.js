const tempinput = document.querySelector("#tempinput");
tempinput.addEventListener("input", (e) => {
    const normalizedValue = e.target.value.replace(',', '');
    const inputValue = parseFloat(normalizedValue);
    let outputValue = "";
    let finalresult = "";
    if (!isNaN(inputValue)) {
        outputValue = 2.898e-3 / inputValue;
        finalresult = String(outputValue.toExponential(6));
    };
    document.querySelector("#peakwaveoutput").value = finalresult;
});

const peakwaveinput = document.querySelector("#peakwaveinput");
peakwaveinput.addEventListener("input", (e) => {
    const normalizedValue = e.target.value.replace(',', '');
    const inputValue = parseFloat(normalizedValue);
    let outputValue = "";
    let finalresult = "";
    if (!isNaN(inputValue)) {
        outputValue = 2.898e-3 / inputValue;
        finalresult = String(outputValue.toExponential(6));
    };
    document.querySelector("#tempoutput").value = finalresult;
});