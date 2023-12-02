//4. import the views
import Home from "./view/Home.js";
import Photos from "./view/Photos.js";
import PhotoView from "./view/PhotoView.js";

//5. Create a pathToRegex function
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

//6
const getParams = match => {
    const values = match.isMatch.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(isMatch => isMatch[1]);
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};
//1. Create a router function
const router = async () => {
    const routes = [
        { path: "/", view: Home},
        { path: "/photos", view: Photos},
        { path: "/photo-view/:id", view: PhotoView},
    ];
    //1.2 Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname.match(pathToRegex(route.path))
        };
    });
    //1.3 Find the first match
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    //If no match, use the first route
    if (!match) {
        match = {
            route: routes[0],
            isMatch: [location.pathname]
        };
    };
    //match.route.view();
    //1.4 Load the view
    //document.querySelector("#app").innerHTML = match.route.view;
    const view = new match.route.view(getParams(match));
    document.querySelector("#app").innerHTML = await view.getHtml();
};
//3. Create a navigateTo function
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}
//7
window.addEventListener("popstate", router);
//2. Listen for the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
});