"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("Hello world");
const qs = (str) => document.querySelector(str);
const backendHost = "https://linked-extension-backend-9d4747fc111c.herokuapp.com";
const generateMessage = (profile) => `Below is my profile content can you suggest how to improve it? ${profile}`;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "open-dialog") {
        console.log("Add section called");
        openDialog();
    }
    if (message === "show-alert") {
        alert("This extenion only work on profile pages of linkedin");
    }
});
const loader = document.createElement("div");
loader.classList.add("ext-loader");
const link1 = document.createElement("link");
link1.rel = "preconnect";
link1.href = "https://fonts.googleapis.com";
const link2 = document.createElement("link");
link2.rel = "preconnect";
link2.href = "https://fonts.googleapis.com";
link2.crossOrigin = "anonymous";
const link3 = document.createElement("link");
link3.href =
    "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap";
window.addEventListener("load", () => {
    document.head.appendChild(link1);
    document.head.appendChild(link2);
    document.head.appendChild(link3);
});
function openDialog() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = window.location.href;
        const contentElement = qs("#profile-content");
        console.log(document.querySelector("#profile-content"), "profile content");
        if (!contentElement)
            return;
        const message = generateMessage(contentElement.innerText);
        const closeButton = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        closeButton.addEventListener("click", (e) => {
            container.remove();
        });
        closeButton.classList.add("ext-close-btn");
        closeButton.setAttribute("viewBox", "0 0 20 20");
        closeButton.setAttribute("height", "20");
        closeButton.setAttribute("width", "20");
        closeButton.setAttribute("fill", "white");
        closeButton.innerHTML =
            '<path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"></path>';
        const container = document.createElement("div");
        container.classList.add("ext-container");
        const extHeader = document.createElement("div");
        extHeader.classList.add("ext-header");
        extHeader.innerHTML = `<div class="ext-title">Linkedin Profile Suggestions</div>`;
        extHeader.appendChild(closeButton);
        document.body.appendChild(container);
        container.appendChild(extHeader);
        container.appendChild(loader);
        const response = yield fetch(`${backendHost}/process`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });
        const data = yield response.json();
        const lines = data.choices[0].message.content.split("\n").filter(Boolean);
        console.log("lines", lines);
        container.removeChild(loader);
        const list = document.createElement("li");
        list.classList.add("ext-list");
        // list.innerhtml += `<div class="ext-main-heading">${lines[0]}</div>`;
        container.appendChild(list);
        for (let i = 1; i < lines.length - 1; i++) {
            const item = lines[i];
            const [heading, text] = item.split(":");
            const html = `<li class="ext-suggestion"><b class="ext-heading">${heading.replace(/\d+\./, "")}:</b><span class="ext-text">${text}</span></li>`;
            list.innerHTML += html;
        }
    });
}
