import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { error } from 'console';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { userInfo } from 'os';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { email, username, senha_hash, ...userInfo } = createUsuarioDto;

    const userEmailExist = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (userEmailExist)
      throw new ConflictException('O email já esta cadastrado');

    const usernameExist = await this.prisma.usuario.findUnique({
      where: { username },
    });

    if (usernameExist) throw new ConflictException('O username já esta em uso');

    const hashed_password = await bcrypt.hash(senha_hash, 10);

    return this.prisma.usuario.create({
      data: { ...userInfo, username, email, senha_hash: hashed_password },
      select: { createdAt: true },
    });
  }

  async findAll() {
    return await this.prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        username: true,
        email: true,
        foto_perfil_url: true,
      },
    });
  }

  async findOne(id: number) {
    const userExist = await this.prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        username: true,
        email: true,
        foto_perfil_url: true,
      },
    });

    if (!userExist)
      throw new BadRequestException('Id inválido! O usuário não existe');

    return userExist;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const userExist = this.prisma.usuario.findUnique({ where: { id } });

    if (!userExist)
      throw new BadRequestException('Id inválido! O usuário não existe');

    const data = { ...updateUsuarioDto };

    if (data.senha_hash) {
      data.senha_hash = await bcrypt.hash(data.senha_hash, 10);
    }

    return this.prisma.usuario.update({
      where: { id },
      data: data,
      select: {
        id: true,
        nome: true,
        email: true,
        username: true,
        foto_perfil_url: true,
      },
    });
  }

  async remove(id: number) {
    const userExist = await this.prisma.usuario.findUnique({ where: { id } });

    if (!userExist)
      throw new BadRequestException('Id inválido! O usuário não existe');

    return this.prisma.usuario.delete({ where: { id } });
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const { senha_atual, nova_senha } = updatePasswordDto;

    // procura o usuário pelo ID e retorna um erro se não encontrar
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!usuario) {
      throw new BadRequestException('Usuário não encontrado');
    }

    // verifica se a senha antiga que o usuário digitou está correta
    const senhaCorreta = await bcrypt.compare(senha_atual, usuario.senha_hash);

    if (!senhaCorreta) {
      throw new BadRequestException('Senha antiga incorreta.')
    }

    // criptografa a nova senha
    const novaSenhaHash = await bcrypt.hash(nova_senha, 10);

    // atualiza a senha criptografada no banco de dados
    return await this.prisma.usuario.update({
      where: { id },
      data: { senha_hash: novaSenhaHash },
      select: { id: true, nome: true, email: true } // não retorna a senha por motivos de segurança
    })
  }
}
