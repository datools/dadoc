# Using resolvers

First define your resolver:

```ts
import { Inject } from '@datools/di';
import { Resolver, IResolver, ForbiddenError } from '@datools/dadoc';

@Inject()
export class GuardResolver implements IResolver {
  async resolve(...permissions: string[]) {
    if (/* Your condition */) {
      throw new ForbiddenError();
    }
  }
}

// tslint:disable-next-line
export const Guard = (): (...args: any[]) => any => {
  return Resolver({
    args,
    class: GuardResolver,
  });
};
```

Then use it on your controller or route:

```ts
import { Controller, Route } from '@datools/dadoc';
import { Guard } from './Guard';

@Controller()
@Guard('have access to controller') // On controlller, all children route will execute it
export class ProtectedController {

  @Route.GET('/private')
  @Guard('have access to route', 'some other permission') // On route
  async protectedRoute() {
    return {
      some: 'private data';
    };
  }

}
```

## Resolver options

```ts
export interface IResolverOptions {
  class: any; // Resolver to execute
  weight?: number; // Weight: order of execution
  args?: any[]; // Arguments to send to resolve method
  after?: boolean; // Will be executed after route callback
}
```

## Next

[Use listener](Listener.md)
