import { Container } from '@datools/di';
import { RouteData } from '../../core';

export interface IRequestContext {
  app: Container;
  container: Container;
  route?: RouteData;
  error?: any;
}
