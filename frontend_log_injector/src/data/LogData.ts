import { InteractionElement } from "./InteractionElement";

export class logData{
  id: string;
  name: string;
  data?: string;

  constructor(interactionElement: InteractionElement){
    this.id = interactionElement.id;
    this.name = interactionElement.descriptiveName;
    if(interactionElement.data){
      this.data = interactionElement.data();
    }
  }
}