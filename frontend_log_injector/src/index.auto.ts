import { InteractionElementType, InteractionTypeButton, InteractionTypeComment } from "./InteractionElementType";

function registerLoggers(){
  let interactionElementTypes : InteractionElementType[] = [];
  interactionElementTypes.push(new InteractionTypeButton());
  interactionElementTypes.push(new InteractionTypeComment());
}


window.addEventListener('load', () => {
  registerLoggers();
})
