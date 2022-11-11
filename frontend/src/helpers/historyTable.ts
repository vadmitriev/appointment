import _ from 'lodash';
import { IEvent, IEventTableItem, IResource } from '@/interfaces';

export const groupEvents = (events: IEvent[]): IEvent[] => {
  let arr: IEvent[] = [];
  const groupedEvents = events.reduce((acc: any, item) => {
    if (item.appointmentId) {
      arr = acc[item.appointmentId] || [];
      arr.push(item);
      acc[item.appointmentId] = arr;
    }
    if (item.name === 'Appointment') {
      arr = acc[item.id] || [];
      arr.unshift(item);
      acc[item.id] = arr;
    }
    return acc;
  }, {});

  arr.length = 0;
  Object.keys(groupedEvents).forEach((key) => {
    const sortedByDate = _.sortBy(groupedEvents[key], (item) => item.date)
      .reverse()
      .sort((a) => (a.name === 'Appointment' ? -1 : 1));
    arr = arr.concat(sortedByDate);
  });

  return arr;
};

export const formTableData = (
  events: IEvent[],
  resources: IResource[],
): IEventTableItem[] => {
  const groupedEvents = groupEvents(events);
  const tableData: IEventTableItem[] = [];

  const defaultItem = { details: '', code: '', values: [''] };

  groupedEvents.forEach((event) => {
    const resource = resources.find(
      (r) => r.id === `${event.name}/${event.id}`,
    ) || { ...defaultItem };
    const { details, code, values } = resource;
    tableData.push({ ...event, details, code, values });
  });
  return tableData;
};
