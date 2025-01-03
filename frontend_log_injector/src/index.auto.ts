import {InteractionButton} from "./interaction_element.auto"

function addToBtn(){
  InteractionButton.getElements().forEach((element) => {
    element.interactiveElement.addEventListener("click", () => {
      console.log("{0} clicked", element.descriptiveName);
    });
  });
}
addToBtn();