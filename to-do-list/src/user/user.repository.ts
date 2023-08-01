import { ListUserDTO } from './dto/listUser.dto';
import { UserEntity } from './user.entity';

export class UserRepository {
  private users: UserEntity[] = [];

  async findAll() {
    const users = this.users.map(
      (user) => new ListUserDTO(user.id, user.name, user.email),
    );

    return users;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    this.users.push(user);
    return user;
  }

  update(id: string, user: Partial<UserEntity>) {
    const updatedUser = this._searchUserById(id);

    Object.entries(user).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      updatedUser[key] = value;
    });

    return updatedUser;
  }

  delete(id: string) {
    const userToDelete = this._searchUserById(id);
    this.users = this.users.filter((task) => task.id !== userToDelete.id);
  }

  async emailExists(email: string) {
    const user = this.users.find((user) => user.email === email);

    return user !== undefined;
  }

  _searchUserById(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
