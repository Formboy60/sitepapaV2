import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import {
  getIdToken,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAM7nnMbiDUGOD60d8RrggFg1PDzIFz_JU",
  authDomain: "site-papa-408d2.firebaseapp.com",
  projectId: "site-papa-408d2",
  storageBucket: "site-papa-408d2.appspot.com",
  messagingSenderId: "164668406098",
  appId: "1:164668406098:web:dedec3a48a7e17854ca28b"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth();



//////// login firebase /////////

export function login(email, password, url) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      getToken.then((token) => {
        localStorage.setItem("token", token);
        document.location.href = url
      });

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}


//////// is login firebase ///////

export function isLogin(notloged) {


  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      return true
      // ...
    } else {
      document.location.href = notloged
      return false
    }
  });
}


/////// storage firebase ///////

const storage = getStorage();


export function uploadFile(file, name, selector) {
  const storageRef = ref(storage, name);
  const uploadTask = uploadBytesResumable(storageRef, file);


  uploadTask.on('state_changed',
    (snapshot) => {

    },
    (error) => {

    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL)
        selector.value = downloadURL

      });
    }
  );
}


////// token firebase /////

export const getToken = new Promise((resolve, reject) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const {
        currentUser
      } = auth;
      const token = await getIdToken(currentUser, true);

      resolve(token);
    }
  });
});