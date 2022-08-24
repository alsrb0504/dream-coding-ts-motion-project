import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;
type DragState = "start" | "stop" | "enter" | "leave";
type OnDragStateListener<T extends Component> = (
  target: T,
  state: DragState
) => void;
interface SectionContainer extends Component, Composable {
  setCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
  muteChildren(state: "mute" | "unmute"): void;
  getBoundingRect(): DOMRect;
  onDropped(): void;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
};

export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements SectionContainer
{
  private closeListener?: OnCloseListener;
  private dragStateListener?: OnDragStateListener<PageItemComponent>;

  constructor() {
    super(`<li class="page-item" draggable="true">
      <section class="page-item__body"></section>
      <div class="page-item__controls">
        <button class="close">&times</button>
      </div>
    </li>`);

    this.element.addEventListener("dragstart", (e: DragEvent) => {
      this.onDragStart(e);
    });

    this.element.addEventListener("dragend", (e: DragEvent) => {
      this.onDragEnd(e);
    });
    this.element.addEventListener("dragenter", (e: DragEvent) => {
      this.onDragEnter(e);
    });

    this.element.addEventListener("dragleave", (e: DragEvent) => {
      this.onDragLeave(e);
    });

    const close = this.element.querySelector(".close")! as HTMLButtonElement;

    close.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }

  addChild(child: Component) {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attachTo(container);
  }

  onDragStart(_: DragEvent) {
    this.notifyDragObservers("start");
    this.element.classList.add("lifted");
  }
  onDragEnd(_: DragEvent) {
    this.notifyDragObservers("stop");
    this.element.classList.remove("lifted");
  }
  onDragEnter(_: DragEvent) {
    this.notifyDragObservers("enter");

    console.log("hi");

    this.element.classList.add("drop-area");
  }
  onDragLeave(_: DragEvent) {
    this.notifyDragObservers("leave");
    this.element.classList.remove("drop-area");
  }

  onDropped() {
    this.element.classList.remove("drop-area");
  }

  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }

  setCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener;
  }

  muteChildren(state: "mute" | "unmute") {
    if (state === "mute") {
      this.element.classList.add("mute-children");
    } else {
      this.element.classList.remove("mute-children");
    }
  }

  getBoundingRect() {
    return this.element.getBoundingClientRect();
  }
}

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  private children = new Set<SectionContainer>();
  private dropTraget?: SectionContainer;
  private dragTraget?: SectionContainer;

  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super(`<ul class="page"></ul>`);

    this.element.addEventListener("dragover", (e: DragEvent) => {
      e.preventDefault();
      this.onDragOver(e);
    });

    this.element.addEventListener("drop", (e: DragEvent) => {
      e.preventDefault();
      this.onDrop(e);
    });
  }

  onDragOver(_: DragEvent) {
    console.log("drag-over");
  }
  onDrop(event: DragEvent) {
    event.preventDefault();

    if (!this.dropTraget) return;
    if (this.dragTraget && this.dragTraget !== this.dropTraget) {
      const dropY = event.clientY;
      const srcElement = this.dragTraget.getBoundingRect();

      this.dragTraget.removeFrom(this.element);
      this.dropTraget.attach(
        this.dragTraget,
        dropY < srcElement.y ? "beforebegin" : "afterend"
      );
    }

    this.dropTraget.onDropped();
  }

  addChild(section: Component) {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setCloseListener(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });
    this.children.add(item);
    item.setOnDragStateListener(
      (target: SectionContainer, state: DragState) => {
        switch (state) {
          case "start":
            this.dragTraget = target;
            this.updateSections("mute");
            break;
          case "stop":
            this.dragTraget = undefined;
            this.updateSections("unmute");
            break;
          case "enter":
            this.dropTraget = target;
            break;
          case "leave":
            this.dropTraget = undefined;
            break;
          default:
            throw new Error(`unsupported state: ${state}`);
        }
      }
    );
  }

  private updateSections(state: "mute" | "unmute") {
    this.children.forEach((section: SectionContainer) => {
      section.muteChildren(state);
    });
  }
}
