import { InputDialog } from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponenet } from "./components/page/item/video.js";
import { PageComponent, PageItemComponent, } from "./components/page/page.js";
class App {
    constructor(appRoot, dialogRoot) {
        this.dialogRoot = dialogRoot;
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);
        this.bindElementToDialog("#new-image", MediaSectionInput, (input) => {
            return new ImageComponent(input.title, input.url);
        });
        this.bindElementToDialog("#new-video", MediaSectionInput, (input) => {
            return new VideoComponenet(input.title, input.url);
        });
        this.bindElementToDialog("#new-note", TextSectionInput, (input) => {
            return new NoteComponent(input.title, input.body);
        });
        this.bindElementToDialog("#new-todo", TextSectionInput, (input) => {
            return new TodoComponent(input.title, input.body);
        });
    }
    bindElementToDialog(selector, inputComponent, makeSection) {
        const element = document.querySelector(selector);
        element.addEventListener("click", () => {
            const dialog = new InputDialog();
            const input = new inputComponent();
            dialog.addChild(input);
            dialog.attachTo(this.dialogRoot);
            dialog.setCloseListener(() => {
                dialog.removeFrom(this.dialogRoot);
            });
            dialog.setSubmitListener(() => {
                const video = makeSection(input);
                this.page.addChild(video);
                dialog.removeFrom(this.dialogRoot);
            });
        });
    }
    addElement(liComponent) {
        this.page.attachTo(liComponent);
    }
}
new App(document.querySelector(".document"), document.body);
