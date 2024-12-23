export class Step2 {
  nodeType: nodeType;
  id: string;
  info? : string;

  constructor(nodeType: nodeType, id: string, info?: string){
    this.nodeType = nodeType;
    this.id = id;
    this.info = info;
  }
}

export enum nodeType{
  userAction,
  state,
  origin
}