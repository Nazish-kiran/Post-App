import {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  provider,
  signInWithPopup,
  onAuthStateChanged,
} from "./firebase.js";

const submittBtn = document.querySelector(".btn1");
const signBtn = document.querySelector(".btn2");
const googleBtn = document.querySelector(".btn3");
const useremail = document.querySelector(".email");
const userpassword = document.querySelector(".password");
const signEmail = document.querySelector(".email2");
const signPassword = document.querySelector(".pass2");
const confirmPassword = document.querySelector(".pass3");
const toast = document.getElementById("snackbar");

const changedUrl = () => {
  window.location.replace("https://aura-posting-web.web.app/home.html");
  console.log("done");
};
const toastMessage = (message) => {
  toast.innerText = message;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
};
const createUser = (e) => {
  let email = signEmail.value;
  let password = signPassword.value;
  let confPassword = confirmPassword.value;
  if (password == confPassword) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        toastMessage(error.message);
      });
  } else {
    toastMessage("passwords dont match");
  }
};
const signInUser = (e) => {
  let email = useremail.value;
  let password = userpassword.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);

      console.log("exist");
      localStorage.setItem(
        "userl",
        JSON.stringify({ email: user.email, id: user.uid })
      );
    })
    .catch((error) => {
      toastMessage(error.message);
    });
  setTimeout(changedUrl, 2000);
};
const googleUser = (e) => {
  console.log("Google Sign-In Button Clicked");
  e.preventDefault();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      if (!localStorage.getItem("userl")) {
        localStorage.setItem(
          "userl",
          JSON.stringify({
            email: user.email,
            id: user.uid,
            name: user.displayName,
            picture: user.photoURL,
          })
        );
      }
      console.log(user);

      setTimeout(changedUrl, 2000);
    })
    .catch((error) => {
      toastMessage(error.message);
    });
};
submittBtn.addEventListener("click", signInUser);
signBtn.addEventListener("click", createUser);
googleBtn.addEventListener("click", googleUser);

const userLocal = JSON.parse(localStorage.getItem("userl"));
onAuthStateChanged(auth, (user) => {
  if (user && userLocal) {
    setTimeout(changedUrl, 2000);
    const uid = user.uid;
  } else {

  }
});

export { auth, onAuthStateChanged };
