export class logServiceConfig{
  private service_Protocol: string = "https";
  private service_Host: string;
  private service_Port: string;
  private service_Path: string;
  constructor (host: string, port: string, path: string){
    this.service_Host = host;
    this.service_Port = port;
    this.service_Path = path;
  }

  getPostUrl(){
    return `${this.service_Protocol}://${this.service_Host}:${this.service_Port}${this.service_Path}` 
  }
}