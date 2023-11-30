import AbstructView from "./AbstructView.js";

export default class extends AbstructView {
    constructor() {
        super();
        this.setTitle("Posts");
    }
    async getHtml() {
        async function getData(url) {
            const response = await fetch(url);
            return response.json();
        }
        const data = await getData('./static/data/posts.json');
        let listPosts = `<div class="album py-5 bg-light">
        <div class="container">
    
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">`;
        for (let i in data) {
            listPosts += `
            <div class="col">
            <div class="card shadow-sm">
              
                <img class="bd-placeholder-img card-img-top" width="100%" height="225" src="${data[i]['image']}" alt="${data[i]['titre']}">
              <div class="card-body">
                <p class="card-text">${data[i]['titre']}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                  <a href="/post-view/${data[i]['id']}" class="btn btn-sm btn-outline-secondary" data-link>View</a>
                  </div>
                  <small class="text-muted">9 mins</small>
                </div>
              </div>
            </div>
          </div>
            
            
            `;
        }
        listPosts += `</div> </div></div>`;
        return `
            <h1>Posts</h1>
            ${listPosts}
            `;
    }
}