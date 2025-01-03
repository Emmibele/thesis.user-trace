import {InteractionTypeButton} from "./interaction_element.auto"

function addToBtn(){
  InteractionTypeButton.getElements().forEach((element) => {
    element.interactiveElement.addEventListener("click", () => {
      console.log(`${element.descriptiveName} clicked`);
    });
  });
}


window.addEventListener('load', () => {
  addToBtn();
})
