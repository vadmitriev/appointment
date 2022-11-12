import { IResource } from './resource.interface';

export interface IEvent {
  id: string;
  appointmentId?: string;
  name: string;
  resource: string;
  date: string;
}

export interface EventResponse {
  items: IEvent[];
}

export type IEventTableItem = IEvent & Omit<IResource, 'id'>;
