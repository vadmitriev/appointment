import { WikiReponse } from '@/interfaces';
import { AxiosResponse } from 'axios';
import api from './http';

export default class WikiService {
  static async getRandomPage(): Promise<AxiosResponse<WikiReponse>> {
    return api.get('');
  }

  static async getPageByQuery(
    query: string,
  ): Promise<AxiosResponse<WikiReponse>> {
    return api.get('');
  }
}
