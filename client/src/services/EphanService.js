import { ephanApi } from 'api/ephan';
import APIErrorsHandlingUtils from 'utils/APIErrorsHandlingUtils';

export default class EphanService {
  static async getStatuses() {
    const [error, data] = await ephanApi.get('/statuses');

    if (error) {
      return { result: null, error: APIErrorsHandlingUtils.handleErrors(error) };
    }

    return { result: data, error: null };
  }

  static async getDancers() {
    const [error, data] = await ephanApi.get('/dancers');

    if (error) {
      return { result: null, error: APIErrorsHandlingUtils.handleErrors(error) };
    }

    return { result: data, error: null };
  }

  static async getCoaches() {
    const [error, data] = await ephanApi.get('/coaches');

    if (error) {
      return { result: null, error: APIErrorsHandlingUtils.handleErrors(error) };
    }

    return { result: data, error: null };
  }

  static async getJudges() {
    const [error, data] = await ephanApi.get('/judges');

    if (error) {
      return { result: null, error: APIErrorsHandlingUtils.handleErrors(error) };
    }

    return { result: data, error: null };
  }

  static async getClubs() {
    const [error, data] = await ephanApi.get('/clubs');

    if (error) {
      return { result: null, error: APIErrorsHandlingUtils.handleErrors(error) };
    }

    return { result: data, error: null };
  }

  static async getDancerClasses() {
    const [error, data] = await ephanApi.get('/dancerClasses');

    if (error) {
      return { result: null, error: APIErrorsHandlingUtils.handleErrors(error) };
    }

    return { result: data, error: null };
  }

  static async getCountries() {
    const [error, data] = await ephanApi.get('/countries');

    if (error) {
      return { result: null, error: APIErrorsHandlingUtils.handleErrors(error) };
    }

    return { result: data, error: null };
  }
}
