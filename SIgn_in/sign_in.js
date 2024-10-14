import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbKffwMZiHwQB8lNJXjwqC9RZ_lbB-tcA",
    authDomain: "pixel-ed778.firebaseapp.com",
    projectId: "pixel-ed778",
    storageBucket: "pixel-ed778.appspot.com",
    messagingSenderId: "198674487606",
    appId: "1:198674487606:web:6fc6d1f13efe0fcce43b97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Auth
const googleProvider = new GoogleAuthProvider(); // Initialize Google provider

const loginForm = document.querySelector('form'); // Select the form element
const messageBox = document.getElementById('message-box'); // Get the message box

// Sign in with Email and Password
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Clear previous messages
    messageBox.textContent = '';
    messageBox.style.display = 'none'; // Hide the message box initially

    const email = document.getElementById('email').value.trim(); // Get email input value
    const password = document.getElementById('password').value; // Get password input value

    // Use the sign-in function
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user; // Get the signed-in user
            window.location.href = "../Home_page/home_page.html"; // Redirect to home page
        })
        .catch((error) => {
            const errorMessage = error.message;
            displayMessage(errorMessage); // Show error message in the message box
        });
});

// Handle Google Sign-In
const googleSignInButton = document.getElementById('google-signin');
googleSignInButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default link behavior

    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user; // Get the signed-in user
            window.location.href = "../Home_page/home_page.html"; // Redirect to home page
        })
        .catch((error) => {
            const errorMessage = error.message;
            displayMessage(`Google Sign-In Error: ${errorMessage}`); // Show error message
        });
});
const facebookSignInButton = document.getElementById('facebook-signin');
facebookSignInButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default link behavior
    displayMessage("Authorization failed. Please try another sign-in method."); // Display custom error message
});

// Function to display messages in the message box
function displayMessage(message) {
    messageBox.textContent = message; // Set the message text
    messageBox.style.display = 'block'; // Show the message box
}
