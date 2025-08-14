//ensure article is at destination
//update css
//link to html


import { db, collection, getDocs } from './firebase-config.js'

async function loadUnits(subject){
    console.log("Subject parameter:", subject);
    let UnitHash = {};
    const subref = collection(db, subject);
    const snapshot = await getDocs(subref);
    console.log("Snapshot size:", snapshot.size);
    
    const articles = [];
    
    snapshot.forEach((doc) => {
        console.log("Doc ID:", doc.id);
        console.log("Doc data:", doc.data());
        const docData = doc.data();
        
        // Filter out incomplete documents - UNCOMMENTED AND FIXED
        if (docData.unit && docData.order !== undefined && docData.title) {
            articles.push(docData);
        } else {
            console.log("Skipping incomplete document:", doc.id);
        }
    });
    
    console.log("Articles array:", articles);
    
    // Build the UnitHash
    for(let article of articles){       
        if (!UnitHash[article.unit]) 
            UnitHash[article.unit] = [];
        UnitHash[article.unit][article.order] = article;
    }
    
    console.log("Final UnitHash:", UnitHash);
    return UnitHash;
}

// MADE THIS FUNCTION ASYNC AND ADDED AWAIT
async function displayUnits(subject){
    const UnitHash = await loadUnits(subject);
    
    // Sidebar generation (simple version)
    let sidebar = document.querySelector('.sidebar');
    if (!sidebar) {
        sidebar = document.createElement('div');
        sidebar.className = 'sidebar';
        const main = document.querySelector('.main');
        main.parentNode.insertBefore(sidebar, main);
    } else {
        sidebar.innerHTML = '';
    }
    // For each unit, add a link to its section
    Object.keys(UnitHash).sort((a, b) => Number(a) - Number(b)).forEach(unitKey => {
        const unit = UnitHash[unitKey];
        if (!unit || unit.length === 0) return;
        const link = document.createElement('a');
        link.href = `#unit${unitKey}`;
        link.textContent = unit[0].unit || `Unit ${unitKey}`;
        sidebar.appendChild(link);
    });

    // Clear existing content first
    const main = document.querySelector('.main');
    main.innerHTML = '<div id="subject"></div>';
    
    // Add subject title
    const subjectDiv = document.getElementById('subject');
    const subjectTitle = document.createElement('h1');
    subjectTitle.textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
    subjectDiv.appendChild(subjectTitle);
    
    // Render each unit section
    for (let unitKey in UnitHash){
        const unit = UnitHash[unitKey];
        if (!unit || unit.length === 0) continue;
        const unitArea = document.createElement('div');
        unitArea.className = 'unit-area';
        unitArea.id = `unit${unitKey}`;
        const unitTitle = document.createElement('h2');
        unitTitle.textContent = unit[0].unit;
        unitArea.appendChild(unitTitle);
        const lectureList = document.createElement('ul');
        lectureList.className = 'lecture-list';
        for(let article of unit){
            const articleEle = document.createElement('li');
            const articleLink = document.createElement('a');
            articleLink.href = 'article.html?subject='+subject+'&articleId='+article.id;
            articleLink.textContent = article.title;
            articleEle.appendChild(articleLink);
            lectureList.appendChild(articleEle);
        }
        unitArea.appendChild(lectureList);
        main.appendChild(unitArea);
    }
}

// MADE THE EVENT LISTENER ASYNC TOO
window.addEventListener('load', async () => {
    const params = new URLSearchParams(window.location.search);
    const subject = params.get('subject');
    
    if (subject) {
        await displayUnits(subject); // ADDED AWAIT HERE
    } else {
        console.error('No subject parameter found in URL');
    }
})

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
