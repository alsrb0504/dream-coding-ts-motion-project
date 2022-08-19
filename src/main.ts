const btns: NodeListOf<HTMLElement> = document.querySelectorAll(".header-btn");

const formPopup: HTMLElement | null = document.querySelector(".form-box");
const formCloseBtn: HTMLElement | null = document.querySelector(".close-btn");
const formSubmitBtn = document.querySelector("submit-btn");
const formChange = document.querySelector(".form-input-change");

const overlay: HTMLElement | null = document.querySelector(".overlay");

// type btnName = "image-btn" | "video-btn" | "note-btn" | "task-btn";

/*
  form 여는 함수
*/
function openForm(e: Event) {
  const target = e.target as Element;
  const btn_name: string = target.classList[1];

  if (btn_name === "note-btn" || btn_name === "task-btn") {
    formChange!.innerHTML = `
      <label for="body">Body</label>
      <textarea name="body" id="" cols="20" rows="10"></textarea>
    `;
  } else {
    formChange!.innerHTML = `
      <label for="url">URL</label>
      <input type="text" />
    `;
  }

  formPopup?.classList.remove("invisible");
  overlay?.classList.remove("invisible");
}

/*
  form 닫는 함수
*/
function closeForm() {
  formPopup?.classList.add("invisible");
  overlay?.classList.add("invisible");
}

btns.forEach((btn) => {
  btn.addEventListener("click", openForm);
});

overlay?.addEventListener("click", closeForm);
formCloseBtn?.addEventListener("click", closeForm);

// 추후 폼 제출로 수정
formSubmitBtn?.addEventListener("click", closeForm);
