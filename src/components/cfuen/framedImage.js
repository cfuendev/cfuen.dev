import { LitElement, html, css } from "lit";
import {
  propertyIsValidCssSize,
  propertyUsesValidAspectRatioSyntax,
  propertyUsesValidBgPositionValue,
} from "./verifyCSS";

const tagName = "framed-image";

export class FramedImage extends LitElement {
  static get properties() {
    return {
      src: { type: String, reflect: true },
      alt: { type: String, reflect: true },
      width: { type: String, reflect: true },
      aspectratio: { type: String, reflect: true },
      bgposition: { type: String, reflect: true },
      displayalt: { type: Boolean, reflect: true },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.alt) {
      throw Error(
        "Tetsu A11yError: Focused Image Web Component must have an alt text"
      );
    }

    if (!this.src) {
      throw Error(
        "Tetsu ComponentError: Focused Image Web Component must have a src"
      );
    }

    if (this.src) {
      try {
        new URL(this.src);
      } catch (Error) {
        throw Error(
          "Tetsu ComponentError: Focused Image Web Component must have a valid URL as it's src"
        );
      }
    }

    if (this.width) {
      propertyIsValidCssSize(this.width);
    }

    if (this.aspectratio) {
      propertyUsesValidAspectRatioSyntax(this.aspectratio);
    }

    if (!this.displayalt) {
      this.displayalt = false;
    }

    if (!this.backgroundposition) {
      this.backgroundposition = "center";
    } else {
      propertyUsesValidBgPositionValue(this.backgroundposition);
    }
  }

  static styles = css`
    .Img {
      position: relative;
      background-size: cover;
      background-repeat: no-repeat;
      border: 7px solid;
    }

    .Img img {
      position: absolute;
      top: 100%;
      color: var(--theme-glo4);
    }

    .Img.Notext img {
      visibility: hidden;
    }

    .FrameWrapper {
      position: relative;
    }

    .Frame {
      border: 7px solid;
      position: absolute;
      left: 24px;
      bottom: 24px;
      z-index: -1;
    }
  `;

  render() {
    return html`
      <div class="FrameWrapper">
        <div
          class="Img ${this.displayalt ? "" : "Notext"}"
          style="width: ${this.width}; background-image: url(${this
            .src}); aspect-ratio: ${this
            .aspectratio}; background-position: ${this
            .bgposition}; border-radius: 5px; margin-bottom: 19px;">
          <img alt="${this.alt}" />
        </div>
        <div
          class="Frame"
          style="width: ${this.width}; aspect-ratio: ${this
            .aspectratio}; border-radius: 5px;"></div>
      </div>
    `;
  }
}

customElements.define(tagName, FramedImage);
