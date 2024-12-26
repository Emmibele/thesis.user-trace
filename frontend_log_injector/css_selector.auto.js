function generateSelector(context) {
  let index, pathSelector, localName;

  if (context == "null") throw "not an dom reference";
  // call getIndex function
  index = getIndex(context);

  while (context.tagName) {
    // selector path
    pathSelector = context.localName + (pathSelector ? ">" + pathSelector : "");
    context = context.parentNode;
  }
  // selector path for nth of type
  pathSelector = pathSelector + `:nth-of-type(${index})`;
  return pathSelector;
}

// get index for nth of type element
function getIndex(node) {
  let i = 1;
  let tagName = node.tagName;

  while (node.previousSibling) {
    node = node.previousSibling;
    if (
      node.nodeType === 1 &&
      tagName.toLowerCase() == node.tagName.toLowerCase()
    ) {
      i++;
    }
  }
  return i;
}

// load document
document.addEventListener("DOMContentLoaded", () => {
  // click on element to get output
  document.body.addEventListener("click", (e) => {
    let selector = document.querySelector(".selector");
    // selector output
    let output = generateSelector(e.target);

    selector.innerHTML = `<strong>Selector:</strong> ${output}`;

    // element that you select
    let element = document.querySelector(output);
    console.log("Selected Element:", element);
  });
});


// https://dev.to/aniket_chauhan/generate-a-css-selector-path-of-a-dom-element-4aim