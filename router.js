window.onload = function () {
    const path = window.location.pathname.split("/");
    switch (path[1]) {
        case "": {
            loadPage("home");
            break;
        }
        case "new": {
            loadPage("new");
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
            if (path == "home") {
                window.history.pushState("", "", "/");
            }
            window.history.pushState("", "", path);
        });
    });
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


}