"use strict";
const btns = document.querySelectorAll(".header-btn");
const form = document.querySelector(".form-container");
const formPopup = document.querySelector(".form-box");
const formCloseBtn = document.querySelector(".close-btn");
const formSubmitBtn = document.querySelector(".submit-btn");
const formChange = document.querySelector(".form-input-change");
const overlay = document.querySelector(".overlay");
const cardContainer = document.querySelector(".card-container");
class btnState {
    constructor() {
        this.selectedBtn = null;
    }
    setBtn(btn) {
        this.selectedBtn = btn;
    }
    getBtn() {
        return this.selectedBtn;
    }
}
const btnClass = new btnState();
/*
  form 여는 함수
*/
function openForm(e) {
    const target = e.target;
    const btn_name = target.classList[1];
    btnClass.setBtn(btn_name);
    if (btn_name === "note-btn" || btn_name === "task-btn") {
        formChange.innerHTML = `
      <label for="body">Body</label>
      <textarea name="body" id="" cols="20" rows="10"></textarea>
    `;
    }
    else {
        formChange.innerHTML = `
      <label for="url">URL</label>
      <input type="text" />
    `;
    }
    formPopup === null || formPopup === void 0 ? void 0 : formPopup.classList.remove("invisible");
    overlay === null || overlay === void 0 ? void 0 : overlay.classList.remove("invisible");
}
/*
  form 닫는 함수
*/
function closeForm() {
    formPopup === null || formPopup === void 0 ? void 0 : formPopup.classList.add("invisible");
    overlay === null || overlay === void 0 ? void 0 : overlay.classList.add("invisible");
    btnClass.setBtn(null);
}
/*
  form 카드 생성 함수
*/
function createCard(title, sub) {
    const newCard = document.createElement("li");
    newCard.setAttribute("class", "card");
    const curBtn = btnClass.getBtn();
    console.log(curBtn);
    if (curBtn === "note-btn") {
        newCard.innerHTML = `
      <div class="card-info">
        <span class="title">${title}</span>
        <p class="description">${sub}</p>
      </div>
      <div class="card-delete">
        <button>X</button>
      </div>
    `;
    }
    else if (curBtn === "image-btn") {
        newCard.innerHTML = `
      <div class="card-img-container">
        <img
          src=${sub}
          alt="dummy-image"
        />
      </div>
      <div class="card-info">
        <span class="title">${title}</span>
      </div>
      <div class="card-delete">
        <button>X</button>
      </div>
    `;
    }
    else if (curBtn === "video-btn") {
        newCard.innerHTML = `
      <div class="card-iframe-container">
        <iframe
          width="560"
          height="315"
          src=${sub}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="card-info">
        <span class="title">${title}</span>
      </div>
      <div class="card-delete">
        <button>X</button>
      </div>
    `;
    }
    cardContainer === null || cardContainer === void 0 ? void 0 : cardContainer.append(newCard);
    closeForm();
}
btns.forEach((btn) => {
    btn.addEventListener("click", openForm);
});
overlay === null || overlay === void 0 ? void 0 : overlay.addEventListener("click", closeForm);
formCloseBtn === null || formCloseBtn === void 0 ? void 0 : formCloseBtn.addEventListener("click", closeForm);
// 추후 폼 제출로 수정
// formSubmitBtn?.addEventListener("click", createCard);
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input1 = document.querySelector(".form-input-title input");
    const input2_label = document.querySelector(".form-input-change label");
    const input2_text = input2_label.innerText;
    let input2;
    if (input2_text === "URL") {
        input2 = document.querySelector(".form-input-change input");
    }
    else {
        input2 = document.querySelector(".form-input-change textarea");
    }
    createCard(input1.value, input2.value);
    // console.log(input1.value);
    // console.log(input2.value);
});
