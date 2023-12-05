import AbstructView from "./AbstructView.js";

export default class extends AbstructView {
    constructor(params) {
        super(params);
        this.setTitle("PhotoView");
    }
    async getHtml() {
        async function getData(url) {
            const response = await fetch(url);
            return response.json();
        }
        const data = await getData('../static/data/data.json');
        const photos = data['photos'];
        const post_id = Number(this.params.id);
        const post = photos.find(item => item.id === post_id);
        return `
                    <h1 class="display-5 fw-bold text-center">Photo ID:&nbsp;${post.id}</h1>
                    <div class="container d-flex p-2">
                        <div class="p-2 flex-grow-1 w-100">
                            <img src="${post.img_src}" class="w-100" alt="...">
                        </div>
                        <div class="p-2 align-self-center">
                            <h2 class="mt-0">Rover:&nbsp;${post.rover.name}</h5>
                            <p class="lead mb-0">Camera:&nbsp;${post.camera.full_name}</p>
                            <p class="lead mb-0">Earth date:&nbsp;${post.earth_date}</p>
                            <a href="/photos" class="btn btn-outline-secondary btn-lg px-4" data-link>Retour à la liste</a>
                        </div>
                    </div>
            `;
    }
}