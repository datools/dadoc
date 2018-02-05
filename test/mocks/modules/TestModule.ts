import { ServicesController } from './../controllers/ServicesController';
import { ContextErrorService } from './../services/ContextError';
import { Module } from '../../../src';
import { ChildModule } from './ChildModule';
import { ReqResController } from '../controllers/ReqResController';
import { ChildController } from '../controllers/ChildController';
import { ErrorsController } from '../controllers/ErrorsController';
import { SharedService } from './../services/SharedService';
import { TestListener } from '../listeners/TestListener';
import { ParentController } from '../controllers/ParentController';

@Module({
  modules: [ChildModule],
  controllers: [
    ReqResController,
    ParentController,
    ChildController,
    ErrorsController,
    ServicesController,
  ],
  providers: [
    SharedService,
    // ContextErrorService,
  ],
  listeners: [TestListener],
})
export class TestModule {}
