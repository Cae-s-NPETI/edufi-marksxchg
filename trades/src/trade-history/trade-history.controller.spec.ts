import { Test, TestingModule } from '@nestjs/testing';
import { TradeHistoryController } from './trade-history.controller';

describe('TradeHistoryController', () => {
  let controller: TradeHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TradeHistoryController],
    }).compile();

    controller = module.get<TradeHistoryController>(TradeHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
