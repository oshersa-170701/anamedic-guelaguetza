/*
=========================================================
ANA EXPERIENCE ENGINE
COMPOSE.JS
VERSION 2.1
=========================================================
*/

"use strict";

/*
=========================================================
COMPOSICIÓN
=========================================================
*/

async function composeImage() {

    console.log("=================================");
    console.log("COMPOSER");
    console.log("=================================");

    const image = getCapturedImage();

    if (!image) {

        console.error("No existe imagen capturada.");

        return;

    }

    try {

        /*
        =========================================
        CONVERTIR DATAURL A BLOB
        =========================================
        */

        const blob = await fetch(image).then(r => r.blob());

        const form = new FormData();

        form.append(

            "photo",

            blob,

            "capture.png"

        );

        /*
        =========================================
        ENVIAR AL ENGINE
        =========================================
        */

        const response = await fetch(

            "engine/Composer/compose.php",

            {

                method: "POST",

                body: form

            }

        );

        const json = await response.json();

        console.log(json);

        if (!json.success) {

            console.error(json.message);

            alert(json.message);

            return;

        }

        /*
        =========================================
        GUARDAR RESULTADO
        =========================================
        */

        window.generatedImage = json.image;
	window.originalImage = json.original;

        window.downloadCode = json.code || "";

        window.downloadUrl = json.url || json.image;

        /*
        =========================================
        MOSTRAR PREVIEW
        =========================================
        */

        const preview = document.getElementById(

            "previewImage"

        );

        if (preview) {

            preview.src =

                json.image +

                "?t=" +

                Date.now();

        }

        console.log("Imagen generada correctamente.");

        /*
        =========================================
        CAMBIAR ESTADO
        =========================================
        */
        if(typeof stopGeneratingAnimation==="function"){

            stopGeneratingAnimation();

        }
        changeState(

            STATES.PREVIEW

        );

    }

    catch (error) {

        console.error(

            "Error compose:",

            error

        );

    }

}

/*
=========================================================
EXPOSICIÓN GLOBAL
=========================================================
*/

window.composeImage = composeImage;

console.log("COMPOSE.JS CARGADO");