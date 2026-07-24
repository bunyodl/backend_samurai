import { hash } from 'argon2';

class AuthService {
  async hash(password: string): Promise<string> {
    return await hash(password);
  }
}

export const authService = new AuthService();
