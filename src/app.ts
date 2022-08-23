import { Component } from "./components/component.js";
import {
  InputDialog,
  MediaData,
  TextData,
} from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponenet } from "./components/page/item/video.js";
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from "./components/page/page.js";

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
};

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    this.bindElementToDialog<MediaSectionInput>(
      "#new-image",
      MediaSectionInput,
      (input: MediaSectionInput) => {
        return new ImageComponent(input.title, input.url);
      }
    );

    this.bindElementToDialog<MediaSectionInput>(
      "#new-video",
      MediaSectionInput,
      (input: MediaSectionInput) => {
        return new VideoComponenet(input.title, input.url);
      }
    );

    this.bindElementToDialog<TextSectionInput>(
      "#new-note",
      TextSectionInput,
      (input: TextSectionInput) => {
        return new NoteComponent(input.title, input.body);
      }
    );

    this.bindElementToDialog<TextSectionInput>(
      "#new-todo",
      TextSectionInput,
      (input: TextSectionInput) => {
        return new TodoComponent(input.title, input.body);
      }
    );
  }

  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    inputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
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

  addElement(liComponent: HTMLElement) {
    this.page.attachTo(liComponent);
  }
}

new App(document.querySelector(".document")! as HTMLElement, document.body);
