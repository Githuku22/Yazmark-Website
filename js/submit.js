//check if the user has logged in
firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        //if user is logged in




        //logout the user
        document.getElementById("logout").onclick =  function(){
            firebase.auth().signOut().then(()=>{
                window.location.href = "login.html"
            })
        }


        //read the user who is logged in
        //find user id
        var userid = user.uid;


        firebase.firestore().collection("users").doc(userid).get().then((doc) =>{


            var companyName =  doc.data().companyname;


            document.getElementById("username").innerText = companyName;
        })
        //end




        //sending income data to firestore
        document.getElementById("submitData").onclick = function(){
            var image = document.getElementById("image").value;
            var title = document.getElementById("enterTitle").value;
            var description = document.getElementById("enterDescription").value;
       
            document.getElementById("submitting").style.display = "block";
            document.getElementById("submitData").style.display = "none";

            var idonurl= decodeURIComponent(window.location.search);
            var recID= idonurl.substring(1);

            const imgProduct = document.querySelector('#image');
            const imgProductFile = imgProduct.files[0];
            const ProductImages = "Photo";
            // Check if a file is selected
            if (!imgProductFile) {
                return;
            }
            const storageRef = firebase.storage().ref('Images/' + ProductImages + '/');
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.onload = function () {
                    const uploadTask = storageRef.child(imgProductFile.name).put(imgProductFile);
                    uploadTask.on('state_changed',
                        function (snapshot) {
                            // Handle upload progress
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            const roundedOffProgress = Math.round(progress);
                            console.log(roundedOffProgress)
                        },
                        function (error) {
                            // Handle unsuccessful uploads
                        },
                        function () {
                            // Handle successful upload
                            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                                const newimgProduct = firebase.firestore().collection('servicedetails').doc(recID);
                                newimgProduct.set({
                                    photoURL: downloadURL,
                                    description:description,
                                    title: title,
                                    recID:recID,
                    
                    
                                    // Add more fields if needed
                                }).then(function () {
                                    // Retrieve the generated document ID
                                    const docId = newimgProduct.id;
                                }).catch(function (error) {
                                    console.error('Error saving image data:', error);
                                });
                            });
                        }
                    );
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(imgProductFile);
       
       
        }
        //


    }else{
        //if user is not logged in
        window.location.href = "login.html"
    }
})

