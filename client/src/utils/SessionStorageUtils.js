export default class SessionStorageUtils {
  static setManagement(management) {
    window.sessionStorage.setItem('management', JSON.stringify(management));
  }

  static getManagement() {
    return JSON.parse(window.sessionStorage.getItem('management'));
  }
}
