document.getElementById("signIn").onclick = function(){
    var userName = document.getElementById("userName").value;
    var Phone = document.getElementById("Phone").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    document.getElementById("signingInBtn").style.display = "block";
    document.getElementById("signIn").style.display = "none";

    // Create a new user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // User creation successful
        var user = userCredential.user;
        var userid = user.uid;
        
        // Store additional user data in Firestore
        firebase.firestore().collection("users").doc(userid).set({
            userName: userName,
            Phone: Phone,
            email: email,
            userid: userid,
            // Store server-side timestamp for when the account was created
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            // Redirect to signed-in page
            window.location.href = "signedin.html";
        }).catch((error) => {
            // Error handling for Firestore data storage
            console.error("Error storing user data:", error);
            // Display error message to the user
            swal("Sign Up error", "An error occurred while creating your account.", "error");
            // Revert button states
            document.getElementById("signingInBtn").style.display = "none";
            document.getElementById("signIn").style.display = "block";
        });
    })
    .catch((error) => {
        // Error handling for Firebase authentication
        var errorMessage = error.message;
        console.error("Error creating user:", errorMessage);
        // Display error message to the user
        swal("Sign Up error", errorMessage, "error");
        // Revert button states
        document.getElementById("signingInBtn").style.display = "none";
        document.getElementById("signIn").style.display = "block";
    });
};