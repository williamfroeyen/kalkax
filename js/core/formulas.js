export const formulaTable = {
    // ELECTROMAGNETISM
    "magnetic-flux-calculator": {
        formula: (x, y, z) => {
            if (Math.abs(z % 180) === 90) {
                return 0;
            }
            return x * y * Math.cos(z * Math.PI / 180);
        },
        decimals: 3,
        noZero: false,
        neg: false,
        unit: "Wb",
        prefix: "Flux:"
    },
    "oscillations-and-time-to-frequency": {
        formula: (x, y) => x / y,
        decimals: 3,
        noZero: true,
        neg: false,
        unit: "Hz",
        prefix: "Frequency:"
    },
    "oscillations-and-time-to-period": {
        formula: (x, y) => y / x,
        decimals: 3,
        noZero: true,
        neg: false,
        unit: "s",
        prefix: "Period:"
    },
    "stefan-boltzmann-calculator": {
        isStandalone: true
    },
    "wave-calculator": {
        isStandalone: true
    },
    "wiens-displacement-law-calculator": {
        isStandalone: true
    },

    // FORCE
    "find-buoyancy": {
        formula: (x, y, z) => x * y * z,
        decimals: 3,
        noZero: false,
        neg: false,
        unit: "N",
        prefix: "Buoyancy:"
    },
    "find-gravitational-force": {
        formula: (x, y) => x * y,
        decimals: 3,
        noZero: false,
        neg: false,
        unit: "N",
        prefix: "Force:"
    },
    "find-sliding-friction": {
        formula: (x, y) => x * y,
        decimals: 3,
        noZero: false,
        neg: false,
        unit: "N",
        prefix: "Friction:"
    },

    // MISCELLLANEOUS
    "dog-age-calculator": {
        formula: (x) => 16 * Math.log(x) + 31,
        decimals: 0,
        noZero: true,
        neg: false
    },
};
