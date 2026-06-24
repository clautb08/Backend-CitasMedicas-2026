//revisado 
import _multer from "multer";
import * as archmulder from "../config/archmulter.js";
import * as archmemoriamulter from "../config/archmemoriamulter.js"


export const upload = function(req, res){
    console.log("-----------service-------");
    archmulder.upload(req,res);
}

export const uploadCita = function(req, res){
 console.log("------------service uploadCita--------");
 archmulder.uploadCita(req, res);

}

