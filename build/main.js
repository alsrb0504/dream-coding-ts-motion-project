"use strict";
const btns = document.querySelectorAll(".header-btn");
const formPopup = document.querySelector(".form-box");
const formCloseBtn = document.querySelector(".close-btn");
const formSubmitBtn = document.querySelector("submit-btn");
const formChange = document.querySelector(".form-input-change");
const overlay = document.querySelector(".overlay");
// type btnName = "image-btn" | "video-btn" | "note-btn" | "task-btn";
/*
  form 여는 함수
*/
function openForm(e) {
    const target = e.target;
    const btn_name = target.classList[1];
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
}
btns.forEach((btn) => {
    btn.addEventListener("click", openForm);
});
overlay === null || overlay === void 0 ? void 0 : overlay.addEventListener("click", closeForm);
formCloseBtn === null || formCloseBtn === void 0 ? void 0 : formCloseBtn.addEventListener("click", closeForm);
// 추후 폼 제출로 수정
formSubmitBtn === null || formSubmitBtn === void 0 ? void 0 : formSubmitBtn.addEventListener("click", closeForm);
