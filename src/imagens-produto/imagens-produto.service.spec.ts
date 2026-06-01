import { Test, TestingModule } from '@nestjs/testing';
import { ImagensProdutoService } from './imagens-produto.service';

describe('ImagensProdutoService', () => {
  let service: ImagensProdutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagensProdutoService],
    }).compile();

    service = module.get<ImagensProdutoService>(ImagensProdutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
