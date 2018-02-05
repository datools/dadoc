import { Container, IServiceProvider } from '@datools/di';
import { IController } from '../index';
import { IModule } from '../interfaces/IModule';

export class ModulesManager {
  private modules: IModule[] = [];
  private controllers: IController[] = [];
  private providers: IServiceProvider[] = [];
  private listeners: any[] = [];

  constructor(private mainModule: any) {
    this.modules = this.fetchModules(mainModule);

    for (const moduleClass of this.modules) {
      if (!moduleClass.$module) continue;

      if (moduleClass.$module.providers) {
        for (const service of moduleClass.$module.providers) {
          if (!this.providers.find(item => item === service)) this.providers.push(service);
        }
      }

      if (moduleClass.$module.controllers) {
        for (const controller of moduleClass.$module.controllers) {
          if (!this.controllers.find(item => item === controller))
            this.controllers.push(controller);
        }
      }

      if (moduleClass.$module.listeners) {
        for (const listener of moduleClass.$module.listeners) {
          if (!this.listeners.find(item => item === listener)) this.listeners.push(listener);
        }
      }
    }
  }

  public getModules(): any[] {
    return this.modules;
  }

  public getControllers(): any[] {
    return this.controllers;
  }

  public getProviders(): any[] {
    return this.providers;
  }

  public getListeners(): any[] {
    return this.listeners;
  }

  private fetchModules(module: any): any[] {
    if (!module) return [];

    const modules: any[] = [];
    modules.push(module);
    if (module.$module && module.$module.modules) {
      for (const item of module.$module.modules) {
        modules.push(...this.fetchModules(item));
      }
    }
    return modules;
  }
}
