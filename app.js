import { auth } from './firebase-config.js';
    import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';

    window.signIn = async function() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            showMessage('Please fill in both email and password', 'error');
            return;
        }

try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Signed in as:', user.email);
    showMessage(`Successfully signed in as ${user.email}`, 'success');
    localStorage.setItem("loggedIn", "true");
    // Close popup and update UI
    setTimeout(() => {
        closePopupAndUpdateUI();
    },300);
    
} catch (error) {
    console.error('Sign in error:', error.message);
    showMessage(`Sign in error: ${error.message}`, 'error');
}
};
window.signUp = async function() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            showMessage('Please fill in both email and password', 'error');
            return;
        }

        if (password.length < 6) {
            showMessage('Password should be at least 6 characters long', 'error');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Signed up as:', user.email);
            showMessage(`Successfully signed up as ${user.email}`, 'success');
            localStorage.setItem("loggedIn", "true");
            // Close popup and update UI
    setTimeout(() => {
        closePopupAndUpdateUI();
    },300);
        } catch (error) {
            console.error('Sign up error:', error.message);
            showMessage(`Sign up error: ${error.message}`, 'error');
        }
    };

    function showMessage(text, type) {
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
    window.addEventListener('DOMContentLoaded', () => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";

    if (loggedIn) {
        const headerLinks = document.querySelector('.header-links');
        if (!headerLinks) return;

        // Check if profile icon already exists to avoid duplicates
        const existingProfileIcon = document.getElementById('profile-icon');
        if (existingProfileIcon) return;

        // Remove Sign up and Login if they exist
        const headerLinksElements = headerLinks.querySelectorAll('.header-links-ele');
        headerLinksElements.forEach(link => {
            const linkText = link.textContent.trim();
            if (linkText === 'Sign up' || linkText === 'Login') {
                link.remove();
            }
        });

        // Add profile icon with dropdown
        const profileIcon = document.createElement('li');
        profileIcon.className = 'header-links-ele';
        profileIcon.id = 'profile-icon';
        profileIcon.innerHTML = `
            👤 Profile
            <ul>
                <li onclick="logout()">Logout</li>
                <li onclick="showProfile()">Profile</li>
            </ul>
        `;
        headerLinks.appendChild(profileIcon);
    }
});
