function uploadproducts(){
    console.log("successful")
    var image=document.getElementById("imageuploader").value;
    var title=document.getElementById("titleupdate").value;
    var description=document.getElementById("Descriptionupdate").value;

    // var newProduct= firebase.firestore().collection("servicedetails").doc()
    // newProduct.set({
    //     image;
    // })
    const imgProduct = document.querySelector('#imageuploader');
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
                                const newimgProduct = firebase.firestore().collection('servicedetails').doc();
                                newimgProduct.set({
                                    photoURL: downloadURL,
                                    description:description,
                                    title: title,
                                    proID:newimgProduct.id
                    
                    
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
