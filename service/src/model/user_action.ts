export class userAction{
  id : string;
  name: string;
  logType: string;
  timestamp: number;
  data?: string;
  constructor(id: string, name: string, logType: string, timestamp: number, data?: string){
    this.id = id;
    this.name = name;
    this.logType = logType;
    this.timestamp = timestamp;
    this.data = data;
  }
}