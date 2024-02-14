document.getElementById("signIn").onclick = function(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    document.getElementById("loadbtn").style.display = "block";
    document.getElementById("signIn").style.display = "none";


    firebase.auth().signInWithEmailAndPassword(email, password).then((userCred)=>{

        window.location.href = "signedin.html"

    }).catch((error)=>{

        var errormessage = error.message;
        swal("Sign Up error",   `${errormessage}`  , "error");
        document.getElementById("signingInBtn").style.display = "none";
        document.getElementById("signIn").style.display = "block";

    })
}

