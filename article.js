import { db, doc, getDoc } from './firebase-config.js'

function getUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    return {
        subject: params.get('subject'),
        articleId: params.get('articleId')
    };
}

async function loadArticleFromFirebase(subject, articleId){
    const docRef = doc(db, subject, articleId);
    const docSnap = await getDoc(docRef);  // Fixed: renamed variable and added await

    if (docSnap.exists()) {
        const articleData = docSnap.data();  // Fixed: renamed variable
        loadArticle(articleData);
    } else {
        console.log("No such document!");
    }
}

function loadArticle(articleData){  // Fixed: renamed parameter
    const contentArea = document.querySelector('#content-area');
    contentArea.innerHTML='';
    const articleTitle = articleData.title;
    document.title=articleTitle;
    const articleTit = document.createElement('div');
    articleTit.innerHTML = articleTitle;
    articleTit.className = 'article-title';
    contentArea.appendChild(articleTit);

    for (const section of articleData.section) {  // Fixed: added const
        const subsec = document.createElement('details');
        subsec.className = 'subsection';
        const secTitle = document.createElement('summary');
        secTitle.className = 'subhead';
        secTitle.innerHTML = section.title;
        subsec.appendChild(secTitle);
        const pre= document.createElement('pre');
        
        if (section.type == 'video') {
            // Parse the source and type from the string, if present
            let videoSrc = section.source;
            let videoType = '';

            // If the source contains 'type=', split it out
            if (videoSrc.includes('type=')) {
                // Example: "https://www.w3schools.com/html/mov_bbb.mp4 type='video/mp4'"
                const parts = videoSrc.split('type=');
                videoSrc = parts[0].trim();
                videoType = parts[1].replace(/['"]/g, '').trim();
            }

            const sectContent = document.createElement('video');
            sectContent.controls = true; // Add controls for usability
            sectContent.className = 'subbody';

            const source = document.createElement('source');
            source.src = videoSrc;
            if (videoType) {
                source.type = videoType;
            }
            sectContent.appendChild(source);

            // Fallback text for browsers that do not support the video tag
            sectContent.innerHTML += "Your browser does not support the video tag.";

            pre.appendChild(sectContent);
        }
        else if (section.type == 'image') {
            const sectContent = document.createElement('img');
            
            sectContent.className = 'subbody';
            sectContent.src=section.src;
            sectContent.style.maxHeight="40vh";
            sectContent.alt = section.title;  // Added alt text for accessibility
            pre.appendChild(sectContent);
        }
        else {
            const sectContent = document.createElement('div');
            sectContent.innerHTML = section.desc;
            sectContent.className = 'subbody';
            pre.appendChild(sectContent);
        }
        subsec.appendChild(pre);
        contentArea.appendChild(subsec);
    }
}

window.addEventListener('load', () => {
    const { subject, articleId } = getUrlParameters();    
    loadArticleFromFirebase(subject, articleId);
});

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
