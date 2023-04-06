import { ConflictException, Injectable } from '@nestjs/common';
import { HttpService } from 'src/providers/http';
import { CurrentWeather } from './interfaces';
import { Location } from '../../interfaces';

@Injectable()
export class WeatherService {
  private readonly key: string;

  constructor(private readonly httpService: HttpService) {
    this.key = process.env.WEATHER_API_KEY;
  }

  async getCurrentWeatherByLocation({
    latitude,
    longitude,
  }: Location): Promise<CurrentWeather> {
    try {
      const { data: currentWeather } =
        await this.httpService.get<CurrentWeather>(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=kr&appid=${this.key}`,
        );
      return currentWeather;
    } catch (err) {
      console.log('err: ', err?.response?.data);
      throw new ConflictException('cannot get weather data: ' + err.message);
    }
  }
}
