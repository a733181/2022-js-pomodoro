const containerEl = document.querySelector('.container');
const roundActivesEl = document.querySelectorAll('.round--active');
const timeEl = document.querySelector('.time');
const circleEl = document.querySelector('.cricle__svg--active');
const dotEl = document.querySelector('.dot');
const modeEl = document.querySelector('.mode');
const modeIconEl = document.querySelector('.mode-icon');
const playEl = document.querySelector('.play');
const pauseEl = document.querySelector('.pause');
const resetEl = document.querySelector('.reset');

const SET_WORK_TIME = 1500;
const SET_RESET_TIME = 300;
let currentTime = 0;
let mode = 'Work';
let isStart = false;

playEl.addEventListener('click', () => {
  isStart = !isStart;
  toggleBtnsHandler();
});

pauseEl.addEventListener('click', () => {
  isStart = !isStart;
  toggleBtnsHandler();
});

resetEl.addEventListener('click', () => resetHandler());

function renderHandler() {
  const isWorkTime = mode === 'Work';
  const roundItem = roundActivesEl.length;

  const min = isWorkTime
    ? Math.floor((SET_WORK_TIME - currentTime) / 60)
    : Math.floor((SET_RESET_TIME - currentTime) / 60);
  const sec = isWorkTime
    ? (SET_WORK_TIME - currentTime) % 60
    : (SET_RESET_TIME - currentTime) % 60;

  const animationTime = isWorkTime
    ? Math.floor(SET_WORK_TIME / roundItem)
    : Math.floor(SET_RESET_TIME / roundItem);
  const animationIndex = Math.floor(currentTime / animationTime);

  const currentDeg = isWorkTime ? SET_WORK_TIME : SET_RESET_TIME;

  timeEl.innerText = `${min < 10 ? String(min).padStart(2, '0') : min} : ${
    sec < 10 ? String(sec).padStart(2, '0') : sec
  }`;

  modeEl.innerText = `${mode} Mode`;

  circleEl.style.strokeDashoffset = 440 - (440 * currentTime) / currentDeg;
  dotEl.style.transform = `rotate(${currentTime * (360 / currentDeg)}deg)`;

  if (animationIndex >= roundItem) {
    return;
  }
  roundActivesEl[animationIndex].style.strokeDashoffset =
    94 - (94 * (currentTime % animationTime)) / (animationTime - 1);
}

function reduceTimeHandler() {
  if (mode === 'Work' && isStart) {
    if (SET_WORK_TIME - currentTime !== 0) {
      currentTime++;
    } else {
      currentTime = 0;
      mode = 'Reset';
      toggleModeColorHandler();
      toggleModeIconHandler();
      clearRoundActiveHandler();
    }
  } else if (mode === 'Reset' && isStart) {
    if (SET_RESET_TIME - currentTime !== 0) {
      currentTime++;
    } else {
      resetHandler();
    }
  }

  renderHandler();
}

function toggleBtnsHandler() {
  playEl.parentNode.classList.toggle('btns--hidden');
  pauseEl.parentNode.classList.toggle('btns--hidden');
}

function toggleModeIconHandler() {
  modeIconEl.firstElementChild.classList.toggle('mode-icon-hidden');
  modeIconEl.lastElementChild.classList.toggle('mode-icon-hidden');
}

function clearRoundActiveHandler() {
  roundActivesEl.forEach(
    (roundActiveEl) => (roundActiveEl.style.strokeDashoffset = 94)
  );
}

function resetHandler() {
  if (mode === 'Reset') {
    toggleModeColorHandler();
    toggleModeIconHandler();
    clearRoundActiveHandler();
  }

  isStart = false;
  mode = 'Work';
  currentTime = 0;
}

function toggleModeColorHandler() {
  containerEl.classList.toggle('rest');
}

setInterval(reduceTimeHandler, 1000);
