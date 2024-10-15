// Redirection from ./ to ./new
const iniURL = window.location.pathname.split("/");
if (iniURL[1] == "") {
    window.history.pushState("", "", "new");
}

// Page Loading Function
function loadPage($path) {
    if ($path == "") return;
    const container = document.getElementById("main-content");
    const request = new XMLHttpRequest();
    request.open("GET", "pages/" + $path + ".html");
    request.send();
    request.onload = function () {
        if (request.status == 200) {
            container.innerHTML = request.responseText;
        }
        else {
            loadPage(404);
        }
    }
}

// Event Listener for the Navigation Buttons
document.querySelectorAll(".head-nav-link-list").forEach((item) => {
    item.addEventListener("click", function () {
        const path = item.getAttribute("value");
        loadPage(path);
        window.history.pushState("", "", path);
    });
});

// Reloading and Redirection Logic
window.onload = function () {

    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
    const redirectPath = getQueryParam('redirect');
    if (redirectPath) {
        const pageName = redirectPath.startsWith('/') ? redirectPath.slice(1) : redirectPath;
        window.history.pushState({}, '', redirectPath);
        loadPage(pageName);
    }
    else {
        const path = window.location.pathname.split("/");
        switch (path[1]) {
            case "new": {
                loadPage("new");
                break;
            }
            case "home": {
                loadPage("home");
                break;
            }
            case "radio": {
                loadPage("radio");
                break;
            }
            default: {
                loadPage("404");
                break;
            }
        }
    }
}