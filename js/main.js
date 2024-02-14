
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

          var userName =  doc.data().userName;

          document.getElementById("username").innerText = userName;
      })
      //end

       //sending expense data to firestore
      //  document.getElementById("submitData").onclick = function(){
      //     var date = document.getElementById("date").value;
      //     var amount = document.getElementById("amount").value;
      //     var expenseDesc = document.getElementById("expenseDesc").value;
      
      //     document.getElementById("submitting").style.display = "block";
      //     document.getElementById("submitData").style.display = "none";

      //     var sendExpense= firebase.firestore().collection("expenses").doc();
      //     sendExpense.set({

      //         date:date,
      //         amount:amount,
      //         expenseDesc: expenseDesc,
      //         userid:userid,
      //         docId:sendExpense.id

      //     }).then(()=>{
      //         window.location.reload();
      //     })
      
      
      // }


  }else{
      //if user is not logged in
      window.location.href = "login.html"
  }
})

// firebase.firestore().collection("servicedetails").get().then((documentSnapshot)=>{
         
          

//     var content = '';
//     documentSnapshot.forEach((doc)=>{
//         var description = doc.data().description;
//         var title = doc.data().title;
//         var image = doc.data().photoURL;
//         var docid = doc.data().docid;

//         content += '<div class="fuel" id="'+docid+'">';
//         content += '   <img src="' + image + '" alt="Image">';
//         content += '   <h2>' + title + '</h2>';
//         content += '   <p>' + description + '</p>';
//         content += '   <div class="editContent">';
//         content += '       <button class="delete" class="readmore" onclick="deleteDiv(\'' + docid + '\')">Delete</button>';
//         content += '       <button class="edit" class="readmore" onclick="EditPage(\'' + docid + '\')" id="serviceContent1"> Edit </button>';
//         content += '   </div>';
//         content += '</div>';

     
// })
// $(".our-services-details1").append(content);

// })

firebase.firestore().collection("servicedetails").get().then((documentSnapshot) => {
  var content = '';
  documentSnapshot.forEach((doc) => {
      var description = doc.data().description;
      var title = doc.data().title;
      var image = doc.data().photoURL;
      var docid = doc.id; // Use doc.id to get the document ID
      
      content += '<div class="fuel" id="'+ docid +'">';
      content += '   <img src="' + image + '" alt="Image">';
      content += '   <h2>' + title + '</h2>';
      content += '   <p>' + description + '</p>';
      content += '   <div class="editContent">';
      content += '       <button class="delete" class="readmore" onclick="deleteDiv(\'' + docid + '\')">Delete</button>';
      content += '       <button class="edit" class="readmore" onclick="EditPage(\'' + docid + '\')" id="serviceContent1"> Edit </button>';
      content += '   </div>';
      content += '</div>';
  });
  $(".our-services-details1").append(content);
});

function EditPage(docid){
   window.location.href="submit.html" +"?"+ docid
  
  }
// Delete the item from Firebase

function deleteDiv(docid) {
  // Ensure correct docid is received
  console.log("Deleting document with ID:", docid);
  
  // Delete document from Firestore
  firebase.firestore().collection("servicedetails").doc(docid).delete()
  .then(() => {
      console.log("Document successfully deleted");
      
      // Remove corresponding HTML element
      var rowToDelete = document.getElementById(docid);
      if (rowToDelete) {
          rowToDelete.remove();
          console.log("Corresponding HTML element removed");
      } else {
          console.error("Corresponding HTML element not found");
      }
  })
  .catch((error) => {
      console.error("Error removing document: ", error);
  });
}
 

function toggleMenu() {
    const listItems = document.querySelector('.listitems');
    listItems.style.display = (listItems.style.display === 'none' || listItems.style.display === '') ? 'flex' : 'none';
}

function hideMenu() {
    const listItems = document.querySelector('.listitems');
    listItems.style.display = 'none';
}

const textElement = document.getElementById('typewriter');
const textContent = textElement.textContent;
textElement.textContent = '';

let i = 0;
const intervalId = setInterval(() => {
  textElement.textContent += textContent[i];
  i++;

  if (i === textContent.length) {
    clearInterval(intervalId);
    
  }
  
}, 100);

function showDetails(detailsId) {
    document.getElementById(detailsId).style.display = 'block';
  }
  
  function hideDetails(detailsId) {
    document.getElementById(detailsId).style.display = 'none';
  }

  
//check if the user has logged in
