import { generateHoleCoords, animateBallMovement } from "./gameLogic.js";

const startBtn = document.querySelector('#start-btn');
const wrapper = document.querySelector('.wrapper');

const start = () => {
    startBtn.style.display = 'none';
    wrapper.style.display = 'block';
    generateHoleCoords();
    animateBallMovement();
}

startBtn.addEventListener('click', start);
