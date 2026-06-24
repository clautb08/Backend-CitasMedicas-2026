import * as sfile from "../services/file.service.js";

export const upload = function(req, res){
    console.log("--------controller--------");
    sfile.upload(req, res);
};

export const uploadCita = function(req, res){
    console.log("--------controller uploadCita--------");
    sfile.uploadCita(req, res);
};