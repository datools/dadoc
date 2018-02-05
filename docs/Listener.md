# Listeners usage

Invoke a hook in your controller:

```ts
import { Inject } from '@datools/di';
import { Controller, Route, Hooks } from '@datools/dadoc';

@Controller()
@Inject()
export class MyController {
  constructor(private hooks: Hooks) {}

  @Route.GET('/hook')
  async hookSample() {
    const data = {};
    await this.hooks.invoke('sample.hook', data);
    return data; // Result will be : { hooked: true }
  }
}
```

Define a listener:

```ts
import { Hook } from '@datools/dadoc';

export class MyListener {
  @Hook('sample.hook')
  async transform(data: any) {
    data.hooked = true;
  }
}
```

Put your listener on a module:

```ts
import { Module } from '@datools/dadoc';
import { MyListener } from './MyListener';

@Module({
  listeners: [MyListener],
})
export class MainModule {}
```
