import {
  auth,
  onAuthStateChanged,
  db,
  collection,
  addDoc,
  getDocs,
  doc,
} from "./firebase.js";
let cloudName = "dpes6f7cl";
let uploadPreset = "aura-post-app";
const main = document.querySelector(".main");
const userLocal = JSON.parse(localStorage.getItem("userl"));
const uploadButton = document.getElementById("uploadButton");
const fileInput = document.getElementById("imageUploader");

onAuthStateChanged(auth, (user) => {
  if (userLocal || user) {
    const profilePicture = document.querySelector(".profile-pict");
    const displayName = document.querySelector(".dp-name-p");
    if (userLocal.name) {
      displayName.innerHTML = userLocal.name || "Anonymous";
    }
    profilePicture.src = user.photoURL || "images/anonymous.png";
  } else {
    window.location.href = "https://aura-posting-web.web.app";
  }
  uploadButton.addEventListener("click", function () {
    fileInput.click();
    let file = fileInput.files[0];
    if (file) {
      // Create a FormData object
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset); // You need to create an upload preset in your Cloudinary dashboard

      // Make the request to Cloudinary
      fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Image URL:", data.secure_url);
          let imageUrl = data.secure_url;
          addDoc(collection(db, "users"), {
            MainImageUrl: imageUrl,
          })
            .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
              loadImages();
            })
            .catch((e) => {
              console.error("Error adding document: ", e);
            });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  });
});

function loadImages() {
  const docRef = collection(db, "users");
  getDocs(docRef)
    .then((querySnapshot) => {
      main.innerHTML = "";
      console.log(666);

      querySnapshot.forEach((doc) => {
        console.log(`Document ID: ${doc.id}, Data:`, doc.data());
        main.innerHTML += `
         <div class="card mb-5" style="width: 18rem;">
      <div class="card-body d-flex gap-3">
      <img src="${
        userLocal.photoURL || "images/anonymous.png"
      }" class="rounded-circle" alt="Display Picture" width="25px" height="25px">
        <p class="card-text">${userLocal.name || "Anonymous"}</p>
      </div>
        <img src="${
          doc.data().MainImageUrl
        }" class="card-img-top" alt="Post Picture">
      </div>
      `;
      });
    })
    .catch((error) => {
      console.error("Error getting documents: ", error);
    });
}
document.addEventListener("DOMContentLoaded", () => {
  loadImages()
});
