const tempinput = document.querySelector("#tempinput");
tempinput.addEventListener("input", (e) => {
    const normalizedValue = e.target.value.replace(',', '');
    const inputValue = parseFloat(normalizedValue);
    let outputValue = "";
    let finalresult = "";
    if (!isNaN(inputValue)) {
        outputValue = inputValue**4 * 5.670374419e-8;
        finalresult = String(outputValue.toExponential(6));
    };
    document.querySelector("#exitoutput").value = finalresult;
});

const exitinput = document.querySelector("#exitinput");
exitinput.addEventListener("input", (e) => {
    const normalizedValue = e.target.value.replace(',', '');
    const inputValue = parseFloat(normalizedValue);
    let outputValue = "";
    let finalresult = "";
    if (!isNaN(inputValue)) {
        outputValue = (inputValue / 5.670374419e-8)**0.25;
        finalresult = String(outputValue.toExponential(6));
    };
    document.querySelector("#tempoutput").value = finalresult;
});