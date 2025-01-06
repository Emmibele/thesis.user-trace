import { InteractionElement } from "./InteractionElement";

export class logData{
  id: string;
  name: string;
  logType: string;
  data?: string;

  constructor(interactionElement: InteractionElement){
    this.id = interactionElement.id;
    this.name = interactionElement.descriptiveName;
    this.logType = interactionElement.elementType;
    console.log(this.logType)
    if(interactionElement.data){
      this.data = interactionElement.data();
    }
  }
}