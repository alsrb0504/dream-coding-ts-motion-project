import { Component } from "./components/component.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponenet } from "./components/page/item/video.js";
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from "./components/page/page.js";

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const image = new ImageComponent(
      "Image Title",
      "https://cdn.pixabay.com/photo/2020/01/16/17/32/pokemon-4771238_960_720.jpg"
    );
    this.page.addChild(image);

    const note = new NoteComponent("Note_title", "note__desc");
    this.page.addChild(note);

    const todo = new TodoComponent("Todo_title", "todo_body");
    this.page.addChild(todo);

    const video = new VideoComponenet(
      "Video_title",
      "https://www.youtube.com/embed/rJVYb2Ib8DU"
    );
    this.page.addChild(video);
  }

  addElement(liComponent: HTMLElement) {
    this.page.attachTo(liComponent);
  }
}

new App(document.querySelector(".document")! as HTMLElement);
