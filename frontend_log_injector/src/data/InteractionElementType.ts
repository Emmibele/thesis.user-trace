import { InteractionElement } from "./InteractionElement";
import { logData } from "./LogData";

type logFn = (logData: logData) => Promise<void>

export abstract class InteractionElementType {
  interactionElements: InteractionElement[];
  logFunction: logFn;
  constructor(logFunction: logFn) {
    this.logFunction = logFunction;

    this.interactionElements = this.getElements();
    this.interactionElements.forEach(element => this.attachLogger(element));
  }

  /**
   * get all elements of this type
   */
  abstract getElements(): InteractionElement[];

  /**
   * attach the logger function to the element being interacted with
   * //TODO need to figure in what way to pass the actual function
   */
  abstract attachLogger(interaction_element: InteractionElement): void;
}

export class InteractionTypeButton extends InteractionElementType {
  getElements(): InteractionElement[] {
    return Array.from(document.querySelectorAll("button")).map((element) => {
      const descriptiveName = this.getElementName(element);
      return new InteractionElement(element, descriptiveName);
    });
  }

  attachLogger(interaction_element: InteractionElement): void {
    interaction_element.interactiveElement.addEventListener("click", () => {
      console.log(`${interaction_element.descriptiveName} clicked`);
    });
  }

  /**
   * Returns a descriptive name of the provided button.
   * Searches innerText and the related p-tooltip element.
   * Returns 'Button (unspecified)' if nothing else is found.
   * @param button the button to get the descriptive name for
   * @returns descriptive name of the button
   */
  private getElementName(button: HTMLButtonElement): string {
    if (button.innerText.length > 0)
      return button.innerText.replace(/\n/g, ''); // remove all newlines before returning

    const toolTipElement = button.nextElementSibling;
    if (toolTipElement &&
      toolTipElement instanceof HTMLDivElement &&
      toolTipElement.classList.contains('p-tooltip') &&
      toolTipElement.textContent)
      return toolTipElement.textContent;

    return "Button (unspecified)";
  }
}

export class InteractionTypeComment extends InteractionElementType {
  getElements(): InteractionElement[] {
    return Array.from(document.querySelectorAll("textarea"))
      .filter((element) => element.classList.contains("p-textfield")) // cannot directly use in query selector, because TS then gets confused about the Type of the Element
      .map((element) => {
        const descriptiveName = element.name;
        return new InteractionElement(element, descriptiveName, () => element.value);
      });
  }

  attachLogger(interaction_element: InteractionElement): void {
    // TODO logging on every keystroke is somewhat excessive
    interaction_element.interactiveElement.addEventListener('input', () => {
      console.log(`${interaction_element.descriptiveName} input ${interaction_element.data!()}`);
      this.logFunction(new logData(interaction_element));
    });
  }
}
