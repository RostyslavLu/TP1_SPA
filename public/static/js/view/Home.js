import AbstructView from "./AbstructView.js";

export default class extends AbstructView {
    constructor(params) {
        super(params);
        this.setTitle("Accueil");
    }
    async getHtml() {
        return `
            <div class="container my-5">
            <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
              <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
                <h1 class="display-4 fw-bold lh-1 text-body-emphasis">Mars Rover Photos </h1>
                <p class="lead"> Image data gathered by NASA's Curiosity, Opportunity, and Spirit rovers on Mars https://api.nasa.gov/
                </p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                    <a class="btn btn-outline-secondary btn-lg px-4" href="/photos" data-link>
                        Liste des photos
                    </a>
                    </div>
              </div>
              <div class="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
                  <img class="rounded-lg-3" src="./static/img/pexels-spacex-586030.jpg" alt="" width="720">
              </div>
            </div>
          </div>
        `;
    }
}
