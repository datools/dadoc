export class RouteData {
  public path: string;
  public method: string;
  public handler: (...args) => any;
  public params: any;
  public options: any;
}
