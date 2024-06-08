import { generateHoleCoords, animateBallMovement } from "./gameLogic.js";

const startBtn = document.querySelector('#start-btn');
const wrapper = document.querySelector('.wrapper');

const start = () => {
    startBtn.style.display = 'none';
    wrapper.style.display = 'block';
    generateHoleCoords();
    animateBallMovement();
}

export const generateGameOverWindow = (isWin, timerObj) => {
    const gameOverWindow = document.createElement('div');
    gameOverWindow.id = 'gameover-window';
    const okButton = document.createElement('button');
    okButton.id = 'ok-btn';
    okButton.textContent = 'OK';
    const content = document.createElement('div');
    gameOverWindow.appendChild(content)
    gameOverWindow.appendChild(okButton);
  
    if(isWin) {
      content.innerHTML = `
        <p>YOU WON!</p>
        <p>Your time: ${timerObj.time}</p>
        <div>
            <p>Records:</p> 
            ${timerObj.records.map((x, index)=>{
                return `<p>${index+1}. ${x}</p>`
            })}
        </div>`;
    }
    else {
      content.innerHTML = `
        <p>YOU LOST!</p>
        <p>The black hole consumed you :(</p>`;
    }

    return gameOverWindow
  }

startBtn.addEventListener('click', start);
