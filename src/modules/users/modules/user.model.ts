import { Column, Model, Table } from 'sequelize-typescript';
import { UserCreationAttrs } from 'src/common/interfaces/UserCreationAttrs';

@Table
export class User extends Model<User, UserCreationAttrs> {
  @Column
  declare firstName: string;

  @Column
  declare userName: string;

  @Column
  declare email: string;

  @Column
  declare password: string;
}
