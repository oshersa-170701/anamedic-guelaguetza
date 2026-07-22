/*
=========================================================
ANA EXPERIENCE IA
AUDIO.JS
VERSION 1.0
=========================================================
*/

"use strict";

/*
=========================================================
CONFIGURACIÓN
=========================================================
*/

const AUDIO={

    player:null,

    volume:0.30,

    enabled:false,

    fading:false

};

/*
=========================================================
INICIALIZAR
=========================================================
*/

function initAudio(){

    AUDIO.player=document.getElementById("bgMusic");

    if(!AUDIO.player){

        console.error("No existe bgMusic");

        return;

    }

    AUDIO.player.loop=true;

    AUDIO.player.volume=AUDIO.volume;

    console.log("AUDIO.JS CARGADO");

}

/*
=========================================================
PLAY
=========================================================
*/

async function playMusic(){

    if(!AUDIO.player)
        return;

    try{

        await AUDIO.player.play();

        AUDIO.enabled=true;

    }

    catch(e){

        console.log("Chrome bloqueó autoplay");

    }

}

/*
=========================================================
PAUSE
=========================================================
*/

function pauseMusic(){

    if(!AUDIO.player)
        return;

    AUDIO.player.pause();

}

/*
=========================================================
STOP
=========================================================
*/

function stopMusic(){

    if(!AUDIO.player)
        return;

    AUDIO.player.pause();

    AUDIO.player.currentTime=0;

}

/*
=========================================================
FADE IN
=========================================================
*/

function fadeInMusic(){

    if(!AUDIO.player)
        return;

    if(AUDIO.fading)
        return;

    AUDIO.fading=true;

    AUDIO.player.volume=0;

    AUDIO.player.play().catch(()=>{});

    let volume=0;

    const timer=setInterval(function(){

        volume+=0.02;

        AUDIO.player.volume=volume;

        if(volume>=AUDIO.volume){

            AUDIO.player.volume=AUDIO.volume;

            AUDIO.fading=false;

            clearInterval(timer);

        }

    },80);

}

/*
=========================================================
FADE OUT
=========================================================
*/

function fadeOutMusic(){

    if(!AUDIO.player)
        return;

    if(AUDIO.fading)
        return;

    AUDIO.fading=true;

    let volume=AUDIO.player.volume;

    const timer=setInterval(function(){

        volume-=0.02;

        if(volume<=0){

            AUDIO.player.pause();

            AUDIO.player.volume=AUDIO.volume;

            AUDIO.fading=false;

            clearInterval(timer);

            return;

        }

        AUDIO.player.volume=volume;

    },80);

}

/*
=========================================================
SET VOLUME
=========================================================
*/

function setMusicVolume(value){

    AUDIO.volume=value;

    if(AUDIO.player){

        AUDIO.player.volume=value;

    }

}

/*
=========================================================
GLOBAL
=========================================================
*/

window.initAudio=initAudio;

window.playMusic=playMusic;

window.pauseMusic=pauseMusic;

window.stopMusic=stopMusic;

window.fadeInMusic=fadeInMusic;

window.fadeOutMusic=fadeOutMusic;

window.setMusicVolume=setMusicVolume;

window.addEventListener(

    "load",

    initAudio

);