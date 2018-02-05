export interface IResolver {
  resolve(...args: any[]): Promise<void> | void;
}

export interface IResolverOptions {
  class: any;
  weight?: number;
  args?: any[];
  after?: boolean;
}
