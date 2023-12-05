import AbstructView from "./AbstructView.js";

export default class extends AbstructView {
  constructor(params) {
    super(params);
    this.setTitle("Mars Rover Photos");
  }
  async getHtml() {
    async function getData(url) {
      const response = await fetch(url);
      return response.json();
    }
    const data = await getData('./static/data/data.json');
    const photos = data['photos'];
    let listPhotos = `<div class="album py-5 bg-light">
    <div class="container">

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">`;
    for (let i in photos) {
      listPhotos += `
                <div class="col">
                <div class="card shadow-sm">
                <img class="bd-placeholder-img card-img-top" width="100%" height="225" src="${photos[i]['img_src']}" alt="${photos[i]['id']}">
                  <div class="card-body">
                    <p class="card-text">${photos[i]['camera']['full_name']}</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                      <a href="/photo-view/${photos[i]['id']}" class="btn btn-sm btn-outline-secondary" data-link>Details</a>
                      </div>
                      <small class="text-muted">ID:&nbsp;${photos[i]['id']}</small>
                    </div>
                  </div>
                </div>
              </div>
            `;
    }
    listPhotos += `</div></div></div>`;
    return `${listPhotos}`;
  }
}