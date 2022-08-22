import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;

interface SectionContainer extends Component, Composable {
  setCloseListener(listener: OnCloseListener): void;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
};

export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements SectionContainer
{
  private closeListener?: OnCloseListener;

  constructor() {
    super(`<li class="page-item">
      <section class="page-item__body"></section>
      <div class="page-item__controls">
        <button class="close">&times</button>
      </div>
    </li>`);

    const close = this.element.querySelector(".close")! as HTMLButtonElement;

    close.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }

  setCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  addChild(child: Component) {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attachTo(container);
  }
}

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super(`<ul class="page"></ul>`);
  }

  addChild(section: Component) {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setCloseListener(() => {
      item.removeFrom(this.element);
    });
  }
}
