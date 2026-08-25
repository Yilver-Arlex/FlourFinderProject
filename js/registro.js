const section_registrarse = document.querySelector("#registrarse");
const section_verificacion_email = document.querySelector("#verificacion-email")
const section_final_registro = document.querySelector("#final-registro")
const form_up = document.querySelector(".form-up");


/*Registro*/

form_up.addEventListener("submit", function(evento){
    evento.preventDefault();

    const email_up = document.querySelector("#email-up");
    const password_up = document.querySelector("#password-up");
    const identification_up = document.querySelector("#identificacion-up");

    if(registro(email_up, password_up, identification_up)){
        section_registrarse.classList.add("ocultarse");
        section_verificacion_email.classList.remove("ocultarse");
        carga_codigo();
        email_up.value = "";
        password_up.value = "";
        identification_up.value = "";
    }
})

function registro(email, password, identification){
    const dates = [email, password, identification]

    /*Verificamos si existe un valor vacio*/
    for (const element of dates){
        if(element.value.trim() === ""){
            showError(element, "Dato obligatorio")
            return false
        } else {
            showError(element, "")
        }
    };

    /*Iniciar lo datos registrados y no el valor es nullo que cree una nueva []*/
    const datos_registrados = JSON.parse(localStorage.getItem("users")) || []

    /*Verircamos si la cuenta ya habia existido*/
    if (datos_registrados.find(dato => dato.email === email.value)){
        showError(email, "Cuenta existente");
        return false;
    } else {
        showError(email, "")
    }

    /*Verificamos si la contraseña es lo sufucientemente larga*/
    if (8 > (password.value.trim()).length){
        showError(password, "error muy corta")
        return false
    } else {
        showError(password, "")
    }

    /*Si no ha llegado a haber un return false entonces, guardamos los datos en el local storage y returnamos true, asi continuamos con el flujo*/
    datos_registrados.push({email:email.value, password:password.value, identification:identification.value})
    localStorage.setItem("users", JSON.stringify(datos_registrados))
    return true
}


/*Verificacion email*/

function carga_codigo(){
    const aleatorio = generator_code();
    const div_code = document.createElement("div");
    div_code.classList.add("div-code");
    const code_verif = document.createElement("h2");
    code_verif.classList.add("code-verif");
    code_verif.textContent = aleatorio;
    const close_taget_code = document.createElement("button");
    close_taget_code.classList.add("close-target-code");
    close_taget_code.innerHTML = "&times";

    close_taget_code.addEventListener("click", function(evento){
        evento.preventDefault();

        div_code.remove()
    })

    section_verificacion_email.append(div_code);
    div_code.append(code_verif);
    div_code.append(close_taget_code);
};

function generator_code(cantidad = 4){
    const min = Math.pow(10, cantidad - 1);
    const max = Math.pow(10, cantidad);

    const array = new Uint32Array(1);
    crypto.getRandomValues(array);

    const numero_aleatorio = min + (array[0] % (max - min));
    return numero_aleatorio.toString();
}

const i_code = document.querySelectorAll(".i-code")

i_code.forEach(input  => {
    input.addEventListener("input", function(evento){
        const valor = evento.target.value;
        
        if(valor && input.nextElementSibling){
            input.nextElementSibling.focus()
        }

        verificarSiesCompleta();
    })
});

function verificarSiesCompleta(){
    const contenedor_manejo_de_input = document.querySelector("#verificacion-email .part-input-code")

    let codigoCompleto = ""
    i_code.forEach(caracter => {
        codigoCompleto += caracter.value
    })

    if (codigoCompleto.length == 4){
        console.log("codigo completo", codigoCompleto)
        if (codigoCompleto){
            if (document.querySelector(".code-verif")){
                if (document.querySelector(".code-verif").textContent === codigoCompleto){
                    section_verificacion_email.classList.add("ocultarse")
                    section_final_registro.classList.remove("ocultarse")
                    return true
                } else {
                    showErrorVerificacionCode(contenedor_manejo_de_input, i_code, "Codigo invalido")
                    console.log("nou")
                    return false
                }
            }
        }
    }
}



/*Mostrar errores*/

function showError(input, mensaje){
    const error = input.parentElement.querySelector(".input-text-error")
    if (error) {
        error.innerHTML = mensaje
    } 

    if (mensaje !== ""){
        input.style.border = "1px solid #D32F2F"
    } else{
        input.style.border = ""
    }
}


function showErrorVerificacionCode(inputs, input, mensaje){
    const error = inputs.parentElement.querySelector(".input-text-error")

    if (error) {
        error.innerHTML = mensaje
    }

    input.forEach(input_code => {
        if (error !== ""){
            console.log("error corectamente sale con color")
            input_code.style.border = "1px solid #D32F2F"
        } else {
            input_code.style.border = ""
        }
        
    })
}