/**
 * generates a CSS selector for a given element
 * @param context the element for which the selector should be generated
 * @returns CSS selector for the given element
 */
export function generateSelector(context: HTMLElement): string {
  let index, pathSelector;

  index = getIndex(context);

  let element: HTMLElement | null = context;

  while (element && element.tagName) {

    const elementId = element.id;
    if(elementId.length > 0) {
      // if the element has an id, use that and ignore the rest
      pathSelector = element.localName + "#" + elementId +
                        (pathSelector ? ">" + pathSelector : "");
    }
    else{
      const elementClassList = element.classList
      const classNames = getClassNameString(elementClassList);
      pathSelector = element.localName + classNames +
                        (pathSelector ? ">" + pathSelector : "");
    }    
    
    element = element.parentElement;
  }
  // selector path for nth of type
  pathSelector = pathSelector + `:nth-of-type(${index})`;
  return pathSelector;
}

/**
 * Convert classList to string
 * @param classList the classList of an Element
 * @returns the classList of an Element converted to a string usable in a CSS selector
 */
function getClassNameString(classList: DOMTokenList): string {
  let className = "";
  for (let i = 0; i < classList.length; i++) {
    // some classes start with # ...
    // TODO is there a way to do escaping in CSS?
    if(classList[i][0] !== '#') 
      className += `.${classList[i]}`;
  }
  return className;
}

/**
 *  get index for nth of type element 
 */
function getIndex(node: HTMLElement): number {
  let i = 1;
  let tagName = node.tagName;

  let element = node;


  while (element.previousSibling) {
    element = element.previousSibling as HTMLElement;
    if (
      element.nodeType === 1 &&
      tagName.toLowerCase() == element.tagName.toLowerCase()
    ) {
      i++;
    }
  }
  return i;
}

// https://dev.to/aniket_chauhan/generate-a-css-selector-path-of-a-dom-element-4aim