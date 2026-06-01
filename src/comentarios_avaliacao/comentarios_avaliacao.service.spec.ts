import { Test, TestingModule } from '@nestjs/testing';
import { ComentariosAvaliacaoService } from './comentarios_avaliacao.service';

describe('ComentariosAvaliacaoService', () => {
  let service: ComentariosAvaliacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComentariosAvaliacaoService],
    }).compile();

    service = module.get<ComentariosAvaliacaoService>(ComentariosAvaliacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
