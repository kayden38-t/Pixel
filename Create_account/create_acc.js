import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

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
const auth = getAuth(app);
const dB = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Handle Email/Password Sign Up
const signupForm = document.getElementById('signup-form');
const messageBox = document.getElementById('message-box'); // Error message display

signupForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Reset message box content
    messageBox.textContent = '';
    messageBox.style.display = 'none';

    // Get input values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value.trim();

    // Check form validity
    if (signupForm.checkValidity()) {
        // Create a new user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Store additional user info in Firestore
                const userDocRef = doc(dB, 'users', user.uid);
                setDoc(userDocRef, {
                    name: name,
                    email: user.email,
                    createdAt: new Date(),
                });

                // Redirect to sign-in page
                window.location.href = "../Sign_in/sign_in.html";
            })
            .catch((error) => {
                displayMessage(error.message); // Display error message
            });
    } else {
        signupForm.reportValidity(); // Trigger browser's form validation UI
    }
});

// Handle Google Sign-Up
const googleSignupButton = document.querySelector('.signin_options a img[alt="Google"]');
googleSignupButton.parentElement.addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent the default link behavior

    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Check if the user already exists in Firestore
        const userDocRef = doc(dB, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            // User already exists, redirect to sign-in or home page
            displayMessage("User already exists, redirecting to Sign in...");
            setTimeout(() => {
                window.location.href = "../Sign_in/sign_in.html"; // Redirect to sign-in page
            }, 2000);
        } else {
            // New user, save user info in Firestore
            await setDoc(userDocRef, {
                name: user.displayName,
                email: user.email,
                createdAt: new Date(),
            });

            // Redirect to home page after successful Google sign-up
            displayMessage("Account created with Google! Redirecting...");
            setTimeout(() => {
                window.location.href = "../Home_page/home_page.html"; // Redirect to home page
            }, 2000);
        }

    } catch (error) {
        displayMessage(`Google Sign-In Error: ${error.message}`); // Show error message
    }
});

// Handle Facebook Sign-Up (always display failure message)
const facebookSignupButton = document.querySelector('.signin_options a img[alt="Facebook"]');
facebookSignupButton.parentElement.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default link behavior
    displayMessage("Authorization failed. Please try another sign-in method.");
});

// Function to display error or success messages in the message box
function displayMessage(message) {
    messageBox.textContent = message;
    messageBox.style.display = 'block';
}
