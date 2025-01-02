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

  constructor(interactiveElement: HTMLElement, descriptiveName: string, id: string, dataElement?: HTMLElement){
    this.interactiveElement = interactiveElement;
    this.descriptiveName = descriptiveName;
    this.id = id;
    this.dataElement = dataElement;
  }
}


abstract class InteractionElementType{
  /**
   * Get all elements of this type
   */
  abstract getElements(): InteractionElement[];
}

class InteractionButton extends InteractionElementType{
  getElements(): InteractionElement[]{
    return Array.from(document.querySelectorAll("button")).map((element) => {
      const descriptiveName = element.textContent || "Button";
      const id = generateSelector(element);
      return new InteractionElement(element, descriptiveName, id);
    });
  }
}