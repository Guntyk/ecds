import * as qs from 'qs';
import { backendApi } from 'api/api';
import APIErrorsHandlingUtils from 'utils/APIErrorsHandlingUtils';

export default class EventsService {
  static async getEvents(danceStyle) {
    const filters = {};
    if (danceStyle) {
      filters.style = danceStyle;
    }

    const query = qs.stringify({
      filters: filters,
      fields: ['type', 'title', 'description', 'organizer', 'startDate', 'endDate', 'address'],
      populate: {
        organization: {
          fields: ['name', 'shortName', 'website'],
        },
        cover: {
          fields: ['alternativeText', 'placeholder', 'url'],
        },
      },
      sort: 'startDate',
    });

    const [error, data] = await backendApi.get(`/events?${query}`);

    if (error) {
      return { result: null, error: APIErrorsHandlingUtils.handleErrors(error) };
    }

    return { result: data, error: null };
  }
}
