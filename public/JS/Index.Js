const myModal = new bootstrap.Modal("#register-modal")
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checklogged();

//Logar Sistema
document.getElementById("login-form").addEventListener("submit", function(e) {
   e.preventDefault();
   
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checksession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account){
        alert("Ops, verifique o usuário ou a senha");
        return;
    }

    if(account){
        if(account.password !== password){
            alert("Ops, verifique o usuário ou a senha");
            return;
        }

        saveSession(email, checksession)

        window.location.href = "home.html";
    }

})

//Criar Conta

document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault()

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

   if(email.length <5){
       alert("Preencha o campo com um email válido");
       return
   }

   if(password.length <4){
       alert("A Senha deve conter ao menos 4 caracteres");
       return
   }

   saveacount({
       login: email,
       password: password,
       transaction: []
   })

   myModal.hide();
   alert("Conta criada com sucesso");
})

function checklogged(){

    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }   

    if(logged){
        saveSession(logged, session);

        window.location.href = "home.html";
    }

}

function saveacount(Data){
    localStorage.setItem(Data.login, JSON.stringify(Data));
}

function saveSession(Data, saveSession){
    if(saveSession){
        localStorage.setItem("session", Data);
    }

    sessionStorage.setItem("logged", Data);

}

function getAccount(Key){
    const account = localStorage.getItem(Key);

    if(account){
        return JSON.parse(account);
    }

    return"";
}