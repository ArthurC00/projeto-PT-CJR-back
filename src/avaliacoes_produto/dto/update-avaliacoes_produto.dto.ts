import { PartialType } from '@nestjs/mapped-types';
import { CreateAvaliacoesProdutoDto } from './create-avaliacoes_produto.dto';

export class UpdateAvaliacoesProdutoDto extends PartialType(CreateAvaliacoesProdutoDto) {}
