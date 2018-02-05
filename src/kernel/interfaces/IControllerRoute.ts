export interface IControllerRoute {
  handler: string | any;
  methods: string[] | string;
  options: any;
  path: string;
}
