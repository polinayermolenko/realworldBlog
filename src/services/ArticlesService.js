export default class ArticlesService {
  async getResponse(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    const body = await res.json();

    return body;
  }

  async getArticles() {
    const res = await this.getResponse(`https://conduit.productionready.io/api/articles`);
    return res;
  }
}
