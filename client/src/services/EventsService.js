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
        fields: [
          'type',
          'title',
          'description',
          'organizer',
          'startDate',
          'endDate',
          'city',
          'information',
          'address',
          'slug',
        ],
        populate: {
          registration: {
            fields: ['url', 'startDate', 'endDate'],
          },
          organization: {
            fields: ['name', 'country', 'shortName', 'website'],
          },
          departments: {
            fields: ['name', 'startDate', 'startTime'],
            populate: {
              categories: {
                fields: ['name', 'class', 'program', 'entries', 'participants'],
                populate: {
                  dances: {
                    fields: ['shortName'],
                  },
                },
              },
            },
          },
          cover: {
            fields: ['alternativeText', 'placeholder', 'url'],
          },
          entryForm: {
            fields: ['url'],
          },
          judges: {
            populate: {
              photo: {
                fields: ['alternativeText', 'placeholder', 'formats'],
              },
            },
            fields: ['name', 'surname', 'country', 'city'],
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
