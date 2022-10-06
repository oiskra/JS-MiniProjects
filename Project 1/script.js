const addButton = document.querySelector('#addButton');
const deleteButton = document.querySelector('#deleteButton');
const calculateButton = document.querySelector('#calculateButton');
const numberInputs = document.querySelector('#numberInputs');
const result = document.querySelector('#result');

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
    console.log(numbers);
    numbers.forEach(element => {
        sumHelper = sum;
        sum += parseInt(element.value);
        
        if(isNaN(sum)) {
            sum = sumHelper;
        } 
    })
    result.textContent = `Wynik to ${sum}`;
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


