const fromCurrency = document.querySelector("select[name='from']");
const toCurrency = document.querySelectorAll("select[name='from']")[1];
const fromInput = document.querySelectorAll(".input")[0];
const toInput = document.querySelectorAll(".input")[1];
const exchangeBtn = document.querySelector(".exchange");
const buttons = document.querySelectorAll(".keypad button");
const ACbtn = document.querySelector(".ACbtn");
const DELbtn = document.querySelector(".DELbtn");

let inputStr = "";

// Get exchange rate and convert
async function convertCurrency() {
    const amount = parseFloat(fromInput.value);
    if (isNaN(amount)) return;

    const from = fromCurrency.value;
    const to = toCurrency.value;

    try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await res.json();
        const rate = data.rates[to];
        toInput.value = (amount * rate).toFixed(2);
    } catch (err) {
        console.error("Conversion error:", err);
        toInput.value = "Error";
    }
}

// Keypad button click
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "AC") {
            inputStr = "";
        } else if (value === "DEL") {
            inputStr = inputStr.slice(0, -1);
        } else {
            inputStr += value;
        }

        fromInput.value = inputStr;
        convertCurrency();
    });
});

// Manual typing
fromInput.addEventListener("input", () => {
    inputStr = fromInput.value;
    convertCurrency();
});

fromCurrency.addEventListener("change", convertCurrency);
toCurrency.addEventListener("change", convertCurrency);

exchangeBtn.addEventListener("click", e => {
    e.preventDefault();
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    convertCurrency();
});
