# Bootstrap your application

```ts
import { App } from '@datools/dadoc';
import { MainModule } from './MainModule';

(async () => {

  const port: number = process.env.PORT|| 3000;
  const host: string = process.env.HOST || '0.0.0.0';

  const app: App = new App(MainModule);
  await app.start(port, host);

})();
.catch(err => {
  console.error(err);
});
```

## Next

[Add a controller](Controller.md)
