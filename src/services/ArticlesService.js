import { getFromLStorage } from '../utils/localStorage';
import GetResponseService from './GetResponseService';

export default class ArticlesService extends GetResponseService {
  baseUrl = `https://conduit.productionready.io/api/articles`;

  token = `Token ${getFromLStorage('token')}`;

  async getArticles(pages = 1, token = '') {
    let options = {};
    if (token) {
      options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
      };
    } else {
      options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      };
    }
    const res = await this.getResponse(`${this.baseUrl}?offset=${pages * 20 - 20}`, options);
    return res;
  }

  async getArticle(slug, token = '') {
    let options = {};
    if (token) {
      options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
      };
    } else {
      options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      };
    }
    const res = await this.getResponse(`${this.baseUrl}/${slug}`, options);
    return res;
  }

  async createArticle(data) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: this.token,
      },
      body: JSON.stringify(data),
    };
    const res = await this.getResponse(`${this.baseUrl}`, options);
    return res;
  }

  async updateArticle(data, slug) {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: this.token,
      },
      body: JSON.stringify(data),
    };
    const res = await this.getResponse(`${this.baseUrl}/${slug}`, options);
    return res;
  }

  async deleteArticle(slug) {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: this.token,
      },
    };
    const res = await this.getResponse(`${this.baseUrl}/${slug}`, options);
    return res;
  }

  async favoriteArticle(slug, token, favorite) {
    const actionMethod = favorite ? 'DELETE' : 'POST';
    const options = {
      method: actionMethod,
      headers: {
        'Content-Type': `application/json;charset=utf-8`,
        Authorization: `Token ${token}`,
      },
    };
    const res = await this.getResponse(`${this.baseUrl}/${slug}/favorite`, options);
    return res;
  }

  // async setFavoriteArticle(slug) {
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //       Authorization: this.token,
  //     },
  //   };
  //   const res = await this.getResponse(`${this.baseUrl}/${slug}/favorite`, options);
  //   return res;
  // }

  // async setUnfavoriteArticle(slug) {
  //   const options = {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //       Authorization: this.token,
  //     },
  //   };
  //   const res = await this.getResponse(`${this.baseUrl}/${slug}/favorite`, options);
  //   return res;
  // }
}
