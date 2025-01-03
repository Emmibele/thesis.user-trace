//#region imports
import { generateSelector } from "./css_selector.auto";
//#endregion

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

export class InteractionButton extends InteractionElementType{
  static getElements(): InteractionElement[]{
    return Array.from(document.querySelectorAll("button")).map((element) => {
      // TODO: need to to something about buttons without inner text (create, edit,...)
      const descriptiveName = element.innerText.length > 0? element.innerText : "Button";
      return new InteractionElement(element, descriptiveName);
    });
  }
}