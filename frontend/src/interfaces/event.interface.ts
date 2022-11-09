export interface IEvent {
  id: string;
  appointmentId?: string;
  name: string;
  resource: string;
  date: Date;
}

export interface EventResponse {
  items: IEvent[];
}
