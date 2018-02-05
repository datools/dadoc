import { Module } from '../../../src';
import { ChildController } from '../controllers/ChildController';

@Module({
  controllers: [ChildController],
})
export class ChildModule {}
