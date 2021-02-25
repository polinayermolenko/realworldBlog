import GetResponseService from './GetResponseService';

export default class UserService extends GetResponseService {
  baseUrl = `https://conduit.productionready.io/api/`;

  async registerUser(data) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    };
    const res = await this.getResponse(`${this.baseUrl}users`, options);
    return res;
  }

  async logInUser(data) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    };
    const res = await this.getResponse(`${this.baseUrl}users/login`, options);
    return res;
  }

  async getCurrentUser() {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    };
    const res = await this.getResponse(`${this.baseUrl}user`, options);
    return res;
  }

  async updateUser(data) {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    };
    const res = await this.getResponse(`${this.baseUrl}user`, options);
    return res;
  }
}
