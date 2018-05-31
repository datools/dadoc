// tslint:disable-next-line
export function Hook(name: string, weight: number = 0): Function {
  return (
    prototype: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    const target: any = prototype.constructor;
    if (!target.$hooks) target.$hooks = {};
    if (!target.$hooks[name]) target.$hooks[name] = [];

    target.$hooks[name].push({
      method: propertyKey,
      weight,
    });
  };
}
