const form = document.querySelector("#split-form");
const billInput = document.querySelector("#bill-amount");
const tipInput = document.querySelector("#tip-percent");
const peopleInput = document.querySelector("#people-count");
const message = document.querySelector("#form-message");
const results = document.querySelector("#results");
const tipResult = document.querySelector("#tip-result");
const totalResult = document.querySelector("#total-result");
const shareResult = document.querySelector("#share-result");

const amountFormatter = new Intl.NumberFormat("en-NG", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatNaira(amount) {
  return `₦${amountFormatter.format(amount)}`;
}

form.addEventListener("input", () => {
  message.textContent = "";
  results.hidden = true;

  for (const input of [billInput, tipInput, peopleInput]) {
    input.removeAttribute("aria-invalid");
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  message.textContent = "";
  results.hidden = true;

  const bill = Number(billInput.value);
  const tipPercent = Number(tipInput.value);
  const people = Number(peopleInput.value);
  const values = [
    [billInput, bill],
    [tipInput, tipPercent],
    [peopleInput, people],
  ];
  const invalidInput = values.find(([, value]) => !Number.isFinite(value) || value <= 0);

  if (invalidInput) {
    invalidInput[0].setAttribute("aria-invalid", "true");
    message.textContent = "Please enter a bill, tip, and number of people greater than zero.";
    return;
  }

  if (!Number.isInteger(people)) {
    peopleInput.setAttribute("aria-invalid", "true");
    message.textContent = "Please enter a whole number of people.";
    return;
  }

  const tipAmount = bill * (tipPercent / 100);
  const total = bill + tipAmount;

  tipResult.textContent = formatNaira(tipAmount);
  totalResult.textContent = formatNaira(total);
  shareResult.textContent = formatNaira(total / people);
  results.hidden = false;
});