//#region imports
import { generateSelector } from "./css_selector.auto";
//#endregion

/**
 * Contains all information to be able to figure out user interaction behavior
 */
class InteractionElement{
  /**
   * The element that the user interacts with
   */
  interactiveElement: HTMLElement;

  descriptiveName: string;

  /**
   * The id of the element, most likely a unique selector
   */
  id: string;

  /**
   * The element in which the value is updated after the interaction
   */
  dataElement?: HTMLElement;

  //TODO: stateReference
  /**
   * a way how state of the dialog can be queried after the interaction 
   */
  stateReference?: object;

  constructor(interactiveElement: HTMLElement, descriptiveName: string, dataElement?: HTMLElement){
    this.interactiveElement = interactiveElement;
    this.descriptiveName = descriptiveName;
    this.dataElement = dataElement;
    this.id = generateSelector(interactiveElement);
  }
}


abstract class InteractionElementType{
  /**
   * Get all elements of this type
   */
  static getElements(): InteractionElement[] {throw new Error("Not implemented, use this method in a derived class");};
}

export class InteractionTypeButton extends InteractionElementType{
  static getElements(): InteractionElement[]{
    return Array.from(document.querySelectorAll("button")).map((element) => {
      const descriptiveName = this.getElementName(element);
      return new InteractionElement(element, descriptiveName);
    });
  }

  /**
   * Returns a descriptive name of the provided button. 
   * Searches innerText and the related p-tooltip element.
   * Returns 'Button (unspecified)' if nothing else is found. 
   * @param button the button to get the descriptive name for
   * @returns descriptive name of the button
   */
  private static getElementName(button: HTMLButtonElement) : string {
    if (button.innerText.length > 0)
      return button.innerText.replace(/\n/g,''); // remove all newlines before returning

    const toolTipElement = button.nextElementSibling;
    if (toolTipElement && 
        toolTipElement instanceof HTMLDivElement && 
        toolTipElement.classList.contains('p-tooltip') &&
        toolTipElement.textContent)
      return toolTipElement.textContent
    
    return "Button (unspecified)"
  }
}