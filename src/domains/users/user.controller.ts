import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('address')
  @HttpCode(HttpStatus.OK)
  async getAddressByLocation(
    @Body('location')
    location: {
      latitude: number;
      longitude: number;
    },
  ): Promise<string> {
    return await this.userService.getAddressByLocation(location);
  }

  @Post('location')
  @HttpCode(HttpStatus.OK)
  async getLocationsByAddress(
    @Body('address')
    address: string,
  ): Promise<{
    latitude: number;
    longitude: number;
  }> {
    const [latitude, longitude] = await this.userService.getLocationsByAddress(
      address,
    );
    return { latitude, longitude };
  }
}
