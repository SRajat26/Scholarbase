
function genTextSect() {
    const wrapper = document.createElement("div");
    wrapper.className = "subsection-wrapper";

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Subsection Title";
    titleLabel.htmlFor = "sub-tit";
    titleLabel.className = "sub-tit";

    const titleInput = document.createElement("input");
    titleInput.className = "sub-data";
    titleInput.name = "sub-tit";
    titleInput.id = "sub-tit";
    titleInput.placeholder = "Subsection Title";

    const descLabel = document.createElement("label");
    descLabel.textContent = "Subsection Content";
    descLabel.htmlFor = "sub-desc";
    descLabel.className = "sub-tit";

    const descContent = document.createElement("textarea");
    descContent.name = "sub-desc";
    descContent.id = "sub-desc";
    descContent.className = "cont-area";
    descContent.placeholder = "Subsection Content";

    wrapper.appendChild(titleLabel);
    wrapper.appendChild(titleInput);
    wrapper.appendChild(descLabel);
    wrapper.appendChild(descContent);

    const container = document.getElementById("content-area");
    container.appendChild(wrapper);
    console.log("text section added");
}

function genImgSect() {
    const wrapper = document.createElement("div");
    wrapper.className = "subsection-wrapper";

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Image Title";
    titleLabel.htmlFor = "img-tit";
    titleLabel.className = "sub-tit";

    const titleInput = document.createElement("input");
    titleInput.className = "sub-data";
    titleInput.name = "img-tit";
    titleInput.id = "img-tit";
    titleInput.placeholder = "Image Title";

    const linkLabel = document.createElement("label");
    linkLabel.textContent = "Image Link";
    linkLabel.htmlFor = "img-link";
    linkLabel.className = "sub-tit";

    const linkInput = document.createElement("input");
    linkInput.className = "sub-data";
    linkInput.name = "img-link";
    linkInput.id = "img-link";
    linkInput.placeholder = "Image Link";

    wrapper.appendChild(titleLabel);
    wrapper.appendChild(titleInput);
    wrapper.appendChild(linkLabel);
    wrapper.appendChild(linkInput);

    const container = document.getElementById("content-area");
    container.appendChild(wrapper);
    console.log("image section added");
}

function genVidSect() {
    const wrapper = document.createElement("div");
    wrapper.className = "subsection-wrapper";

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Video Title";
    titleLabel.htmlFor = "vid-tit";
    titleLabel.className = "sub-tit";

    const titleInput = document.createElement("input");
    titleInput.className = "sub-data";
    titleInput.name = "vid-tit";
    titleInput.id = "vid-tit";
    titleInput.placeholder = "Video Title";

    const linkLabel = document.createElement("label");
    linkLabel.textContent = "Video Link";
    linkLabel.htmlFor = "vid-link";
    linkLabel.className = "sub-tit";

    const linkInput = document.createElement("input");
    linkInput.className = "sub-data";
    linkInput.name = "vid-link";
    linkInput.id = "vid-link";
    linkInput.placeholder = "Video Link";

    wrapper.appendChild(titleLabel);
    wrapper.appendChild(titleInput);
    wrapper.appendChild(linkLabel);
    wrapper.appendChild(linkInput);

    const container = document.getElementById("content-area");
    container.appendChild(wrapper);
    console.log("video section added");
}
import { db, setDoc, doc } from './firebase-config.js';


const submit= document.querySelector(".submit");
submit.addEventListener("click",()=>{
    const title= document.querySelector("#Title")
    const subject= document.querySelector("#Subject");
    const unit= document.querySelector("#Unit");
    const section= document.querySelectorAll(".Section");

    let ob={};
    ob.title= title.value;
    ob.unit= unit.value;
    ob.id= title.value.replace(/\s+/g, "");
    ob.subject = subject.value;

    let sections=[];
    let i=0;
    for(let sec of section){
        const subtit= sec.querySelector(".sub-tit");
        const subdesc= sec.querySelector(".sub-content");
        const sectionObj = {};
        sectionObj.title = subtit.value;

        if(sec.classList.contains("img")){
            sectionObj.src = subdesc.value;
            sectionObj.type = "image";
        }
        else if(sec.classList.contains("video")){
            sectionObj.source = subdesc.value;
            sectionObj.type = "video";
        }
        else {
            sectionObj.desc = subdesc.value;
            sectionObj.type = "text";
        }
        sections[i++] = sectionObj;
    }
    ob.section= sections;

    upload(ob);
})

async function upload(ob){
    await setDoc(doc(db, ob.subject, ob.id), ob);
}

