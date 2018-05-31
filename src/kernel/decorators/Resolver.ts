import { IResolverOptions } from '../interfaces';

// tslint:disable-next-line
export function Resolver(resolver: IResolverOptions): Function {
  return (
    classOrProto: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    if (!resolver.args) resolver.args = [];

    let target: any = classOrProto;
    if (propertyKey !== undefined) {
      if (typeof classOrProto[propertyKey] !== 'function')
        throw new Error('Cannot put Resolver on class property');
      target = classOrProto.constructor;
    }

    if (!target.$resolvers) target.$resolvers = { '*': [] };

    let resolvers: IResolverOptions[] = target.$resolvers['*'];
    if (propertyKey) {
      if (!target.$resolvers[propertyKey]) target.$resolvers[propertyKey] = [];
      resolvers = target.$resolvers[propertyKey];
    }

    resolvers.push(resolver);
  };
}

// tslint:disable-next-line
export function ResponseResolver(resolver: IResolverOptions): Function {
  resolver.after = true;
  return Resolver(resolver);
}
