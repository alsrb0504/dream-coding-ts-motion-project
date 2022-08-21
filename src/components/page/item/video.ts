import { BaseComponent } from "../../component.js";

export class VideoComponenet extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`
      <section class="note">
        <div class="video__player"><iframe class="video__iframe"></iframe></div>
        <h3 class="video__title"></h3>
      </section>
    `);

    const iframe = this.element.querySelector(
      ".video__iframe"
    )! as HTMLIFrameElement;
    iframe.src = this.convertToEmbeddedURL(url);

    const titleElement = this.element.querySelector(
      ".video__title"
    )! as HTMLHeadElement;
    titleElement.textContent = title;

    console.log(url);
  }

  private convertToEmbeddedURL(url: string): string {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = url.match(regExp);
    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}

// https://www.youtube.com/embed/rJVYb2Ib8DU