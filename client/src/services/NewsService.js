import * as qs from 'qs';
import { backendApi } from 'api/api';
import APIErrorsHandlingUtils from 'utils/APIErrorsHandlingUtils';

export default class NewsService {
  static async getNews() {
    const query = qs.stringify({
      fields: ['title', 'description', 'publishedAt', 'content'],
      populate: {
        media: {
          fields: ['alternativeText', 'placeholder', 'url'],
        },
      },
      sort: 'publishedAt',
    });

    const [error, data] = await backendApi.get(`/articles?${query}`);

    if (error) {
      return { result: null, error: APIErrorsHandlingUtils.handleErrors(error) };
    }

    return { result: data, error: null };
  }
}
