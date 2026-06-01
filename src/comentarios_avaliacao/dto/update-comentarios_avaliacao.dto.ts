import { PartialType } from '@nestjs/swagger';
import { CreateComentariosAvaliacaoDto } from './create-comentarios_avaliacao.dto';

export class UpdateComentariosAvaliacaoDto extends PartialType(CreateComentariosAvaliacaoDto) {}
