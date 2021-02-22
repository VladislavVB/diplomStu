// значение в текстовых input
const totalCost = document.getElementById('total-cost');
const durationCost = document.getElementById('duration-cost');

// значение в ползунках input
const rangeTotalCost = document.getElementById('total-cost-range');
const rangeDurationCost = document.getElementById('duration-cost-range');

//итог
const paymentCost = document.getElementById('payment-cost');

// все range
const inputsRange = document.querySelectorAll('.input-range');

const assignValue = () => {
  totalCost.value = rangeTotalCost.value;
  durationCost.value = rangeDurationCost.value;
};

assignValue();

inputsRange.forEach(elem, () => {
  elem.addEventListener('input', () => {
    assignValue();
    console.log(totalCost.value);
  });
});