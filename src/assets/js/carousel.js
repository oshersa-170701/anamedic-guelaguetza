/*
=========================================================
ANA EXPERIENCE AI
CAROUSEL.JS
MVP 0.3
=========================================================
*/

"use strict";

/*
=========================================================
CONFIGURACIÓN
=========================================================
*/

const Carousel = {

    images: [

        "assets/img/demo/demo1.png",

        "assets/img/demo/demo2.png",

        "assets/img/demo/demo3.png",

        "assets/img/demo/demo4.png",

        "assets/img/demo/demo5.png",
         "assets/img/demo/demo6.png"

    ],

    index: 0,

    interval: 20000,

    timer: null,

    enabled: true

};

/*
=========================================================
INICIAR
=========================================================
*/

function startCarousel() {

    stopCarousel();

    Carousel.enabled = true;

    Carousel.index = 0;

    changeBackground(Carousel.images[0]);
    setTimeout(function(){

    if(typeof speakCarousel==="function"){

        speakCarousel(0);

    }

    },1000);

    Carousel.timer = setInterval(nextImage, Carousel.interval);

}

/*
=========================================================
DETENER
=========================================================
*/

function stopCarousel() {

    Carousel.enabled = false;

    if (Carousel.timer) {

        clearInterval(Carousel.timer);

        Carousel.timer = null;

    }

}

/*
=========================================================
SIGUIENTE IMAGEN
=========================================================
*/

function nextImage() {

    if (!Carousel.enabled)
        return;

    Carousel.index++;

    if (Carousel.index >= Carousel.images.length) {

        Carousel.index = 0;

    }

    console.log("Carousel:", Carousel.index);

    changeBackground(Carousel.images[Carousel.index]);

    if(typeof speakCarousel==="function"){

        setTimeout(function(){

            speakCarousel(Carousel.index);

        },1000);

    }

}

/*
=========================================================
CAMBIAR FONDO
=========================================================
*/

function changeBackground(image) {

    const bg = document.getElementById("background");

    if (!bg) return;

    console.log("CAMBIANDO A:", image);

    bg.style.backgroundImage = `url(${image}?v=${Date.now()})`;

    if(typeof updateDebugImage==="function"){

    updateDebugImage(image);

    }

}

/*
=========================================================
REINICIAR
=========================================================
*/

function resetCarousel() {

    Carousel.index = 0;

    startCarousel();

}

/*
=========================================================
PAUSAR
=========================================================
*/

function pauseCarousel() {

    stopCarousel();

}

/*
=========================================================
CONTINUAR
=========================================================
*/

function resumeCarousel() {

    stopCarousel();

    Carousel.enabled = true;

    Carousel.index = 0;

    changeBackground(Carousel.images[0]);

    Carousel.timer = setInterval(nextImage, Carousel.interval);

}

/*
=========================================================
ESTADO
=========================================================
*/

function carouselRunning() {

    return Carousel.timer !== null;

}

/*
=========================================================
EVENTOS
=========================================================
*/

document.addEventListener("DOMContentLoaded", function () {

    startCarousel();

});