import { config } from 'dotenv';
import NodeGeocoder from 'node-geocoder';
import { BadRequestException } from '@nestjs/common';
import { isTruthy } from './check.util';

config();

const options: NodeGeocoder.Options = {
  provider: 'google',
  apiKey: process.env.GOOGLE_API_KEY,
  language: 'ko',
};
const geocoder = NodeGeocoder(options);

export async function extractAddress(
  lat: number,
  lon: number,
): Promise<string> {
  if (!isTruthy(lat, lon)) {
    throw new BadRequestException('provide latitude and longitude');
  }
  try {
    const [result] = await geocoder.reverse({
      lat,
      lon,
    });
    return result?.formattedAddress?.replace('대한민국 ', '');
  } catch (err) {
    console.error(err);
    throw new BadRequestException('cannot extract address by location');
  }
}

export async function extractLocation(
  address: string,
): Promise<[number, number]> {
  if (!address) {
    throw new BadRequestException('provide address');
  }
  try {
    const [result] = await geocoder.geocode({
      address,
    });
    if (!result?.formattedAddress) {
      throw new BadRequestException('cannot get location by address');
    }
    const { latitude, longitude } = result;
    return [latitude, longitude];
  } catch (err) {
    throw new BadRequestException('cannot extract address by location');
  }
}
