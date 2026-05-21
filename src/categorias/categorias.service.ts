import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoriasService {
  // implementar as funções aqui

  constructor(private readonly prisma:PrismaService){}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const {nome, categoria_pai_id}  = createCategoriaDto;

    const categoriaExiste = await this.prisma.categorias.findFirst({
      where: { nome },
    });

    if(categoriaExiste){throw new BadRequestException(`A categoria "${nome}" já existe!`)}
    // alterei a mensagem para mostrar o nome da categoria que já existe

    if (categoria_pai_id) {
      // só executa se o usuário tiver enviado um ID de categoria pai (que é opcional)
      
      const paiExiste = await this.prisma.categorias.findFirst({
        // checa se a categoria pai enviada existe
        where: { id: categoria_pai_id}
      });

      if (!paiExiste) {
        // se o usuário forneceu uma categoria pai e ela não existe, envia uma mensagem de erro
        throw new BadRequestException("A categoria pai especificada não existe.")
      }

      // se uma categoria pai foi fornecida e ela existe, cria a nova categoria como filha dela
      return this.prisma.categorias.create({
        data: { nome, categoria_pai_id },
        select: { id: true, nome: true, categoria_pai_id: true }
        // o select define os dados a serem retornados pelo banco após a criação ou busca de alguma coisa
      });
    /*}
    const temPai = await this.prisma.categorias.findFirst({
      where: {categoria_pai_id}
    })
    // essa função tem que ser re escrita, precisa retornar algo além de null (JV)
    // aparentemente essa função estava checando pelo ID da categoria pai no banco de IDs de categoria pai, e não no banco de IDs de categoria. (Ana)
    // achei melhor refazer toda a estrutura para verificar primeiro se tem ID de pai ou não, e só depois checar o resto (Ana)

    if (temPai){
      return this.prisma.categorias.create({
      data: {nome:nome, categoria_pai_id},
      select: { nome: true, categoria_pai_id:true },
    });
    }

    return this.prisma.categorias.create({
      data: {nome:nome},
      select: { nome: true },
    });*/
    } else {
      // se um ID de categoria pai não foi fornecido, cria a categoria como principal (não é filha de nenhuma outra)
      return this.prisma.categorias.create({
        data: { nome },
        select: { id: true, nome: true }
        // o select define os dados a serem retornados pelo banco após a criação ou busca de alguma coisa
      });
    }
  
  }

  async findAll() {
    // o método assíncrono (async) é necessário porque a função precisa buscar no banco de dados
    return  await this.prisma.categorias.findMany();
    // o await faz com que a função espere a resposta do banco de dados antes de retornar os resultados da busca
  }

  findOne(id: number) {
    return `This action returns a #${id} categoria`;
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoria`;
  }
}
