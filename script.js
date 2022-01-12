const start = document.getElementById('start');
const reset = document.getElementById('reset');
const stop = document.getElementById('pause');
const counter = document.getElementById('counter')

let tm = document.getElementById('t_minutes')
let ts = document.getElementById('t_seconds')
let bm = document.getElementById('b_minutes')
let bs = document.getElementById('b_seconds')

let startTimer;

function restartStartTimer() {
    startTimer = undefined;
}


/* Start */
start.addEventListener('click', function () {
    if (startTimer === undefined) {
        startTimer = setInterval(timer, 1000)
    } else {
        alert("Timer is already running");
    }
})

/* Pause */
pause.addEventListener('click', stopInterval)

function stopInterval() {
    clearInterval(startTimer)
    restartStartTimer()
}

/* Reset */
reset.addEventListener('click', function () {
    resetValue();
    counter.innerText = 0;
    stopInterval()
    restartStartTimer()
})

function resetValue() {
    tm.innerText = 25;
    ts.innerText = "00";
    bm.innerText = 5;
    bs.innerText = "00";
}


/* Timer */
function timer() {
    /* Timer Countdown */
    if (ts.innerText != 0) {
        ts.innerText--;
    } else if (tm.innerText != 0 && ts.innerText == 0) {
        ts.innerText = 59;
        tm.innerText--;
    }

    /* Break Countdown */
    if (tm.innerText == 0 && ts.innerText == 0) {
        if (bs.innerText != 0) {
            bs.innerText--;
        } else if (bm.innerText != 0 && bs.innerText == 0) {
            bs.innerText = 59;
            bm.innerText--;
        }
    }

    /* Incement Count at the end of one cycle */
    if (tm.innerText == 0 && ts.innerText == 0 && bm.innerText == 0 && bs.innerText == 0) {
        resetValue();
        counter.innerText++;
    }
}