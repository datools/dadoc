# Create a module

```ts
import { Module } from '@datools/dadoc';

@Module()
export class MainModule {}
```

## Module options

```ts
export interface IModuleOptions {
  modules?: any[]; // Children modules to load
  providers?: any[] | IServiceProvider[]; // Register global services
  controllers?: any[]; // Defined controllers
  listeners?: any[]; // Add some listeners
}
```

## Next

[Boostrap you app](Bootstrap.md)
