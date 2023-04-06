import { ConflictException, Injectable } from '@nestjs/common';
import { extractAddress, extractLocation } from 'src/lib/utils';
import { Location, MainWeather } from './interfaces';
import { WeatherService } from './external/weather/weather.service';
import { getWeatherIcon } from './external/weather/utils';

@Injectable()
export class UserService {
  constructor(private readonly weatherService: WeatherService) {}
  public async getAddressByLocation({
    latitude,
    longitude,
  }: Location): Promise<string> {
    return await extractAddress(latitude, longitude);
  }

  public async getLocationsByAddress(
    address: string,
  ): Promise<[number, number]> {
    return await extractLocation(address);
  }

  public async getWeathersByAddresses(
    addresses: string[],
  ): Promise<MainWeather[]> {
    const weathers: MainWeather[] = [];
    for (const address of addresses) {
      const [latitude, longitude] = await extractLocation(address);
      if (!!latitude && !!longitude) {
        weathers.push(
          await this.getWeathersByLocation({ latitude, longitude }),
        );
      }
    }
    return weathers;
  }

  public async getWeathersByLocation({
    latitude,
    longitude,
  }: Location): Promise<MainWeather> {
    try {
      const address = await extractAddress(latitude, longitude);
      const currentWeather =
        await this.weatherService.getCurrentWeatherByLocation({
          latitude,
          longitude,
        });

      const {
        main: { temp, humidity },
        weather,
      } = currentWeather;
      const [{ icon }] = weather;
      return {
        temperature: temp,
        humidity,
        iconURL: getWeatherIcon(icon),
        address,
      };
    } catch (err) {
      console.log('err: ', err?.response?.data);
      throw new ConflictException('cannot get weather data: ' + err.message);
    }
  }

  public async getWeathersByLocations(
    locations: Location[],
  ): Promise<MainWeather[]> {
    const weathers: MainWeather[] = [];
    for (const { latitude, longitude } of locations) {
      if (!!latitude && !!longitude) {
        weathers.push(
          await this.getWeathersByLocation({ latitude, longitude }),
        );
      }
    }
    return weathers;
  }
}
