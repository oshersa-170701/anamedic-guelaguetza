/*
=========================================================
ANA EXPERIENCE AI
VALIDATIONS.JS
MVP 0.3
=========================================================
*/

"use strict";

/*
=========================================================
CONFIGURACIÓN
=========================================================
*/

const Validation = {

    errors: 0,

    warnings: 0

};

/*
=========================================================
LOG
=========================================================
*/

function validationOK(message){

    console.log(
        "%c✔ "+message,
        "color:#22C55E;font-weight:bold;"
    );

}

function validationWarning(message){

    Validation.warnings++;

    console.warn(
        "⚠ "+message
    );

}

function validationError(message){

    Validation.errors++;

    console.error(
        "✖ "+message
    );

}

/*
=========================================================
VALIDAR ELEMENTO
=========================================================
*/

function validateElement(id){

    const obj=document.getElementById(id);

    if(obj){

        validationOK(id);

        return true;

    }

    validationError(id+" no encontrado");

    return false;

}

/*
=========================================================
VALIDAR IMAGEN
=========================================================
*/

function validateImage(url){

    const img=new Image();

    img.onload=function(){

        validationOK(url);

    };

    img.onerror=function(){

        validationError(url);

    };

    img.src=url;

}

/*
=========================================================
VALIDAR LOGO
=========================================================
*/

function validateLogo(){

    validateImage(
        "assets/img/logo.png"
    );

}

/*
=========================================================
VALIDAR DEMOS
=========================================================
*/

function validateDemos(){

    for(let i=1;i<=5;i++){

        validateImage(

            "assets/img/demo/demo"+i+".png"

        );

    }

}

/*
=========================================================
VALIDAR HTML
=========================================================
*/

function validateHTML(){

    validateElement("background");

    validateElement("backgroundOverlay");

    validateElement("particles");

    validateElement("app");

    validateElement("header");

    validateElement("stage");

    validateElement("footer");

    validateElement("debug");

    validateElement("screen-idle");

    validateElement("screen-camera");

    validateElement("screen-countdown");

    validateElement("screen-generating");

    validateElement("screen-preview");

    validateElement("screen-whatsapp");

    validateElement("screen-sending");

    validateElement("screen-thanks");

    validateElement("camera");

    validateElement("captureCanvas");

    validateElement("previewImage");

    validateElement("phone");

    validateElement("keyboard");

}

/*
=========================================================
VALIDAR NAVEGADOR
=========================================================
*/

function validateBrowser(){

    if(!navigator.mediaDevices){

        validationWarning(

            "MediaDevices no disponible"

        );

    }

    if(!window.fetch){

        validationWarning(

            "Fetch API no disponible"

        );

    }

    if(!window.Promise){

        validationWarning(

            "Promise no disponible"

        );

    }

}

/*
=========================================================
VALIDAR RESOLUCIÓN
=========================================================
*/

function validateResolution(){

    console.log(

        "Resolución:",

        window.innerWidth+" x "+window.innerHeight

    );

}

/*
=========================================================
RESUMEN
=========================================================
*/

function validationSummary(){

    console.log("");

    console.log("================================");

    console.log("VALIDACIÓN FINAL");

    console.log("Errores :",Validation.errors);

    console.log("Warnings:",Validation.warnings);

    console.log("================================");

}

/*
=========================================================
EJECUTAR TODAS
=========================================================
*/

function runValidations(){

    console.clear();

    console.log("================================");

    console.log("ANA EXPERIENCE AI");

    console.log("VALIDACIONES");

    console.log("================================");

    validateHTML();

    validateLogo();

    validateDemos();

    validateBrowser();

    validateResolution();

    validationSummary();

}

/*
=========================================================
INICIO
=========================================================
*/

window.addEventListener(

    "load",

    runValidations

);