/*
=========================================================
ANA EXPERIENCE AI
AI.JS
MVP 1.1
=========================================================
*/

"use strict";

/*
=========================================================
CONFIGURACIÓN
=========================================================
*/

const AI={

    endpoint:"api/generate_image.php",

    timeout:180000,

    busy:false,

    originalImage:"",

    generatedImage:""

};

/*
=========================================================
DATAURL -> BLOB
=========================================================
*/

function dataURLToBlob(dataURL) {

    const parts = dataURL.split(",");

    const mime = parts[0].match(/:(.*?);/)[1];

    const binary = atob(parts[1]);

    let length = binary.length;

    const array = new Uint8Array(length);

    while (length--) {

        array[length] = binary.charCodeAt(length);

    }

    return new Blob([array], {

        type: mime

    });

}

/*
=========================================================
GENERAR IMAGEN IA
=========================================================
*/

async function generateAIImage() {

    if (AI.busy)
        return;

    AI.busy = true;

    updateDebugIA("GENERANDO");

    console.log("=================================");
    console.log("OPENAI IMAGES");
    console.log("=================================");

    const image = getCapturedImage();

    if (!image) {

        console.error("No existe imagen capturada");

        AI.busy = false;

        updateDebugIA("ERROR");

        return;

    }

    try {

        /*
        =============================================
        CONVERTIR A BLOB
        =============================================
        */

        const blob = dataURLToBlob(image);

        console.log("Blob:", blob);

        console.log("Peso:", blob.size);

        /*
        =============================================
        FORMDATA
        =============================================
        */

        const form = new FormData();

        form.append(

            "image",

            blob,

            "capture.png"

        );

        /*
        =============================================
        ENVIAR
        =============================================
        */

        const response = await fetch(

            AI.endpoint,

            {

                method: "POST",

                body: form

            }

        );

        if (!response.ok) {

            const text = await response.text();

            console.error("HTTP:", response.status);

            console.error(text);

            throw new Error(

                "HTTP " + response.status

            );

        }

        const data = await response.json();

        console.log(data);

        if (!data.success) {

            throw new Error(

                data.message

            );

        }


        

        AI.busy = false;

        updateDebugIA("OK");

        /*
        =============================================
        GUARDAR IMAGEN IA
        =============================================
        */

        AI.originalImage=data.original_image;

        AI.generatedImage=data.ai_image;

        /*
        =============================================
        CAMBIAR ESTADO
        =============================================
        */

        changeState(

            STATES.PREVIEW

        );
    }

    catch (error) {

        console.error(error);

        AI.busy = false;

        updateDebugIA("ERROR");

        alert(

            "No fue posible generar la imagen."

        );

        changeState(

            STATES.PREVIEW

        );

    }

}


/*
=========================================================
ESTADO
=========================================================
*/

function aiIsBusy() {

    return AI.busy;

}

/*
=========================================================
REINICIAR
=========================================================
*/

function resetAI(){

    AI.busy=false;

    AI.originalImage="";

    AI.generatedImage="";

    updateDebugIA("OFF");

}

/*
=========================================================
OBTENER IMAGEN IA
=========================================================
*/

function getGeneratedImage(){

    return AI.generatedImage;

}
function getOriginalImage(){

    return AI.originalImage;

}
/*
=========================================================
GLOBAL
=========================================================
*/

window.generateAIImage = generateAIImage;


window.aiIsBusy = aiIsBusy;

window.resetAI = resetAI;
window.getGeneratedImage = getGeneratedImage;
window.getOriginalImage=getOriginalImage;

console.log("AI.JS CARGADO");
console.log("MODO FORMDATA");