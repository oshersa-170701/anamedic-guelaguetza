/*
=========================================================
ANA EXPERIENCE AI
VOICE.JS
MVP 1.0
=========================================================
*/

"use strict";

/*
=========================================================
CONFIGURACIÓN
=========================================================
*/

const VOICE={

    recognition:null,

    listening:false,

    supported:false

};

/*
=========================================================
NARRACIONES
=========================================================
*/

const STORIES=[

`¡Bienvenido a Guelaguetza IA Experience! Vive una experiencia donde la tradición y la Inteligencia Artificial crean un recuerdo único de Oaxaca. Al finalizar podrás conocer nuestras tazas y bolsas ecológicas con diseños exclusivos de la Guelaguetza.`,

`El Templo de Santo Domingo de Guzmán es uno de los lugares más representativos de Oaxaca. Su arquitectura barroca y su historia lo convierten en un sitio imperdible. Si te gusta este diseño, también podrás encontrarlo en nuestras tazas y tote bags oficiales.`,

`Monte Albán fue la capital de la cultura zapoteca durante siglos. Desde esta ciudad prehispánica se domina el Valle de Oaxaca. Lleva contigo un recuerdo especial con nuestros souvenirs inspirados en este maravilloso patrimonio.`,

`La Flor de Piña es una de las presentaciones más esperadas de la Guelaguetza. Sus colores, música y alegría representan el orgullo del pueblo oaxaqueño. Descubre también nuestras bolsas ecológicas y tazas con ilustraciones inspiradas en esta tradición.`,

`Gracias por visitar Guelaguetza IA Experience. Después de tomarte tu fotografía, no olvides conocer nuestra colección exclusiva de souvenirs oficiales. Una taza o una bolsa ecológica son el recuerdo perfecto para llevar un pedacito de Oaxaca contigo.`

];


/*
=========================================================
INICIALIZAR
=========================================================
*/

function initVoice(){

    if("webkitSpeechRecognition" in window){

        VOICE.supported=true;

        VOICE.recognition=new webkitSpeechRecognition();

    }else if("SpeechRecognition" in window){

        VOICE.supported=true;

        VOICE.recognition=new SpeechRecognition();

    }else{

        console.warn("SpeechRecognition no soportado");

        return;

    }

    VOICE.recognition.lang="es-MX";

    VOICE.recognition.interimResults=false;

    VOICE.recognition.maxAlternatives=1;

    VOICE.recognition.continuous=false;

}
/*
=========================================================
HABLAR
=========================================================
*/

function speak(text,callback=null){

    if(!("speechSynthesis" in window)){

        if(callback)
            callback();

        return;

    }

    speechSynthesis.cancel();

    const msg=new SpeechSynthesisUtterance(text);

    msg.lang="es-MX";

    msg.rate=1;

    msg.pitch=1;

    msg.onend=function(){

        if(typeof setMusicVolume==="function"){

        setMusicVolume(0.30);

        }
        if(callback){

            callback();

        }

    };

    if(typeof setMusicVolume==="function"){

    setMusicVolume(0.08);

    }

}

/*
=========================================================
NARRAR IMAGEN DEL CARRUSEL
=========================================================
*/

function speakCarousel(index){

    const stories=[

        "Bienvenido a Guelaguetza IA Experience. Vive una experiencia donde la tradición y la inteligencia artificial se unen para crear un recuerdo único de Oaxaca. Al finalizar podrás conocer nuestras tazas y bolsas ecológicas con diseños exclusivos inspirados en la Guelaguetza.",

        "El Templo de Santo Domingo de Guzmán es uno de los monumentos más importantes de Oaxaca. Su arquitectura barroca y su riqueza histórica lo convierten en uno de los lugares más visitados del estado. También podrás encontrar este diseño en nuestras tazas y tote bags oficiales.",

        "Monte Albán fue la antigua capital de la civilización zapoteca. Desde este sitio arqueológico se aprecia una de las vistas más impresionantes del Valle de Oaxaca. Descubre nuestros souvenirs inspirados en este maravilloso patrimonio.",

        "La Flor de Piña representa la alegría, el color y la tradición de la Cuenca del Papaloapan. Es una de las presentaciones más esperadas de la Guelaguetza. Conoce también nuestras bolsas ecológicas y tazas con ilustraciones inspiradas en esta hermosa tradición.",

        "Gracias por visitar Guelaguetza IA Experience. Después de tomarte tu fotografía podrás conocer nuestra colección exclusiva de tazas y bolsas ecológicas. Llévate un recuerdo único de Oaxaca creado especialmente para esta experiencia."

    ];

    if(index<0 || index>=stories.length){

        return;

    }

    speak(stories[index]);

}

window.speakCarousel=speakCarousel;

/*
=========================================================
NARRAR DEMO
=========================================================
*/

function speakStory(index){

    if(index<0 || index>=STORIES.length){

        return;

    }

    speak(STORIES[index]);

}

window.speakStory=speakStory;
/*
=========================================================
BEEP
=========================================================
*/

function playBeep(){

    const beep=document.getElementById("beep");

    if(!beep)
        return;

    beep.currentTime=0;

    beep.play();

}
/*
=========================================================
ESCUCHAR
=========================================================
*/

function startListening(onResult){

    if(!VOICE.supported)
        return;

    VOICE.recognition.onresult=function(event){

        const text=

            event.results[0][0].transcript.trim();

        if(onResult){

            onResult(text);

        }

    };

    VOICE.recognition.onerror=function(e){

        console.log(e);

    };

    VOICE.recognition.start();

}
/*
=========================================================
DETENER
=========================================================
*/

function stopListening(){

    if(!VOICE.supported)
        return;

    try{

        VOICE.recognition.stop();

    }catch(e){}

}
/*
=========================================================
GLOBAL
=========================================================
*/

window.initVoice=initVoice;

window.speak=speak;

window.playBeep=playBeep;

window.startListening=startListening;

window.stopListening=stopListening;

document.addEventListener(

    "DOMContentLoaded",

    initVoice

);

console.log("VOICE.JS CARGADO");