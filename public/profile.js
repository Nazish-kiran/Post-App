// Import Firebase functions
import {
  auth,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "./firebase.js";
// DOM Elements
const logOutBtn = document.querySelector(".logOut-btn");
const changeNameBtn = document.querySelector(".chnage-name-btn");
const displayNew = document.querySelector(".dp-name-new");
const profilePictures = document.querySelectorAll(".profile-pict");
const displayName = document.querySelector(".dp-name-p");
const camera = document.querySelector(".camera-icon");
const changeImageInp = document.getElementById("file2")
const toast = document.getElementById("snackbar");

let newImg = changeImageInp.files[0]
const toastMessage = (message) => {
  toast.innerText = message;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
};

// Get the user object from localStorage
const changeName = () => {
  let newName = displayNew.value;
  updateProfile(auth.currentUser, {
    displayName: newName , 
    photoURL: newImg
  })
    .then(() => {
      toastMessage("profile updated");
      userLocal.name = newName;
      userLocal.picture = newImg
      localStorage.setItem("userl", JSON.stringify(userLocal));
      console.log(newImg);
      
    })
    .catch((error) => {
      toastMessage("profile cannot be updated");
    });
};
const userLocal = JSON.parse(localStorage.getItem("userl")) || {};
// Initialize the input field with the stored name on page load
if (userLocal.name) {
  displayNew.value = userLocal.name; // Set input field to stored name
} else {
  displayNew.value = "Anonymous"; // Default to empty if no name exists
}
// Chnage profile pic

onAuthStateChanged(auth, (user) => {
  if (user || userLocal) {
    if (userLocal.name) {
      displayName.innerHTML = userLocal.name || "Anonymous";
    }
    if (profilePictures) {
      profilePictures.forEach((img) => {
        img.src = user.photoURL || "images/anonymous.png";
      });
    }
  } else {
    window.location.href = "https://aura-posting-web.web.app";
  }
});

// Logout function
const logOut = () => {
  localStorage.clear();
  signOut(auth)
    .then(() => {
      window.location.href = "https://aura-posting-web.web.app";
    })
    .catch((error) => {
      toastMessage("Error during logout:", error.message);
    });
};

// Add click event listener to the Logout button
if (logOutBtn) {
  logOutBtn.addEventListener("click", logOut);
} else {
  console.error("Logout button not found in the DOM.");
}
const changeImage = () => {
  changeImageInp.click()
};


changeNameBtn.addEventListener("click", changeName);
camera.addEventListener("click", changeImage);
