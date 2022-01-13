const start = document.getElementById('start');
const reset = document.getElementById('reset');
const stop = document.getElementById('pause');
const counter = document.getElementById('counter')
const tnumber = document.getElementById('timerChange');
const bnumber = document.getElementById('breakChange');

let tm = document.getElementById('t_minutes')
let ts = document.getElementById('t_seconds')
let bm = document.getElementById('b_minutes')
let bs = document.getElementById('b_seconds')


document.title = tm.innerText + ":" + ts.innerText; /* Title */

let startTimer;

/* Restart Timer */
function restartStartTimer() {
    startTimer = undefined;
    updateTitle()
}

/* Play Sound */

function playSound() {
    new Audio('audio/alarm.wav').play()
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
    tm.innerText = tnumber.value;
    ts.innerText = "00";
    bm.innerText = bnumber.value;
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
        if (bm.innerText == tnumber.value) { /* Play sound when minutes come to 0 */
            playSound();
        }

        if (bs.innerText != 0) {
            bs.innerText--;
        } else if (bm.innerText != 0 && bs.innerText == 0) {
            bs.innerText = 59;
            bm.innerText--;
        }

        addZero(bm, bs);
    }

    /* Incement Count at the end of one cycle */
    if (tm.innerText == 0 && ts.innerText == 0 && bm.innerText == 0 && bs.innerText == 0) {
        resetValue();
        counter.innerText++;
        playSound();
    }

    addZero(tm, ts);
    updateTitle()
}


/* Add 0 for numbers < 10 */
function addZero(minutes, seconds) {
    if (minutes == tm) { /* Add zero only for timer minutes and seconds */
        if (minutes.innerText < 10 && minutes.innerText != 0) {
            minutes.innerText = "0" + minutes.innerText
        } else if (minutes.innerText == 0) {
            minutes.innerText = "00"
        }
        addZeroSeconds(seconds)

    } else { /* Add zero only for break seconds */
        addZeroSeconds(seconds)
    }
}

function addZeroSeconds(seconds) {
    if (seconds.innerText < 10 && seconds.innerText != 0) {
        seconds.innerText = "0" + seconds.innerText;
    } else if (seconds.innerText == 0) {
        seconds.innerText = "00";
    }
}


/* Update Title */
function updateTitle() {
    document.title = tm.innerText + ":" + ts.innerText;
}


/* Input Number */
tnumber.onchange = function () {
    tm.innerText = this.value;
    updateTitle()
}

bnumber.onchange = function () {
    bm.innerText = this.value;
}


/* Update minutes on window load */
window.onload = () => {
    tm.innerText = tnumber.value;
    bm.innerText = bnumber.value;
    updateTitle()
};