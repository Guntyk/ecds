import * as qs from 'qs';
import { backendApi } from 'api/api';
import APIErrorsHandlingUtils from 'utils/APIErrorsHandlingUtils';

export default class AboutUsService {
  static async getManagement() {
    const query = qs.stringify({
      fields: ['id', 'name', 'surname', 'role', 'biography'],
      populate: {
        photo: {
          fields: ['alternativeText', 'url'],
        },
        socials: true,
      },
    });

    const [error, data] = await backendApi.get(`/managers?${query}`);

    if (error) {
      return { result: null, error: APIErrorsHandlingUtils.handleErrors(error) };
    }

    return { result: data, error: null };
  }
}
