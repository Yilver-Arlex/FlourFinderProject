const form_in = document.querySelector(".form-in");

form_in.addEventListener("submit", function(evento){
    evento.preventDefault();

    const email = document.querySelector("#email-in")
    const password = document.querySelector("#password-in")

    if(inciarSesion(email, password)){
        window.location.href = "../pages/home.html"
    }
})


function inciarSesion(email, password){
    let dates = [email, password]
    
    for(const input of dates){
        if (input.value === ""){
            showError(input, "Dato obligatorio")
            return false
        } else{
            showError(input, "")
        }
    }

    const datos_users = JSON.parse(localStorage.getItem("users")) || []
    console.log(datos_users)

    usuarioEncontrado = (datos_users.find(users => users.email == email.value))

    if (!usuarioEncontrado){
        console.log("No existe")
        showError(email, "Usuario inexistente")
        return false
    } else{
        showError(email, "")
    }

    if (usuarioEncontrado.password !== password.value){
        showError(password, "Contraseña no coincide")
        return false
    } else{
        showError(password, "")
    }

    email.value = ""
    password.value = ""
    return true
}


function showError(input, mensaje){
    const error = input.parentElement.querySelector(".input-text-error")

    if(error){
        error.innerHTML = mensaje
    }

    if(mensaje !== ""){
        input.style.border = "1px solid #D32F2F"
    } else {
        input.style.border = ""
    }
}