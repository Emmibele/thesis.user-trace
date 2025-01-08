export class actualStateElementDoohickey{
  /**
   * all elements on the page, that can contain a dialogs state
   */
  private static stateElements: Element[] = [];
  private static commonParentStateMap = new Map<Node, Node>();


  stateNode: Node;

  constructor(interactionElement: HTMLElement){
    // TODO we probably need some kind of class hierarchy again and the function that selects stateElements should be custom (either constructor argument or specific to the class implementation) 
    if (actualStateElementDoohickey.stateElements.length == 0){
      actualStateElementDoohickey.stateElements.push(...document.querySelectorAll('.p-error-text')); 
    }

    this.stateNode = this.findRelatedStateElement(interactionElement);
    console.log(this.stateNode, ' is state Node for', interactionElement); // TODO remove debug

  }

  /**
   * get the state element for a input element
   * @param interactionElement 
   * @returns 
   */
  private findRelatedStateElement(interactionElement: HTMLElement){
    for(const commonParent of actualStateElementDoohickey.commonParentStateMap.keys()){
      if(commonParent.contains(interactionElement)){ // interactionElement is childeNode at any level below the common parent
        console.log("common parent found in Map") // TODO remove debug
        return actualStateElementDoohickey.commonParentStateMap.get(commonParent)!; 
      }
    }
    console.log("no common parent found, trying to find one") // TODO remove debug

    // if we got this far, we have not yet found a common parent between the interactive element and the related state element
    
    const commonParentResult = this.findMostSpecificCommonParent(interactionElement);

    actualStateElementDoohickey.commonParentStateMap.set(commonParentResult.deepestParent, commonParentResult.relevantStateElement)
    
    return commonParentResult.relevantStateElement;
 }

/**
 * find the most specific common ancestor node between any Node and the stateElements
 * @param interactionElement 
 * @returns 
 */
  private findMostSpecificCommonParent(interactionElement: Node) {
    // Specify Node, because querySelector returns Element(subtype of Node) and Range only works with Nodes
    let deepestParent: Node = document.querySelector('html')!; // if this returns null, things are FUBAR
    let relevantStateElement: Node = actualStateElementDoohickey.stateElements[0];
    for (const stateElement of actualStateElementDoohickey.stateElements) {
      const commonParent = this.findCommonParent(interactionElement, stateElement);
      if (deepestParent.contains(commonParent)) {
        deepestParent = commonParent;
        relevantStateElement = stateElement;
      }
      else{
        // sanity check
        if(!commonParent.contains(deepestParent) && commonParent !== deepestParent)
          throw new Error("common parent and deepest parent are not hierarchically related")
      }
    }

    return {deepestParent, relevantStateElement};
  }

  /**
   * find the most specific common ancestor node between two nodes
   * @param interactionElement 
   * @param stateElement 
   * @returns 
   */
 private findCommonParent(interactionElement: Node, stateElement: Node){
  const range = new Range();
  range.setStart(interactionElement, 0);
  range.setEnd(stateElement, 0);

  if(range.collapsed){
    range.setStart(stateElement, 0);
    range.setEnd(interactionElement, 0);
  }
  return range.commonAncestorContainer;
  //https://stackoverflow.com/a/68583466
 }
}

// class stateThingamabob{}
// class stateThingamajig{}