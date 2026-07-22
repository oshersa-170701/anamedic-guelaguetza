/*
=========================================================
ANA EXPERIENCE AI
APP.JS
MVP 0.3
=========================================================
*/

"use strict";

/*
=========================================================
VARIABLES GLOBALES
=========================================================
*/

const App = {

    initialized: false,

    version: "0.3.0"

};

/*
=========================================================
INICIALIZAR APLICACIÓN
=========================================================
*/

function initializeApp() {

    console.clear();

    console.log("==========================================");
    console.log("ANA EXPERIENCE AI");
    console.log("MVP 0.3");
    console.log("Inicializando...");
    console.log("==========================================");

    initializeEvents();

    changeState(STATES.IDLE);

    App.initialized = true;

    console.log("Aplicación lista.");

}

/*
=========================================================
EVENTOS
=========================================================
*/

function initializeEvents() {

    /*
    =========================================
    TOCAR PANTALLA EN IDLE
    =========================================
    */

    document.addEventListener("click", function () {

        if (getState() !== STATES.IDLE)
            return;

        console.log("Inicio de experiencia");

        changeState(STATES.CAMERA);

    });
    /*
    =========================================
    TECLA 1
    INICIAR EXPERIENCIA
    =========================================
    */

    document.addEventListener("keydown", function (e) {

        if (getState() !== STATES.IDLE)
            return;

        if (

            e.key === "1"

            ||

            e.code === "Digit1"

            ||

            e.code === "Numpad1"

        ) {

            console.log("TECLA 1 - INICIANDO EXPERIENCIA");

            changeState(STATES.CAMERA);

        }

    });

    /*
    =========================================
    TECLA ESC
    REGRESA A IDLE
    =========================================
    */

    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape") {

            console.log("Regresando a IDLE");

            changeState(STATES.IDLE);

        }

    });

}

/*
=========================================================
UTILIDADES
=========================================================
*/

function $(id) {

    return document.getElementById(id);

}

/*
=========================================================
INICIO
=========================================================
*/

window.addEventListener(

    "load",

    initializeApp

);