export class appConfig{
  private static port = '3030';
  private static route_root = '/api/v1';
  private static route_log = '/log';
  
  static getRouteLog(){
    return this.route_root + this.route_log;
  }

  static getAppPort(){
    return this.port;
  }
}