/*
=========================================================
ANA EXPERIENCE AI
CAMERA.JS
MVP 1.0
=========================================================
*/

"use strict";

/*
=========================================================
VARIABLES
=========================================================
*/

let cameraStream = null;

let cameraStarted = false;

/*
=========================================================
ABRIR CÁMARA
=========================================================
*/

async function startCamera() {

    if (cameraStarted)
        return true;

    console.log("=================================");
    console.log("ABRIENDO CÁMARA");
    console.log("=================================");

    try {

        const video = document.getElementById("camera");

        if (!video) {

            console.error("No existe el elemento #camera");

            return false;

        }

        cameraStream = await navigator.mediaDevices.getUserMedia({

            video: {

                width: {
                    ideal: 1920
                },

                height: {
                    ideal: 1080
                },

                facingMode: "user"

            },

            audio: false

        });

        video.srcObject = cameraStream;

        video.setAttribute("autoplay", "");

        video.setAttribute("playsinline", "");

        video.setAttribute("muted", "");

        await video.play();

        cameraStarted = true;

        updateDebugCamera("ON");

        console.log("Cámara iniciada");

        /*
        =========================================
        Esperar para que el usuario se acomode
        =========================================
        */

        setTimeout(() => {

            if (cameraStarted) {

                startCountdown();

            }

        }, 2000);

        return true;

    } catch (error) {

        console.error(error);

        updateDebugCamera("ERROR");

        alert("No fue posible abrir la cámara.");

        return false;

    }

}

/*
=========================================================
DETENER
=========================================================
*/

function stopCamera() {

    if (!cameraStream)
        return;

    cameraStream.getTracks().forEach(track => {

        track.stop();

    });

    cameraStream = null;

    cameraStarted = false;

    stopCountdown();

    updateDebugCamera("OFF");

    console.log("Cámara detenida");

}

/*
=========================================================
CAPTURAR FOTOGRAFÍA
=========================================================
*/

function capturePhoto() {

    const video = document.getElementById("camera");

    const canvas = document.getElementById("captureCanvas");

    if (!video || !canvas) {

        console.error("Video o Canvas no encontrados");

        return null;

    }

    const ctx = canvas.getContext("2d");

    const width = video.videoWidth;

    const height = video.videoHeight;

    canvas.width = width;

    canvas.height = height;

    ctx.drawImage(

        video,

        0,

        0,

        width,

        height

    );

    console.log("Fotografía capturada");

    return canvas.toDataURL(

        "image/png",

        1

    );

}

/*
=========================================================
REINICIAR
=========================================================
*/

function restartCamera() {

    stopCamera();

    startCamera();

}

/*
=========================================================
ESTADO
=========================================================
*/

function cameraIsRunning() {

    return cameraStarted;

}

/*
=========================================================
EXPOSICIÓN GLOBAL
=========================================================
*/

window.startCamera = startCamera;

window.stopCamera = stopCamera;

window.restartCamera = restartCamera;

window.capturePhoto = capturePhoto;

window.cameraIsRunning = cameraIsRunning;

console.log("CAMERA.JS CARGADO");