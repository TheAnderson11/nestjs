import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { UserCreationAttrs } from 'src/common/interfaces/UserCreationAttrs';
import { Watchlist } from 'src/modules/watchlist/models/watchlist.model';

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

  @HasMany(() => Watchlist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  watchlist: Watchlist[];
}
