/* tslint:disable */
import { Container } from '@datools/di';
import { Acl, Hooks, Router, jsonEncode } from '../src';
import * as supertest from 'supertest';
import { App, ModulesManager, RouterControllers } from '../src';
import { TestModule } from './mocks/modules/TestModule';

before(async function() {
  this.$ = new Container();
  this.hooks = this.$.get(Hooks);
  this.acl = this.$.get(Acl);
  this.coreRouter = this.$.get(Router);

  // Fake managers
  this.container = new Container();
  this.modulesManager = new ModulesManager(TestModule);
  this.router = new RouterControllers(this.container);

  // Real app
  this.app = new App(TestModule);
  this.app.applyRouterMiddlware();
  this.request = supertest(this.app.getServer().getInstance());
});

// Core
import './hooks';
import './acl';
import './router';

// Web server
import './kernel';
import './requests';
import './services';
