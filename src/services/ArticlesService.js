export default class ArticlesService {
  async getResponse(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    const body = await res.json();

    return body;
  }

  async postResponse(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Could not find the data`);
    }

    const body = await res.json();
    return body;
  }

  async getArticles(pages = 1) {
    const res = await this.getResponse(`https://conduit.productionready.io/api/articles?offset=${pages * 20 - 20}`);
    return res;
  }

  async getArticle(slug) {
    const res = await this.getResponse(`https://conduit.productionready.io/api/articles/${slug}`);
    return res;
  }

  async registerUser(data) {
    const res = await this.postResponse(`https://conduit.productionready.io/api/users`, data);
    return res;
  }

  async logInUser(data) {
    const res = await this.postResponse(`https://conduit.productionready.io/api/users/login`, data);
    return res;
  }
}
