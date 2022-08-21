import { ImageComponent } from "./components/page/item/image.js";
import { PageComponent } from "./components/page/page.js";

class App {
  private readonly page: PageComponent;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);

    const image = new ImageComponent(
      "Image Title",
      "https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_960_720.jpg"
    );
    image.attachTo(appRoot, "beforeend");
  }

  addElement(liComponent: HTMLElement) {
    this.page.attachTo(liComponent);
  }
}

new App(document.querySelector(".document")! as HTMLElement);
