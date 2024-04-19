let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];
let lapNumber = 1;

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const millis = Math.floor((time % 1000) / 10);

  return (
    String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0') + '.' +
    String(millis).padStart(2, '0')
  );
}

function displayTime() {
  const elapsedTimeFormatted = formatTime(elapsedTime);
  document.querySelector('.display').textContent = elapsedTimeFormatted;
}

function startStopwatch() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function() {
    elapsedTime = Date.now() - startTime;
    displayTime();
  }, 10);
  document.getElementById('startBtn').disabled = true;
  document.getElementById('pauseBtn').disabled = false;
}

function pauseStopwatch() {
  clearInterval(timerInterval);
  document.getElementById('startBtn').disabled = false;
}

function resetStopwatch() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  displayTime();
  laps = [];
  lapNumber = 1;
  document.getElementById('lapTimes').innerHTML = '';
  document.getElementById('startBtn').disabled = false;
  document.getElementById('pauseBtn').disabled = true;
}

function recordLap() {
  const lapTime = elapsedTime;
  const lapTimeFormatted = formatTime(lapTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapNumber}: ${lapTimeFormatted}`;
  document.getElementById('lapTimes').appendChild(lapItem);
  laps.push({ lapNumber, lapTime });
  lapNumber++;
}
