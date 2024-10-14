function loadPage($path) {
    if ($path == "") return;
    const container = document.getElementById("main-content");
    const request = new XMLHttpRequest();
    request.open("GET", "pages/" + $path + ".html");
    request.send();
    request.onload = function () {
        if (request.status == 200) {
            container.innerHTML = request.responseText;
            console.log(request.responseText);
        }
    }
}
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

    {
        const path = window.location.pathname.split("/");
        switch (path[1]) {
            case "": {
                loadPage("new");
                window.history.pushState("", "", "new");
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
        document.querySelectorAll(".head-nav-link-list").forEach((item) => {
            item.addEventListener("click", function () {
                const path = item.getAttribute("value");
                loadPage(path);
                window.history.pushState("", "", path);
            });
        });
    }
}