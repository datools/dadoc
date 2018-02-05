# Make a controller

```ts
import { Controller, Route } from '@datools/dadoc';

@Controller({
  parent: null,
  prefix: null,
})
export class MainController {
  @Route.GET('/hello')
  public async hello() {
    return 'world';
  }

  @Route.GET('/json')
  public async hello() {
    return { foo: 'bar' }; // Will be json encoded automatically
  }
}
```

Then include your controller to your module:

```ts
import { Module } from '@datools/dadoc';
import { MainController } from './MainController';

@Module({
  controllers: [MainController],
})
export class MainModule {}
```

## Controllers options

```ts
export interface IControllerOptions {
  prefix?: string; // Add a prefix to all routes paths defined in controller
  parent?: any; // Define a parent controller: this one will inherit prefix for routes
}
```

## Next

[Use services](Services.md)
