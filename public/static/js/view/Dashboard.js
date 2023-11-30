import AbstructView from "./AbstructView.js";

export default class extends AbstructView {
    constructor() {
        super();
        this.setTitle("Dashboard");
    }
    async getHtml() {
        return `
            <h1>Dashboard</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Quisquam, voluptate. Quaerat, voluptatem. Quisquam, 
                voluptate. Quaerat, voluptatem.
            </p>
            <a href="/posts" data-link>
                View recent posts
            </a>
        `;
    }
}