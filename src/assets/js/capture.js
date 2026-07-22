/*
=========================================================
ANA EXPERIENCE AI
CAPTURE.JS
VERSION 2.0
=========================================================
*/

"use strict";

/*
=========================================================
VARIABLES
=========================================================
*/

let capturedImage = null;

let flashDuration = 150;

/*
=========================================================
INICIAR CAPTURA
=========================================================
*/

function startCapture() {

    console.log("=================================");
    console.log("INICIANDO CAPTURA");
    console.log("=================================");

    flashScreen();

}

/*
=========================================================
FLASH
=========================================================
*/

function flashScreen() {

    let flash = document.getElementById("flash");

    if (!flash) {

        flash = document.createElement("div");

        flash.id = "flash";

        flash.style.position = "fixed";
        flash.style.left = "0";
        flash.style.top = "0";
        flash.style.width = "100vw";
        flash.style.height = "100vh";
        flash.style.background = "#FFFFFF";
        flash.style.opacity = "0";
        flash.style.pointerEvents = "none";
        flash.style.zIndex = "999999";
        flash.style.transition = "opacity .15s linear";

        document.body.appendChild(flash);

    }

    flash.style.opacity = "1";

    setTimeout(() => {

        flash.style.opacity = "0";

        setTimeout(() => {

            captureFrame();

        }, flashDuration);

    }, flashDuration);

}

/*
=========================================================
CAPTURAR FRAME
=========================================================
*/

function captureFrame() {

    console.log("=================================");
    console.log("CAPTURANDO FRAME");
    console.log("=================================");

    capturedImage = capturePhoto();

    if (!capturedImage) {

        console.error("No fue posible capturar la imagen.");

        return;

    }

    console.log("Frame capturado correctamente.");

    freezePreview();

}

/*
=========================================================
CONTINUAR FLUJO
=========================================================
*/

function freezePreview() {

    console.log("=================================");
    console.log("FREEZE PREVIEW");
    console.log("=================================");

    if (!capturedImage) {

        console.error("No existe imagen capturada.");

        return;

    }

    console.log("Imagen capturada correctamente.");

    /*
    =====================================================
    CAMBIAR A PANTALLA GENERATING
    =====================================================
    */

    changeState(

        STATES.GENERATING

    );

    /*
    =====================================================
    INICIAR SEGMENTACIÓN
    =====================================================
    */

    startSegmentation();

}

/*
=========================================================
OBTENER IMAGEN
=========================================================
*/

function getCapturedImage() {

    return capturedImage;

}

/*
=========================================================
LIMPIAR
=========================================================
*/

function clearCapturedImage() {

    capturedImage = null;

}

/*
=========================================================
DESCARGAR (DEBUG)
=========================================================
*/

function downloadCapture() {

    if (!capturedImage) {

        return;

    }

    const a = document.createElement("a");

    a.href = capturedImage;

    a.download = "capture.png";

    a.click();

}

/*
=========================================================
EXPOSICIÓN GLOBAL
=========================================================
*/

window.startCapture = startCapture;
window.getCapturedImage = getCapturedImage;
window.clearCapturedImage = clearCapturedImage;
window.downloadCapture = downloadCapture;

console.log("CAPTURE.JS CARGADO");