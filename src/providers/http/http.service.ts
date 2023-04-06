import { HttpService as _HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class HttpService {
  constructor(private readonly httpService: _HttpService) {}

  public async get<ResponseType>(
    url: string,
    config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<ResponseType, any>> {
    const _config = Object.assign(this.getSourceConfig(), config) as any;
    return (await firstValueFrom(
      this.httpService.get<ResponseType>(url, _config).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    )) as AxiosResponse<ResponseType, any>;
  }

  public async post<ResponseType>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>,
  ): Promise<AxiosResponse<ResponseType, any>> {
    const _config = Object.assign(this.getSourceConfig(), config) as any;
    return (await firstValueFrom(
      this.httpService.post<ResponseType>(url, data, _config).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    )) as AxiosResponse<ResponseType, any>;
  }

  private getSourceConfig(): AxiosRequestConfig<any> {
    const config: AxiosRequestConfig<any> = {};
    // switch (type) {
    //   case HttpSourceType.DDM:
    //     config.headers = {
    //       authorization: 'Bearer ' + process.env.SECRET_KEY_CORE_DDM,
    //     };
    //     config.baseURL = process.env.DDM_API_URL;
    //     break;
    //   default:
    //     break;
    // }
    return config;
  }
}
