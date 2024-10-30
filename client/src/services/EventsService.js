import * as qs from 'qs';
import { backendApi } from 'api/api';
import APIErrorsHandlingUtils from 'utils/APIErrorsHandlingUtils';

export default class EventsService {
  static async getEvents(danceStyle) {
    const filters = {};
    if (danceStyle) {
      filters.style = danceStyle;
    }

    const query = qs.stringify(
      {
        filters: filters,
        fields: ['type', 'title', 'description', 'organizer', 'startDate', 'endDate', 'city', 'information', 'slug'],
        populate: {
          registration: {
            fields: ['accept', 'url', 'endDate'],
          },
          address: {
            fields: ['address', 'mapUrl'],
          },
          organization: {
            fields: ['name', 'country', 'shortName', 'website'],
          },
          departments: {
            fields: ['name', 'startTime'],
            populate: {
              categories: {
                fields: ['name', 'class', 'program', 'entries'],
              },
            },
          },
          cover: {
            fields: ['alternativeText', 'placeholder', 'url'],
          },
          entryForm: {
            fields: ['url'],
          },
        },
        sort: 'startDate',
      },
      { encodeValuesOnly: true }
    );

    const [error, data] = await backendApi.get(`/events?${query}`);

    if (error) {
      return { result: null, error: APIErrorsHandlingUtils.handleErrors(error) };
    }

    return { result: data, error: null };
  }
}
