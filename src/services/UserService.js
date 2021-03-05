import GetResponseService from './GetResponseService';

export default class UserService extends GetResponseService {
  baseUrl = `https://conduit.productionready.io/api/`;

  async registerUser(data) {
    const options = this.getOptions('', 'POST', data);

    const res = await this.getResponse(`${this.baseUrl}users`, options);
    return res;
  }

  async logInUser(data) {
    const options = this.getOptions('', 'POST', data);

    const res = await this.getResponse(`${this.baseUrl}users/login`, options);
    return res;
  }

  async getCurrentUser(token) {
    const options = this.getOptions(token, 'GET');

    const res = await this.getResponse(`${this.baseUrl}user`, options);
    return res;
  }

  async updateUser(data, token) {
    const options = this.getOptions(token, 'PUT', data);

    const res = await this.getResponse(`${this.baseUrl}user`, options);
    return res;
  }
}
