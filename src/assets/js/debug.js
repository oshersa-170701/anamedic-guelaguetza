/*
=========================================================
ANA EXPERIENCE AI
DEBUG.JS
MVP 0.3
=========================================================
*/

"use strict";

/*
=========================================================
CONFIGURACIÓN
=========================================================
*/

const DEBUG = true;

/*
=========================================================
MOSTRAR / OCULTAR PANEL
=========================================================
*/

function initializeDebug() {

    const panel = document.getElementById("debug");

    if (!panel)
        return;

    panel.style.display = DEBUG ? "block" : "none";

}

/*
=========================================================
ACTUALIZAR ESTADO
=========================================================
*/

function updateDebug() {

    if (!DEBUG)
        return;

    const state = document.getElementById("debugState");

    if (state) {

        state.textContent = currentState;

    }

}

/*
=========================================================
IMAGEN ACTUAL
=========================================================
*/

function updateDebugImage(image) {

    if (!DEBUG)
        return;

    const obj = document.getElementById("debugImage");

    if (!obj)
        return;

    obj.textContent = image.split("/").pop();

}

/*
=========================================================
CÁMARA
=========================================================
*/

function updateDebugCamera(status) {

    if (!DEBUG)
        return;

    const obj = document.getElementById("debugCamera");

    if (!obj)
        return;

    obj.textContent = status;

}

/*
=========================================================
IA
=========================================================
*/

function updateDebugIA(status) {

    if (!DEBUG)
        return;

    const obj = document.getElementById("debugIA");

    if (!obj)
        return;

    obj.textContent = status;

}

/*
=========================================================
MENSAJES
=========================================================
*/

function debug(message) {

    if (!DEBUG)
        return;

    console.log("[ANA]", message);

}

/*
=========================================================
INICIO
=========================================================
*/

document.addEventListener(

    "DOMContentLoaded",

    initializeDebug

);