import _ from 'lodash';
import { IEvent, IEventTableItem, IResource } from '@/interfaces';

export const groupEvents = (events: IEvent[]): IEvent[] => {
  let arr: IEvent[] = [];
  const groupedEvents: Record<string, IEvent[]> = events.reduce(
    (acc: Record<string, IEvent[]>, item) => {
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
    },
    {},
  );

  arr.length = 0;

  _.sortBy(
    Object.keys(groupedEvents).map((key) => {
      const firstItem: IEvent = groupedEvents[key][0];
      return { date: firstItem?.date, eventId: key };
    }),
    (item) => item.date,
  )
    .reverse()
    .forEach((item) => {
      const sortedEvents = _.sortBy(
        groupedEvents[item.eventId],
        (item) => item.date,
      )
        .reverse()
        .sort((a) => (a.name === 'Appointment' ? -1 : 1));
      arr = arr.concat(sortedEvents);
    });

  return arr;
};

export const formTableData = (
  events: IEvent[],
  resources: IResource[],
): IEventTableItem[] => {
  const tableData: IEventTableItem[] = [];
  if (!resources.length) {
    return tableData;
  }

  const defaultItem = { details: '', code: '', values: [''] };

  events.forEach((event) => {
    const resource = resources.find(
      (r) => r.id === `${event.resource}/${event.id}`,
    ) || { ...defaultItem };
    const { details, code, values } = resource;
    tableData.push({ ...event, details, code, values });
  });
  return tableData;
};
