export default class GetResponseService {
  async getResponse(url, options = {}) {
    const res = await fetch(url, options);

    if (!res.ok && res.status !== 422) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    const body = await res.json();
    return body;
  }
}
