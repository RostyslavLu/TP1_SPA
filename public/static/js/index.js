// import the views
import Home from "./view/Home.js";
import Photos from "./view/Photos.js";
import PhotoView from "./view/PhotoView.js";

// Create a pathToRegex function
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
 
const getParams = match => {
    const values = match.isMatch.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(isMatch => isMatch[1]);
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};
// Create a router function
const router = async () => {
    const routes = [
        { path: "/", view: Home},
        { path: "/photos", view: Photos},
        { path: "/photo-view/:id", view: PhotoView},
    ];
    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname.match(pathToRegex(route.path))
        };
    });
    // Find the first match
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    //If no match, use the first route
    if (!match) {
        match = {
            route: routes[0],
            isMatch: [location.pathname]
        };
    };

    // Load the view
    const view = new match.route.view(getParams(match));
    document.querySelector("#app").innerHTML = await view.getHtml();
};
// Create a navigateTo function
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}
// Listen for the popstate event
window.addEventListener("popstate", router);
// Listen for the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
});
