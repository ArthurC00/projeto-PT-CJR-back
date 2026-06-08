import { Usuario as _Usuario } from './usuario';
import { lojas as _lojas } from './lojas';
import { avaliacoes_loja as _avaliacoes_loja } from './avaliacoes_loja';
import { produtos as _produtos } from './produtos';
import { avaliacoes_produto as _avaliacoes_produto } from './avaliacoes_produto';
import { categorias as _categorias } from './categorias';
import { imagens_produto as _imagens_produto } from './imagens_produto';
import { comentarios_avaliacao as _comentarios_avaliacao } from './comentarios_avaliacao';

export namespace PrismaModel {
  export class Usuario extends _Usuario {}
  export class lojas extends _lojas {}
  export class avaliacoes_loja extends _avaliacoes_loja {}
  export class produtos extends _produtos {}
  export class avaliacoes_produto extends _avaliacoes_produto {}
  export class categorias extends _categorias {}
  export class imagens_produto extends _imagens_produto {}
  export class comentarios_avaliacao extends _comentarios_avaliacao {}

  export const extraModels = [
    Usuario,
    lojas,
    avaliacoes_loja,
    produtos,
    avaliacoes_produto,
    categorias,
    imagens_produto,
    comentarios_avaliacao,
  ];
}
