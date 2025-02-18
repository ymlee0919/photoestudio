import { Test, TestingModule } from '@nestjs/testing';
import { ClientGalleryController } from './gallery.controller';

describe('ClientGalleryController', () => {
  let controller: ClientGalleryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientGalleryController],
    }).compile();

    controller = module.get<ClientGalleryController>(ClientGalleryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
