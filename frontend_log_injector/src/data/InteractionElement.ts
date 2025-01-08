//#region imports
import { generateSelector } from "../util/css_selector";
import { actualStateElementDoohickey } from "./stateThingies";
//#endregion

/**
 * Contains all information to be able to figure out user interaction behavior
 */
export class InteractionElement {
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
   * //TODO
   */
  elementType: string;

  /**
   * //TODO 
   */
  data?: () => string;

  //TODO: stateReference
  /**
   * a way how state of the dialog can be queried after the interaction 
   */
  stateReference?: object;

  constructor(interactiveElement: HTMLElement, descriptiveName: string, elementType: string, data?: () => string) {
    this.interactiveElement = interactiveElement;
    this.descriptiveName = descriptiveName;
    this.elementType = elementType;
    this.data = data;
    this.id = generateSelector(interactiveElement);
  }

  set stateNode(stateNode: actualStateElementDoohickey){
    this.stateReference = stateNode;
  }
}
