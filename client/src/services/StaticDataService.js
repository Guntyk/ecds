import * as qs from 'qs';
import { backendApi } from 'api/api';
import APIErrorsHandlingUtils from 'utils/APIErrorsHandlingUtils';

export default class StaticDataService {
  static async getManagement() {
    const query = qs.stringify({
      fields: ['name', 'surname', 'role', 'biography'],
      populate: {
        photo: {
          fields: ['alternativeText', 'placeholder', 'url'],
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

  static async getLogos() {
    const query = qs.stringify({
      populate: {
        logos: { populate: { images: { fields: ['alternativeText', 'name', 'ext', 'url', 'placeholder'] } } },
      },
    });

    const [error, data] = await backendApi.get(`/logos?${query}`);

    if (error) {
      return { result: null, error: APIErrorsHandlingUtils.handleErrors(error) };
    }

    return { result: data, error: null };
  }

  static async getDocuments() {
    const query = qs.stringify({
      fields: ['title', 'description'],
      populate: {
        file: { fields: ['ext', 'url'] },
      },
    });

    const [error, data] = await backendApi.get(`/documents?${query}`);

    if (error) {
      return { result: null, error: APIErrorsHandlingUtils.handleErrors(error) };
    }

    return { result: data, error: null };
  }

  static async getOrganizations() {
    const query = qs.stringify({
      fields: ['name', 'shortName', 'country', 'manager', 'website', 'email', 'phone', 'status'],
      populate: {
        flag: { fields: ['url'] },
      },
      sort: 'country',
    });

    const [error, data] = await backendApi.get(`/organizations?${query}`);

    if (error) {
      return { result: null, error: APIErrorsHandlingUtils.handleErrors(error) };
    }

    return { result: data, error: null };
  }

  static async getPartners() {
    const query = qs.stringify({
      fields: ['website'],
      populate: {
        logo: { fields: ['alternativeText', 'url', 'placeholder'] },
      },
    });

    const [error, data] = await backendApi.get(`/partners?${query}`);

    if (error) {
      return { result: null, error: APIErrorsHandlingUtils.handleErrors(error) };
    }

    return { result: data, error: null };
  }

  static async getBanners() {
    const query = qs.stringify({
      fields: ['link'],
      populate: {
        image: { fields: ['alternativeText', 'url', 'placeholder'] },
      },
    });

    const [error, data] = await backendApi.get(`/banners?${query}`);

    if (error) {
      return { result: null, error: APIErrorsHandlingUtils.handleErrors(error) };
    }

    return { result: data, error: null };
  }
}
