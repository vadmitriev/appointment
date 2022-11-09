import { EventResponse, ResourceResponse } from '@/interfaces';
import { AxiosResponse } from 'axios';
import api from './http';

export default class EventService {
  static async loadEvents(): Promise<AxiosResponse<EventResponse>> {
    return api.post('/events');
  }

  static async loadResources(
    ids: string[],
  ): Promise<AxiosResponse<ResourceResponse>> {
    return api.post('/resources', { ids });
  }
}
