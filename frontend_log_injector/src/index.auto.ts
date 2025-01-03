import {InteractionTypeButton, InteractionTypeComment} from "./interaction_element.auto"

function initLogger(){
  InteractionTypeButton.getElements().forEach((element) => {
    InteractionTypeButton.attachLogger(element)
  });

  InteractionTypeComment.getElements().forEach(element => {
    InteractionTypeComment.attachLogger(element)
  });

}


window.addEventListener('load', () => {
  initLogger();
})
