// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();

const loginForm = document.getElementById('loginForm');

// Handle form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Sign in with email and password
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            alert('Login successful!');
            // Redirect to the main page if login is successful
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Login failed: ', error);
            alert('Login failed. Please check your credentials.');
        });
});
