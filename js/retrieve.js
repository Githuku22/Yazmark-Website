
document.getElementById("signUpretrieve").onclick=function(){

  
    var email=document.getElementById("email").value;
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        swal("Successful!", "Retrieve Email Sent!", "success");
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
}