import * as qs from 'qs';
import { backendApi } from 'api/api';
import APIErrorsHandlingUtils from 'utils/APIErrorsHandlingUtils';

export default class EventsService {
  static async getEvents() {
    const query = qs.stringify({
      fields: ['type', 'title', 'description', 'organizer', 'startDate', 'endDate', 'address'],
      populate: {
        organization: {
          fields: ['name', 'website'],
        },
        cover: {
          fields: ['alternativeText', 'placeholder', 'url'],
        },
      },
    });

    const [error, data] = await backendApi.get(`/events?${query}`);

    if (error) {
      return { result: null, error: APIErrorsHandlingUtils.handleErrors(error) };
    }

    return { result: data, error: null };
  }
}
