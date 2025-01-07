import { InteractionElement } from "./InteractionElement";

export class logData{
  id: string;
  name: string;
  logType: string;
  timestamp: number;
  data?: string;

  constructor(interactionElement: InteractionElement){
    this.id = interactionElement.id;
    this.name = interactionElement.descriptiveName;
    this.logType = interactionElement.elementType;
    this.timestamp = Date.now();
    console.log(this.logType)
    if(interactionElement.data){
      this.data = interactionElement.data();
    }
  }
}