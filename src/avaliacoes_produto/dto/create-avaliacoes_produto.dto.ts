import { IsInt, IsNotEmpty, IsNumber, IsString} from 'class-validator';
export class CreateAvaliacoesProdutoDto {


@IsInt()
@IsNotEmpty()
usuario_id!: number;

@IsInt()
@IsNotEmpty()
nota!: number;

@IsString()
@IsNotEmpty()
comentario!: string;

@IsNumber()
@IsNotEmpty()
produto_id!: number;

}

