/*
=========================================================
ANA EXPERIENCE AI
EXPERIENCE.JS
MVP 4.0
=========================================================
*/

"use strict";

/*
=========================================================
OBJETO GLOBAL
=========================================================
*/

const EXPERIENCE={

    /*
    ---------------------------------------------
    SESIÓN
    ---------------------------------------------
    */

    sessionId:null,

    uuid:null,

    /*
    ---------------------------------------------
    VISITANTE
    ---------------------------------------------
    */

    visitorName:"",

    visitorPhone:"",

    consent:1,

    /*
    ---------------------------------------------
    IMÁGENES
    ---------------------------------------------
    */

    capturedBase64:"",

    originalImage:"",

    aiImage:"",

    /*
    ---------------------------------------------
    QR
    ---------------------------------------------
    */

    qrImage:"",

    qrCode:"",

    qrUrl:""

};

/*
=========================================================
RESET
=========================================================
*/

function resetExperienceData(){

    EXPERIENCE.sessionId=null;

    EXPERIENCE.uuid=null;

    EXPERIENCE.visitorName="";

    EXPERIENCE.visitorPhone="";

    EXPERIENCE.consent=1;

    EXPERIENCE.capturedBase64="";

    EXPERIENCE.originalImage="";

    EXPERIENCE.aiImage="";

    EXPERIENCE.qrImage="";

    EXPERIENCE.qrCode="";

    EXPERIENCE.qrUrl="";

}

/*
=========================================================
SETTERS
=========================================================
*/

function setCapturedBase64(image){

    EXPERIENCE.capturedBase64=image;

}

function setOriginalImage(path){

    EXPERIENCE.originalImage=path;

}

function setAIImage(path){

    EXPERIENCE.aiImage=path;

}

function setVisitorName(name){

    EXPERIENCE.visitorName=name;

}

function setVisitorPhone(phone){

    EXPERIENCE.visitorPhone=phone;

}

function setSession(sessionId,uuid){

    EXPERIENCE.sessionId=sessionId;

    EXPERIENCE.uuid=uuid;

}

function setQR(image,code,url){

    EXPERIENCE.qrImage=image;

    EXPERIENCE.qrCode=code;

    EXPERIENCE.qrUrl=url;

}

/*
=========================================================
GETTERS
=========================================================
*/

function getCapturedBase64(){

    return EXPERIENCE.capturedBase64;

}

function getOriginalImage(){

    return EXPERIENCE.originalImage;

}

function getAIImage(){

    return EXPERIENCE.aiImage;

}

function getVisitorName(){

    return EXPERIENCE.visitorName;

}

function getVisitorPhone(){

    return EXPERIENCE.visitorPhone;

}

function getSessionId(){

    return EXPERIENCE.sessionId;

}

function getUUID(){

    return EXPERIENCE.uuid;

}

function getQRImage(){

    return EXPERIENCE.qrImage;

}

function getQRCode(){

    return EXPERIENCE.qrCode;

}

function getQRUrl(){

    return EXPERIENCE.qrUrl;

}

/*
=========================================================
GLOBAL
=========================================================
*/

window.EXPERIENCE=EXPERIENCE;

window.resetExperienceData=resetExperienceData;

window.setCapturedBase64=setCapturedBase64;
window.setOriginalImage=setOriginalImage;
window.setAIImage=setAIImage;

window.setVisitorName=setVisitorName;
window.setVisitorPhone=setVisitorPhone;

window.setSession=setSession;

window.setQR=setQR;

window.getCapturedBase64=getCapturedBase64;
window.getOriginalImage=getOriginalImage;
window.getAIImage=getAIImage;

window.getVisitorName=getVisitorName;
window.getVisitorPhone=getVisitorPhone;

window.getSessionId=getSessionId;
window.getUUID=getUUID;

window.getQRImage=getQRImage;
window.getQRCode=getQRCode;
window.getQRUrl=getQRUrl;

console.log("EXPERIENCE.JS MVP 4.0 CARGADO");