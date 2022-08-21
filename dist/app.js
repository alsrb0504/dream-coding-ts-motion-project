import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponenet } from "./components/page/item/video.js";
import { PageComponent } from "./components/page/page.js";
class App {
    constructor(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        const image = new ImageComponent("Image Title", "https://cdn.pixabay.com/photo/2020/01/16/17/32/pokemon-4771238_960_720.jpg");
        image.attachTo(appRoot, "beforeend");
        const note = new NoteComponent("Note_title", "note__desc");
        note.attachTo(appRoot, "beforeend");
        const todo = new TodoComponent("Todo_title", "todo_body");
        todo.attachTo(appRoot, "beforeend");
        const video = new VideoComponenet("Video_title", "https://www.youtube.com/embed/rJVYb2Ib8DU");
        video.attachTo(appRoot, "beforeend");
    }
    addElement(liComponent) {
        this.page.attachTo(liComponent);
    }
}
new App(document.querySelector(".document"));
