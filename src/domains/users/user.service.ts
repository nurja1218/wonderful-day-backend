import { Injectable } from '@nestjs/common';
import { extractAddress, extractLocation } from 'src/lib/utils';

@Injectable()
export class UserService {
  //   constructor() {}
  public async getAddressByLocation({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }): Promise<string> {
    return await extractAddress(latitude, longitude);
  }

  public async getLocationsByAddress(
    address: string,
  ): Promise<[number, number]> {
    return await extractLocation(address);
  }
}
