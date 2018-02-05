# Services usage

> This part use this package: [@datools/di](https://github.com/datools/di)

Define your service:

```ts
export class HelloService {
  public hello(name: string) {
    return `Hello ${name}!`;
  }
}
```

Use it in your controller:

```ts
import { Inject } from '@datools/di';
import { Controlller, Request, Route } from '@datools/dadoc';
import { HelloService } from './HelloService';

@Inject()
export class MainController {
  constructor(private request: Request, private helloService: HelloService) {}

  @Route.GET('/hello/:name')
  public async hello() {
    return this.hello(this.request.params.name);
  }
}
```

## Global service

Dadoc instanciate a new container on each requests, if you want a service available globally
you need to define it in your modules with the `providers` variable on `@Module` decorator:

```ts
import { Module } from '@datools/dadoc';
import { HelloService } from './HelloService';

@Module({
  providers: [HelloService],
})
export class MainModule {}
```

**Caveat**: In these services you dont have access to `Request`, `Response` services.

## Next

[Add resolver](Resolver.md)
