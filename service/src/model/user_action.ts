export class userAction{
  id : string;
  name: string;
  logType: string;
  data?: string;
  constructor(id: string, name: string, logType: string, data?: string){
    this.id = id;
    this.name = name;
    this.logType = logType;
    this.data = data;
  }
}