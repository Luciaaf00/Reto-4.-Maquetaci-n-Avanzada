var patron = "^[a-zA-ZáéíóúÁÉÍÓÚ-]{3,30}$";
var emailPatron = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$";
var errorNombre=document.getElementById("nombre_error");
var errorApellido1=document.getElementById("primer_apellido_error");
var errorEmail=document.getElementById("email_error1");
var errorEmail2=document.getElementById("email_error2");
var errorFecha=document.getElementById("error_nacimiento");
var patronTlf="^[0-9]{9}$";
var errorTlfMovil=document.getElementById("error_tlf_movil");


function standar(idIntroducido, patron) {
	return $(idIntroducido).val().trim().match(patron) ? true : false;
}
function confirmaEmail(idEmail, idEmail_confirmacion){
    let idEmail1 =$(idEmail).val().trim();
    let idEmail2 =$(idEmail_confirmacion).val().trim();
    if(idEmail1==idEmail2){
        return true;
    }else{
        return false;
    }
}
/*Validaciones*/
$("#nombre").change(function(){
if(!standar("#nombre", patron)){
    errorNombre.innerHTML = "Tiene que introducir un nombre de mínimo tres letras y máximo 30 letras" 
} 
});
$("#primer_apellido").change(function(){
if(!standar("#primer_apellido", patron)){
    errorApellido1.innerHTML = "Tiene que introducir un apellido de mínimo tres letras y máximo 30 letras" 
} 
});


$("#email").change(function(){ 
if(!standar("#email", emailPatron)){
    errorEmail.innerHTML = "Tiene que introducir un email correcto ejemplo: usuario@gmail.com" 
} 
});
//Validación de una fecha
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let fechaActual=year*10000+month*100+day;

let esFechaCorrecta=false;
$("#fecha").change(function(){
    var fechaIntroducida=$(this).val();
    var fechaSinGuiones=fechaIntroducida.replaceAll("-", "");
    var fechaDefinitiva=parseInt(fechaSinGuiones);
    if(fechaActual<=fechaDefinitiva){
        esFechaCorrecta=true;
    }else{
        esFechaCorrecta=false;
        errorFecha.innerHTML = "Tiene que introducir una fecha actual o posterior" 
    }
});
function validacionTlf(idTlf, patron){
    return $(idTlf).val().trim().match(patron) ? true : false;
}

function activarBoton (idFormulario) {
	$(idFormulario + " button.submit").removeAttr("disabled");
}
function desactivarBoton (idFormulario) {
	$(idFormulario + " button.submit").attr("disabled", "disabled");
}

function formulario(idFormulario){
    $(idFormulario + " *").on("change keydown", function() {

        if(standar("#nombre", patron) && 
        standar("#primer_apellido", patron) && 
        standar("#email", emailPatron) &&
        esFechaCorrecta==true && 
        esIdentificacionCorrecta==true &&
        validacionTlf("#tlf_movil", patronTlf)
        ){
            activarBoton (idFormulario);
            
             
        }else{
            desactivarBoton(idFormulario);
        }//Fin Si
    });//Fin función

}

$(function() {
	formulario("#contacto1");
});
