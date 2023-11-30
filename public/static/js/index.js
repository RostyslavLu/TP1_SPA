//4. import the views
import Dashboard from "./view/Dashboard.js";
import Posts from "./view/Posts.js";
import Settings from "./view/Settings.js";

//1. Create a router function
const router = async () => {
    const routes = [
        { path: "/", view: Dashboard},
        { path: "/posts", view: Posts},
        { path: "/settings", view: Settings},
    ];
    //1.2 Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });
    //1.3 Find the first match
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    //If no match, use the first route
    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    };
    //match.route.view();
    //1.4 Load the view
    //document.querySelector("#app").innerHTML = match.route.view;
    const view = new match.route.view;
    document.querySelector("#app").innerHTML = await view.getHtml();
};
//3. Create a navigateTo function
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}
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