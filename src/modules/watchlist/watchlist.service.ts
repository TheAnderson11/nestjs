import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { CreateAssetResponse } from './response';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist)
    private readonly watchlistRepository: typeof Watchlist,
  ) {}
  async createAsset(user, dto): Promise<CreateAssetResponse> {
    try {
      const watchlist = await this.watchlistRepository.create({
        userId: user.id,
        name: dto.name,
        assetId: dto.assetId,
      });

      return watchlist;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async deleteAsset(userId: number, assetId: number): Promise<boolean> {
    try {
      await this.watchlistRepository.destroy({
        where: { id: assetId, userId },
      });
      return true;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
