import GetResponseService from './GetResponseService';

export default class ArticlesService extends GetResponseService {
  baseUrl = `https://conduit.productionready.io/api/articles`;

  async getArticles(pages = 1, token = '') {
    const options = this.getOptions(token);

    const res = await this.getResponse(`${this.baseUrl}?offset=${pages * 20 - 20}`, options);
    return res;
  }

  async getArticle(slug, token = '') {
    const options = this.getOptions(token, 'GET');

    const res = await this.getResponse(`${this.baseUrl}/${slug}`, options);
    return res;
  }

  async createArticle(data, token) {
    const options = this.getOptions(token, 'POST', data);

    const res = await this.getResponse(`${this.baseUrl}`, options);
    return res;
  }

  async updateArticle(data, slug, token) {
    const options = this.getOptions(token, 'PUT', data);

    const res = await this.getResponse(`${this.baseUrl}/${slug}`, options);
    return res;
  }

  async deleteArticle(slug, token) {
    const options = this.getOptions(token, 'DELETE');

    const res = await this.getResponse(`${this.baseUrl}/${slug}`, options);
    return res;
  }

  async favoriteArticle(slug, token, favorite) {
    const actionMethod = favorite ? 'DELETE' : 'POST';
    const options = this.getOptions(token, actionMethod);

    const res = await this.getResponse(`${this.baseUrl}/${slug}/favorite`, options);
    return res;
  }
}
