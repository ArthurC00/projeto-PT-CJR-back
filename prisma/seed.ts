import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function runSeed() {
  await prisma.comentarios_avaliacao.deleteMany();
  await prisma.avaliacoes_loja.deleteMany();
  await prisma.avaliacoes_produto.deleteMany();
  await prisma.imagens_produto.deleteMany();
  await prisma.produtos.deleteMany();
  await prisma.lojas.deleteMany();
  await prisma.usuario.deleteMany();
  const numberOfUsers = 20;
  await prisma.categorias.updateMany({
    data: { categoria_pai_id: null },
  });
  await prisma.categorias.deleteMany();

  const parentCategoryNames = [
    'Eletrônicos',
    'Vestuário',
    'Casa e Decoração',
    'Alimentos',
    'Livros',
    'Esportes',
    'Beleza',
    'Brinquedos',
    'Automotivo',
    'Pet Shop',
    'Papelaria',
    'Saúde',
    'Música',
    'Filmes',
    'Jardinagem',
    'Bebês',
    'Joias',
    'Ferramentas',
    'Instrumentos',
    'Calçados',
  ];

  const categoriasCriadas: any[] = [];
  const categoriasFilhas: any[] = [];

  for (let i = 0; i < parentCategoryNames.length; i++) {
    const parentName = parentCategoryNames[i];
    const catPai = await prisma.categorias.create({
      data: { nome: parentName },
    });
    categoriasCriadas.push(catPai);

    const numSub = (i % 3) + 3;
    for (let j = 1; j <= numSub; j++) {
      const catFilha = await prisma.categorias.create({
        data: {
          nome: `Sub ${parentName} #${j}`,
          categoria_pai_id: catPai.id,
        },
      });
      categoriasCriadas.push(catFilha);
      categoriasFilhas.push(catFilha);
    }
  }

  const senhaPadrao = await bcrypt.hash('12345678', 10);
  const usuariosCriados: any[] = [];

  const firstNames = [
    'Carlos',
    'Ana',
    'Fernando',
    'Beatriz',
    'Lucas',
    'Juliana',
    'Mateus',
    'Larissa',
    'Rodrigo',
    'Camila',
    'Gabriel',
    'Amanda',
    'Felipe',
    'Patricia',
    'Gustavo',
    'Sofia',
    'Daniel',
    'Mariana',
    'Thiago',
    'Bruna',
    'Andre',
    'Isabela',
    'Ricardo',
    'Vanessa',
    'Vinicius',
  ];
  const lastNames = [
    'Silva',
    'Oliveira',
    'Gomes',
    'Santos',
    'Souza',
    'Costa',
    'Pereira',
    'Lima',
    'Alves',
    'Rocha',
    'Cruz',
    'Dias',
    'Martins',
    'Carvalho',
    'Barbosa',
    'Ribeiro',
    'Almeida',
    'Teixeira',
    'Pinto',
    'Mendes',
    'Cardoso',
    'Barros',
    'Nunes',
    'Vieira',
    'Rocha',
  ];

  for (let i = 0; i < numberOfUsers; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName =
      lastNames[Math.floor(i / firstNames.length) % lastNames.length];
    const nome = `${firstName} ${lastName}`;
    const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${i}`;
    const email = `${username}@example.com`;

    const user = await prisma.usuario.create({
      data: {
        username,
        nome,
        email,
        senha_hash: senhaPadrao,
        foto_perfil_url: `https://picsum.photos/150/150?random=${i}`,
      },
    });
    usuariosCriados.push(user);
  }

  const lojasCriadas: any[] = [];
  const ramosLoja = [
    'Store',
    'Boutique',
    'Decorações',
    'Express',
    'Moda',
    'Design',
    'Cell',
    'Outlet',
    'Variedades',
    'Imports',
  ];

  for (let i = 10; i < numberOfUsers; i++) {
    const dono = usuariosCriados[i];
    const qtdeLojas = (i % 5) + 1;

    for (let j = 1; j <= qtdeLojas; j++) {
      const ramo = ramosLoja[(i + j) % ramosLoja.length];
      const nomeLoja = `${dono.nome.split(' ')[0]} ${ramo} #${j}`;
      const descricao = `A loja oficial de ${nomeLoja}.`;

      const loja = await prisma.lojas.create({
        data: {
          usuario_id: dono.id,
          nome: nomeLoja,
          descricao,
          logo_url: `https://picsum.photos/100/100?random=${i * 10 + j}`,
          banner_url: `https://picsum.photos/800/300?random=${i * 10 + j + 100}`,
        },
      });
      lojasCriadas.push(loja);
    }
  }
  const produtosCriados: any[] = [];
  let productCounter = 1;

  for (let s = 0; s < lojasCriadas.length; s++) {
    const loja = lojasCriadas[s];

    if (s < 12) {
      continue;
    }

    const numProducts = (s % 5) + 1;

    for (let p = 1; p <= numProducts; p++) {
      const categoria = categoriasFilhas[(s + p) % categoriasFilhas.length];
      const nomeProduto = `${categoria.nome} Item #${productCounter}`;
      const preco = parseFloat(
        (15.9 + ((productCounter * 12.5) % 400)).toFixed(2),
      );
      const estoque = ((productCounter * 7) % 90) + 5;

      const produto = await prisma.produtos.create({
        data: {
          loja_id: loja.id,
          categoria_id: categoria.id,
          nome: nomeProduto,
          preco,
          estoque,
          descricao: `Descrição do produto ${nomeProduto}.`,
        },
      });
      produtosCriados.push(produto);
      productCounter++;
    }
  }

  const imagensData = produtosCriados.map((prod, idx) => ({
    produto_id: prod.id,
    url_imagem: `https://picsum.photos/400/400?random=${idx + 200}`,
    ordem: 1,
  }));
  await prisma.imagens_produto.createMany({
    data: imagensData,
  });

  const avaliacoesLojaCriadas: any[] = [];

  for (let s = 0; s < lojasCriadas.length; s++) {
    const loja = lojasCriadas[s];

    if (s < 6 || (s >= 12 && s < 18)) {
      continue;
    }

    const numStoreReviews = (s % 5) + 1;
    for (let r = 1; r <= numStoreReviews; r++) {
      const cliente = usuariosCriados[(s + r) % 10];

      const avalLoja = await prisma.avaliacoes_loja.create({
        data: {
          usuario_id: cliente.id,
          loja_id: loja.id,
          nota: (s + r) % 2 === 0 ? 5 : 4,
          comentario: `Excelente atendimento na loja ${loja.nome}!`,
        },
      });
      avaliacoesLojaCriadas.push(avalLoja);
    }
  }

  const avaliacoesProdutoCriadas: any[] = [];
  const numZeroReviews = Math.floor(produtosCriados.length * 0.1);

  for (let p = 0; p < produtosCriados.length; p++) {
    const produto = produtosCriados[p];

    const productStoreIndex = lojasCriadas.findIndex(
      (l) => l.id === produto.loja_id,
    );
    const belongsToNoReviewStore =
      productStoreIndex >= 12 && productStoreIndex < 18;

    if (p < numZeroReviews && !belongsToNoReviewStore) {
      continue;
    }

    const numReviews = (p % 5) + 1;
    for (let r = 1; r <= numReviews; r++) {
      const cliente = usuariosCriados[(p + r) % 10];

      const avalProd = await prisma.avaliacoes_produto.create({
        data: {
          usuario_id: cliente.id,
          produto_id: produto.id,
          nota: (p + r) % 3 === 0 ? 5 : (p + r) % 3 === 1 ? 4 : 3,
          comentario: `O produto ${produto.nome} é excelente. Recomendo.`,
        },
      });
      avaliacoesProdutoCriadas.push(avalProd);
    }
  }

  for (let i = 0; i < numberOfUsers; i++) {
    const usuarioComentando = usuariosCriados[i];

    if (i % 2 === 0) {
      const avaliacaoLoja =
        avaliacoesLojaCriadas[Math.floor(i / 2) % avaliacoesLojaCriadas.length];
      await prisma.comentarios_avaliacao.create({
        data: {
          conteudo: `Resposta/comentário de ${usuarioComentando.nome} na avaliação da loja.`,
          usuario_id: usuarioComentando.id,
          avaliacao_loja_id: avaliacaoLoja.id,
        },
      });
    } else {
      const avaliacaoProduto =
        avaliacoesProdutoCriadas[
          Math.floor(i / 2) % avaliacoesProdutoCriadas.length
        ];
      await prisma.comentarios_avaliacao.create({
        data: {
          conteudo: `Resposta/comentário de ${usuarioComentando.nome} na avaliação do produto.`,
          usuario_id: usuarioComentando.id,
          avaliacao_produto_id: avaliacaoProduto.id,
        },
      });
    }
  }
}
