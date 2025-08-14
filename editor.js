const previewBtn = document.querySelector("#preview-button");
const output = document.querySelector(".output");
const previewContent = document.querySelector('.preview-content'); // select content box
const closeButton = document.getElementById('close-preview');

const toolbarOptions = [
  [{ font: [] }],
  [{ header: [1, 2, 3] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  ["blockquote", "code-block"],
  ["link", "image", "video"],
  [{ align: [] }],
];

const quill = new Quill("#editor-container", {
  theme: "snow",
  modules: {
    toolbar: toolbarOptions,
  },
});

previewBtn.addEventListener("click", () => {
  const content = quill.root.innerHTML;
  output.classList.add("active");

  setTimeout(() => {
    previewContent.textContent = content; // ← shows HTML as text
  }, 200);
});

closeButton.addEventListener('click', () => {
  output.classList.remove('active');
  previewContent.innerHTML = ''; // optional: clear the content when closing
});
