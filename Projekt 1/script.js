const addButton = document.querySelector('#addButton');
const deleteButton = document.querySelector('#deleteButton');
const calculateButton = document.querySelector('#calculateButton');
const numberInputs = document.querySelector('#numberInputs');
const sumResult = document.querySelector('#sumResult');
const avgResult = document.querySelector('#avgResult');
const minResult = document.querySelector('#minResult');
const maxResult = document.querySelector('#maxResult');

addButton.addEventListener('click', () => {
    let newInput = document.createElement('input');
    newInput.className = 'number';
    newInput.type = 'text';
    numberInputs.appendChild(newInput);
})

numberInputs.addEventListener('change', () => {
    let sum = 0;
    let sumHelper;
    const numbers = document.querySelectorAll('.number');
    const mappednumbers = Array.from(numbers).map(element => element.value);
    let min = Math.min(...mappednumbers);
    let max = Math.max(...mappednumbers);

    mappednumbers.forEach(element => {
        sumHelper = sum;
        sum += parseInt(element);
        
        if(isNaN(sum)) {
            sum = sumHelper;
        } 
    })
    sumResult.textContent = `Suma to ${sum}`;
    avgResult.textContent = `Średnia to ${sum / mappednumbers.length}`;
    maxResult.textContent = `Najwyższa liczba to ${max}`;
    minResult.textContent = `Najniższa liczba to ${min}`;
})

deleteButton.addEventListener('click', () => {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach(element => {
        element.value.length <= 0 && element.remove();  
    })
})

calculateButton.addEventListener('click', () => {
    let sum = 0;
    const numbers = document.querySelectorAll('.number');
    console.log(numbers);
    numbers.forEach(element => {
        sum += parseInt(element.value);
    })
    result.textContent = `Wynik to ${sum}`;
})


