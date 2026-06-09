import { Test, TestingModule } from '@nestjs/testing';
import { ImagensProdutoController } from './imagens-produto.controller';
import { ImagensProdutoService } from './imagens-produto.service';

describe('ImagensProdutoController', () => {
  let controller: ImagensProdutoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagensProdutoController],
      providers: [ImagensProdutoService],
    }).compile();

    controller = module.get<ImagensProdutoController>(ImagensProdutoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
