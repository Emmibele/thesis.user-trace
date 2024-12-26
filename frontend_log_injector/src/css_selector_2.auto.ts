function generateSelector(context: HTMLElement): string {
  let index, pathSelector;

  // call getIndex function
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
    className += `.${classList[i]}`;
  }
  return className;
}

// get index for nth of type element
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

// load document
// document.addEventListener("DOMContentLoaded", () => {
//   // click on element to get output
//   document.body.addEventListener("click", (e) => {
//     let selector = document.querySelector(".selector");
//     // selector output
//     let output = generateSelector(e.target);

//     selector.innerHTML = `<strong>Selector:</strong> ${output}`;

//     // element that you select
//     let element = document.querySelector(output);
//     console.log(output);
//     console.log("Element:", element);
//   });
// });

// https://dev.to/aniket_chauhan/generate-a-css-selector-path-of-a-dom-element-4aim