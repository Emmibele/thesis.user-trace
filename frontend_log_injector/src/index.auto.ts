import {InteractionTypeButton} from "./interaction_element.auto"

function addToBtn(){
  InteractionTypeButton.getElements().forEach((element) => {
    InteractionTypeButton.attachLogger(element)
  });
}


window.addEventListener('load', () => {
  addToBtn();
})
