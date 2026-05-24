import { PartialType } from '@nestjs/mapped-types';
import { CreateAvaliacoesLojaDto } from './create-avaliacoes_loja.dto';

export class UpdateAvaliacoesLojaDto extends PartialType(CreateAvaliacoesLojaDto) {}
