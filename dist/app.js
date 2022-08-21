import { ImageComponent } from "./components/page/item/image.js";
import { PageComponent } from "./components/page/page.js";
class App {
    constructor(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        const image = new ImageComponent("Image Title", "https://cdn.pixabay.com/photo/2020/01/16/17/32/pokemon-4771238_960_720.jpg");
        image.attachTo(appRoot, "beforeend");
    }
    addElement(liComponent) {
        this.page.attachTo(liComponent);
    }
}
new App(document.querySelector(".document"));
