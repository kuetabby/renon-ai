import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { AnalyzeResultDto } from './models/Analyze';

const apiKey = {
  goPlus: '9eH13SpSxsrEtoHlgGjf',
};

let retries = 3;

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getResultAnalyzing(dto: AnalyzeResultDto) {
    try {
      const request = await this.httpService.axiosRef.get(
        `https://api.gopluslabs.io/api/v1/token_security/${dto.chainId}?contract_addresses=${dto.contractAddress}`,
        {
          timeout: 100000,
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            'Api-Key': `Bearer ${apiKey.goPlus}`,
          },
        },
      );

      const response = await request.data;
      retries = 3;
      return response;
    } catch (error) {
      if (retries > 0) {
        retries -= 1;
        return this.getResultAnalyzing(dto);
      } else {
        retries = 3;
        return error;
      }
    }
  }
}
