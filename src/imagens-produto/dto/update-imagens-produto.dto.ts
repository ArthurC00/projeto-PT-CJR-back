import { PartialType } from '@nestjs/swagger';
import { CreateImagensProdutoDto } from './create-imagens-produto.dto';

export class UpdateImagensProdutoDto extends PartialType(CreateImagensProdutoDto) {}
