/*
=========================================================
ANA EXPERIENCE AI
COUNTDOWN.JS
MVP 1.0
=========================================================
*/

"use strict";

/*
=========================================================
VARIABLES
=========================================================
*/

let countdownTimer = null;

let countdownRunning = false;

const COUNTDOWN_SECONDS = 3;

/*
=========================================================
INICIAR
=========================================================
*/

function startCountdown() {

    if (countdownRunning)
        return;

    countdownRunning = true;

    console.log("=================================");
    console.log("COUNTDOWN");
    console.log("=================================");

    const overlay = document.getElementById("countdownOverlay");

    const value = document.getElementById("countdownValue");

    if (!overlay || !value) {

        console.error("Countdown Overlay no encontrado");

        countdownRunning = false;

        return;

    }

    overlay.classList.add("active");

    let current = COUNTDOWN_SECONDS;

    value.textContent = current;

    value.classList.remove("zoom");

    void value.offsetWidth;

    value.classList.add("zoom");

    countdownTimer = setInterval(() => {

        current--;

        if (current > 0) {

            value.textContent = current;

            value.classList.remove("zoom");

            void value.offsetWidth;

            value.classList.add("zoom");

            return;

        }

        clearInterval(countdownTimer);

        countdownTimer = null;

        overlay.classList.remove("active");

        countdownRunning = false;

        console.log("Countdown finalizado");

        startCapture();

    }, 1000);

}

/*
=========================================================
CANCELAR
=========================================================
*/

function stopCountdown() {

    if (countdownTimer) {

        clearInterval(countdownTimer);

        countdownTimer = null;

    }

    countdownRunning = false;

    const overlay = document.getElementById("countdownOverlay");

    if (overlay) {

        overlay.classList.remove("active");

    }

}

/*
=========================================================
ESTADO
=========================================================
*/

function isCountdownRunning() {

    return countdownRunning;

}

/*
=========================================================
REINICIAR
=========================================================
*/

function resetCountdown() {

    stopCountdown();

}

/*
=========================================================
EXPOSICIÓN GLOBAL
=========================================================
*/

window.startCountdown = startCountdown;

window.stopCountdown = stopCountdown;

window.resetCountdown = resetCountdown;

window.isCountdownRunning = isCountdownRunning;

console.log("COUNTDOWN.JS CARGADO");