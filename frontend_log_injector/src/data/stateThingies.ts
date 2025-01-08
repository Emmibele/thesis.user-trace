export class actualStateElementDoohickey{
  /**
   * all elements on the page, that can contain a dialogs state
   */
  private static stateElements: Element[] = [];
  
  /**
   * map of common ancestors from interactive elements and the nodes describing the state <ancestor, stateNode>
   */
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
   * @param interactionElement element being interacted with, that can cause a state change
   * @returns the element describing the state relevant to the provided interaction element
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

    // store result in map, so we don't have to repeat the lookup
    actualStateElementDoohickey.commonParentStateMap.set(commonParentResult.deepestParent, commonParentResult.relevantStateElement)
    
    return commonParentResult.relevantStateElement;
 }

/**
 * find the most specific common ancestor node between any Node and the stateElements
 * @param interactionElement element being interacted with, that can cause a state change
 * @returns object containing the most specific common parent and the state element relevant to the interactionElement
 */
  private findMostSpecificCommonParent(interactionElement: Node) {
    // Specify Node, because querySelector returns Element(subtype of Node) and Range only works with Nodes
    let deepestParent: Node = document.querySelector('html')!; // if this returns null, things are FUBAR
    let relevantStateElement: Node = actualStateElementDoohickey.stateElements[0];
    // check against all state Elements, because they are all related, but the relevant elements should be the ones most closely related in hierarchy
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
   * (src: https://stackoverflow.com/a/68583466)
   * @param NodeA first node
   * @param NodeB second node
   * @returns most specific common ancestor node between NodeA and NodeB
   */
 private findCommonParent(NodeA: Node, NodeB: Node){
  const range = new Range();
  range.setStart(NodeA, 0);
  range.setEnd(NodeB, 0);

  // if elements are in inverted order, we need to swap them (A is after B in document)
  if(range.collapsed){
    range.setStart(NodeB, 0);
    range.setEnd(NodeA, 0);
  }
  return range.commonAncestorContainer;
 }
}

// class stateThingamabob{}
// class stateThingamajig{}