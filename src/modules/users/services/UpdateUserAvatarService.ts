import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateAvatarService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    // verificando se o id do user é válido
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Oly autheticated users can cgange avatar', 401);
    }
    // se o usuário já tem um avatar, deletar avatar antigo
    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    // Atualizar o Repositório
    user.avatar = filename;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateAvatarService;
