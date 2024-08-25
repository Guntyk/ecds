import * as qs from 'qs';
import { backendApi } from 'api/api';
import APIErrorsHandlingUtils from 'utils/APIErrorsHandlingUtils';

export default class NewsService {
  static async getNews(searchTerm = '', sortFactor = 'publicationDate:desc') {
    const query = qs.stringify({
      fields: ['title', 'description', 'publicationDate', 'content', 'views'],
      populate: {
        media: {
          fields: ['alternativeText', 'placeholder', 'url'],
        },
      },
      sort: sortFactor,
      filters: {
        $or: [{ title: { $containsi: searchTerm } }, { description: { $containsi: searchTerm } }],
      },
    });

    const [error, data] = await backendApi.get(`/articles?${query}`);

    if (error) {
      return { result: null, error: APIErrorsHandlingUtils.handleErrors(error) };
    }

    return { result: data, error: null };
  }

  static async updateViews(newsId, views) {
    const [error, data] = await backendApi.put(`/articles/${newsId}`, { views });

    if (error) {
      return { result: null, error: APIErrorsHandlingUtils.handleErrors(error) };
    }

    return { result: data, error: null };
  }
}
