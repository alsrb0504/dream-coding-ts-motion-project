const btns: NodeListOf<HTMLElement> = document.querySelectorAll(".header-btn");

const form = document.querySelector(".form-container");
const formPopup = document.querySelector(".form-box");
const formCloseBtn = document.querySelector(".close-btn");
const formSubmitBtn = document.querySelector(".submit-btn");
const formChange = document.querySelector(".form-input-change");

const overlay = document.querySelector(".overlay");

const cardContainer = document.querySelector(".card-container");

type btnName = "image-btn" | "video-btn" | "note-btn" | "task-btn";

class btnState {
  selectedBtn: btnName | null = null;

  setBtn(btn: btnName | null) {
    this.selectedBtn = btn;
  }

  getBtn(): btnName | null {
    return this.selectedBtn;
  }
}

const btnClass = new btnState();

cardContainer?.addEventListener("dragover", () => {
  console.log("dragover");
});

const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  // 삭제 기능
  const deleteBtn = card.querySelector(".card-delete button");
  deleteBtn?.addEventListener("click", () => {
    card.remove();
  });

  // 드래그 앤 드랍
  card.setAttribute("draggable", "true");

  card.addEventListener("dragstart", () => {
    card.classList.add("dragging");
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
  });

  card.addEventListener("dragover", (e) => {
    e.preventDefault();
    console.log("drop");

    // console.log(e);
  });
});

/*
  form 여는 함수
*/
function openForm(e: Event) {
  const target = e.target as Element;
  const btn_name: string = target.classList[1];

  btnClass.setBtn(btn_name as btnName);

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

  btnClass.setBtn(null);
}

/*
  form 카드 생성 함수
*/
function createCard(title: string, sub: string) {
  const newCard: HTMLElement = document.createElement("li");
  newCard.setAttribute("class", "card");
  newCard.setAttribute("draggable", "true");

  const curBtn = btnClass.getBtn();

  if (curBtn === "image-btn") {
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
  } else if (curBtn === "video-btn") {
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
  } else {
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

  // 삭제 기능 추가
  const deleteBtn = newCard.querySelector(".card-delete button");
  deleteBtn?.addEventListener("click", () => {
    newCard.remove();
  });

  // 드래그 앤 드롭
  newCard.addEventListener("dragover", () => {
    console.log("dragover");
  });

  newCard.addEventListener("drop", (e) => {
    e.preventDefault();
    console.log("drop");
  });

  cardContainer?.append(newCard);
  closeForm();
}

btns.forEach((btn) => {
  btn.addEventListener("click", openForm);
});

overlay?.addEventListener("click", closeForm);
formCloseBtn?.addEventListener("click", closeForm);

/*
  새로운 카드 생성 이벤트 등록
*/
form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const input1 = document.querySelector(
    ".form-input-title input"
  ) as HTMLInputElement;

  const input2_label = document.querySelector(
    ".form-input-change label"
  ) as HTMLLabelElement;

  const input2_text = input2_label.innerText;
  let input2;

  if (input2_text === "URL") {
    input2 = document.querySelector(
      ".form-input-change input"
    ) as HTMLInputElement;
  } else {
    input2 = document.querySelector(
      ".form-input-change textarea"
    ) as HTMLTextAreaElement;
  }

  createCard(input1.value, input2.value);
});

// cardContainer?.addEventListener("dragenter", () => {
//   console.log("drag!!");
// });
