import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AutheticateUserService from '@modules/users/services/AutheticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    // Para fazer autenticação do user vamos precisar do email/senha
    const { email, password } = request.body;

    // Instância o AutheticateUserService
    const autheticateUser = container.resolve(AutheticateUserService);

    const { user, token } = await autheticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}
