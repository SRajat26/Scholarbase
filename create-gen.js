function genTextSect(){
    const section = document.createElement("section");
    section.classList.add("Section", "text");

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Subsection Title";
    titleLabel.htmlFor = "sub-tit";
    titleLabel.className = "sub-label";
    
    const titleInput = document.createElement("input");
    titleInput.className = "sub-tit";
    titleInput.name = "sub-tit";
    titleInput.placeholder = "Subsection Title";

    const descLabel = document.createElement("label");
    descLabel.textContent = "Subsection Content";
    descLabel.htmlFor = "sub-desc";
    descLabel.className = "sub-label";
    
    const descContent = document.createElement("textarea");
    descContent.name = "sub-desc";
    descContent.className = "sub-content";
    descContent.placeholder = "Subsection Content";

    section.appendChild(titleLabel);
    section.appendChild(titleInput);
    section.appendChild(descLabel);
    section.appendChild(descContent);

    // Simply append to content-area
    const contentArea = document.getElementById("content-area");
    contentArea.appendChild(section);
    
    console.log("text section added");
}

function genImgSect(){
    const section = document.createElement("section");
    section.classList.add("Section", "img");

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Image Title";
    titleLabel.htmlFor = "img-tit";
    titleLabel.className = "sub-label";
    
    const titleInput = document.createElement("input");
    titleInput.className = "sub-tit";
    titleInput.name = "img-tit";
    titleInput.placeholder = "Image Title";

    const linkLabel = document.createElement("label");
    linkLabel.textContent = "Image Link";
    linkLabel.htmlFor = "img-link";
    linkLabel.className = "sub-label";
    
    const linkInput = document.createElement("input");
    linkInput.className = "sub-content";
    linkInput.name = "img-link";
    linkInput.placeholder = "Image Link";

    section.appendChild(titleLabel);
    section.appendChild(titleInput);
    section.appendChild(linkLabel);
    section.appendChild(linkInput);

    // Simply append to content-area
    const contentArea = document.getElementById("content-area");
    contentArea.appendChild(section);
    
    console.log("image section added");
}

function genVidSect(){
    const section = document.createElement("section");
    section.classList.add("Section", "video");

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Video Title";
    titleLabel.htmlFor = "vid-tit";
    titleLabel.className = "sub-label";
    
    const titleInput = document.createElement("input");
    titleInput.className = "sub-tit";
    titleInput.name = "vid-tit";
    titleInput.placeholder = "Video Title";

    const linkLabel = document.createElement("label");
    linkLabel.textContent = "Video Link";
    linkLabel.htmlFor = "vid-link";
    linkLabel.className = "sub-label";
    
    const linkInput = document.createElement("input");
    linkInput.className = "sub-content";
    linkInput.name = "vid-link";
    linkInput.placeholder = "Video Link";

    section.appendChild(titleLabel);
    section.appendChild(titleInput);
    section.appendChild(linkLabel);
    section.appendChild(linkInput);

    // Simply append to content-area
    const contentArea = document.getElementById("content-area");
    contentArea.appendChild(section);
    
    console.log("video section added");
}