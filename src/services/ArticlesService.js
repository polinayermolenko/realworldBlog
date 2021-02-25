import GetResponseService from './GetResponseService';

export default class ArticlesService extends GetResponseService {
  baseUrl = `https://conduit.productionready.io/api/articles`;

  async getArticles(pages = 1) {
    const res = await this.getResponse(`${this.baseUrl}?offset=${pages * 20 - 20}`);
    return res;
  }

  async getArticle(slug) {
    const res = await this.getResponse(`${this.baseUrl}/${slug}`);
    return res;
  }

  async createArticle(data) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('token')}`,
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
        Authorization: `Token ${localStorage.getItem('token')}`,
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
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    };
    const res = await this.getResponse(`${this.baseUrl}/${slug}`, options);
    return res;
  }

  async setFavoriteArticle(slug) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    };
    const res = await this.getResponse(`${this.baseUrl}/${slug}/favorite`, options);
    return res;
  }

  async setUnfavoriteArticle(slug) {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    };
    const res = await this.getResponse(`${this.baseUrl}/${slug}/favorite`, options);
    return res;
  }
}
