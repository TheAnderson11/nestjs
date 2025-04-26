import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { WatchListDto } from './dto';
import { CreateAssetResponse } from './response';
import { WatchlistService } from './watchlist.service';

@ApiTags('API')
@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 201, type: CreateAssetResponse })
  @Post('create')
  createAsset(
    @Body() assetDto: WatchListDto,
    @Req() request,
  ): Promise<CreateAssetResponse> {
    const user = request.user;
    return this.watchlistService.createAsset(user, assetDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200 })
  @Delete()
  deleteAsset(@Query('id') assetId: number, @Req() request): Promise<boolean> {
    const { id } = request.user;
    return this.watchlistService.deleteAsset(id, assetId);
  }
}
