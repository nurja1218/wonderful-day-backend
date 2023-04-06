import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Location, MainWeather } from './interfaces';

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
  ): Promise<Location> {
    const [latitude, longitude] = await this.userService.getLocationsByAddress(
      address,
    );
    return { latitude, longitude };
  }

  @Post('weather-by-addresses')
  @HttpCode(HttpStatus.OK)
  async getWeathersByAddresses(
    @Body('addresses')
    addresses: string[],
  ): Promise<MainWeather[]> {
    return await this.userService.getWeathersByAddresses(addresses);
  }

  @Post('weather-by-locations')
  @HttpCode(HttpStatus.OK)
  async getWeathersByLocations(
    @Body('locations')
    locations: Location[],
  ): Promise<MainWeather[]> {
    return await this.userService.getWeathersByLocations(locations);
  }
}
