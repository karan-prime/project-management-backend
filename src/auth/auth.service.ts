import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user: User | null = await this.usersService.validateUser(
      username,
      pass,
    );
    if (user) {
      const userObject = (user as UserDocument).toObject();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = userObject;
      return result;
    }
    return null;
  }

  login(user: User) {
    const payload = {
      username: user.username,
      sub: (user as UserDocument)._id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
