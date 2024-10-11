import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

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

// Connect to Form Submission
const signupForm = document.getElementById('signup-form'); // Get the form
const messageBox = document.getElementById('message-box');

signupForm.addEventListener("submit", async (event) => {
    messageBox.textContent = '';
    messageBox.style.display = 'none';

    // Check if the form is valid
    if (signupForm.checkValidity()) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value.trim();

        try {
            // Create a new user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user; // Get the signed-in user

            // Store additional user info in Firestore
            await setDoc(doc(dB, "users", user.uid), {
                name: name,
                email: email,
                createdAt: serverTimestamp()
                // You can add other fields as necessary
            });

            // Redirect to sign-in page after successful sign-up
            window.location.href = "../Sign_in/sign_in.html";
        } catch (error) {
            const errorMessage = error.message;
            displayMessage(errorMessage); // Show error message in the message box
        }
    } else {
        signupForm.reportValidity();
    }
});

// Function to display messages in the message box
function displayMessage(message) {
    messageBox.textContent = message; // Set the message text
    messageBox.style.display = 'block'; // Show the message box
}
